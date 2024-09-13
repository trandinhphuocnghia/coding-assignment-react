import { Ticket } from '@acme/shared-models';
import { useQuery } from '@tanstack/react-query';

export const useTickets = () => {
  return useQuery({
    queryKey: ['/api/tickets'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      const response = await fetch('/api/tickets').then();
      const data = await response.json();
      if (!!data) return data as Ticket[];
      return [];
    },
  });
};
