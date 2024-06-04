const cds = require('@sap/cds');
const {
    getEmployees
} = require('./services/DataManagementService');

module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const {
        DataManagementService
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    // ON events
    
    this.on('READ', DataManagementService, getEmployees);
    
    // BEFORE events

    // AFTER events
});
