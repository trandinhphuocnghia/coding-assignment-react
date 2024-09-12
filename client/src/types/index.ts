import { ButtonProps, InputProps } from '@mui/base';
import { ReactNode } from 'react';
import { Ticket } from '@acme/shared-models';
import { DraggableProps, DroppableProps } from 'react-beautiful-dnd';

export type TInput = InputProps & {
  rootclassname?: string;
  inputclassname?: string;
};

export type TButton = ButtonProps & {
  variant?: 'primary' | 'secondary';
};

export interface IColumn {
  header: ReactNode;
  tickets: Ticket[];
  className?: string;
  id: string;
}

export interface IDrop extends Omit<DroppableProps, 'children'> {
  children: ReactNode;
  className?: string;
}

export interface IDrag extends Omit<DraggableProps, 'children'> {
  children: ReactNode;
}
