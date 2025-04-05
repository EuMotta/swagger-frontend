import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';

import getInitialsCharacters from '@/utils/get-initials-characters';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Spinner } from './spinner';

interface Option {
  avatar?: string;
  value: string;
  email: string;
  role: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  isLoading?: boolean;
  isAvatar?: boolean;
  renderOption?: (option: Option) => React.ReactNode;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = 'Selecione...',
  isLoading = false,
  isAvatar = false,
  renderOption,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [dropdownDirection, setDropdownDirection] = React.useState<
    'up' | 'down'
  >('down');

  const handleUnselect = React.useCallback(
    (option: Option) => {
      onChange(selected.filter((s) => s.value !== option.value));
    },
    [onChange, selected],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            const newSelected = [...selected];
            newSelected.pop();
            onChange(newSelected);
          }
        }
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [selected, onChange],
  );

  React.useLayoutEffect(() => {
    const inputEl = inputRef.current;
    if (inputEl) {
      const rect = inputEl.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropdownDirection('up');
      } else {
        setDropdownDirection('down');
      }
    }
  }, [open]);

  const selectables = options.filter(
    (option) => !selected.some((s) => s.value === option.value),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => (
            <Badge key={option.value} variant="secondary">
              {option.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-xs placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="relative">
        <CommandList>
          {open && selectables.length > 0 && (
            <div
              className={`absolute z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in ${
                dropdownDirection === 'up'
                  ? 'bottom-full mb-12'
                  : 'top-full mt-2'
              }`}
            >
              {isLoading ? (
                <div className="py-4">
                  <Spinner size="small" />
                </div>
              ) : (
                <CommandGroup className="h-40 overflow-y-scroll">
                  <div className="space-y-1">
                    {selectables.map((option) => (
                      <CommandItem
                        key={option.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          setInputValue('');
                          onChange([...selected, option]);
                        }}
                        className="cursor-pointer flex justify-between"
                      >
                        {renderOption ? (
                          renderOption(option)
                        ) : (
                          <div className="flex items-center space-x-2 py-1 text-xs text-muted-foreground">
                            {isAvatar && (
                              <Avatar className="border-muted border-1 size-10">
                                <AvatarImage src={option.avatar} />
                                <AvatarFallback>
                                  {getInitialsCharacters(option.label)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <span>{option.label}</span>
                              <br />
                              <span>{option.email}</span>
                            </div>
                            <Badge
                              variant="outline"
                              className="flex items-center text-xs text-muted-foreground"
                            >
                              {option.role}
                            </Badge>
                          </div>
                        )}
                      </CommandItem>
                    ))}
                  </div>
                </CommandGroup>
              )}
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  );
};

export { MultiSelect };
