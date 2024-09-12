import Button from 'client/src/components/Button';
import { cn } from 'client/src/lib/util';
import { IColumn } from 'client/src/types';
import { Plus } from 'lucide-react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function Column(props: IColumn) {
  return (
    <div
      className={cn([
        'w-full max-w-[375px] rounded-2xl p-5 flex flex-col gap-5',
        props.className,
      ])}
    >
      {props.header}
      <Droppable droppableId={props.id} key={props.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.tickets.map((ticket, index) => (
              <Draggable
                key={ticket.id.toString()}
                draggableId={ticket.id.toString()}
                index={index}
              >
                {(provided: any) => <>{/**Tickets */}</>}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>

      <Button className="w-full px-4">
        <Plus size={12} />
        <p className="font-semibold text-xs">Add</p>
      </Button>
    </div>
  );
}
