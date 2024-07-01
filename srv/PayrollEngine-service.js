const cds = require('@sap/cds');
const {
    executeRetroactive
} = require('./services/ExecuteRetroactive');


module.exports = cds.service.impl(async function () {
    /*** SERVICE ENTITIES ***/
    const { ExecutePayrollService, PayrollResults } = this.entities;


    /*** HANDLERS REGISTRATION ***/
    // ON events
    
    this.on('READ', ExecutePayrollService, executeRetroactive);
    this.on('READ', PayrollResults, async (req) => {
        const results = await executeRetroactive();
        return results.map(result => ({
            month: result.month,
            year: result.year,
            payroll: result.payroll
        }));
    });
    // BEFORE events

    // AFTER events
});