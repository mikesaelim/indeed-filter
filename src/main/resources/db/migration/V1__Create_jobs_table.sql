CREATE TABLE IF NOT EXISTS jobs (
    jobkey VARCHAR(16) NOT NULL UNIQUE,
    title VARCHAR(64),
    company VARCHAR(64),
    company_id_encrypted VARCHAR(24),
    view_job_link TEXT,
    expired BOOLEAN,
    pub_date DATE,
    job_location_city VARCHAR(128),
    job_location_state VARCHAR(64),
    job_location_postal VARCHAR(64),
    job_location_extras VARCHAR(128),
    formatted_location VARCHAR(128),
    formatted_relative_time VARCHAR(128),
    snippet TEXT,
    PRIMARY KEY (jobkey)
);

CREATE INDEX idx_company ON indeed.jobs (company);
CREATE INDEX idx_company_id_encrypted ON indeed.jobs (company_id_encrypted);
