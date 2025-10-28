import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import type { ApplicationsResponse } from '@/types/application';
import type { PaginationType } from '@/types/paginations';

const APPLICATIONS_QUERY_KEY = 'applications';

export interface CreateApplicationData {
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface GetApplicationsParams extends Partial<PaginationType> {
  page?: number;
  limit?: number;
  search?: string;
}

export const useGetApplications = (params: GetApplicationsParams = {}) => {
  const { page, limit, search } = params;
  
  const searchParams = new URLSearchParams();
  if (page) searchParams.append('page', page.toString());
  if (limit) searchParams.append('limit', limit.toString());
  if (search) searchParams.append('search', search);
  
  const queryString = searchParams.toString();
  const url = `${import.meta.env.VITE_API_URL}/applications${queryString ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey: [APPLICATIONS_QUERY_KEY, { params }],
    queryFn: async (): Promise<ApplicationsResponse> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      return response.json();
    },
  });
};



export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateApplicationData) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create application');
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [APPLICATIONS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', variables.jobId] });
    },
  });
};


