import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import {
  ChevronDown,
  CircleDashed,
  Eye,
  ListFilter,
  SearchIcon,
  SquareCheckBig,
  Target,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import useUsers from '../hook/useUser';
import Button from './Button';
import Input from './Input';

export default function Navbar() {
  const [params, setParams] = useSearchParams();
  const { data: users } = useUsers();

  return (
    <div className="m-auto border-b border-[#DBDBDB] w-full p-4 lg:p-7 py-5 flex flex-col gap-4 bg-white">
      <div className="w-full flex justify-between items-center gap-6">
        <h1 className="text-lg text-[#2D2D2D] flex gap-2 font-bold">
          <span className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold text-[#FFF] bg-[#7784EE]">
            T
          </span>
          Tickets
        </h1>
        <Dropdown>
          <MenuButton className="w-full group text-[#0D062D] hover:text-[#5030E5] max-w-[180px] flex hover:opacity-[0.8] transition-all items-center  rounded-lg p-2 gap-3">
            <p className="flex flex-col text-base text-end">
              {params.get('userId') || 'General'}
              <span className="text-xs group-hover:text-[#5030E5] text-[#787486]">
                Members: {users?.length}
              </span>
            </p>
            <ChevronDown className="mr-0 ml-auto " size={16} />
          </MenuButton>
          <Menu className="bg-white p-3 rounded-lg shadow-[0px_5px_15px_0px_rgba(119,132,238,0.30)]">
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
                  <p className="text-xs">{user.name}</p>
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
      </div>

      <div className="w-full flex items-center justify-between gap-6">
        <Input
          rootclassname="w-full text-[#787486] max-w-md rounded-lg hover:outline transition-all hover:outline-[#7784EE] text-xs flex items-center px-7 py-3 justify-center bg-[#F5F5F5] gap-3"
          placeholder="Search"
          inputclassname="border-none bg-transparent outline-none"
          endAdornment={<SearchIcon size={16} />}
        />
        <Dropdown>
          <MenuButton className="flex border-[#787486] text-[#787486] w-full max-w-[180px] hover:opacity-[0.8] transition-all items-center border hover:text-[#7784EE] hover:outline hover:outline-[#7784EE] rounded-lg px-7 py-3 gap-3">
            <ListFilter size={16} />
            <p className="text-xs font-semibold">Status</p>
          </MenuButton>
          <Menu className="bg-white p-3 flex flex-col gap-2 rounded-lg shadow-[0px_5px_15px_0px_rgba(119,132,238,0.30)]">
            <MenuItem>
              <Button className="p-2 w-full border-none">
                <CircleDashed size={16} />
                <p className="text-xs">Todo</p>
              </Button>
            </MenuItem>
            <MenuItem>
              <Button className="p-2 w-full border-none">
                <SquareCheckBig size={16} />
                <p className="text-xs">Completed</p>
              </Button>
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
}
