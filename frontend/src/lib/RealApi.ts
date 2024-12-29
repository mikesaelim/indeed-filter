const RealApi = {
  listJobs: async () => {
    return fetch("/api/jobs")
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
        return response.json();
      });
  },
  listJobCompanies: async () => {
    return fetch("/api/jobs/companies")
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
        return response.json();
      });
  },
  listCompanies: async () => {
    return fetch("/api/companies")
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
        return response.json();
      });
  },
  hideCompany: async (name: string) => {
    return fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "name": name, "hidden": true }),
    }).then(response => {
      if (!response.ok) {
        throw new Error("Response was " + response.status);
      }
      return response.json();
    });
  },
  unhideCompany: async (id: number) => {
    return fetch("/api/companies/" + id, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
      });
  }
};

export default RealApi;
