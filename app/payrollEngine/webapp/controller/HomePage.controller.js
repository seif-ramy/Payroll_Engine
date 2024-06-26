sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/date/UI5Date",
    'sap/ui/unified/CalendarLegendItem',
    'sap/ui/unified/DateTypeRange',
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Core",
    'sap/m/MessageToast',
    "sap/ui/core/UIComponent",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format"
],
    function (Controller, UI5Date, CalendarLegendItem, DateTypeRange, JSONModel, Core, MessageToast, UIComponent, ChartFormatter, Format) {
        "use strict";

        return Controller.extend("sp.payrollEngine.controller.HomePage", {
            onInit: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.attachRouteMatched(this._onRouteMatched, this);
                this._setModel();
                this._setCustomFormatter();

                var navigationList = this.byId("navigationList");
                navigationList.setSelectedItem(null);

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

            _onRouteMatched: function (oEvent) {
                var oSideNavigation = this.byId("sideNavigation");
                // Set the selected key to null to ensure nothing is selected
                oSideNavigation.setSelectedKey("home");
            },

            _setModel: function () {
                var aData = {
                    Items: [
                        { Name: "Salaries", Number: 25370000 },
                        { Name: "Benefits", Number: 7610000 },
                        { Name: "Overtime", Number: 15220000 },
                        { Name: "Taxes", Number: 2540000 }
                    ],
                    "barChartData": [
                        { "Name": "Previous Period", "Number": 3200 },
                        { "Name": "Current Period", "Number": 4490 }
                    ],
                    "StackedItems": [
                        {
                            "CW": "CW 14",
                            "Revenue": 491000.17,
                            "Cost": 221000,
                            "Actual Payout": 70200.54,
                            "Retro Payout": 150799.46,
                            "Cost3": 80799.46,
                            "Target": 500000,
                            "Budget": 238000
                        },
                        {
                            "CW": "CW 15",
                            "Revenue": 536000.34,
                            "Cost": 280000,
                            "Actual Payout": 158800.73,
                            "Retro Payout": 121199.27,
                            "Cost3": 108800.46,
                            "Target": 500000,
                            "Budget": 252000
                        },
                        {
                            "CW": "CW 16",
                            "Revenue": 675000,
                            "Cost": 230000,
                            "Actual Payout": 140000.91,
                            "Retro Payout": 89999.09,
                            "Cost3": 100099.09,
                            "Target": 600000,
                            "Budget": 266000
                        },
                        {
                            "CW": "CW 17",
                            "Revenue": 680000,
                            "Cost": 250000,
                            "Actual Payout": 172800.15,
                            "Retro Payout": 77199.85,
                            "Cost3": 57199.85,
                            "Target": 600000,
                            "Budget": 280000
                        }
                    ]
                };

                var oModel = new JSONModel();
                oModel.setData(aData);
                this.getView().setModel(oModel, "DataModel");

                var oChart = this.getView().byId("idpiechart"),
                    oChartProperties = oChart.getVizProperties(),
                    aColorPalate = ["#43BECC", "#8E257A", "#121B43", "#E21F4A"];
                oChartProperties.plotArea.colorPalette = aColorPalate;
                oChart.setVizProperties(oChartProperties);

                Format.numericFormatter(ChartFormatter.getInstance());
                var formatPattern = ChartFormatter.DefaultPattern;
                var oVizFrame = this.getView().byId("idbar");
                oVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            formatString: formatPattern.SHORTFLOAT_MFD2,
                            visible: true
                        },
                        colorPalette: ["#121B43"]
                    },
                    valueAxis: {
                        label: {
                            formatString: formatPattern.SHORTFLOAT
                        },
                        title: {
                            visible: false
                        }
                    },
                    categoryAxis: {
                        title: {
                            visible: false
                        }
                    },
                    legend: {
                        visible: false  // This line hides the legend
                    },
                    title: {
                        visible: false,
                        text: 'Revenue by City and Store Name'
                    }
                });

                var StackedVizFrame = this.getView().byId("idStackedVizFrame");
                if (StackedVizFrame) {
                    console.log("StackedVizFrame found:", StackedVizFrame);  // Debugging statement
                    StackedVizFrame.setVizProperties({
                        plotArea: {
                            dataLabel: {
                                formatString: formatPattern.STANDARDFLOAT,
                                visible: true,
                                showTotal: false
                            },
                            colorPalette: ["#43BECC", "#121B43"]
                        },
                        valueAxis: {
                            label: {
                                formatString: formatPattern.SHORTFLOAT
                            },
                            title: {
                                visible: false
                            }
                        },
                        categoryAxis: {
                            title: {
                                visible: false
                            }
                        },
                        title: {
                            visible: true,
                            text: 'Actual vs Budget. Q1, 2024'
                        }
                    });

                    // Add selectionChanged event listener
                    StackedVizFrame.attachSelectData(this.onSelectData, this);
                } else {
                    console.error("StackedVizFrame is not found");
                }
            },

            _setCustomFormatter: function () {
                var chartFormatter = ChartFormatter.getInstance();

                Format.numericFormatter(chartFormatter);

                var UI5_FLOAT_FORMAT = "CustomFloatFormat_F2";

                chartFormatter.registerCustomFormatter(UI5_FLOAT_FORMAT, function (value) {
                    var ofloatInstance = sap.ui.core.format.NumberFormat.getFloatInstance({ style: 'short', maxFractionDigits: 2 });
                    return ofloatInstance.format(value);
                });
            },

            press: function (oEvent) {
                MessageToast.show("The interactive bar chart is pressed.");
            },

            selectionChanged: function (oEvent) {
                var oBar = oEvent.getParameter("idStackedVizFrame");
                oBar.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            visible: true
                        }
                    }
                });
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
                if (sKey == "Toggle") {
                    var oSideNavigation = this.byId("sideNavigation");
                    var bExpanded = oSideNavigation.getExpanded();
                    if (bExpanded == false) {
                        this.byId("panelwidth").setHeight("327px");
                        var oVizFrame = this.getView().byId("idbar");
                        oVizFrame.setHeight("130px");
                    } else if (bExpanded == true) {
                        this.byId("panelwidth").setHeight("365px");
                    }
                    oSideNavigation.setExpanded(!bExpanded);
                } else {
                    UIComponent.getRouterFor(this).navTo(sKey);
                }
            },

            onTicketButtonClick: function () {
                window.open("https://rptrs.freshdesk.com/support/login", "_blank");
            },

            onNotificationButtonClick: function () {
                window.open("https://rptrs.freshdesk.com/support/login", "_blank");
            },

            onProfileSettingButtonClick: function () {
                window.open("https://salesdemo.successfactors.eu/login#/companyEntry", "_blank");
            },

            onSelectData: function (oEvent) {
                var oData = oEvent.getParameter("data")[0].data;

                // Show the data labels
                this.StackedVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            visible: true
                        }
                    }
                });
            }
        });
    });
