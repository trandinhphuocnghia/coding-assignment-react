import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import Button from 'client/src/components/Button';
import useUsers from 'client/src/hook/useUser';
import { cn, getFirstCharacter } from 'client/src/lib/util';
import { ITicket } from 'client/src/types';
import { Maximize2, UserPlus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function Ticket(props: ITicket) {
  const { data: users } = useUsers();

  const assigned = useMemo(() => {
    if (!users || !props.assigneeId) return undefined;
    return users.find((user) => user.id == props.assigneeId);
  }, [props.assigneeId, users]);

  const queryClient = useQueryClient();
  const unAssignTicket = useMutation({
    mutationFn: (ticketId: string) => {
      return fetch(`/api/tickets/${ticketId}/unassign`, {
        method: 'PUT',
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['/api/tickets'] }),
  });
  const assignTicket = useMutation({
    mutationFn: ({
      ticketId,
      userId,
    }: {
      ticketId: string;
      userId: string;
    }) => {
      return fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
        method: 'PUT',
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['/api/tickets'] }),
  });

  return (
    <div
      className={cn([
        'w-full flex flex-col gap-2 rounded-xl bg-[#FFFFFF] p-4',
        props.className,
      ])}
    >
      <Button className="p-1 text-[#121212] border-none mr-0 ml-auto">
        <Maximize2 size={12} />
      </Button>
      <p className="text-[#121212] text-xs">{props.description}</p>
      <Dropdown>
        <MenuButton className="w-fit ml-auto mr-0">
          {!!assigned ? (
            <Button className="border-none !outline-none group gap-0 px-1 p-1 !w-fit flex justify-center items-center -space-x-2">
              <span className="w-6 z-[1] h-6 flex items-center justify-center rounded-full text-xs font-semibold text-[#FFF] bg-[#7784EE]">
                {getFirstCharacter(assigned.name)}
              </span>
              <div className=" rounded-full w-fit text-[#C4CAD3] p-1 group outline-dashed border-none hover:outline-dashed flex items-center gap-2">
                <UserPlus
                  fill="#C4CAD3"
                  stroke="#C4CAD3"
                  className="group-hover:fill-[#7784EE] group-hover:stroke-[#7784EE]"
                  size={13}
                />
              </div>
            </Button>
          ) : (
            <Button
              type="button"
              className="ml-auto  mr-0 rounded-full w-fit text-[#C4CAD3] p-2 group outline-dashed border-none hover:outline-dashed flex items-center gap-2"
            >
              <UserPlus
                fill="#C4CAD3"
                stroke="#C4CAD3"
                className="group-hover:fill-[#7784EE] group-hover:stroke-[#7784EE]"
                size={12}
              />
            </Button>
          )}
        </MenuButton>
        <Menu className="bg-white z-10 rounded-lg shadow-[0px_5px_15px_0px_rgba(119,132,238,0.30)]">
          {users?.map((user) => (
            <MenuItem
              onClick={() => {
                if (user.id == assigned?.id) {
                  unAssignTicket.mutate(props.id.toString());
                  return;
                }
                assignTicket.mutate({
                  ticketId: props.id.toString(),
                  userId: user.id.toString(),
                });
              }}
              key={user.id.toString()}
              className={cn('px-3 py-1', {
                'bg-[#F0F5FC]': user.id == assigned?.id,
              })}
            >
              <Button className="p-2 w-full border-none">
                <span className="w-6 z-[1] h-6 flex items-center justify-center rounded-full text-xs font-semibold text-[#FFF] bg-[#7784EE]">
                  {getFirstCharacter(user.name)}
                </span>
                <p className="text-xs">{user.name}</p>
              </Button>
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    </div>
  );
}
