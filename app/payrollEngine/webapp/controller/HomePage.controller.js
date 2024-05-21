sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/date/UI5Date",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Core",
    'sap/m/MessageToast'
],
    function (Controller, UI5Date, JSONModel, Core,MessageToast) {
        "use strict";

        return Controller.extend("sp.payrollEngine.controller.HomePage", {
            
            onInit: function () {
            },
            onRunPayroll: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("PayrollProcessing");
                MessageToast.show("Run Payroll");
            },
            onCalculatePaycheck: function(){
                MessageToast.show("Calculate Paycheck");
            },
            onTicketButtonClick: function() {
                // Redirect to the ticket link
                window.location.href = "https://rptrs.freshdesk.com/support/login";
            },
    
            onOIPButtonClick: function() {
                // Redirect to the OIP link
                window.location.href = "https://rptrs.freshdesk.com/support/login";
            },
    
            onNotificationButtonClick: function() {
                // Redirect to the notification link
                window.location.href = "https://rptrs.freshdesk.com/support/login";
            },
    
            onProfileSettingButtonClick: function() {
                // Redirect to the profile setting link
                window.location.href = "https://rptrs.freshdesk.com/support/login";
            }
        });
    });