export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  createdAt: string;
  updatedAt: string;
  job: {
    id: string;
    title: string;
    createdAt: string;
    company: {
      name: string;
    };
  };
  candidate: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ApplicationsResponse {
  applications: Application[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
