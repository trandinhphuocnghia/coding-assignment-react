import { cn } from 'client/src/lib/util';
import { IColumn } from 'client/src/types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Ticket from './Ticket';
import { CompletedHeader, TodoHeader } from './headers';

export default function Column(props: IColumn) {
  return (
    <div
      className={cn([
        'w-full max-w-[375px] rounded-2xl p-5 flex flex-col gap-5 h-fit',
        props.className,
      ])}
    >
      {props.id == 'todo' && <TodoHeader />}
      {props.id == 'completed' && <CompletedHeader />}
      <Droppable type="COLUMN" droppableId={props.id} key={props.id}>
        {(provided) => (
          <div
            className="w-full h-[calc(100%-32px)] min-h-[92px] flex flex-col gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tickets.map((ticket, index) => (
              <Draggable
                key={ticket.id.toString()}
                draggableId={ticket.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Ticket {...ticket} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
