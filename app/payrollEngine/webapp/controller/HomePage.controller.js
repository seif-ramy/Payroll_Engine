sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/date/UI5Date",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Core",
    'sap/m/MessageToast',
    "sap/ui/core/UIComponent"
],
    function (Controller, UI5Date, JSONModel, Core,MessageToast,UIComponent) {
        "use strict";

        return Controller.extend("sp.payrollEngine.controller.HomePage", {
            
            onInit: function () {
            },
            onRunPayroll: function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("PayrollProcessing");
            },
            onCalculatePaycheck: function(){
                MessageToast.show("Calculate Paycheck");
            },
            onItemSelect: function (oEvent) {
                var sKey = oEvent.getParameter("item").getKey();
                console.log("sKey",sKey);
                UIComponent.getRouterFor(this).navTo(sKey);
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