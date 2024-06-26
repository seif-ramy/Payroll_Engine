// Import the executePayroll function
const {
    executePayroll
} = require('./ExecutePayroll');


async function executeRetroactive(){

    const payGroup = "R1";
    const startMonth = "01";
    const endMonth = "03";
    const year = "2024";

    const payroll1 = await executePayroll(payGroup, startMonth, year);
    const payroll2 = await executePayroll(payGroup, endMonth, year);

    //console.log(payroll1)
    console.log("Full Details payroll1:", JSON.stringify(payroll1, null, 2));
    console.log("Full Details payroll2:", JSON.stringify(payroll2, null, 2));

    return payroll1
}

module.exports = {
    executeRetroactive
}
