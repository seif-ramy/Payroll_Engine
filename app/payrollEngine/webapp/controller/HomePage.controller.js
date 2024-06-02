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
    function (Controller, UI5Date, CalendarLegendItem, DateTypeRange, JSONModel, Core, MessageToast, UIComponent,ChartFormatter,
        Format) {
        "use strict";

        return Controller.extend("sp.payrollEngine.controller.HomePage", {
            onInit: function () {
                this._setModel();
                this._setCustomFormatter();
                var navigationList = this.byId("navigationList");
                navigationList.setSelectedItem(null);
                //Calendar and legend initialization
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
            _setModel:function(){

                var aData = {
                        Items : [  
                            {
                                Name:"Salaries",
                                Number : 25370000
                            },
                            {
                                Name:"Benefits",
                                Number : 7610000
                            },
                            {
                                Name:"Overtime",
                                Number : 15220000
                            },
                            {
                                Name:"Taxes",
                                Number : 2540000
                            }
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
                }
                
                var oModel = new JSONModel();
                oModel.setData(aData);
                this.getView().setModel(oModel, "DataModel");

                var oChart = this.getView().byId("idpiechart"),
                oChartProperties = oChart.getVizProperties(),
                aColorPalate = ["#43BECC","#8E257A","#121B43","#E21F4A"];
                oChartProperties.plotArea.colorPalette = aColorPalate;
                oChart.setVizProperties(oChartProperties);

                Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;
                var StackedVizFrame = this.byId("idStackedVizFrame");
                StackedVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            formatString:formatPattern.SHORTFLOAT_MFD2,
                            visible: false,
                            showTotal: false,
                                                              
                        },
                        drawingEffect: 'glossy',
                        colorPalette: ["#43BECC","#121B43"]
                    },
                    valueAxis: {
                        label: {
                            formatString: formatPattern.SHORTFLOAT
                        },
                        title: {
                            visible: false
                        }
                    },
                    valueAxis2: {
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
                        text: 'Actual payout vs Retro payout for Q1, 2024'
                    }
                });


    },

    _setCustomFormatter:function(){	
        var chartFormatter = ChartFormatter.getInstance();
        
        Format.numericFormatter(chartFormatter);
        
        var UI5_FLOAT_FORMAT = "CustomFloatFormat_F2";
        
        chartFormatter.registerCustomFormatter(UI5_FLOAT_FORMAT, function(value) {
        var ofloatInstance =  sap.ui.core.format.NumberFormat.getFloatInstance({style: 'short',maxFractionDigits: 2});
        return ofloatInstance.format(value);
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
                // var Id = oEvent.getParameter("item").getId();//NavigationListItem Currently selected
                // this.byId("navigationList").setSelectedItem(Id);
                if(sKey=="Toggle"){
                    var oSideNavigation = this.byId("sideNavigation");
                    var bExpanded = oSideNavigation.getExpanded();
                    //law bExpanded b false yeb2a expanded w law bExpanded b true yeb2a collapsed
                    // if(bExpanded==false){
                    //     this.byId("_IDGenVBox16").setHeight("440px"); 
                    //     //this.byId("_IDGenPanel14").setHeight("500px");
                    // }
                    // else if(bExpanded==true){
                    //     this.byId("_IDGenVBox16").setHeight("440px"); 
                    //     //this.byId("_IDGenPanel14").setHeight("460px");
                    // }
                    oSideNavigation.setExpanded(!bExpanded);
                }
                
                else{
                    UIComponent.getRouterFor(this).navTo(sKey);
                }

                //console.log(this.byId("navigationList").getSelectedItem());

            },
            onTicketButtonClick: function () {
                window.open("https://rptrs.freshdesk.com/support/login", "_blank");
            },
            onNotificationButtonClick: function () {
                window.open("https://rptrs.freshdesk.com/support/login", "_blank");
            },
            onProfileSettingButtonClick: function () {
                window.open("https://salesdemo.successfactors.eu/login#/companyEntry", "_blank"); 
            }
           
        });
    });
