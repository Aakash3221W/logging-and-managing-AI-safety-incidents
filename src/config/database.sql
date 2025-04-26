-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS backend_db;

-- Use the database
USE backend_db;

-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity ENUM('Low', 'Medium', 'High') NOT NULL,
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO incidents (title, description, severity) VALUES
('AI Model Bias Detection', 'An AI model showed significant bias in hiring recommendations, favoring certain demographics over others.', 'High'),
('Data Privacy Breach', 'Unauthorized access to training data containing sensitive user information.', 'Medium'),
('Model Drift Detection', 'Significant performance degradation in production model due to data drift.', 'Low'); 