import { useState } from 'react';

import { Copy } from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
interface CopyButtonProps {
  link: string;
  direction?: 'left' | 'right';
}

const CopyButton: React.FC<CopyButtonProps> = ({
  link,
  direction = 'right',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <div
        className="relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`absolute transition-all duration-300 ${
            isHovered ? 'opacity-100 w-40' : 'opacity-0 w-0'
          } overflow-hidden ${
            direction === 'right' ? 'right-full mr-2' : 'left-full ml-2'
          }`}
        >
          <Input
            value={link}
            readOnly
            className="w-full text-sm"
            onClick={(e) => e.currentTarget.select()}
          />
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copied ? 'Copiado!' : 'Copiar link'}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
export default CopyButton;
