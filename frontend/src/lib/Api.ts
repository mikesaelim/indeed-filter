import { createContext } from "react";

export interface Job {
  jobkey: string;
  title: string;
  company: string;
  companyIdEncrypted: string;
  viewJobLink: string;
  expired: boolean;
  pubDate: string;
  jobLocationCity: string;
  jobLocationState: string;
  jobLocationPostal: string;
  jobLocationExtras: string;
  formattedLocation: string;
  formattedRelativeTime: string;
  snippet: string;
}

export interface JobListResponse {
  totalCount: number;
  jobs: Job[];
}

export interface Company {
  name: string;
  jobCount: number;
  hidden: boolean;
}

export interface HiddenCompany {
  id: number;
  name: string;
}

export interface Api {
  listJobs: () => Promise<JobListResponse>;
  listCompanies: () => Promise<Company[]>;
  listHiddenCompanies: () => Promise<HiddenCompany[]>;
  hideCompany: (name: string) => Promise<HiddenCompany>;
  unhideCompany: (id: number) => Promise<void>;
}

export const ApiContext = createContext(null);
