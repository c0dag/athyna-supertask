import type { Company } from './company'
import type { PaginationType } from './paginations'
import { JobStatus } from './JobStatus'
import { JobType } from './JobType'

export interface Job {
  id: string;
  title: string;
  description: string;
  skills: string[];
  location: string;
  salary: string;
  type: JobType;
  createdAt: string;
  updatedAt: string;
  status: JobStatus;
  isRemote: boolean;
  isApplied: boolean;
  companyId: string;
  company: Company;
}

export { JobStatus, JobType };

export interface JobsResponse {
  jobs: Job[];
  pagination: PaginationType;
}

export interface CreateJobData {
  title: string;
  description: string;
  location?: string;
  salary?: number;
  type: string;
  skills: string[];
  companyId: string;
  isRemote?: boolean;
}