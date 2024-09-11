import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import {
  CircleDashed,
  Eye,
  ListFilter,
  SearchIcon,
  SquareCheckBig,
  Target,
  ViewIcon,
} from 'lucide-react';
import Input from './Input';
import Button from './Button';
import { useParams } from 'react-router-dom';

export default function Navbar() {
  const { userId } = useParams();
  return (
    <div className="w-full p-4 lg:p-7 flex flex-col gap-6 bg-white">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl text-[#2D2D2D] font-semibold">Tickets</h1>
        <Dropdown>
          <MenuButton className="flex hover:opacity-[0.8] transition-all items-center border border-[#F5F5F7] hover:text-[#7784EE] hover:outline hover:outline-[#7784EE] rounded-lg px-7 py-3 gap-3">
            <ViewIcon size={16} />
            <p className="text-xs font-semibold">All</p>
          </MenuButton>
          <Menu className="bg-white p-3 rounded-lg shadow-[0px_5px_15px_0px_rgba(119,132,238,0.30)]"></Menu>
        </Dropdown>
      </div>

      <div className="w-full flex items-center justify-between">
        <Input
          rootclassname="w-fit rounded-lg hover:outline transition-all hover:outline-[#7784EE] text-xs flex items-center border-[#F5F5F7] px-7 py-3 justify-center border gap-3"
          placeholder="Search"
          inputclassname="border-none outline-none"
          endAdornment={<SearchIcon size={16} />}
        />
        <Dropdown>
          <MenuButton className="flex hover:opacity-[0.8] transition-all items-center border border-[#F5F5F7] hover:text-[#7784EE] hover:outline hover:outline-[#7784EE] rounded-lg px-7 py-3 gap-3">
            <ListFilter size={16} />
            <p className="text-xs font-semibold">Status</p>
          </MenuButton>
          <Menu className="bg-white p-3 flex flex-col gap-2 rounded-lg shadow-[0px_5px_15px_0px_rgba(119,132,238,0.30)]">
            {userId && (
              <>
                <MenuItem>
                  <Button className="p-2 w-full border-none">
                    <Eye size={16} />
                    <p className="text-xs">New</p>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button className="p-2 w-full border-none">
                    <Target size={16} />
                    <p className="text-xs">Assigned</p>
                  </Button>
                </MenuItem>
              </>
            )}
            <MenuItem>
              <Button className="p-2 w-full border-none">
                <CircleDashed size={16} />
                <p className="text-xs">Incomplete</p>
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
