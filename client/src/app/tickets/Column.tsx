import { cn } from 'client/src/lib/util';
import { IColumn } from 'client/src/types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Ticket from './Ticket';
import { CompletedHeader, TodoHeader } from './headers';

export default function Column({
  props,
  isFetching,
}: {
  props: IColumn;
  isFetching: boolean;
}) {
  return (
    <Droppable droppableId={props.id} key={props.id}>
      {(provided) => (
        <div
          className={cn([
            'w-full max-w-[375px] h-fit rounded-2xl p-4 flex flex-col gap-5',
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
          {isFetching ? (
            <div className="w-full flex flex-col gap-2 min-h-[92px] animate-pulse rounded-xl bg-slate-100 p-4"></div>
          ) : (
            !props.total && (
              <div className="w-full border-dashed flex flex-col gap-2 min-h-[92px] border border-[#DBDBDB] rounded-xl  p-4"></div>
            )
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
