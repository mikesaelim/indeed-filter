import { DateTime } from "luxon";

import "./JobList.css";

const TODAY = DateTime.local().startOf("day");
const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat();

function JobList(props) {
  return (
    <div className="jobs my-2 mx-auto">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          props.jobs.map(job => {
            return (
              <div className="col" key={job.jobkey}>
                <JobCard job={job} />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

function JobCard(props) {
  const j = props.job;

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title text-truncate">
          <a href={`https://www.indeed.com${j.viewJobLink}`} target="_blank" rel="noreferrer">
            {j.title}
          </a>
        </h5>
        <h6 className="card-subtitle text-truncate">{j.company}</h6>
      </div>
      <div className="card-footer">
        <small className="text-muted">Posted {timeAgo(j.pubDate)}</small>
      </div>
    </div>
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
