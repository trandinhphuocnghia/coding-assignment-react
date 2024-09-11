import { useRoutes } from 'react-router-dom';

import routes from '../routes';

const App = () => {
  // const [tickets, setTickets] = useState([] as Ticket[]);
  // const [users, setUsers] = useState([] as User[]);

  // // Very basic way to synchronize state with server.
  // // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  // useEffect(() => {
  //   async function fetchTickets() {
  //     const data = await fetch('/api/tickets').then();
  //     setTickets(await data.json());
  //   }

  //   async function fetchUsers() {
  //     const data = await fetch('/api/users').then();
  //     setUsers(await data.json());
  //   }

  //   fetchTickets();
  //   fetchUsers();
  // }, []);

  const element = useRoutes(routes);
  return <>{element}</>;
};

export default App;
