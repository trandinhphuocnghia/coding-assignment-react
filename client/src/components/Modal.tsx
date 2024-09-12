import { Modal as BaseModal } from '@mui/base';
import { TModal } from '../types';
import { cn } from '../lib/util';

export default function Modal(props: TModal) {
  return (
    <BaseModal open={props.open} onClose={props.onClose}>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div
          className={cn([
            'bg-white w-full p-4 rounded-lg shadow-[0px_30px_60px_0px_rgba(32,56,85,0.15)]',
            props.className,
          ])}
        >
          <div>{props.children}</div>
        </div>
      </div>
    </BaseModal>
  );
}
