import { useContext, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import { ApiContext, Company, Job } from "../lib/Api";
import CompanyList from "./CompanyList";
import JobList from "./JobList";

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobCount, setTotalJobCount] = useState<number | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const api = useContext(ApiContext);

  useEffect(() => {
    api.listJobs()
      .then(results => {
        setJobs(results.jobs);
        setTotalJobCount(results.totalCount);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    api.listCompanies()
      .then(results => setCompanies(results))
      .catch(err => console.log(err));
  }, [api]);

  function hideCompany(name: string) {
    const newJobs = jobs.map(job => (job.company === name) ? {...job, hidden: true} : job);
    setJobs(newJobs);
    const newCompanies = companies.map(c => (c.name === name) ? {...c, hidden: true} : c);
    setCompanies(newCompanies);

    api.hideCompany(name)
      .catch(err => console.log(err));
  }

  return (
    <div className="JobsPage">
      <div className="m-4">
        { loading && <h4>Loading jobs...</h4> }
        {
          !loading &&
            <h4>
              Showing {jobs.length} of {totalJobCount} jobs from&nbsp;
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" onClick={() => setShowSidePanel(true)}>{companies.length} companies</a>
            </h4>
        }
      </div>
      <JobList jobs={jobs} hideCompany={hideCompany} />

      <Offcanvas show={showSidePanel} onHide={() => setShowSidePanel(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Companies</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CompanyList
            companies={companies}
            hideCompany={hideCompany}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default JobsPage;
