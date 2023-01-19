import { useState } from "react";
import Button from "react-bootstrap/Button";

import "./App.css";
import CompaniesPage from "./companies/CompaniesPage";
import JobsPage from "./jobs/JobsPage";
import { Api, ApiContext } from "./lib/Api";
import MockApi from "./lib/MockApi";
import RealApi from "./lib/RealApi";

const API_CLIENT: Api = process.env.NODE_ENV === "production" ? RealApi : MockApi;

// React-router seems a little overkill for managing just two pages,
// but I may use it in the future.
const ROUTES = {
  "Jobs": {
    pageComponent: <JobsPage />,
    otherPage: "Companies"
  },
  "Companies": {
    pageComponent: <CompaniesPage />,
    otherPage: "Jobs"
  }
};

function App() {
  const [page, setPage] = useState("Jobs");
  const route = ROUTES[page as keyof typeof ROUTES];

  return (
    <div className="App">
      <div className="content mx-auto">
        <div className="m-2 text-end">
          <Button variant="outline-primary" size="sm" onClick={() => setPage(route.otherPage)}>
            { route.otherPage }
          </Button>
        </div>
        <ApiContext.Provider value={API_CLIENT}>
          { route.pageComponent }
        </ApiContext.Provider>
      </div>
    </div>
  );
}

export default App;
