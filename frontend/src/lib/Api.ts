import { createContext } from "react";

import MockApi from "./MockApi";

export interface Job {
  jobkey: string;
  title: string;
  company: string;
  companyIdEncrypted?: string | null;
  viewJobLink: string;
  expired?: boolean | null;
  pubDate: string;
  jobLocationCity?: string | null;
  jobLocationState?: string | null;
  jobLocationPostal?: string | null;
  jobLocationExtras?: string | null;
  formattedLocation?: string | null;
  formattedRelativeTime?: string | null;
  snippet?: string | null;
  hidden?: boolean;
}

export interface JobListResponse {
  totalCount: number;
  jobs: Job[];
}

export interface JobCompany {
  name: string;
  jobCount: number;
  hidden: boolean;
}

export interface Company {
  id: number;
  name: string;
  notes: string | null;
  hidden: boolean;
}

export interface Api {
  listJobs: () => Promise<JobListResponse>;
  listJobCompanies: () => Promise<JobCompany[]>;
  listCompanies: () => Promise<Company[]>;
  hideCompany: (name: string) => Promise<Company>;
  unhideCompany: (id: number) => Promise<void>;
}

export const ApiContext = createContext<Api>(MockApi);
