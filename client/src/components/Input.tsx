import {
  Input as BaseInput,
  InputOwnerState,
  InputRootSlotPropsOverrides,
  SlotComponentProps,
} from '@mui/base';
import { TInput } from '../types';

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
    > => ({ className: props.inputclassname }),
  };

  return <BaseInput {...props} slotProps={slotProps} />;
}
