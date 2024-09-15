import { Ticket } from '@acme/shared-models';
import { TextareaAutosize } from '@mui/base';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'client/src/components/Button';
import Modal from 'client/src/components/Modal';
import { cn } from 'client/src/lib/util';
import { Plus, Tag, X } from 'lucide-react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export default function CreateTicket() {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partial<Ticket>>({});

  const queryClient = useQueryClient();
  const createTicket = useMutation({
    mutationFn: (newTicket: Partial<Ticket>) => {
      return fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTicket }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tickets'] });
    },
  });

  const onSubmit: SubmitHandler<Partial<Ticket>> = (data) => {
    createTicket.mutateAsync(data).then(() => {
      reset({
        description: '',
      });
      setOpen(false);
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="primary"
        className="bg-[#7784EE] mr-0 ml-auto rounded-lg border text-white text-xs px-4 py-2 font-semibold"
      >
        <Plus size={16} />
        <p>Create</p>
      </Button>

      <Modal
        className="w-full rounded-2xl max-w-[400px]"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="w-full z-20  gap-4 flex flex-col">
          <div className="w-full flex items-center">
            <Tag fill="#C4CAD3" stroke="#FFF" size={20} />
            <Button
              disabled={createTicket.isPending}
              onClick={() => {
                reset();
                setOpen(false);
              }}
              className="w-fit border-none p-2 ml-auto mr-0"
            >
              <X size={16} />
            </Button>
          </div>
          <h2 className="font-semibold">Create new ticket</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full gap-4 flex flex-col"
          >
            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'The description field is mandatory',
                },
                minLength: {
                  value: 7,
                  message: 'Please enter a minimum of 7 characters',
                },
                maxLength: {
                  value: 500,
                  message: 'Please enter a maximum of 500 characters.',
                },
                pattern: {
                  value: /\S/,
                  message: 'Wrong text format',
                },
              }}
              render={({ field }) => (
                <>
                  <TextareaAutosize
                    {...field}
                    minRows={5}
                    maxRows={10}
                    className={cn(
                      'rounded-xl border border-[#7784EE] outline-none p-5 shadow-[0px_5px_15px_0px_rgba(119,132,238,0.30)] overflow-hidden text-xs',
                      { 'border-[#F85640]': !!errors.description?.message }
                    )}
                    placeholder="What is the task?"
                  />
                  <p className="text-xs text-[#F85640]">
                    {errors?.description?.message}
                  </p>
                </>
              )}
            />
            {/* <Button
              type="button"
              className="w-full text-[#C4CAD3] group px-0 !hover:outline-none flex items-center gap-5 border-none"
            >
              <UserPlus
                fill="#C4CAD3"
                stroke="#C4CAD3"
                className="group-hover:fill-[#7784EE] group-hover:stroke-[#7784EE]"
                size={16}
              />
              <p className=" text-start flex-1 text-xs">Assign ticket to</p>
              <ChevronDown size={16} />
            </Button> */}
            <Button
              loading={createTicket.isPending}
              disabled={createTicket.isPending}
              type="submit"
              variant="primary"
              className="justify-center"
            >
              <p className="text-xs font-semibold">Done</p>
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
