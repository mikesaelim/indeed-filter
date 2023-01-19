import { DateTime } from "luxon";
import { useState } from "react";

const TODAY = DateTime.local().startOf("day");
const RELATIVE_TIME_FORMAT = new Intl.RelativeTimeFormat();

function TimeAgo({ dateTime }: { dateTime: string }) {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <span
      onMouseOver={() => setShowRaw(true)}
      onMouseOut={() => setShowRaw(false)}
    >
      { !showRaw && timeAgo(dateTime) }
      { showRaw && DateTime.fromISO(dateTime).toLocal().toRFC2822() }
    </span>
  );
}

function timeAgo(dateTime: string): string {
  const days = DateTime.fromISO(dateTime).toLocal().startOf("day").diff(TODAY, "days").days;
  if (days === 0) {
    return "today";
  } else if (days === -1) {
    return "yesterday";
  } else if (days <= -30) {
    return "30+ days ago";
  } else {
    return RELATIVE_TIME_FORMAT.format(days, "day");
  }
}

export default TimeAgo;
