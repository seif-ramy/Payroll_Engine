const cds = require('@sap/cds');
const {
    executePayroll
} = require('./services/ExecutePayroll');

module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const {
        ExecutePayrollService
    } = this.entities;

    /*** HANDLERS REGISTRATION ***/
    // ON events
    
    this.on('READ', ExecutePayrollService, executePayroll);
    
    // BEFORE events

    // AFTER events
});