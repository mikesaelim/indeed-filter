import { useState } from "react";
import Button from "react-bootstrap/Button";

import "./App.css";
import CompaniesPage from "./companies/CompaniesPage";
import JobsPage from "./jobs/JobsPage";

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
        { ROUTES[page].pageComponent }
      </div>
    </div>
  );
}

export default App;
