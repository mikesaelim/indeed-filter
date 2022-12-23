const Api = {
  listJobs: async () => {
    return fetch("/api/jobs")
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
        return response.json();
      });
  },
  listHiddenCompanies: async () => {
    return fetch("/api/hidden-companies")
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
        return response.json();
      });
  },
  hideCompany: async (name) => {
    return fetch("/api/hidden-companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "name": name }),
    }).then(response => {
      if (!response.ok) {
        throw new Error("Response was " + response.status);
      }
      return response.json();
    });
  },
  unhideCompany: async (id) => {
    return fetch("/api/hidden-companies/" + id, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw new Error("Response was " + response.status);
        }
      });
  }
};

export default Api;
