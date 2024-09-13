import { Ticket } from '@acme/shared-models';
import { useTickets } from 'client/src/hook/useTickets';
import { IColumn } from 'client/src/types';
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import { useMutation } from '@tanstack/react-query';

export default function Board({
  columns,
  setColumns,
}: {
  columns: { [key: string]: IColumn };
  setColumns: (column: { [key: string]: IColumn }) => void;
}) {
  //PUT: Mark as complete.
  const markAsComplete = useMutation({
    mutationFn: (ticketId: number) => {
      return fetch(`/api/tickets/${ticketId}/complete`, { method: 'PUT' });
    },
  });

  //PUT: Mark as incomplete.
  const markAsInComplete = useMutation({
    mutationFn: (ticketId: number) => {
      return fetch(`/api/tickets/${ticketId}/complete`, { method: 'DELETE' });
    },
  });

  //Handler: drag & drop
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    let droppableId = 'todo';
    if (source.droppableId == 'completed') {
      droppableId = 'completed';
    }
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tickets];
      const destItems = [...destColumn.tickets];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tickets: sourceItems,
          total: sourceItems.length,
        },
        [destination.droppableId]: {
          ...destColumn,
          tickets: destItems,
          total: destItems.length,
        },
      });
      if (destination.droppableId == 'todo') {
        markAsInComplete.mutate(columns['completed'].tickets[source.index].id);
      }
      if (destination.droppableId == 'completed') {
        markAsComplete.mutate(columns['todo'].tickets[source.index].id);
      }
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tickets];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tickets: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      {Object.values(columns).map((column) => (
        <Column key={column.id} {...column} />
      ))}
    </DragDropContext>
  );
}
