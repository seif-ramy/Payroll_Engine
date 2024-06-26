const cds = require('@sap/cds');

let employeeService = null;
let payGroupService = null;
// let compensationService=null;
let recurringService= null;
let oneTimePaymentService= null;

(async function () {
    // Connect to external SFSF OData services
    employeeService = await cds.connect.to('PLTUserManagement');

    payGroupService = await cds.connect.to({
        "kind": "odata-v2",
        "model": "srv/external/ECCompensationInformation",
        "credentials": {
          "destination": "SF_SalesDemo",
          "path": "/odata/v2/EmpCompensation"
        }
    });
    
    // compensationService = await cds.connect.to({
    //     "kind": "odata-v2",
    //     "model": "srv/external/ECCompensationInformation",
    //     "credentials": {
    //       "destination": "SF_SalesDemo",
    //       "path": "/odata/v2/EmpPayCompRecurring"
    //     }
    // });
    
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

async function getEmployees(payGroup,month,year) {
    // Get all available employees names, emails and so on
    try {

        const formattedMonth = month.toString().length === 1 ? `0${month}` : month; // Add leading zero if necessary
        const fromDate = `${year}-${formattedMonth}-01`; // Construct the fromDate string

        // Create a Date object for the first day of the next month
        const nextMonth = parseInt(month, 10) + 1; // Increment month by 1
        const nextYear = nextMonth > 12 ? year + 1 : year; // If nextMonth is > 12, increment the year
        const nextMonthFormatted = nextMonth > 12 ? '01' : nextMonth.toString().length === 1 ? `0${nextMonth}` : nextMonth;

        // Create the Date object for the first day of the next month
        const firstDayNextMonth = new Date(`${nextYear}-${nextMonthFormatted}-01`);

        // Subtract one day to get the last day of the current month
        firstDayNextMonth.setDate(firstDayNextMonth.getDate() - 1);

        // Format the toDate as a string in the desired format
        const toDate = `${firstDayNextMonth.getFullYear()}-${(firstDayNextMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayNextMonth.getDate().toString().padStart(2, '0')}`;

        
        const selectQuery = '$select=userId,defaultFullName,email,division,department,title';
        const urlPathQuery = `?${selectQuery}`;


        let employeeResponse = await employeeService.send({
            method: "GET",
            path: urlPathQuery,
        });

        // console.log("Employee Response",employeeResponse)

        
        //Filter the employees by payGroup
        const selectQueryPayGroup = 
'$select=userId,payGroup,startDate,endDate,empPayCompRecurringNav/payComponent,empPayCompRecurringNav/paycompvalue,empPayCompRecurringNav/currencyCode,empPayCompRecurringNav/frequency&$expand=empPayCompRecurringNav';
        //const selectQueryPayGroup = '$select=userId,payGroup&fromDate=1900-01-01';
        const filterQueryPayGroup = `&fromDate=${fromDate}&$filter=payGroup eq '${payGroup}' and startDate le '${toDate}'`;
        const urlPathQueryPayGroup = `?${selectQueryPayGroup}${filterQueryPayGroup}`;
        //${filterQueryPayGroup};

        let payGroupFilteredResponse = await payGroupService.send({
            method: "GET",
            path: urlPathQueryPayGroup,
        });

        // Update the startDate and endDate in each item of the response
        payGroupFilteredResponse = payGroupFilteredResponse.map(item => ({
            ...item,
            startDate: formatDate(item.startDate),
            endDate: formatDate(item.endDate),
        }));

        //console.log("Full Details:", JSON.stringify(payGroupFilteredResponse, null, 2));
        
        const mergedResponses = employeeResponse.map(employee => {
            // Filter the pay data for each employee and remove the userId from each entry
            const compensationInfo = payGroupFilteredResponse.filter(pay => pay.userId === employee.userId).map(pay => ({
              startDate: pay.startDate,
              endDate: pay.endDate,
              payGroup: pay.payGroup,
              empPayCompRecurringNav: pay.empPayCompRecurringNav
            }));
          
            return {
              ...employee,
              compensationInfo
            };
          });
        //console.log("Full Details:", JSON.stringify(mergedResponses, null, 2));
          
        // Get employees Recurring info
        const selectQueryRecurring =  `$expand=recurringItems&fromDate=${fromDate}&$filter=effectiveStartDate le '${toDate}'`;
        const urlPathQueryRecurring = `?${selectQueryRecurring}`;

        let recurringResponse = await recurringService.send({
            method: "GET",
            path: urlPathQueryRecurring,
        });

        // Leave only the necessary fields from recurring items
        recurringResponse = recurringResponse.map(item => ({
            userId: item.userSysId,
            effectiveStartDate: formatDate(item.effectiveStartDate),
            effectiveEndDate: formatDate(item.effectiveEndDate),
            recurringItems: item.recurringItems.map(recurringItem => ({
                payComponentType: recurringItem.payComponentType,
                RecurringDeduction_effectiveStartDate: formatDate(recurringItem.RecurringDeduction_effectiveStartDate),
                endDate: recurringItem.endDate !== null ? formatDate(recurringItem.endDate) : null,
                frequency: recurringItem.frequency,
                currency: recurringItem.currency,
                amount: recurringItem.amount,
                unitOfMeasure: recurringItem.unitOfMeasure
            }))
        }));

        // Merging employees names, emails and compensation with recurring info
        const employeesWithCompAndRecurring = mergedResponses.map(employeeComp => {
            const recurringInfo = recurringResponse
                .filter(recurring => recurring.userId === employeeComp.userId)
                .map(({ userId, ...rest }) => rest); // Remove userId from recurringInfo
            return {
                ...employeeComp,
                recurringInfo
            };
        });

        // Get employees Non-Recurring info
        const selectQueryNonRecurring = `$filter=payDate ge '${fromDate}' and payDate le '${toDate}'`;
        const urlPathQueryNonRecurring = `?${selectQueryNonRecurring}`;

        let nonRecurringResponse = await oneTimePaymentService.send({
            method: "GET",
            path: urlPathQueryNonRecurring,
        });
        
        // Update the payDate in each item of the response
        nonRecurringResponse = nonRecurringResponse.map(item => ({
            userId: item.userId,
            sequenceNumber: item.sequenceNumber,
            unitOfMeasure: item.unitOfMeasure,
            numberOfUnits: item.numberOfUnits,
            payComponentCode: item.payComponentCode,
            currencyCode: item.currencyCode,
            value: item.value,
            payDate: formatDate(item.payDate)
        }));
        
        // Merging employees names, emails, compensation, recurring with non-recurring info
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

// async function passPayGroup() {
//     // console.log(await getEmployees("R1"));
//     return (await getEmployees("R1"));
// }

module.exports = {
    getEmployees
}
