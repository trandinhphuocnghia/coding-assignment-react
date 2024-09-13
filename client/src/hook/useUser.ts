import { User } from '@acme/shared-models';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
  return useQuery({
    queryKey: ['/api/users'],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      const response = await fetch('/api/users').then();
      const data = await response.json();
      if (!!data) return data as User[];
      return [];
    },
  });
};

export default useUsers;
