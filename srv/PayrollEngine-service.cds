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