import type { JobsResponse, CreateJobData } from '@/types/job'
import type { PaginationType } from '@/types/paginations'
import type { Job } from "@/types/job"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const JOBS_QUERY_KEY = 'jobs';
const JOB_QUERY_KEY = 'job';

export interface GetJobsParams extends Partial<PaginationType> {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
}

export const useGetJobs = (params: GetJobsParams = {}) => {
  const { page, limit, search, type } = params;
  
  const searchParams = new URLSearchParams();
  if (page) searchParams.append('page', page.toString());
  if (limit) searchParams.append('limit', limit.toString());
  if (search) searchParams.append('search', search);
  if (type) searchParams.append('type', type);
  
  const queryString = searchParams.toString();
  const url = `${import.meta.env.VITE_API_URL}/jobs${queryString ? `?${queryString}` : ''}`;

  return useQuery({
    queryKey: [JOBS_QUERY_KEY, { params }],
    queryFn: async (): Promise<JobsResponse> => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      return response.json();
    },
  })
}

export const useGetJobById = (id?: string) => {
  const url = id ? `${import.meta.env.VITE_API_URL}/jobs/${id}` : undefined

  return useQuery<Job>({
    queryKey: [JOB_QUERY_KEY, id],
    queryFn: async (): Promise<Job> => {
      if (!url) throw new Error('No job id provided')

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Job not found')
      }

      return response.json()
    },
    enabled: !!id,
  })
}

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateJobData) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create job');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERY_KEY] });
    },
  });
};

