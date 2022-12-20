import { useEffect, useState } from "react";
import "./App.css";

import Api from "./lib/Api";
import JobList from "./JobList";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO: loading overlay
    Api.listJobs().then(results => setJobs(results));
  }, []);

  return (
    <div className="App">
      <div className="content mx-auto">
        <div className="m-4 text-center">insert header here</div>
        <JobList jobs={jobs} />
      </div>
    </div>
  );
}

export default App;
