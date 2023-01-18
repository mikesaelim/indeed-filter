import { useState } from "react";
import Button from "react-bootstrap/Button";

import "./App.css";
import CompaniesPage from "./companies/CompaniesPage";
import JobsPage from "./jobs/JobsPage";
import ApiContext from "./lib/ApiContext";
import MockApi from "./lib/MockApi";
import RealApi from "./lib/RealApi";

const API_CLIENT = process.env.NODE_ENV === "production" ? RealApi : MockApi;

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

  return (
    <div className="App">
      <div className="content mx-auto">
        <div className="m-2 text-end">
          <Button variant="outline-primary" size="sm" onClick={() => setPage(ROUTES[page].otherPage)}>
            { ROUTES[page].otherPage }
          </Button>
        </div>
        <ApiContext.Provider value={API_CLIENT}>
          { ROUTES[page].pageComponent }
        </ApiContext.Provider>
      </div>
    </div>
  );
}

export default App;
