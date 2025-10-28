import { useQuery } from '@tanstack/react-query';
import type { Company } from '@/types/company';

const COMPANIES_QUERY_KEY = 'companies';

export const useGetCompanies = () => {
  return useQuery({
    queryKey: [COMPANIES_QUERY_KEY],
    queryFn: async (): Promise<Company[]> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/companies`);
      if (!response.ok) {
        return [];
      }
      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

