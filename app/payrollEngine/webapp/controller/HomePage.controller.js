sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/date/UI5Date",
    'sap/ui/unified/CalendarLegendItem',
    'sap/ui/unified/DateTypeRange',
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Core",
    'sap/m/MessageToast',
    "sap/ui/core/UIComponent"
],
    function (Controller, UI5Date, CalendarLegendItem, DateTypeRange, JSONModel, Core, MessageToast, UIComponent) {
        "use strict";

        return Controller.extend("sp.payrollEngine.controller.HomePage", {
            onInit: function () {
                // Calendar and legend initialization
                var oCal = this.byId("calendar"),
                    oLeg = this.byId("legend"),
                    oRefDate = UI5Date.getInstance(),
                    sType;
                for (var i = 1; i <= 10; i++) {
                    sType = (i < 10) ? "Type0" + i : "Type" + i;

                    oLeg.addItem(new CalendarLegendItem({
                        type: sType,
                        text: "Placeholder " + i
                    }));

                    oRefDate.setDate(i);
                    oCal.addSpecialDate(new DateTypeRange({
                        startDate: UI5Date.getInstance(oRefDate),
                        type: sType,
                        tooltip: "Placeholder " + i
                    }));

                    oRefDate.setDate(i + 12);
                    oCal.addSpecialDate(new DateTypeRange({
                        startDate: UI5Date.getInstance(oRefDate),
                        type: sType,
                        tooltip: "Placeholder " + i
                    }));
                }
            },
            onRunPayroll: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("PayrollProcessing");
            },
            onCalculatePaycheck: function () {
                MessageToast.show("Calculate Paycheck");
            },
            onOffCyclePayroll: function () {
                MessageToast.show("Off-Cycle Payroll");
            },
            onViewAllAlerts: function () {
                MessageToast.show("Viewing all alerts");
            },
            onViewFullReport: function () {
                MessageToast.show("Viewing full report");
            },
            onItemSelect: function (oEvent) {
                var sKey = oEvent.getParameter("item").getKey();
                UIComponent.getRouterFor(this).navTo(sKey);
            },
            onOpenAlert: function (oEvent) {
                MessageToast.show("Opening alert");
            },
            onTicketButtonClick: function () {
                window.location.href = "https://rptrs.freshdesk.com/support/login";
            },
            onOIPButtonClick: function () {
                window.location.href = "https://rptrs.freshdesk.com/support/login";
            },
            onNotificationButtonClick: function () {
                window.location.href = "https://rptrs.freshdesk.com/support/login";
            },
            onProfileSettingButtonClick: function () {
                window.location.href = "https://rptrs.freshdesk.com/support/login";
            },

           
        });
    });
