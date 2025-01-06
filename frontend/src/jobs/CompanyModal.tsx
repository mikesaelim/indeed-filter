import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { JobCompany } from "../lib/Api";

type CompanyModalProps = {
  show: boolean;
  company: JobCompany | null;
  close: () => void;
}

function CompanyModal(props: CompanyModalProps) {
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    setNotes(props.company?.notes || "");
  }, [props.company]);

  if (!props.company) {
    return <></>;
  }

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {props.company.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Notes:</Form.Label>
            <Form.Control
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              as="textarea"
              rows={3}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.close}>
          Save
        </Button>
        <Button variant="danger" onClick={props.close}>
          Save + Hide
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompanyModal;
