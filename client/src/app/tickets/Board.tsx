import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IColumn, QueryKeys } from 'client/src/types';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import { Ticket } from '@acme/shared-models';

export default function Board({
  columns,
  setColumns,
  isFetching,
}: {
  columns: { [key: string]: IColumn };
  setColumns: (column: { [key: string]: IColumn }) => void;
  isFetching: boolean;
}) {
  const queryClient = useQueryClient();
  //PUT: Mark as complete.
  const markAsComplete = useMutation({
    mutationFn: (ticketId: number) => {
      return fetch(`/api/tickets/${ticketId}/complete`, { method: 'PUT' });
    },
    onMutate: async (ticketId: number) => {
      // Cancel any outgoing refetches for tickets
      await queryClient.cancelQueries({ queryKey: [QueryKeys.Tickets] });
      // Get the current ticket list from the cache
      const previousTickets = queryClient.getQueryData<Ticket[]>([
        '/api/tickets',
      ]);
      // Optimistically update the cache with the ticket marked as complete
      if (previousTickets) {
        queryClient.setQueryData<Ticket[]>([QueryKeys.Tickets], (oldTickets) =>
          oldTickets?.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, completed: true } : ticket
          )
        );
      }
      // Return context with previous tickets in case of rollback
      return { previousTickets };
    },
    onError: (error, ticketId, context) => {
      if (!!context) {
        // Rollback to the previous state if the mutation fails
        queryClient.setQueryData(['/api/tickets'], context.previousTickets);
      }
    },
    onSettled: () => {
      // Refetch the ticket list to sync with server
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Tickets] });
    },
  });

  //PUT: Mark as incomplete.
  const markAsInComplete = useMutation({
    mutationFn: (ticketId: number) => {
      return fetch(`/api/tickets/${ticketId}/complete`, { method: 'DELETE' });
    },
    onMutate: async (ticketId: number) => {
      // Cancel any outgoing refetches for tickets
      await queryClient.cancelQueries({ queryKey: [QueryKeys.Tickets] });
      // Get the current ticket list from the cache
      const previousTickets = queryClient.getQueryData<Ticket[]>([
        QueryKeys.Tickets,
      ]);
      // Optimistically update the cache with the ticket marked as incomplete
      if (previousTickets) {
        queryClient.setQueryData<Ticket[]>([QueryKeys.Tickets], (oldTickets) =>
          oldTickets?.map((ticket) =>
            ticket.id === ticketId ? { ...ticket, completed: false } : ticket
          )
        );
      }
      // Return context with previous tickets in case of rollback
      return { previousTickets };
    },
    onError: (error, ticketId, context: any) => {
      // Rollback to the previous state if the mutation fails
      queryClient.setQueryData([QueryKeys.Tickets], context.previousTickets);
    },
    onSettled: () => {
      // Refetch the ticket list to sync with server
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Tickets] });
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
        <Column key={column.id} props={column} isFetching={isFetching} />
      ))}
    </DragDropContext>
  );
}
