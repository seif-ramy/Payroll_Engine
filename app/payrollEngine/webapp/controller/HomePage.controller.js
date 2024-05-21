sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    'sap/m/MessageToast'
  ], function (Controller, UIComponent, MessageToast) {
    "use strict";
  
    return Controller.extend("sp.payrollEngine.controller.HomePage", {
      onInit: function () {},
  
      onRunPayroll: function () {
        MessageToast.show("Run Payroll");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("PayrollProcessing");
      },
  
      onCalculatePaycheck: function () {
        MessageToast.show("Calculate Paycheck");
      }
    });
  });
  