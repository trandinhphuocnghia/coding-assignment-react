import { Ticket } from '@acme/shared-models';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IColumn } from '../types';
import { DropResult } from 'react-beautiful-dnd';

const useTickets = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['/api/tickets'],
    queryFn: async () => {
      const response = await fetch('/api/tickets').then();
      const data = await response.json();
      if (!!data) return data as Ticket[];
      return [];
    },
  });

  const [columns, setColumns] = useState<{
    [key: string]: IColumn;
  }>({
    todo: {
      id: 'todo',
      title: 'Todo',
      tickets: [] as Ticket[],
      className: 'bg-[#F5F5F5]',
    } as IColumn,
    completed: {
      id: 'completed',
      title: 'Done',
      tickets: [] as Ticket[],
      className: 'bg-[#EDF9E8]',
    } as IColumn,
  });

  useEffect(() => {
    if (!isLoading) {
      setColumns({
        ...columns,
        todo: {
          ...columns['todo'],
          tickets: (data || [])?.filter((item) => !item.completed),
        },
        completed: {
          ...columns['completed'],
          tickets: (data || [])?.filter((item) => item.completed),
        },
      });
    }
  }, [isLoading]); //double-check this.

  //POST: Create ticket.
  const createTicket = useMutation({
    mutationFn: (newTicket: Partial<Ticket>) => {
      return fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify(newTicket),
      });
    },
  });
  //PUT: Assign.
  const assignTicket = useMutation({
    mutationFn: ({
      ticketId,
      userId,
    }: {
      ticketId: string;
      userId: string;
    }) => {
      return fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
        method: 'PUT',
      });
    },
  });
  //PUT: unAssign.
  const unAssignTicket = useMutation({
    mutationFn: (ticketId: string) => {
      return fetch(`/api/tickets/${ticketId}/unassign`, {
        method: 'PUT',
      });
    },
  });
  //PUT: Mark as complete.
  const markAsComplete = useMutation({
    mutationFn: (ticketId: string) => {
      return fetch(`/api/tickets/${ticketId}/complete`, { method: 'PUT' });
    },
  });
  //PUT: Mark as incomplete.
  const markAsInComplete = useMutation({
    mutationFn: (ticketId: string) => {
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
        },
        [destination.droppableId]: {
          ...destColumn,
          tickets: destItems,
        },
      });
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

  return {
    columns,
    onDragEnd,
  };
};

export default useTickets;
