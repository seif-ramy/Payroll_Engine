sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, JSONModel) {
    "use strict";

    return Controller.extend("sp.payrollEngine.controller.PayrollPreview", {
        onInit: function () {
            // Initialize the data model for the chart
            var oData = {
                Items: [
                    { Name: "1.8M", Number: 10 },
                    { Name: "3M", Number: 20 },
                ]
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "DataModel");
            
        },

        // Event handler for when a data point is clicked
        myOnClickHandler: function(oEvent) {
            var oData = oEvent.getParameter("data");
            console.log("Data point clicked:", oData);
            // Handle the event as required
        },
        onChartSelect: function (oEvent) {
            // Get the selected data
            var aData = oEvent.getParameter("data");
            if (aData && aData.length) {
                var oSelectedData = aData[0].data;
                var sText = oSelectedData.Number + "M";
                // Update the highlight text
                this.getView().byId("highlightText").setText(sText);
            }
        },
        // Event handler for render complete
        handleRenderComplete: function(oEvent) {
            console.log("Render complete:", oEvent);
            // Handle the event as required
        },

        onNext: function () {
            // Navigate to the Preview Payroll page
            UIComponent.getRouterFor(this).navTo("PayrollProcessing");
        },

        onItemSelect: function (oEvent) {
            var sKey = oEvent.getParameter("item").getKey();
            if (sKey === "Toggle") {
                var oSideNavigation = this.byId("sideNavigation");
                var bExpanded = oSideNavigation.getExpanded();
                oSideNavigation.setExpanded(!bExpanded);
            } else {
                UIComponent.getRouterFor(this).navTo(sKey);
            }
        }
    });
});
