DROP INDEX idx_company ON jobs;
DROP INDEX idx_company_id_encrypted ON jobs;

CREATE INDEX idx_pub_date_jobkey ON jobs (pub_date, jobkey);
CREATE INDEX idx_company_pub_date_jobkey ON jobs (company, pub_date, jobkey);
