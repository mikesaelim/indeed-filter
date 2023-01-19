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

export const ApiContext = createContext<Api>(MockApi);
