const cds = require('@sap/cds');

let employeeService = null;
let compensationService = null;
let recurringService= null;
let oneTimePaymentService= null;

(async function () {
    // Connect to external SFSF OData services
    employeeService = await cds.connect.to('PLTUserManagement');
    
    compensationService = await cds.connect.to({
        "kind": "odata-v2",
        "model": "srv/external/ECCompensationInformation",
        "credentials": {
          "destination": "SF_SalesDemo",
          "path": "/odata/v2/EmpPayCompRecurring"
        }
    });
    
    recurringService= await cds.connect.to({
            "kind": "odata-v2",
            "model": "srv/external/ECCompensationInformation",
            "credentials": {
              "destination": "SF_SalesDemo",
              "path": "/odata/v2/RecurringDeduction"
            }
    });
    
    oneTimePaymentService= await cds.connect.to({
            "kind": "odata-v2",
            "model": "srv/external/ECCompensationInformation",
            "credentials": {
              "destination": "SF_SalesDemo",
              "path": "/odata/v2/EmpPayCompNonRecurring"
            }
    });
})();



/*** HANDLERS ***/

async function getEmployees(req) {
    
    // Get all available employees names,emails and so on
    try {
        
        const selectQuery = '$select=userId,defaultFullName,email,division,department,title';
        const urlPathQuery = `?${selectQuery}`;
        
        let employeeResponse = await employeeService.send({
        method: "GET",
        path: urlPathQuery,
    });

    // Get employees compensation info
    const selectQueryCompensation = '$select=userId,payComponent,paycompvalue,currencyCode,startDate,endDate,frequency';
    const urlPathQueryCompensation = `?${selectQueryCompensation}`;

    let compensationResponse = await compensationService.send({
    method: "GET",
    path: urlPathQueryCompensation,
   });

   // Update the startDate and endDate in each item of the response
   compensationResponse = compensationResponse.map(item => ({
    ...item,
    startDate: formatDate(item.startDate),
    endDate: formatDate(item.endDate),
}));

// Merging employees names,emails and so on with compensation info
    const employeesWithComp = employeeResponse.map(employee => {
    const compensationInfo = compensationResponse
        .filter(comp => comp.userId === employee.userId)
        .map(({ userId, ...rest }) => rest); // Remove userId from compensationInfo
    return {
        ...employee,
        compensationInfo
    };
});

// Get employees Recurring info
const selectQueryRecurring = '$expand=recurringItems';
const urlPathQueryRecurring = `?${selectQueryRecurring}`;


let recurringResponse = await recurringService.send({
method: "GET",
path: urlPathQueryRecurring,
});


// Leaving only the effectiveStartDate,effectiveEndDate,recurringItems and from recurring items leaving only payComponentType,
// RecurringDeduction_effectiveStartDate and so on
    recurringResponse = recurringResponse.map(item => ({
    userId:item.userSysId,
    effectiveStartDate: formatDate(item.effectiveStartDate),
    effectiveEndDate: formatDate(item.effectiveEndDate),
    recurringItems: item.recurringItems.map(recurringItem => ({
        payComponentType: recurringItem.payComponentType,
        RecurringDeduction_effectiveStartDate: formatDate(recurringItem.RecurringDeduction_effectiveStartDate),
        endDate:recurringItem.endDate !== null ? formatDate(recurringItem.endDate) : null,
        frequency:recurringItem.frequency,
        currency:recurringItem.currency,
        amount:recurringItem.amount,
        unitOfMeasure:recurringItem.unitOfMeasure
    }))
}));

// console.log(recurringResponse);

// Merging employees names,emails and compensation with recurring info
const employeesWithCompAndRecurring = employeesWithComp.map(employeeComp => {
    const recurringInfo = recurringResponse
        .filter(recurring => recurring.userId === employeeComp.userId)
        .map(({ userId, ...rest }) => rest); // Remove userId from recurringInfo
    return {
        ...employeeComp,
        recurringInfo
    };
});

// Get employees Recurring info
const selectQueryNonRecurring = 
'$select=userId,sequenceNumber,unitOfMeasure,numberOfUnits,payComponentCode,currencyCode,value,payDate';
const urlPathQueryNonRecurring = `?${selectQueryNonRecurring}`;


let nonRecurringResponse = await oneTimePaymentService.send({
method: "GET",
path: urlPathQueryNonRecurring,
});

// Update the payDate in each item of the response
nonRecurringResponse = nonRecurringResponse.map(item => ({
    ...item,
    payDate: formatDate(item.payDate)
}));

// console.log(nonRecurringResponse);

// Merging employees names,emails, compensation and recurring with non recurring info
const employeesWithCompAndRecurringAndNonRecurring = employeesWithCompAndRecurring.map(employeeCompAndRecurring => {
    const oneTimePaymentInfo = nonRecurringResponse
        .filter(nonRecurring => nonRecurring.userId === employeeCompAndRecurring.userId)
        .map(({ userId, ...rest }) => rest); // Remove userId from recurringInfo
    return {
        ...employeeCompAndRecurring,
        oneTimePaymentInfo
    };
});

return employeesWithCompAndRecurringAndNonRecurring;
    
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}

function formatDate(dateStr) {
    const milliseconds = parseInt(dateStr.match(/\/Date\((\d+)\)\//)[1]);
    const date = new Date(milliseconds);
    return date.toISOString().split('T')[0];  // Format the date to YYYY-MM-DD
}

module.exports = {
    getEmployees
}
