'use client';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { useChangeTaskList } from '@/http/generated/api';
import { Board, ChangeTaskList, Task } from '@/http/generated/api.schemas';
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { toast } from 'sonner';

import { hasDraggableData } from './utils';

import { BoardColumn, BoardContainer, Column } from './board-column';
import { coordinateGetter } from './coordinates';
import { TaskCard } from './task-card';

interface TaskBoard extends Task {
  columnId: string;
  id: string;
}

export function KanbanBoard({ kanban }: { kanban: Board }) {
  const initialColumns: Column[] =
    kanban.lists?.map((list) => ({
      ...list,
      id: list._id,
      title: list.name,
    })) ?? [];
  const changetaskList = useChangeTaskList();

  const onSubmitChangeTaskList = async (data: ChangeTaskList, id: string) => {
    changetaskList.mutate(
      { data, id },
      {
        onError: (error) => {
          console.error('Erro na mutação:', error);
          toast.error('Erro ao mudar a tarefa de lista!');
        },
        onSuccess: () => {
          toast.success('Tarefa movida com sucesso!');
        },
      },
    );
  };
  const initialTasks: TaskBoard[] =
    kanban.tasks?.map((task) => ({
      ...task,
      id: task._id,
      columnId: task.list_id,
    })) ?? [];

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [tasks, setTasks] = useState<TaskBoard[]>(initialTasks);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={tasks.filter((task) => task.columnId === col.id)}
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {typeof window !== 'undefined' &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id,
                )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;

    if (data?.type === 'Task') {
      setActiveTask(data.task);
    } else if (data?.type === 'Column') {
      setActiveColumn(data.column);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    columns.forEach((col) => {
      const colEl = document.getElementById(`column-${col.id}`);
      if (colEl) {
        colEl.style.border = '';
      }
    });

    const { active, over } = event;
    if (!over) {
      console.log('❌ Nenhum elemento sobreposto (over).');
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    console.log(
      `🔄 Drag End detectado: Active ID = ${activeId}, Over ID = ${overId}`,
    );

    if (!hasDraggableData(active)) {
      console.log('❌ Active não tem dados de arrastável.');
      return;
    }

    if (activeId === overId) {
      console.log(
        `⏭️ Ignorando: Active (${activeId}) e Over (${overId}) são iguais.`,
      );
      return;
    }

    const activeData = active.data.current;

    if (activeData?.type === 'Task') {
      const activeTask = tasks.find((task) => task.id === activeId);
      if (!activeTask) {
        console.log('❌ Task ativa não encontrada.');
        return;
      }

      const targetColumn = columns.find((col) => col.id === overId);
      if (!targetColumn) {
        console.log(`❌ Coluna destino não encontrada para overId: ${overId}`);
        return;
      }

      const maxTasks =
        targetColumn.limits?.cards?.open_per_list?.disable_at ?? Infinity;
      const currentTasksCount = tasks.filter(
        (task) => task.columnId === targetColumn.id,
      ).length;

      if (currentTasksCount >= maxTasks) {
        console.log(
          `❌ Movimento bloqueado! A coluna "${targetColumn.title}" atingiu o limite de ${maxTasks} tasks.`,
        );
        return;
      }

      onSubmitChangeTaskList({ list_id: String(over.id) }, activeData.task._id);

      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === activeId
            ? { ...task, columnId: String(targetColumn.id) }
            : task,
        ),
      );
    } else if (activeData?.type === 'Column') {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      if (activeColumnIndex === -1 || overColumnIndex === -1) {
        console.log('❌ Índices de colunas não encontrados.');
        return;
      }

      setColumns((columns) => {
        const newColumns = [...columns];
        const [movedColumn] = newColumns.splice(activeColumnIndex, 1);
        newColumns.splice(overColumnIndex, 0, movedColumn);
        return newColumns;
      });
    }
  }

  function onDragOver(event: DragOverEvent) {
    columns.forEach((col) => {
      const colEl = document.getElementById(`column-${col.id}`);
      if (colEl) {
        colEl.style.border = '';
      }
    });

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === 'Task';
    const isOverATask = overData?.type === 'Task';
    const isOverAColumn = overData?.type === 'Column';

    if (!isActiveATask) return;

    const targetColumn = columns.find((col) => col.id === overId);
    if (!targetColumn) return;

    const maxTasks =
      targetColumn.limits?.cards?.open_per_list?.disable_at ?? Infinity;
    const currentTasksCount = tasks.filter(
      (task) => task.columnId === targetColumn.id,
    ).length;

    const columnElement = document.getElementById(`column-${targetColumn.id}`);
    if (columnElement && currentTasksCount >= maxTasks) {
      columnElement.style.border = '2px solid red';
      return;
    }

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks[activeIndex];
        if (activeTask) {
          activeTask.columnId = overId as ColumnId;
          return arrayMove(tasks, activeIndex, activeIndex);
        }
        return tasks;
      });
    }
  }
  /* function onDragOver(event: DragOverEvent) {
    columns.forEach((col) => {
      const colEl = document.getElementById(`column-${col.id}`);
      if (colEl) {
        colEl.style.border = '';
      }
    });

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const targetColumn = columns.find((col) => col.id === overId);
    if (!targetColumn) return;

    const maxTasks =
      targetColumn.limits?.cards?.open_per_list?.disable_at ?? Infinity;
    const currentTasksCount = tasks.filter(
      (task) => task.columnId === targetColumn.id,
    ).length;

    const columnElement = document.getElementById(`column-${targetColumn.id}`);
    if (columnElement && currentTasksCount >= maxTasks) {
      columnElement.style.border = '2px solid red';
    }
  } */
}
