import Layout from '../layout';
import Tickets from '../app/tickets';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '', element: <Tickets /> }],
  },
];

export default routes;
