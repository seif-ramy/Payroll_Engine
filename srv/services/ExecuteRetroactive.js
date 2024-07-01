// Import the executePayroll function
const {
    executePayroll
} = require('./ExecutePayroll');

//Date format is 'YYYY-MM-DD'
// Helper function to extract Month
function extractDay(dateString){
    const parts = dateString.split('-');
    return parseInt(parts[2], 10);
} 

// Helper function to extract Month
function extractMonth(dateString){
    const parts = dateString.split('-');
    return parseInt(parts[1], 10);
} 

// Helper function to extract Year
function extractYear(dateString){
    const parts = dateString.split('-');
    return parseInt(parts[0], 10);
} 
// Helper function to get current date
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Helper function to calculate the difference in months
function calculateMonthDifference(startDate, endDate){

    const startYear = extractYear(startDate);
    const startMonth = extractMonth(startDate);

    const endYear = extractYear(endDate);
    const endMonth = extractMonth(endDate);

    const yearDifference = endYear - startYear;
    const monthDifference = endMonth - startMonth;

    return (yearDifference * 12) + monthDifference;
}

// Fetch payrolls for all the months included in the RetroActive
async function fetchPayrolls(monthDifference){
    const payrollsResult = [];
    const targetDate = '2024-05-01';
    const today = getCurrentDate();

    const payGroup = "R1";
    const startMonth = extractMonth(targetDate);
    const endMonth = extractMonth(today);
    const startYear = extractYear(targetDate);
    const endYear = extractYear(today);

    for(let i = 0; i <= monthDifference; i++){

        const currentMonth = (startMonth + i - 1) % 12 + 1;
        const currentYear = startYear + Math.floor((startMonth + i - 1) / 12);

        const payroll = await executePayroll(payGroup, currentMonth, currentYear);

        payrollsResult.push({
            month: currentMonth,
            year: currentYear,
            payroll
        });
    }

    return payrollsResult;
}

// Calculate the salary differences for the affected users when running the RetroActive
function salaryDifferences(payrolls, retros){

    const specificMonth = 6;
    const specificYear = 2024;

    const differences = [];

    for(let i = 0; i < retros.length; i++){

        const specificPayroll = payrolls.find(result => result.month === specificMonth && result.year === specificYear);

        const specificUser = specificPayroll.payroll.find(employee => employee.userId == retros[i].userId);
    
        const salaryDifference = retros[i].amountPaid - specificUser.Gross_Salary;

        const diffAmount = {
            userId: retros[i].userId,
            month: retros[i].month,
            difference: salaryDifference
        }
        differences.push(diffAmount);
    }

    return differences;
}

// Calculate partial salary
// MISSING EMPLOYEE START DATE
function calculatePartialSalary(employee, startDate){

    const startDay = extractDay(startDate);
    const startMonth = extractMonth(startDate);
    const startYear = extractYear(startDate);

    const today = '2024-07-02';
    const currentDay = extractDay(today);
    const currentMonth = extractMonth(today);
    const currentYear = extractYear(today);

    let noOfDays;

    if((currentMonth == startMonth) && (currentYear == startYear)){
        noOfDays = currentDay - startDay + 1;
    }

    else{
        const daysInStartMonth = new Date(startYear, startMonth, 0).getDate(); 
        console.log(daysInStartMonth);
        noOfDays = daysInStartMonth - startDay + 1;
    }

    const monthlySalary = employee.Gross_Salary;
    const dailySalary = Math.round(monthlySalary / 30);

    return noOfDays * dailySalary;
}

// Execute RetroActive
async function executeRetroactive(){

    const payGroup = "R1";
    //const startMonth = "01";
    //const endMonth = "03";
    //const year = "2024";


    const targetDate = '2024-05-01';
    const today = getCurrentDate();


    const startMonth = extractMonth(targetDate);
    const endMonth = extractMonth(today);
    const startYear = extractYear(targetDate);
    const endYear = extractYear(today);


    const monthDifference = calculateMonthDifference(targetDate, today);

    //GET OLD MDF objects from SF 


    const payrollsResult = await fetchPayrolls(monthDifference);

    // DUMMY DATA FOR TESTING!
    const dummyRetros = [];

    const dummyData1 = {
        userId : '10021',
        month : '05',
        amountPaid : 8200
    };
    dummyRetros.push(dummyData1);

    const dummyData2 = {
        userId : '10021',
        month : '06',
        amountPaid : 7900
    };
    dummyRetros.push(dummyData2);

    const dummyData3 = {
        userId : '10017',
        month : '06',
        amountPaid : 9800
    };
    dummyRetros.push(dummyData3);

    const differences = salaryDifferences(payrollsResult, dummyRetros);

    console.log(differences);
    console.log(dummyRetros);

    
    const startDate = '2024-05-15';
    const specificMonth = extractMonth(startDate);
    const specificYear = extractYear(startDate);



    const specificPayroll = payrollsResult.find(result => result.month === specificMonth && result.year === specificYear);
    const specificUser = specificPayroll.payroll.find(employee => employee.userId == '10021');

    console.log(calculatePartialSalary(specificUser, startDate));

    
    
    // payrollsResult.forEach(result => {
    //     console.log(`Payroll for ${result.year}-${String(result.month).padStart(2, '0')}:`, result.payroll);
    // });

    //const payroll1 = await executePayroll(payGroup, startMonth, startYear);
    //const payroll2 = await executePayroll(payGroup, endMonth, endYear);


    //console.log(calculateMonthDifference(targetDate, today));

    
    //console.log(payroll1)
    //console.log("Full Details payroll1:", JSON.stringify(payroll1, null, 2));
    //console.log("Full Details payroll2:", JSON.stringify(payroll2, null, 2));

   // console.log('payrollsResult:', payrollsResult);

    // const currentDate = getCurrentDate();
    // console.log(`Current Date:`, currentDate);

    // console.log(extractMonth(currentDate));
    // console.log(extractYear(currentDate));

    // console.log(dummyData)

    // console.log(specificUser)

    // console.log(difference)


    return payrollsResult;
}

module.exports = {
    executeRetroactive
}
