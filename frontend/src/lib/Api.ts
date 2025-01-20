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
  id: number | null;
  notes: string | null;
  hidden: boolean;
}

export interface Company {
  id: number;
  name: string;
  notes: string | null;
  hidden: boolean;
}

export interface CompanyData {
  name?: string;
  notes?: string;
  hidden?: boolean;
}

export interface Run {
  id: number;
  completedAt: string;
  searchUrl: string;
  success: boolean;
}

export interface Api {
  listJobs: () => Promise<JobListResponse>;
  listJobCompanies: () => Promise<JobCompany[]>;
  listCompanies: () => Promise<Company[]>;
  createCompany: (company: CompanyData) => Promise<Company>;
  updateCompany: (id: number, company: CompanyData) => Promise<Company>;
  deleteCompany: (id: number) => Promise<void>;
  getLastRun: () => Promise<Run>;
}

export const ApiContext = createContext<Api>(MockApi);
