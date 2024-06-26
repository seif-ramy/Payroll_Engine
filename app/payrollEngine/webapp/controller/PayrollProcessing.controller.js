sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, JSONModel) {
    "use strict";

    return Controller.extend("sp.payrollEngine.controller.PayrollProcessing", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRouteMatched(this._onRouteMatched, this);
            var oData = {
                payrollItems: [
                    { name: "Dan, May", department: "Dept1", rate: "$80.00 / hr", regularHours: "95.00", salaryAmount: "1500.00", overtimeHours: "0.00", vacationHours: "0.00", sickHours: "0.00", personalHours: "0.00", holidayHours: "0.00", bonusAmount: "0.00", miscAmount: "0.00", miscReimb: "0.00" },
                    { name: "Doe, Jane", department: "Dept1", rate: "$20.00 / hr", regularHours: "25.00", salaryAmount: "500.00", overtimeHours: "0.00", vacationHours: "0.00", sickHours: "0.00", personalHours: "0.00", holidayHours: "0.00", bonusAmount: "0.00", miscAmount: "0.00", miscReimb: "0.00" },
                    { name: "Smith, John", department: "Dept1", rate: "$15.00 / hr", regularHours: "70.00", salaryAmount: "1050.00", overtimeHours: "0.00", vacationHours: "0.00", sickHours: "0.00", personalHours: "0.00", holidayHours: "0.00", bonusAmount: "0.00", miscAmount: "0.00", miscReimb: "0.00" }
                ],
                employees: [
                    { key: "all", text: "All Employees" },
                    { key: "active", text: "Active Employees" },
                    { key: "inactive", text: "Inactive Employees" }
                ],
                sortOptions: [
                    { key: "lastName", text: "Last Name" },
                    { key: "firstName", text: "First Name" },
                    { key: "department", text: "Department" }
                ]
            };
            // var idbutton=this.byId("");
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },
        _onRouteMatched: function (oEvent) {
            // Get the SideNavigation control
            var oSideNavigation = this.byId("sideNavigation");
            // Clear the selected key to ensure nothing is selected
            oSideNavigation.setSelectedKey("payrollProcessing");
        },

        onNext: function () {
            // Navigate to the Preview Payroll page
            UIComponent.getRouterFor(this).navTo("PayrollPreview");
        },
        onCancel: function () {
            // Navigate to the Preview Payroll page
            UIComponent.getRouterFor(this).navTo("home");
        },
        onItemSelect: function (oEvent) {
            var sKey = oEvent.getParameter("item").getKey();
            if (sKey == "Toggle") {
                var oSideNavigation = this.byId("sideNavigation");
                
                var bExpanded = oSideNavigation.getExpanded();
                oSideNavigation.setExpanded(!bExpanded);
            }
            else {
                UIComponent.getRouterFor(this).navTo(sKey);
            }
        },
        onTicketButtonClick: function () {
            // Redirect to the ticket link
            window.location.href = "https://rptrs.freshdesk.com/support/login";
        },
        onNotificationButtonClick: function () {
            // Redirect to the notification link
            window.location.href = "https://rptrs.freshdesk.com/support/login";
        },

        onProfileSettingButtonClick: function () {
            // Redirect to the profile setting link
            window.location.href = "https://rptrs.freshdesk.com/support/login";
        },
        // Navigate to the Preview Payroll page
        onNextPage: function (){
            UIComponent.getRouterFor(this).navTo("PayrollPreview");
        },
        
    });
});