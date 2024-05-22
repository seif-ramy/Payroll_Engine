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
    function (Controller, CalendarLegendItem,DateTypeRange,UI5Date, JSONModel, Core,MessageToast,UIComponent) {
        "use strict";

        return Controller.extend("sp.payrollEngine.controller.HomePage", {
            onInit: function () {
                var oCal = this.byId("calendar"),
                oLeg = this.byId("legend"),
                oRefDate = UI5Date.getInstance(),
                sType;
                for (var i = 1; i <= 10; i++) {
                    if (i < 10) {
                        sType = "Type0" + i;
                    } else {
                        sType = "Type" + i;
                    }
        
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