import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";

import { JobCompany } from "../lib/Api";
import FocusButton from "./FocusButton";
import HideButton from "./HideButton";

type CompanyListProps = {
  companies: JobCompany[];
  focusCompany: (company: string) => void;
  hideCompany: (company: string) => void;
}

function CompanyList(props: CompanyListProps) {
  return (
    <ListGroup variant="flush">
      {
        props.companies.slice(0, 100).map(c => (
          <ListGroup.Item key={c.name}>
            <Stack direction="horizontal" gap={3} className={`${c.hidden && "opacity-25"}`}>
              <div>
                {c.name} ({c.jobCount})
              </div>
              <div className="ms-auto">
                <HideButton
                  onClick={() => props.hideCompany(c.name)}
                  disabled={c.hidden}
                />
                <FocusButton
                  onClick={() => props.focusCompany(c.name)}
                  disabled={c.hidden}
                />
              </div>
            </Stack>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
}

export default CompanyList;
