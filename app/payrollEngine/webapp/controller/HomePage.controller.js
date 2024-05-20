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
                MessageToast.show("Run Payroll");
            },
            onCalculatePaycheck: function(){
                MessageToast.show("Calculate Paycheck");
            }
        });
    });