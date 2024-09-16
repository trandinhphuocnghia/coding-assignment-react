import { Ticket } from '@acme/shared-models';
import Input from 'client/src/components/Input';
import { useTickets } from 'client/src/hook/useTickets';
import { cn } from 'client/src/lib/util';
import { IColumn } from 'client/src/types';
import { SearchIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Board from './Board';
import CreateTicket from './modal/CreateTicket';

export function Tickets() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  const { data, isFetching, isLoading } = useTickets();
  const [searchTerm, setSearchTerm] = useState('');
  const [columns, setColumns] = useState<{
    [key: string]: IColumn;
  }>({
    todo: {
      id: 'todo',
      title: 'Todo',
      tickets: [] as Ticket[],
      className: 'bg-[#F5F5F5]',
      total: 0,
    } as IColumn,
    completed: {
      id: 'completed',
      title: 'Done',
      tickets: [] as Ticket[],
      className: 'bg-[#EDF9E8]',
      total: 0,
    } as IColumn,
  });

  // Helper to filter tickets
  const filterTickets = (tickets: Ticket[], isCompleted: boolean) =>
    tickets.filter((ticket) => ticket.completed === isCompleted);
  // Helper to filter tickets by assigneeId if userId is provided
  const filterByAssignee = (tickets: Ticket[], userId: string | null) =>
    userId
      ? tickets.filter((ticket) => ticket.assigneeId === Number(userId))
      : tickets;
  // Helper to filter tickets by search term (autocomplete)
  const filterBySearchTerm = (tickets: Ticket[], searchTerm: string) =>
    tickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    if (!isFetching && data) {
      const todoTickets = filterTickets(data, false);
      const completedTickets = filterTickets(data, true);
      setColumns((prev) => ({
        ...prev,
        todo: {
          ...prev['todo'],
          tickets: filterByAssignee(todoTickets, userId),
          total: filterByAssignee(todoTickets, userId).length,
        },
        completed: {
          ...prev['completed'],
          tickets: filterByAssignee(completedTickets, userId),
          total: filterByAssignee(completedTickets, userId).length,
        },
      }));
    }
  }, [isFetching, data, userId]);

  // Filter tickets based on search term
  const filteredColumns = useMemo(() => {
    return {
      todo: {
        ...columns['todo'],
        tickets: filterBySearchTerm(columns['todo'].tickets, searchTerm),
        total: filterBySearchTerm(columns['todo'].tickets, searchTerm).length,
      },
      completed: {
        ...columns['completed'],
        tickets: filterBySearchTerm(columns['completed'].tickets, searchTerm),
        total: filterBySearchTerm(columns['completed'].tickets, searchTerm)
          .length,
      },
    };
  }, [columns, searchTerm]);

  const totalTicket = useMemo(() => {
    return filteredColumns['todo'].total + filteredColumns['completed'].total;
  }, [filteredColumns]);
  const progress = useMemo(() => {
    return (filteredColumns['completed'].total / totalTicket) * 100;
  }, [filteredColumns['completed'].total, totalTicket]);

  return (
    <div className="w-full flex flex-col gap-6 relative p-3 lg:px-7">
      <div className="w-full rounded-2xl p-3 bg-[#FAFAFA] sticky top-3 z-10 flex gap-4 flex-col md:flex-row items-center">
        <div className="w-full flex items-center gap-6">
          <Input
            rootclassname="w-full !max-w-[343px] text-[#787486] max-w-md rounded-lg hover:outline transition-all hover:outline-[#7784EE] text-xs flex items-center px-4 py-2 justify-center bg-white gap-3"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            inputclassname="border-none bg-transparent outline-none"
            endAdornment={<SearchIcon size={16} />}
          />
        </div>
        <div className=" w-full md:max-w-40 py-2 rounded-2xl gap-2">
          <div className="w-full flex items-center justify-between">
            <p className="text-[10px]">Task progress</p>
            <p className="text-[10px]">
              <span>{filteredColumns['completed'].total}</span>/{totalTicket}
            </p>
          </div>
          <div className="w-full  bg-white rounded-3xl h-2 ">
            <div
              style={{
                width: `${progress}%`,
              }}
              className={cn([`bg-[#7784EE] h-2 rounded-3xl`])}
            ></div>
          </div>
        </div>
        <CreateTicket />
      </div>
      <div className="w-full relative flex flex-col md:flex-row gap-6">
        <Board
          isFetching={isLoading}
          columns={filteredColumns}
          setColumns={(columns) => setColumns(columns)}
        />
      </div>
    </div>
  );
}

export default Tickets;
