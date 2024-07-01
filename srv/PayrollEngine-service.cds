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

service RetroActive @(path :'/retroActive'){

entity EmployeeObject {
    userId: String;
    defaultFullName: String;
    Gross_Salary: String;
    Net_Salary: String;
    Deductions: String;
    Pay_Period_Month: Integer;
    Pay_Period_Year: Integer;
    Payroll_Area: String;
    Cost_Center: String;
}

entity PayrollResult {
    key month: Integer;
    key year: Integer;
    payroll: Composition of many EmployeeObject on payroll.Pay_Period_Month = $self.month and payroll.Pay_Period_Year = $self.year;
}

@readonly
entity PayrollResults as select from PayrollResult;

annotate PayrollResults with @(cds.odata.valuelist);
}



