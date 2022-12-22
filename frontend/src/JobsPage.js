import { useEffect, useState } from "react";

import Api from "./lib/Api";
import JobList from "./JobList";

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO: loading overlay?
    Api.listJobs()
      .then(results => setJobs(results))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="JobsPage">
      <div className="m-4 text-center">insert header here</div>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobsPage;
