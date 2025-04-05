'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Task } from '@/http/generated/api.schemas';

const TaskProfile = ({ task }: { task: Task }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-4 gap-6 px-2">
      <div className="col-span-3 space-y-5">
        <div>
          <Button variant="secondary" size={'sm'}>
            🔔 Seguir
          </Button>

          {task.labels?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {task.labels.map((label, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-between text-xs">
            {task.start_date && (
              <p>
                <strong>Início:</strong> {formatDate(task.start_date)}
              </p>
            )}
            {task.due_date && (
              <p>
                <strong>Vencimento:</strong> {formatDate(task.due_date)}
              </p>
            )}
            {task.due_reminder && (
              <p>
                <strong>Lembrete:</strong> {formatDate(task.due_reminder)}
              </p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Descrição</h3>
          <p className="text-muted-foreground">
            {task.description || 'Adicione uma descrição mais detalhada...'}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Tarefas</h3>
          <div className="max-h-52 overflow-y-auto">
            {task.sub_tasks?.length > 0 && (
              <ul className="space-y-2">
                {task.sub_tasks.map((subTask) => (
                  <li key={subTask.id} className="flex items-center gap-2">
                    <Checkbox defaultChecked={subTask.is_completed} readOnly />
                    <span
                      className={
                        subTask.is_completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-800'
                      }
                    >
                      {subTask.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size={'sm'}>
            ➕ Adicionar power-ups
          </Button>
          <Button variant="outline" size={'sm'}>
            📄 Campos Personalizados
          </Button>
          <Button variant="outline" size={'sm'}>
            📎 Anexo
          </Button>
        </div>

        <h3 className="text-lg font-semibold mb-2">Atividade</h3>
        <Textarea placeholder="Escrever um comentário..." className="mt-2" />
        <Button className="mt-2">💬 Comentar</Button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Ações</h3>
        <div className="flex flex-col w-full space-y-2">
          <Button
            variant="default"
            size={'sm'}
            className="justify-start rounded-sm"
          >
            🔀 Mover
          </Button>
          <Button
            variant="outline"
            size={'sm'}
            className="justify-start rounded-sm"
          >
            📄 Copiar
          </Button>
          <Button
            variant="outline"
            size={'sm'}
            className="justify-start rounded-sm"
          >
            📌 Espelhar
          </Button>
          <Button
            variant="outline"
            size={'sm'}
            className="justify-start rounded-sm"
          >
            📝 Criar template
          </Button>
          <Button
            variant="destructive"
            size={'sm'}
            className="justify-start rounded-sm"
          >
            🗑️ Arquivar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskProfile;
