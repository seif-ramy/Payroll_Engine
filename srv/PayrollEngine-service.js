const cds = require('@sap/cds');
const {
    executeRetroactive
} = require('./services/ExecuteRetroactive');


module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const {
        DataManagementService
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    // ON events
    
    this.on('READ', DataManagementService, executeRetroactive);
    
    // BEFORE events

    // AFTER events
});