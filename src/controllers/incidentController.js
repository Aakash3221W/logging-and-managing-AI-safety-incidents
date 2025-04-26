const IncidentModel = require('../models/incidentModel');

class IncidentController {
    // Get all incidents
    static async getAllIncidents(req, res) {
        try {
            const incidents = await IncidentModel.getAllIncidents();
            res.status(200).json(incidents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get incident by ID
    static async getIncidentById(req, res) {
        try {
            const incident = await IncidentModel.getIncidentById(req.params.id);
            if (!incident) {
                return res.status(404).json({ error: 'Incident not found' });
            }
            res.status(200).json(incident);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create new incident
    static async createIncident(req, res) {
        try {
            const { title, description, severity } = req.body;

            // Validate required fields
            if (!title || !description || !severity) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Validate severity
            const validSeverities = ['Low', 'Medium', 'High'];
            if (!validSeverities.includes(severity)) {
                return res.status(400).json({ error: 'Invalid severity level' });
            }

            const newIncident = await IncidentModel.createIncident({ title, description, severity });
            res.status(201).json(newIncident);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete incident
    static async deleteIncident(req, res) {
        try {
            const success = await IncidentModel.deleteIncident(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Incident not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = IncidentController; 