import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import Board from './Board';
import CreateTicket from './modal/CreateTicket';
import {
  CircleDashed,
  ListFilter,
  SearchIcon,
  SquareCheckBig,
} from 'lucide-react';
import Button from 'client/src/components/Button';
import Input from 'client/src/components/Input';

export function Tickets() {
  return (
    <>
      <div className="w-full sticky top-3 z-10 flex gap-6 items-center">
        <div className="w-full flex items-center gap-6">
          <Input
            rootclassname="w-full  text-[#787486] max-w-md rounded-lg hover:outline transition-all hover:outline-[#7784EE] text-xs flex items-center px-7 py-3 justify-center bg-[#F5F5F5] gap-3"
            placeholder="Search"
            inputclassname="border-none bg-transparent outline-none"
            endAdornment={<SearchIcon size={16} />}
          />
          <Dropdown>
            <MenuButton className="flex bg-[#fff] border-[#787486] text-[#787486] w-fit max-w-[180px] hover:opacity-[0.8] transition-all items-center border hover:text-[#7784EE] hover:outline hover:outline-[#7784EE] rounded-lg p-3 gap-3">
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
        <CreateTicket />
      </div>
      <Board />
    </>
  );
}

export default Tickets;
