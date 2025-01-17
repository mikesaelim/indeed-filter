import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { ApiContext, Company, CompanyData, JobCompany } from "../lib/Api";

type CompanyModalProps = {
  show: boolean;
  company: JobCompany | null;
  updateCompany: (company: Company) => void;
  close: () => void;
}

function CompanyModal(props: CompanyModalProps) {
  const [notes, setNotes] = useState<string>("");
  const api = useContext(ApiContext);

  useEffect(() => {
    setNotes(props.company?.notes || "");
  }, [props.company]);

  if (!props.company) {
    return <></>;
  }

  async function save(hide: boolean) {
    const payload: CompanyData = { notes: notes };
    if (hide) {
      payload.hidden = true;
    }

    let promise;
    if (props.company?.id) {
      promise = api.updateCompany(props.company.id, payload);
    } else {
      payload.name = props.company?.name;
      promise = api.createCompany(payload);
    }
    promise
      .then(savedCompany => props.updateCompany(savedCompany))
      .catch(err => console.log(err));

    props.close();
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
        <Button variant="primary" onClick={() => save(false)}>
          Save
        </Button>
        <Button variant="danger" onClick={() => save(true)}>
          Save + Hide
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompanyModal;
