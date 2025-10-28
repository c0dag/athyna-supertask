import { useQuery } from '@tanstack/react-query';
import type { Company } from '@/types/company';

export const useGetCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async (): Promise<Company[]> => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/companies`);
        if (!response.ok) {
          console.warn('Failed to fetch companies, returning empty array');
          return [];
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching companies:', error);
        return [];
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

