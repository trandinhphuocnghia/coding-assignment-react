import { IColumn } from 'client/src/types';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { CompletedHeader, TodoHeader } from './headers';
import useTickets from 'client/src/hook/useTickets';

export default function Board() {
  const { columns, onDragEnd } = useTickets();

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <div className="w-full flex flex-col md:flex-row gap-4">
        {Object.values(columns).map((column) => (
          <Column key={column.id} {...column} />
        ))}
      </div>
    </DragDropContext>
  );
}
