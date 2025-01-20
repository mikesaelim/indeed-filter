import { DateTime } from "luxon";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Run } from "../lib/Api";

function LastRunTooltip({ lastRun }: { lastRun: Run | null }) {
  if (lastRun == null) {
    return <></>;
  }

  const tooltip = <Tooltip>{`Collected: ${DateTime.fromISO(lastRun.completedAt).toLocal().toRFC2822()}`}</Tooltip>;

  return (
    <OverlayTrigger placement="right" overlay={tooltip}>
      <span className="small">
        { lastRun.success ?
          <i className="bi bi-check-square-fill text-success" /> : <i className="bi bi-x-square-fill text-danger" />
        }
      </span>
    </OverlayTrigger>
  );
}

export default LastRunTooltip;
