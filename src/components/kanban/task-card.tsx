'use client';
import { useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateTaskStatus } from '@/http/generated/api';
import { Task } from '@/http/generated/api.schemas';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { Calendar } from 'lucide-react';

import CopyButton from '../copy-button';
import { CustomTooltip } from '../tooltip';
import { Checkbox } from '../ui/checkbox';
import TaskProfile from './task-profile';

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

const TaskOptions = ({ task }: { task: Task }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1">
          <BiDotsVertical />
          <span className="sr-only">{`Opções para ${task.title}`}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: 'Task',
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task',
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary',
      },
    },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        onClick={handleOpen}
        className={`rounded-[3px] bg-card cursor-pointer ${variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
        })}`}
      >
        <CardHeader
          className="flex flex-row items-center justify-between border-b shadow-sm px-2 py-1 bg-background rounded-t-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            {...attributes}
            {...listeners}
            className="flex-1 flex items-center cursor-grab space-x-2 text-primary"
          >
            <span className="mr-auto line-clamp-1 font-medium">
              {task.title}
            </span>
            <span className="sr-only">{`Mover tarefa: ${task.title}`}</span>
          </div>
          <TaskOptions task={task} />
        </CardHeader>

        <CardContent className="px-3 pt-3 pb-1 shadow-inner text-left whitespace-pre-wrap">
          {task.description && (
            <p className="text-sm text-gray-600">{task.description}</p>
          )}
          {task.labels && task.labels.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {task.labels.map((label, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-xs px-2 py-1 rounded-md"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="!py-1 px-3">
          <div className="w-full mb-2 flex justify-between items-center">
            {task.due_date && (
              <CustomTooltip
                trigger={
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <Calendar size={15} />
                    {new Date(task.due_date).toLocaleDateString()}
                  </p>
                }
                content={'Data de vencimento da tarefa'}
              />
            )}
          </div>
          <CompleteTask
            is_completed={task.is_completed ?? false}
            id={task._id}
          />
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="p-6 space-y-4 !max-w-5xl !w-full">
          <DialogHeader className="flex">
            <DialogTitle className="flex items-center gap-2">
              {task.title}
              <CopyButton
                direction="left"
                link={task.short_link ?? 'indefinido'}
              />
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-auto">
            <TaskProfile task={task} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const CompleteTask = ({
  is_completed = false,
  id,
}: {
  is_completed: boolean;
  id: string;
}) => {
  const updateTask = useUpdateTaskStatus();

  const onUpdateTaskStatus = async (e: React.MouseEvent) => {
    e.stopPropagation();
    updateTask.mutate({ id });
  };

  return (
    <CustomTooltip
      trigger={
        <div>
          <Checkbox
            id="terms"
            defaultChecked={is_completed}
            onClick={onUpdateTaskStatus}
            disabled={updateTask.isPending}
          />
        </div>
      }
      content={'Finalizado?'}
    />
  );
};
