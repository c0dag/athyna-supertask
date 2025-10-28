export const FilterVariant = {
  JOBS: 'jobs',
  APPLICATIONS: 'applications',
} as const;

export type FilterVariant = typeof FilterVariant[keyof typeof FilterVariant];
