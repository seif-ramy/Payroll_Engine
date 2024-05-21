sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("sp.payrollEngine.controller.PayrollProcessing", {
        onInit: function () {},

        onNext: function () {
            // Navigate to the Preview Payroll page
            UIComponent.getRouterFor(this).navTo("PayrollPreview");
        }
    });
});

