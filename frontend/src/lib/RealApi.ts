import { Company, CompanyData, JobCompany, JobListResponse } from "./Api";

const RealApi = {
  listJobs: async (): Promise<JobListResponse> => {
    return fetch("/api/jobs")
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
        return response.json();
      });
  },
  listJobCompanies: async (): Promise<JobCompany[]> => {
    return fetch("/api/jobs/companies")
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
        return response.json();
      });
  },
  listCompanies: async (): Promise<Company[]> => {
    return fetch("/api/companies")
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
        return response.json();
      });
  },
  createCompany: async (company: CompanyData): Promise<Company> => {
    return fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(company),
    }).then(response => {
      if (!response.ok) {
        throw new Error("Response was " + response.status);
      }
      return response.json();
    });
  },
  updateCompany: async (id: number, company: CompanyData): Promise<Company> => {
    return fetch("/api/companies/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(company),
    }).then(response => {
      if (!response.ok) {
        throw new Error("Response was " + response.status);
      }
      return response.json();
    });
  },
  deleteCompany: async (id: number): Promise<void> => {
    return fetch("/api/companies/" + id, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
      });
  },
};

export default RealApi;
