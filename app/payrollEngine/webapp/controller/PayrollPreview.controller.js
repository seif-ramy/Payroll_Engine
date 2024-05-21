sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sp.payrollEngine.controller.PayrollPreview", {
        onInit: function () {},
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
