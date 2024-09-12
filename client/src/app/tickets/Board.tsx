import { IColumn } from 'client/src/types';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { CompletedHeader, TodoHeader } from './headers';

const fakeColumns: IColumn[] = [
  {
    header: <TodoHeader />,
    tickets: [],
    id: 'todo',
    className: 'bg-[#F5F5F5]',
  },
  {
    header: <CompletedHeader />,
    tickets: [],
    id: 'Complete',
    className: 'bg-[#EDF9E8]',
  },
];

export default function Board() {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full flex flex-col md:flex-row gap-4">
        {fakeColumns.map((column) => (
          <Column key={column.id} {...column} />
        ))}
      </div>
    </DragDropContext>
  );
}
