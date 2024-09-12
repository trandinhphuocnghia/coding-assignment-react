import Button from 'client/src/components/Button';
import { cn } from 'client/src/lib/util';
import { ITicket } from 'client/src/types';
import { Maximize2 } from 'lucide-react';

export default function Ticket(props: ITicket) {
  return (
    <div
      className={cn([
        'w-full flex flex-col gap-3 min-h-[150px] rounded-xl bg-[#FFFFFF] p-4',
        props.className,
      ])}
    >
      <Button className="p-2 text-[#121212] border-none mr-0 ml-auto">
        <Maximize2 size={12} />
      </Button>
      <p className="text-[#121212] text-xs">{props.description}</p>
      {/**assignee list */}
    </div>
  );
}
