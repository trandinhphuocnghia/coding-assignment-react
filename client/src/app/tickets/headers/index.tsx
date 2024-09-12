import { Check, CirclePause } from 'lucide-react';

export function TodoHeader() {
  return (
    <div className="w-full flex gap-3 items-center">
      <div className="px-4 flex items-center gap-2 rounded-xl py-2 bg-[#E8E8E8]">
        <CirclePause size={12} />
        <p className="text-[#121212] text-xs font-semibold">ToDo</p>
      </div>
    </div>
  );
}

export function CompletedHeader() {
  return (
    <div className="w-full flex gap-3 items-center">
      <div className="px-4 flex items-center gap-2 rounded-xl py-2 bg-[#CAF0B9]">
        <Check size={16} />
        <p className="text-[#121212] text-xs font-semibold">Done</p>
      </div>
    </div>
  );
}
