import { TextareaAutosize } from '@mui/base';
import Button from 'client/src/components/Button';
import Modal from 'client/src/components/Modal';
import { ChevronDown, Tag, UserPlus, X } from 'lucide-react';
import { ReactNode, useState } from 'react';

export default function CreateTicket() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      className="w-full rounded-2xl max-w-[400px]"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="w-full gap-4 flex flex-col">
        <div className="w-full flex items-center">
          <Tag fill="#C4CAD3" stroke="#FFF" size={20} />
          <Button
            onClick={() => setOpen(false)}
            className="w-fit border-none p-2 ml-auto mr-0"
          >
            <X size={16} />
          </Button>
        </div>
        <h2 className="font-semibold">Create new ticket</h2>
        <TextareaAutosize
          minRows={5}
          maxRows={10}
          className="rounded-xl border border-[#7784EE] outline-none p-5
          shadow-[0px_5px_15px_0px_rgba(119,132,238,0.30)]
          overflow-hidden
          text-xs"
          placeholder="What is the task?"
        />
        <Button className="w-full text-[#C4CAD3] group px-0 !hover:outline-none flex items-center gap-5 border-none">
          <UserPlus
            fill="#C4CAD3"
            stroke="#C4CAD3"
            className="group-hover:fill-[#7784EE] group-hover:stroke-[#7784EE]"
            size={16}
          />
          <p className=" text-start flex-1 text-xs">Assign ticket to</p>
          <ChevronDown size={16} />
        </Button>
        <Button variant="primary">
          <p className="text-xs m-auto font-semibold">Done</p>
        </Button>
      </div>
    </Modal>
  );
}
