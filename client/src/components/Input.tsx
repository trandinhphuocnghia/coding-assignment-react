import {
  Input as BaseInput,
  InputOwnerState,
  InputRootSlotPropsOverrides,
  SlotComponentProps,
} from '@mui/base';
import { TInput } from '../types';
import { cn } from '../lib/util';

/*
 * Component: Input.
 * Description: It's a custom input component based on the MUI/Base Input, easy to extend styling.
 */
export default function Input(props: TInput) {
  const slotProps = {
    root: (): SlotComponentProps<
      'div',
      InputRootSlotPropsOverrides,
      InputOwnerState
    > => ({ className: props.rootclassname }),
    input: (): SlotComponentProps<
      'input',
      InputRootSlotPropsOverrides,
      InputOwnerState
    > => ({ className: cn(['w-full', props.inputclassname]) }),
  };

  return <BaseInput {...props} slotProps={slotProps} />;
}
