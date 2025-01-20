CREATE TABLE IF NOT EXISTS runs (
    id INTEGER NOT NULL AUTO_INCREMENT,
    completed_at TIMESTAMP NOT NULL,
    search_url TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX idx_completed_at ON runs (completed_at);
