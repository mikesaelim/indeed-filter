import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";

import HideButton from "./HideButton";

function CompanyList(props) {
  return (
    <ListGroup variant="flush">
      {
        props.companies.slice(0, 20).map(c => (
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
              </div>
            </Stack>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
}

export default CompanyList;
