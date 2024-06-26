using PLTUserManagement as PLTUM_API from '../srv/external/PLTUserManagement.csn';


namespace payroll.engine.service;

service PayrollEngine @(path :'/payrollengine') {
  
@readonly
entity ExecutePayrollService as select from PLTUM_API.User {
    userId,
    defaultFullName,
    '' as Gross_Salary:String,
    '' as Net_Salary:String,
    '' as Deductions:String,
    '' as Pay_Period_Month:String,
    '' as Pay_Period_Year:String,
    '' as Payroll_Area:String,
    '' as Cost_Center:String
    };

annotate ExecutePayrollService with @(cds.odata.valuelist);
}