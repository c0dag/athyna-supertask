export const JobStatus = {
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  DRAFT: 'DRAFT',
  ARCHIVED: 'ARCHIVED',
} as const;

export type JobStatus = typeof JobStatus[keyof typeof JobStatus];
