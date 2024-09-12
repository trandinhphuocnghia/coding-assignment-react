import { Button as BaseButton } from '@mui/base';
import { TButton } from 'client/src/types';
import { cn } from '../lib/util';

export default function Button(props: TButton) {
  let variantClassName =
    'border border-[#F5F5F7] hover:text-[#7784EE] hover:outline hover:outline-[#7784EE] px-7 py-3 ';
  if (props.variant === 'primary') {
    variantClassName = '';
  }
  if (props.variant == 'secondary') {
    variantClassName = '';
  }

  return (
    <BaseButton
      {...props}
      className={cn([
        'flex hover:opacity-[0.8] transition-all rounded-lg gap-3 items-center',
        variantClassName,
        props.className,
      ])}
    >
      {props.children}
    </BaseButton>
  );
}
