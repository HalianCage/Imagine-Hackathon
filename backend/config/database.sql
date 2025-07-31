CREATE DATABASE progress_tracker;

-- Table to store disease predictions per user session
CREATE TABLE IF NOT EXISTS record_table (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,  -- This can be linked to your user table if exists
    image_uri TEXT,
    disease_name VARCHAR(100),
    spread_percent INT,
    avgWeeklyTemp INT,
    avgWeeklyHumidity INT,
    avgWeeklySunlight INT,
    report JSONB NOT NULL,
    language VARCHAR(100),
    time_stamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

