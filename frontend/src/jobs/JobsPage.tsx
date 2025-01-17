import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";

import LastRunTooltip from "../components/LastRunTooltip";
import { ApiContext, Company, Job, JobCompany, Run } from "../lib/Api";
import CompanyList from "./CompanyList";
import CompanyModal from "./CompanyModal";
import JobList from "./JobList";

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobCount, setTotalJobCount] = useState<number | null>(null);
  const [companies, setCompanies] = useState<JobCompany[]>([]);
  const [lastRun, setLastRun] = useState<Run | null>(null);
  const [loading, setLoading] = useState(true);

  const [companyFilterQuery, setCompanyFilterQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [showSidePanel, setShowSidePanel] = useState(false);

  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companyModalTarget, setCompanyModalTarget] = useState<JobCompany | null>(null);

  const api = useContext(ApiContext);

  useEffect(() => {
    api.listJobs()
      .then(results => {
        setJobs(results.jobs);
        setTotalJobCount(results.totalCount);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    api.listJobCompanies()
      .then(results => setCompanies(results))
      .catch(err => console.log(err));
    api.getLastRun()
      .then(result => setLastRun(result))
      .catch(err => console.log(err));
  }, [api]);

  useEffect(() => {
    const lowercaseQuery = companyFilterQuery.toLowerCase();
    setFilteredJobs(jobs.filter(job => job.company.toLowerCase().includes(lowercaseQuery)));
  }, [jobs, companyFilterQuery]);

  function updateCompany(company: Company) {
    const newCompanies = companies.map(c => (c.name === company.name) ?
      {...c, id: company.id, notes: company.notes, hidden: company.hidden} : c);
    setCompanies(newCompanies);
    if (company.hidden) {
      const newJobs = jobs.map(job => (job.company === company.name) ? { ...job, hidden: true} : job);
      setJobs(newJobs);
    }
  }

  function focusCompany(name: string) {
    setCompanyFilterQuery(name);
    setShowSidePanel(false);
  }

  function openCompanyModal(company: JobCompany) {
    setCompanyModalTarget(company);
    setShowCompanyModal(true);
  }

  function closeCompanyModal() {
    setShowCompanyModal(false);
    setCompanyModalTarget(null);
  }

  return (
    <div className="JobsPage">
      <div className="m-4">
        <Row>
          <Col xs={9}>
            { loading && <h4>Loading jobs...</h4> }
            {
              !loading &&
              <h4>
                Showing {jobs.length} of {totalJobCount} jobs from&nbsp;
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" onClick={() => setShowSidePanel(true)}>{companies.length} companies</a>
                <span className="px-3">
                  <LastRunTooltip lastRun={lastRun} />
                </span>
              </h4>
            }
          </Col>
          <Col xs={3}>
            <Form.Control
              type="search"
              value={companyFilterQuery}
              onChange={event => setCompanyFilterQuery(event.target.value)}
              placeholder="filter by company"
              size="sm"
            />
          </Col>
        </Row>
      </div>

      <JobList jobs={filteredJobs} companies={companies} editCompany={openCompanyModal} />

      <Offcanvas show={showSidePanel} onHide={() => setShowSidePanel(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Companies</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CompanyList
            companies={companies}
            editCompany={openCompanyModal}
            focusCompany={focusCompany}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <CompanyModal
        show={showCompanyModal}
        company={companyModalTarget}
        updateCompany={updateCompany}
        close={closeCompanyModal}
      />
    </div>
  );
}

export default JobsPage;
