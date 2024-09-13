import { Check, CirclePause } from 'lucide-react';

export function TodoHeader({ total }: { total: number }) {
  return (
    <div className="w-full md:sticky md:top-0 bg-transparent flex gap-3 items-center">
      <div className="px-4 flex items-center gap-2 rounded-xl py-2 bg-[#E8E8E8]">
        <CirclePause size={16} />
        <p className="text-[#121212] text-xs font-semibold">ToDo</p>
      </div>
      <p className="w-8 h-8 text-xs font-semibold flex items-center justify-center rounded-full bg-[#E8E8E8]">
        {total}
      </p>
    </div>
  );
}

export function CompletedHeader({ total }: { total: number }) {
  return (
    <div className="w-full md:sticky md:top-0 bg-transparent flex gap-3 items-center">
      <div className="px-4 flex items-center gap-2 rounded-xl py-2 bg-[#CAF0B9]">
        <div className="p-1 rounded-full text-white bg-[#6FC349]">
          <Check className="stroke-2" size={10} />
        </div>
        <p className="text-[#121212] text-xs font-semibold">Done</p>
      </div>
      <p className="w-8 h-8 text-xs font-semibold flex items-center justify-center rounded-full bg-[#CAF0B9]">
        {total}
      </p>
    </div>
  );
}
