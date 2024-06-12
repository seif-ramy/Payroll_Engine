const cds = require('@sap/cds');
const {
    executePayroll
} = require('./services/ExecutePayroll');

module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const {
        DataManagementService
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    // ON events
    
    this.on('READ', DataManagementService, executePayroll);
    
    // BEFORE events

    // AFTER events
});