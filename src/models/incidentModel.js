const db = require('../config/database');

class IncidentModel {
    // Get all incidents
    static async getAllIncidents() {
        try {
            const [rows] = await db.query('SELECT * FROM incidents ORDER BY reported_at DESC');
            return rows;
        } catch (error) {
            throw new Error('Error fetching incidents: ' + error.message);
        }
    }

    // Get incident by ID
    static async getIncidentById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM incidents WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching incident: ' + error.message);
        }
    }

    // Create new incident
    static async createIncident(incidentData) {
        try {
            const { title, description, severity } = incidentData;
            const [result] = await db.query(
                'INSERT INTO incidents (title, description, severity) VALUES (?, ?, ?)',
                [title, description, severity]
            );
            return { id: result.insertId, ...incidentData };
        } catch (error) {
            throw new Error('Error creating incident: ' + error.message);
        }
    }

    // Delete incident
    static async deleteIncident(id) {
        try {
            const [result] = await db.query('DELETE FROM incidents WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error deleting incident: ' + error.message);
        }
    }
}

module.exports = IncidentModel; 