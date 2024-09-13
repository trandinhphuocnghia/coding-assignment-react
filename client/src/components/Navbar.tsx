import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import { ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import useUsers from '../hook/useUser';
import Button from './Button';
import { getFirstCharacter } from '../lib/util';
import { useMemo } from 'react';

export default function Navbar() {
  const [params, setParams] = useSearchParams();
  const { data: users } = useUsers();

  const assigned = useMemo(() => {
    return (users ?? []).find(
      (user) => user.id == Number(params.get('userId'))
    );
  }, [params.get('userId')]);

  return (
    <div className="m-auto border-b border-[#DBDBDB] w-full p-3 lg:px-7 flex flex-col gap-4 bg-white">
      <div className="w-full flex justify-between items-center gap-6">
        <h1 className="text-lg text-[#2D2D2D] flex gap-2 font-bold">
          <span className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold text-[#FFF] bg-[#7784EE]">
            T
          </span>
          Tickets
        </h1>
        <Dropdown>
          <MenuButton className=" group text-[#0D062D] hover:text-[#5030E5] flex hover:opacity-[0.8] transition-all items-center  rounded-lg p-2 gap-3">
            <p className="flex flex-col text-xs font-semibold text-end">
              {assigned?.name || 'General'}
              <span className="font-normal group-hover:text-[#5030E5] text-[#787486]">
                Members: {users?.length}
              </span>
            </p>
            <ChevronDown className="mr-0 ml-auto " size={16} />
          </MenuButton>
          <Menu className="bg-white z-10 p-3 rounded-lg shadow-[0px_5px_15px_0px_rgba(119,132,238,0.30)]">
            {users?.map((user) => (
              <MenuItem
                onClick={() =>
                  setParams((params) => {
                    params.set('userId', user.id.toString());
                    return params;
                  })
                }
                key={user.id.toString()}
              >
                <Button className="p-2 w-full border-none">
                  <span className="w-6 z-[1] h-6 flex items-center justify-center rounded-full text-xs font-semibold text-[#FFF] bg-[#7784EE]">
                    {getFirstCharacter(user.name)}
                  </span>
                  <p className="text-xs">{user.name}</p>
                </Button>
              </MenuItem>
            ))}
            <MenuItem
              onClick={() =>
                setParams((params) => {
                  params.set('userId', '');
                  return params;
                })
              }
              key={'general'}
            >
              <Button className="p-2 w-full border-none">
                <p className="text-xs">General</p>
              </Button>
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
}
