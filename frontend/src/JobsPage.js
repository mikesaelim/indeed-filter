import { useEffect, useState } from "react";

import Api from "./lib/Api";
import JobList from "./JobList";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [totalJobCount, setTotalJobCount] = useState(null);

  useEffect(() => {
    // TODO: loading overlay?
    Api.listJobs()
      .then(results => {
        setJobs(results.jobs);
        setTotalJobCount(results.totalCount);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="JobsPage">
      <div className="m-4">
        <h4>Showing {jobs.length} of {totalJobCount} jobs...</h4>
      </div>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobsPage;
