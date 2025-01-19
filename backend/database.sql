CREATE DATABASE IF NOT EXISTS progress_tracker;

CREATE TABLE IF NOT EXISTS records {
    user_id SERIAL NOT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    plant_stage VARCHAR(20) NOT NULL,
    sunlight DECIMAL(5, 2) NOT NULL,   -- Sunlight in hours per day
    temperature DECIMAL(5, 2) NOT NULL, -- Temperature in Celsius
    humidity INT NOT NULL,             -- Humidity percentage
    water_required DECIMAL(10, 2) NOT NULL, -- Water required in litres per week
    fertilizer_type VARCHAR(20) NOT NULL,
    growth_milestone VARINT(2),
    PRIMARY KEY(user_id, time_stamp)
}