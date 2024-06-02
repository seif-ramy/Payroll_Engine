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
                    if(bExpanded==false){
                        this.byId("_IDGenVBox16").setHeight("442px"); 
                        //this.byId("_IDGenPanel14").setHeight("500px");
                    }
                    else if(bExpanded==true){
                        this.byId("_IDGenVBox16").setHeight("435px"); 
                        //this.byId("_IDGenPanel14").setHeight("460px");
                    }
                    oSideNavigation.setExpanded(!bExpanded);
                }
                
                else{
                    UIComponent.getRouterFor(this).navTo(sKey);
                }

                //console.log(this.byId("navigationList").getSelectedItem());

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
            }
           
        });
    });
