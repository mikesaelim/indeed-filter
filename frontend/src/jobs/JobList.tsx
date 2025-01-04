import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";

import "./JobList.css";
import {Job, JobCompany} from "../lib/Api";
import HideButton from "./HideButton";
import TimeAgo from "./TimeAgo";

type JobListProps = {
  jobs: Job[];
  companies: JobCompany[];
  hideCompany: (company: string) => void;
};

function JobList(props: JobListProps) {
  const companyMap: Map<string, JobCompany> = new Map(props.companies.map(c => [c.name, c]));

  return (
    <div className="jobs my-2 mx-auto">
      <Row xs={1} md={2} className="g-4">
        {
          props.jobs.map(job => (
            <Col key={job.jobkey}>
              <JobCard
                job={job}
                company={companyMap.get(job.company)}
                hideCompany={() => props.hideCompany(job.company)}
              />
            </Col>
          ))
        }
      </Row>
    </div>
  );
}

type JobCardProps = {
  job: Job;
  company?: JobCompany;
  hideCompany: () => void;
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
              <OverlayTrigger placement="right" overlay={<Tooltip>{props.company.notes}</Tooltip>}>
                <i className="bi bi-sticky-fill" style={{"color": "orange"}} />
              </OverlayTrigger>
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
            <HideButton
              onClick={props.hideCompany}
              disabled={j.hidden || false}
              testid={`hide-job-${j.jobkey}`}
            />
          </div>
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default JobList;
