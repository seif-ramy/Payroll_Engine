sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/date/UI5Date",
    'sap/ui/unified/CalendarLegendItem',
    'sap/ui/unified/DateTypeRange',
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Core",
    'sap/m/MessageToast'
],
    function (Controller, UI5Date, CalendarLegendItem,DateTypeRange,JSONModel, Core,MessageToast) {
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
                MessageToast.show("Run Payroll");
            },
            onCalculatePaycheck: function(){
                MessageToast.show("Calculate Paycheck");
            }
        
        
        
        
        
        });
    });