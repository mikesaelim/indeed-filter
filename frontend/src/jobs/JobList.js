import { DateTime } from "luxon";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import "./JobList.css";
import HideButton from "./HideButton";

const TODAY = DateTime.local().startOf("day");
const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat();

function JobList(props) {
  return (
    <div className="jobs my-2 mx-auto">
      <Row xs={1} md={2} className="g-4">
        {
          props.jobs.map(job => (
            <Col key={job.jobkey}>
              <JobCard job={job} hideCompany={() => props.hideCompany(job.company)} />
            </Col>
          ))
        }
      </Row>
    </div>
  );
}

function JobCard(props) {
  const j = props.job;

  return (
    <Card className={`h-100 ${j.hidden && "opacity-25"}`} data-testid={`card-${j.jobkey}`}>
      <Card.Body>
        <Card.Title className="text-truncate">
          <a href={`https://www.indeed.com${j.viewJobLink}`} target="_blank" rel="noreferrer">
            {j.title}
          </a>
        </Card.Title>
        <Card.Subtitle className="text-truncate">{j.company}</Card.Subtitle>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" gap={3}>
          <div>
            <small className="text-muted">Posted {timeAgo(j.pubDate)}</small>
          </div>
          <div className="ms-auto">
            <HideButton
              onClick={props.hideCompany}
              disabled={j.hidden}
              testid={`hide-job-${j.jobkey}`}
            />
          </div>
        </Stack>
      </Card.Footer>
    </Card>
  );
}

function timeAgo(pubDate) {
  const days = DateTime.fromISO(pubDate).diff(TODAY, "days").days;
  if (days === 0) {
    return "today";
  } else if (days < -30) {
    return "30+ days ago";
  } else {
    return RELATIVE_TIME_FORMAT.format(days, "day");
  }
}

export default JobList;
