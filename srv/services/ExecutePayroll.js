// Import the getEmployees function
const {
    getEmployees
} = require('./DataManagementService');

let payComponentsService= null;
let pickListService= null;

(async function () {
    // Connect to external SFSF OData services
    payComponentsService= await cds.connect.to('ECFoundationOrganization');
    pickListService= await cds.connect.to('FoundationPlatformPLT');
})();



// Define an async function to call getEmployees and handle the result
async function executePayroll(payGroup, month, year) {
    try {
        //const payGroup = 'R1'; // Set your desired payGroup
        //const month= "05";
        //const year= "2023";

        //////////////////////////////Constructing fromDate///////////////////////////////////////////
        const formattedMonth = month.toString().length === 1 ? `0${month}` : month; // Add leading zero if necessary
        let fromDate = `${year}-${formattedMonth}-01`; // Construct the fromDate string
        fromDate=new Date(fromDate);

        //////////////////////////////Constructing toDate///////////////////////////////////////////
        // Create a Date object for the first day of the next month
        const nextMonth = parseInt(month, 10) + 1; // Increment month by 1
        const nextYear = nextMonth > 12 ? year + 1 : year; // If nextMonth is > 12, increment the year
        const nextMonthFormatted = nextMonth > 12 ? '01' : nextMonth.toString().length === 1 ? `0${nextMonth}` : nextMonth;

        // Create the Date object for the first day of the next month
        const firstDayNextMonth = new Date(`${nextYear}-${nextMonthFormatted}-01`);

        // Subtract one day to get the last day of the current month
        firstDayNextMonth.setDate(firstDayNextMonth.getDate() - 1);

        // Format the toDate as a string in the desired format
        let toDate = `${firstDayNextMonth.getFullYear()}-${(firstDayNextMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayNextMonth.getDate().toString().padStart(2, '0')}`;
        
        toDate=new Date(toDate);

        // Calculate the difference in milliseconds
        const diff =toDate - fromDate;

        // Convert difference from milliseconds to days
        const daysOfMonth = (diff / (1000 * 60 * 60 * 24))+1;


        const pickListOptionIdToCode = await fetchDataAndProcess();

        // console.log(pickListOptionIdToCode);
        
        //Get Employees
        const employees = await getEmployees(payGroup,month,year);
        let employeesPayroll=[];
        
        // Loop through each employee to perform further operations
        for (const employee of employees) {
            
            const employeeCompensation=employee.compensationInfo;
            const employeeRecurringInfo=employee.recurringInfo;
            const employeeOneTimePaymentInfo=employee.oneTimePaymentInfo;
            let totalAmount=0;
            let totalDeductions=0;
            
            if(employeeCompensation.length!==0){
                for (const comp of employeeCompensation) {
                    let startDateString = comp.startDate;
                            let startDate= new Date(startDateString);
                            if (fromDate> startDate) {
                                startDate = fromDate;
                               }
                            
                            let endDateString = comp.endDate;
                            let endDate= new Date(endDateString);
                            if (endDate > toDate) {
                             endDate = toDate;
                            }
        
                            // Calculate the difference in milliseconds
                            const diffTime =endDate - startDate;
        
                            // Convert difference from milliseconds to days
                            const diffDays = (diffTime / (1000 * 60 * 60 * 24))+1;

                            for (const empPayCompRecurringNav of comp.empPayCompRecurringNav) {
                                const payComponent=empPayCompRecurringNav.payComponent;
                                const object= pickListOptionIdToCode[payComponent];
                                if(object!==undefined){
                                    if(object.code=="Y"){
                                        let amount= 
                                        Math.round((Number(empPayCompRecurringNav.paycompvalue)/daysOfMonth)*diffDays);
                                        totalAmount+=amount;
                              }
                            }
                        }
                }
            }

            if(employeeRecurringInfo.length!==0){
                for (const recurring of employeeRecurringInfo) {
                    let effectiveStartDateString=recurring.effectiveStartDate;
                    let effectiveStartDate= new Date(effectiveStartDateString);
                    if (fromDate> effectiveStartDate) {
                        effectiveStartDate = fromDate;
                       }
                    
                    let effectiveEndDateString=recurring.effectiveEndDate;
                    let effectiveEndDate= new Date(effectiveEndDateString);
                    if (effectiveEndDate > toDate) {
                        effectiveEndDate = toDate;
                       }

                    // Calculate the difference in milliseconds
                    const diffTimeRecurring =effectiveEndDate - effectiveStartDate;

                    // Convert difference from milliseconds to days
                    const diffDaysRecurring = (diffTimeRecurring / (1000 * 60 * 60 * 24))+1;
                    for (const recurringItem of recurring.recurringItems) {
                        let amountRecurring= Math.round((Number(recurringItem.amount)/daysOfMonth)*diffDaysRecurring);
                        totalDeductions+=amountRecurring;
                        totalAmount-=amountRecurring;
                    }

                    }
                }

            if(employeeOneTimePaymentInfo.length!==0){
                for (const oneTime of employeeOneTimePaymentInfo) {
                    totalAmount+=Number(oneTime.value);
                }
            }

            //employeesPayroll[employee.userId]=totalAmount;
            const employeesObject={
                userId:employee.userId,
                defaultFullName:employee.defaultFullName,
                Gross_Salary:totalAmount,
                Net_Salary:"Pending",
                Deductions:totalDeductions,
                Pay_Period_Month:month,
                Pay_Period_Year:year,
                Payroll_Area:payGroup,
                Cost_Center:employee.costCenter,
            };
            
            employeesPayroll.push(employeesObject);
        }

        console.log(employeesPayroll);

        //console.log('Employees with compensation and recurring info:', employees);
        return employeesPayroll;
        // Perform further operations with the fetched employees data if needed
    } catch (error) {
        console.error('Error executing payroll:', error);
    }
}

async function fetchDataAndProcess() {
    try {
        const selectQueryPayComponents = '$select=externalCode,customString1';
        const urlPathQueryPayComponents = `?${selectQueryPayComponents}`;

        let payComponentsResponse = await payComponentsService.send({
            method: "GET",
            path: urlPathQueryPayComponents,
        });

        const pickListQueries = payComponentsResponse.map(item => {
            if (item.customString1 !== null) {
                const externalCode = item.externalCode;  // Capture externalCode for each item
                const path = `/odata/v2/PicklistOption(${item.customString1})?$select=id,externalCode`;
                return pickListService.send({
                    method: "GET",
                    path: path
                }).then(response => ({
                    optionId: response.id,
                    code: response.externalCode,
                    externalCodeKey: externalCode  // Passing externalCode to the next step
                })).catch(error => {
                    console.error('Error fetching data for ID:', item.customString1, 'with External Code:', externalCode, error);
                    return null; // Return null or some error indicator for this specific request
                });
            } else {
                return Promise.resolve(null); // Return null for items without a customString1
            }
        });

        // Wait for all pickList queries to resolve
        const responses = await Promise.all(pickListQueries);
        const validResponses = responses.filter(response => response !== null);

        // Process valid responses into a hashmap
        const hashmap = validResponses.reduce((acc, item) => {
            acc[item.externalCodeKey] = { optionId: item.optionId, code: item.code };  // Using externalCode as key
            return acc;
        }, {});

        // console.log("HashMap of ExternalCode to option details:", hashmap);
        return hashmap; // Now you can return this hashmap if needed, or do other processing
    } catch (error) {
        console.error("Error processing pick list queries:", error);
    }
}



module.exports = {
    executePayroll
}

