import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import "./CompaniesPage.css";
import Api from "./lib/Api";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(loadCompanies, []);

  function loadCompanies() {
    Api.listHiddenCompanies()
      .then(results => setCompanies(results))
      .catch(err => console.log(err));
  }

  function unhideCompany(id) {
    Api.unhideCompany(id)
      .then(loadCompanies);
  }

  return (
    <div className="CompaniesPage">
      <div className="m-4 text-center">insert header here</div>
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
    </div>
  );
}

export default CompaniesPage;
