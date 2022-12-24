import { useContext, useEffect, useState } from "react";

import ApiContext from "../lib/ApiContext";
import JobList from "./JobList";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [totalJobCount, setTotalJobCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = useContext(ApiContext);

  useEffect(() => {
    api.listJobs()
      .then(results => {
        setJobs(results.jobs);
        setTotalJobCount(results.totalCount);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [api]);

  function hideCompany(name) {
    const newJobs = jobs.map(job => (job.company === name) ? {...job, hidden: true} : job);
    setJobs(newJobs);

    api.hideCompany(name)
      .catch(err => console.log(err));
  }

  return (
    <div className="JobsPage">
      <div className="m-4">
        { loading && <h4>Loading jobs...</h4> }
        { !loading && <h4>Showing {jobs.length} of {totalJobCount} jobs</h4> }
      </div>
      <JobList jobs={jobs} hideCompany={hideCompany} />
    </div>
  );
}

export default JobsPage;
