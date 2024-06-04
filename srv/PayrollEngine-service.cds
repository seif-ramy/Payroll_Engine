using PLTUserManagement as PLTUM_API from '../srv/external/PLTUserManagement.csn';


namespace payroll.engine.service;

service PayrollEngine @(path :'/payrollengine') {
  
@readonly
entity DataManagementService as select from PLTUM_API.User {
    userId,
    defaultFullName,
    email,
    division,
    department,
    title,
    '' as compensationInfo:String,
    '' as recurringInfo:String,
    '' as oneTimePaymentInfo:String
    };

annotate DataManagementService with @(cds.odata.valuelist);
}

// i have the following:
// [
// {
// "userId": "10023",
// "defaultFullName": "Seif Ramy Mahmoud",
// "division": "CoE (7003)",
// "department": "Cloud Development (6003)",
// "title": "SAP Associate Consultant",
// "email": "seif.ramy@raptors.tech"
// }
// ]
// and the following:
// [
// {
// "payComponent": "9000",
// "userId": "10023",
// "startDate": "2024-06-03",
// "endDate": "9999-12-31",
// "paycompvalue": "7000",
// "currencyCode": "EGP",
// "frequency": "MON"
// },
// {
// "payComponent": "Basictest",
// "userId": "10023",
// "startDate": "2024-06-03",
// "endDate": "9999-12-31",
// "paycompvalue": "8000",
// "currencyCode": "EGP",
// "frequency": "MON"
// },
// {
// "payComponent": "9001x",
// "userId": "10023",
// "startDate": "2024-06-03",
// "endDate": "9999-12-31",
// "paycompvalue": "1400",
// "currencyCode": "EGP",
// "frequency": "MON"
// },
// {
// "payComponent": "SocialInsuranceSalary",
// "userId": "10023",
// "startDate": "2024-06-03",
// "endDate": "9999-12-31",
// "paycompvalue": "2000",
// "currencyCode": "EGP",
// "frequency": "MON"
// }
// ]
// I want to group both arrays based on user id such I have the following:
// [
// {
// "userId": "10023",
// "defaultFullName": "Seif Ramy Mahmoud",
// "division": "CoE (7003)",
// "department": "Cloud Development (6003)",
// "title": "SAP Associate Consultant",
// "email": "seif.ramy@raptors.tech",
// "compensationInfo":[//array of objects from the merging]
// }
// ]
