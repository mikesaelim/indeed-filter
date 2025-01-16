import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";

import EditCompanyButton from "../components/EditCompanyButton";
import FocusButton from "../components/FocusButton";
import HideButton from "../components/HideButton";
import NotesPopover from "../components/NotesPopover";
import { JobCompany } from "../lib/Api";

type CompanyListProps = {
  companies: JobCompany[];
  editCompany: (company: JobCompany) => void;
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
                {c.notes &&
                  <span className="px-2">
                    <NotesPopover notes={c.notes} />
                  </span>
                }
              </div>
              <div className="ms-auto">
                <EditCompanyButton
                  onClick={() => props.editCompany(c)}
                  disabled={c.hidden}
                />
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
