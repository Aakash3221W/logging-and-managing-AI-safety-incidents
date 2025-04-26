const express = require('express');
const router = express.Router();
const IncidentController = require('../controllers/incidentController');

// Get all incidents
router.get('/', IncidentController.getAllIncidents);

// Get incident by ID
router.get('/:id', IncidentController.getIncidentById);

// Create new incident
router.post('/', IncidentController.createIncident);

// Delete incident
router.delete('/:id', IncidentController.deleteIncident);

module.exports = router; 