CREATE DATABASE IF NOT EXISTS progress_tracker;

-- Switch to the new database
\c progress_tracker;

-- Table to store disease predictions per user session
CREATE TABLE IF NOT EXISTS disease_records (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,  -- This can be linked to your user table if exists
    disease_name VARCHAR(100) NOT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
