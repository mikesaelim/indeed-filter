import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import "./CompaniesPage.css";
import Api from "./lib/Api";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState("");

  useEffect(loadCompanies, []);

  function loadCompanies() {
    Api.listHiddenCompanies()
      .then(results => setCompanies(results))
      .catch(err => console.log(err));
  }

  function hideCompany(event) {
    event.preventDefault();
    if (newCompanyName == null || newCompanyName.trim() === "") {
      return;
    }
    Api.hideCompany(newCompanyName.trim())
      .then(loadCompanies)
      .then(setNewCompanyName(""))
      .catch(err => console.log(err));
  }

  function unhideCompany(id) {
    Api.unhideCompany(id)
      .then(loadCompanies)
      .catch(err => console.log(err));
  }

  return (
    <div className="CompaniesPage">
      <div className="m-3 text-center">
        <h3>Hidden Companies</h3>
      </div>
      <Container className="my-5">
        <Row>
          <Col>
            <div className="CompaniesList mx-auto">
              <Accordion flush>
                {
                  companies.map(c => (
                    <Accordion.Item eventKey={c.id} key={c.id}>
                      <Accordion.Header>{c.name}</Accordion.Header>
                      <Accordion.Body>
                        <Button variant="danger" size="sm" className="mx-2" onClick={() => unhideCompany(c.id)}>
                          Unhide!
                        </Button>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))
                }
              </Accordion>
            </div>
          </Col>
          <Col>
            <div className="hide-company my-5 mx-auto">
              <Form onSubmit={hideCompany}>
                <Form.Group>
                  <Form.Label>Hide a company:</Form.Label>
                  <Form.Control
                    value={newCompanyName}
                    onChange={(event) => setNewCompanyName(event.target.value)}
                  />
                </Form.Group>
                <div className="text-end my-1">
                  <Button variant="primary" type="submit">Hide</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CompaniesPage;