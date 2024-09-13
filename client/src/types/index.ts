import { Ticket } from '@acme/shared-models';
import { ButtonProps, InputProps, ModalProps } from '@mui/base';
import { ReactNode } from 'react';

export type TInput = InputProps & {
  rootclassname?: string;
  inputclassname?: string;
};
export type TModal = ModalProps & {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
};

export type TButton = ButtonProps & {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
};

export interface IColumn {
  header?: ReactNode;
  tickets: Ticket[];
  className?: string;
  id: 'todo' | 'completed';
}

export interface ITicket extends Ticket {
  className?: string;
}
