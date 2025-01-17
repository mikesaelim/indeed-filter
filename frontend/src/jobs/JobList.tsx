import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import "./JobList.css";
import EditCompanyButton from "../components/EditCompanyButton";
import NotesPopover from "../components/NotesPopover";
import TimeAgo from "../components/TimeAgo";
import { Job, JobCompany } from "../lib/Api";

type JobListProps = {
  jobs: Job[];
  companies: JobCompany[];
  editCompany: (company: JobCompany) => void;
};

function JobList(props: JobListProps) {
  const companyMap: Map<string, JobCompany> = new Map(props.companies.map(c => [c.name, c]));

  return (
    <div className="jobs my-2 mx-auto">
      <Row xs={1} md={2} className="g-4">
        {
          props.jobs.map(job => {
            const company: JobCompany | undefined = companyMap.get(job.company);
            return (
              <Col key={job.jobkey}>
                <JobCard
                  job={job}
                  company={company}
                  editCompany={() => {
                    if (company) {
                      props.editCompany(company);
                    } else {
                      console.log(`Error: Cannot find JobCompany with name ${job.company}!`);
                    }
                  }}
                />
              </Col>
            );
          })
        }
      </Row>
    </div>
  );
}

type JobCardProps = {
  job: Job;
  company?: JobCompany;
  editCompany: () => void;
}

function JobCard(props: JobCardProps) {
  const j = props.job;

  return (
    <Card className={`h-100 ${j.hidden && "opacity-25"}`} data-testid={`card-${j.jobkey}`}>
      <Card.Body>
        <Card.Title className="text-truncate">
          <a href={j.viewJobLink} target="_blank" rel="noreferrer">
            {j.title}
          </a>
        </Card.Title>
        <Card.Subtitle className="text-truncate">
          {j.company}
          {props.company?.notes &&
            <span className="px-2">
              <NotesPopover notes={props.company.notes} />
            </span>
          }
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" gap={3}>
          <div>
            <small className="text-muted">
              Posted <TimeAgo dateTime={j.pubDate} />
            </small>
          </div>
          <div className="ms-auto">
            <EditCompanyButton
              onClick={props.editCompany}
              disabled={j.hidden || false}
              testid={`edit-job-${j.jobkey}`}
            />
          </div>
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default JobList;
