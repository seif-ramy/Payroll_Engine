sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("sp.payrollEngine.controller.PayrollProcessing", {
        onInit: function () {},

        onNext: function () {
            // Navigate to the Preview Payroll page
            // MessageToast.show("Approved");
            UIComponent.getRouterFor(this).navTo("PayrollPreview");
        },
        onItemSelect: function (oEvent) {
            var sKey = oEvent.getParameter("item").getKey();
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

