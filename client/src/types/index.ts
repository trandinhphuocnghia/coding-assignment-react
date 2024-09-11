import { ButtonProps, InputProps } from '@mui/base';

export type TInput = InputProps & {
  rootclassname?: string;
  inputclassname?: string;
};

export type TButton = ButtonProps & {
  variant?: 'primary' | 'secondary';
};
