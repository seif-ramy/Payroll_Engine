sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent,MessageToast,  JSONModel) {
    "use strict";

    return Controller.extend("sp.payrollEngine.controller.PayrollSummary", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRouteMatched(this._onRouteMatched, this);
            // Initialize the data model for the chart
            var oData = {
                Items: [
                    { Name: "1.8M", Number: 10 },
                    { Name: "3M", Number: 20 },
                ]
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "DataModel");
            var oVizFrame = this.getView().byId("idPieChart");
            oVizFrame.attachEventOnce("renderComplete", this.onRenderComplete, this);
        },
        _onRouteMatched: function (oEvent) {
            var oSideNavigation = this.byId("sideNavigation");
            // Set the selected key to null to ensure nothing is selected
            oSideNavigation.setSelectedKey("PayrollProcessing");
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

        onRenderComplete: function (oEvent) {
            var oVizFrame = this.getView().byId("idPieChart");

            // Use setTimeout to delay the property setting
            setTimeout(function() {
                oVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            visible: false
                        },
                        colorPalette: ["#43BECC", "#121B43"] // Set custom colors
                    },
                    title: {
                        visible: false
                    },
                    legend: {
                        visible: false // Hide legend
                    }
                });
            }, 0);
        },
        press: function (oEvent) {

            MessageToast.show("DONE!!!!!!!!!!!");
        },
    
        onNext: function () {
            // Navigate to the Preview Payroll page
            UIComponent.getRouterFor(this).navTo("PayrollPreview");
        },

        onItemSelect: function (oEvent) {
            var sKey = oEvent.getParameter("item").getKey();
            if (sKey === "Toggle") {
                var oSideNavigation = this.byId("sideNavigation");
                oSideNavigation.setSelectedKey(null);

                var bExpanded = oSideNavigation.getExpanded();
                oSideNavigation.setExpanded(!bExpanded);
            } else {
                UIComponent.getRouterFor(this).navTo(sKey);
            }
        }
    });
});
