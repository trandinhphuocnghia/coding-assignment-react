import Button from 'client/src/components/Button';
import { Plus } from 'lucide-react';
import Board from './Board';
import CreateTicket from './modal/CreateTicket';

export function Tickets() {
  return (
    <>
      <div className="w-full flex gap-6 flex-col">
        <div className="w-full flex items-center">
          <CreateTicket />
          <Button
            variant="primary"
            className="bg-[#7784EE] mr-0 ml-auto rounded-lg border text-white text-xs px-7 py-3 font-semibold"
          >
            <Plus size={16} />
            <p>Create</p>
          </Button>
        </div>
        <Board />
      </div>
    </>
  );
}

export default Tickets;
