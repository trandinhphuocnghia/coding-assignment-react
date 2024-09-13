import { cn } from 'client/src/lib/util';
import { IColumn } from 'client/src/types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Ticket from './Ticket';
import { CompletedHeader, TodoHeader } from './headers';

export default function Column(props: IColumn) {
  return (
    <Droppable droppableId={props.id} key={props.id}>
      {(provided) => (
        <div
          className={cn([
            'w-full max-w-[375px] h-full overflow-auto  rounded-2xl p-4 flex flex-col gap-5',
            props.className,
          ])}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {props.id == 'todo' && <TodoHeader total={props.total} />}
          {props.id == 'completed' && <CompletedHeader total={props.total} />}
          {props.tickets.map((ticket, index) => (
            <Draggable
              key={ticket.id.toString()}
              draggableId={ticket.id.toString()}
              index={index}
            >
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className=""
                  >
                    <Ticket {...ticket} />
                  </div>
                );
              }}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
