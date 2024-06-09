sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller,UIComponent) {
    "use strict";

    return Controller.extend("sp.payrollEngine.controller.PayrollPreview", {
        onInit: function () {},
        onNext: function () {
            // Navigate to the Preview Payroll page
            UIComponent.getRouterFor(this).navTo("PayrollProcessing");
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
        }
    });
});
