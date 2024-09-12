import { useRoutes } from 'react-router-dom';

import routes from '../routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  const element = useRoutes(routes);
  return (
    <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
  );
};

export default App;
