sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/date/UI5Date",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Core"
],
    function (Controller, UI5Date, JSONModel, Core) {
        "use strict";

        return Controller.extend("sp.payrollEngine.controller.payrollEngineController", {
            onInit: function () {
                var oModel = new JSONModel();
                oModel.setData({
                    startDate: UI5Date.getInstance("2024", "1", "14", "8", "1"),
                    people: [
                        {
                        pic: "images/NourAdel.png",
                        name: "Nour Adel Metwally",
                        mimeType: "image/png",
                        role: "HR Manager",
                        specialDates: [
                            {
                                start: UI5Date.getInstance(2024, 0, 24),
                                type: "NonWorking"
                            }
                        ],
                        appointments: [
                            {
                                start: UI5Date.getInstance("2024", "1", "8", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "8", "23", "59"),
                                title: "Meet Max Mustermann",
                                type: "Type01",
                                tentative: false
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "11", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "11", "23", "59"),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "",
                                tentative: false
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "12", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "12", "23", "59"),
                                title: "Lunch",
                                info: "canteen",
                                type: "Type06",
                                tentative: true
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "15", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "15", "23", "59"),
                                title: "Meet Max Mustermann",
                                type: "Type06",
                                tentative: false
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "16", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "16", "23", "59"),
                                title: "Discussion of the plan",
                                info: "Online meeting",
                                type: "Type01",
                                tentative: false
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "18", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "18", "23", "59"),
                                title: "Meeting with the manager",
                                type: "Type06",
                                tentative: false
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "21", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "21", "23", "59"),
                                title: "New Product",
                                info: "room 105",
                                type: "Type06",
                                tentative: true
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "25", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "25", "23", "59"),
                                title: "Lunch",
                                type: "Type06",
                                tentative: true
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "29", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "29", "23", "59"),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "",
                                tentative: false
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "3", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "3", "23", "59"),
                                title: "Meeting with the manager",
                                type: "Type06",
                                tentative: false
                            },
                            {
                                start: UI5Date.getInstance("2024", "1", "4", "0", "0"),
                                end: UI5Date.getInstance("2024", "1", "4", "23", "59"),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "",
                                tentative: false
                            },
                            {
                                start: UI5Date.getInstance("2024", "2", "30", "0", "0"),
                                end: UI5Date.getInstance("2024", "2", "30", "23", "59"),
                                title: "Working out of the building",
                                type: "Type01",
                                pic: "",
                                tentative: false
                            }
                        ],
                        headers: [
                            {
                                start: UI5Date.getInstance("2024", "1", "15", "8", "1"),
                                end: UI5Date.getInstance("2024", "1", "15", "10", "1"),
                                title: "Reminder",
                                type: "Type06"
                            },
                            {
                                start: UI5Date.getInstance("2024", "8", "1", "1", "1"),
                                end: UI5Date.getInstance("2024", "8", "30", "23", "59"),
                                title: "New quarter",
                                type: "Type10",
                                tentative: false
                            },
                            ]
                        },
                        {
                            pic: "images/DanielRagheb.png",
                            name: "Daniel Adel Ragheb",
                            mimeType: "image/png",
                            role: "Sales Manager",
                            specialDates: [
                                {
                                    start: UI5Date.getInstance(2024, 0, 13),
                                    type: "NonWorking"
                                }
                            ],
                            appointments: [
                                {
                                    start: UI5Date.getInstance("2024", "1", "10", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "10", "23", "59"),
                                    title: "Discussion of the plan",
                                    info: "Online meeting",
                                    type: "Type01",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "9", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "9", "23", "59"),
                                    title: "Workshop out of the country",
                                    type: "Type06",
                                    pic: "",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "15", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "15", "23", "59"),
                                    title: "Discussion of the plan",
                                    info: "Online meeting",
                                    type: "Type01",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "16", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "16", "23", "59"),
                                    title: "Workshop out of the country",
                                    type: "Type06",
                                    pic: "",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "11", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "11", "23", "59"),
                                    title: "Team collaboration",
                                    info: "room 1",
                                    type: "Type01",
                                    pic: "",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "3", "01", "0", "0"),
                                    end: UI5Date.getInstance("2024", "3", "01", "23", "59"),
                                    title: "Workshop out of the country",
                                    type: "Type06",
                                    pic: "",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "4", "01", "0", "0"),
                                    end: UI5Date.getInstance("2024", "4", "01", "23", "59"),
                                    title: "Out of the office",
                                    type: "Type04",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "7", "1", "0", "0"),
                                    end: UI5Date.getInstance("2024", "7", "1", "23", "59"),
                                    title: "Vacation",
                                    info: "out of office",
                                    type: "Type04",
                                    tentative: false
                                }
                            ],
                            headers: [
                                {
                                    start: UI5Date.getInstance("2024", "1", "15", "9", "1"),
                                    end: UI5Date.getInstance("2024", "1", "15", "10", "1"),
                                    title: "Payment reminder",
                                    type: "Type06"
                                }
                            ]
                },
                        {
                            pic: "images/KhadijaIbrahim.png",
                            name: "Khadija Ibrahim Abdelrahman",
                            mimeType: "image/png",
                            role: "Principal SAP Consultant",
                            specialDates: [
                                {
                                    start: UI5Date.getInstance(2024, 0, 16),
                                    end: UI5Date.getInstance(2024, 0, 16),
                                    type: "NonWorking"
                                }
                            ],
                            appointments: [
                                {
                                    start: UI5Date.getInstance("2024", "1", "15", "08", "30"),
                                    end: UI5Date.getInstance("2024", "1", "15", "09", "30"),
                                    title: "Meet John Miller",
                                    type: "Type06",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "19", "08", "30"),
                                    end: UI5Date.getInstance("2024", "1", "19", "18", "30"),
                                    title: "Meet John Doe",
                                    type: "Type06",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "2", "13", "9", "1"),
                                    end: UI5Date.getInstance("2024", "2", "13", "10", "1"),
                                    title: "Payment week",
                                    type: "Type01"
                                },
                                {
                                    start: UI5Date.getInstance("2024", "7", "1", "1", "1"),
                                    end: UI5Date.getInstance("2024", "7", "1", "23", "59"),
                                    title: "New quarter",
                                    type: "Type01",
                                    tentative: false
                                }
                            ],
                            headers: [
                                {
                                    start: UI5Date.getInstance("2024", "1", "16", "1", "1"),
                                    end: UI5Date.getInstance("2024", "1", "16", "23", "59"),
                                    title: "Private",
                                    type: "Type05"
                                }
                            ]
                        },{
                            pic: "images/MahmoudSalah.png",
                            name: "Mahmoud S Salah",
                            mimeType: "image/png",
                            role: "Program Manager",
                            specialDates: [
                                {
                                    start: UI5Date.getInstance(2024, 0, 24),
                                    type: "NonWorking"
                                }
                            ],
                            appointments: [
                                {
                                    start: UI5Date.getInstance("2024", "1", "8", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "8", "23", "59"),
                                    title: "Meet Max Mustermann",
                                    type: "Type01",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "11", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "11", "23", "59"),
                                    title: "Team meeting",
                                    info: "room 1",
                                    type: "Type01",
                                    pic: "",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "12", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "12", "23", "59"),
                                    title: "Lunch",
                                    info: "canteen",
                                    type: "Type06",
                                    tentative: true
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "15", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "15", "23", "59"),
                                    title: "Meet Max Mustermann",
                                    type: "Type06",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "16", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "16", "23", "59"),
                                    title: "Discussion of the plan",
                                    info: "Online meeting",
                                    type: "Type01",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "18", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "18", "23", "59"),
                                    title: "Meeting with the manager",
                                    type: "Type06",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "21", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "21", "23", "59"),
                                    title: "New Product",
                                    info: "room 105",
                                    type: "Type06",
                                    tentative: true
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "25", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "25", "23", "59"),
                                    title: "Lunch",
                                    type: "Type06",
                                    tentative: true
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "29", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "29", "23", "59"),
                                    title: "Team meeting",
                                    info: "room 1",
                                    type: "Type01",
                                    pic: "",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "3", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "3", "23", "59"),
                                    title: "Meeting with the manager",
                                    type: "Type06",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "1", "4", "0", "0"),
                                    end: UI5Date.getInstance("2024", "1", "4", "23", "59"),
                                    title: "Team meeting",
                                    info: "room 1",
                                    type: "Type01",
                                    pic: "",
                                    tentative: false
                                },
                                {
                                    start: UI5Date.getInstance("2024", "2", "30", "0", "0"),
                                    end: UI5Date.getInstance("2024", "2", "30", "23", "59"),
                                    title: "Working out of the building",
                                    type: "Type01",
                                    pic: "",
                                    tentative: false
                                }
                            ],
                            headers: [
                                {
                                    start: UI5Date.getInstance("2024", "1", "15", "8", "1"),
                                    end: UI5Date.getInstance("2024", "1", "15", "10", "1"),
                                    title: "Reminder",
                                    type: "Type06"
                                },
                                {
                                    start: UI5Date.getInstance("2024", "8", "1", "1", "1"),
                                    end: UI5Date.getInstance("2024", "8", "30", "23", "59"),
                                    title: "New quarter",
                                    type: "Type10",
                                    tentative: false
                                },
                                ]
                            }
                    ],
                    specialDates: [
                        {
                            start: UI5Date.getInstance("2024", "1", "16"),
                            end: UI5Date.getInstance("2024", "1", "18"),
                            type: "Type07"
                        },
                        {
                            start: UI5Date.getInstance("2024", "1", "19"),
                            end: UI5Date.getInstance("2024", "1", "19", "23", "59"),
                            type: "Type04"
                        },
                        {
                            start: UI5Date.getInstance("2024", "1", "21"),
                            end: UI5Date.getInstance("2024", "1", "21", "23", "59"),
                            type: "Type05",
                            color: "#ff69b4"
                        },
                        {
                            start: UI5Date.getInstance("2024", "1", "22"),
                            end: UI5Date.getInstance("2024", "1", "22", "23", "59"),
                            type: "Type04",
                            color: "#add8e6"
                        },
                        {
                            start: UI5Date.getInstance("2024", "6", "24"),
                            end: UI5Date.getInstance("2024", "6", "24", "23", "59"),
                            type: "Type09"
                        },
                        {
                            start: UI5Date.getInstance("2024", "6", "25"),
                            end: UI5Date.getInstance("2024", "6", "25", "23", "59"),
                            type: "Type14"
                        }
                    ],
                    legendItems: [
                        {
                            text: "Public holiday",
                            type: "Type07"
                        },
                        {
                            text: "Time-off Approved",
                            type: "Type05",
                            color: "#ff69b4"
                        },
                        {
                            text: "Time-off Pending",
                            type: "Type04",
                            color: "#add8e6"
                        }
                    ],
                    customDayModules:[
                        {
                            text:"Afternoon Shift",
                            color:"#43becc"
                        },
                        {
                            text:"Early Morning",
                            color:"#121b43"
                        },
                        {
                            text:"Late Night Shift",
                            color:"#8e257a"
                        },
                        {
                            text:"Late Afternoon",
                            color:"#bcd647"
                        }
                    ],
                    // Your other data properties
                    // legendAppointmentItems: [] // Initialize as empty array
                });
                // Load the dynamic data for legendAppointmentItems
                // this.loadLegendAppointmentItems();

                this.getView().setModel(oModel);

                var oStateModel = new JSONModel();
                oStateModel.setData({
                    legendShown: true
                });
                this.getView().setModel(oStateModel, "stateModel");
            },

            // loadLegendAppointmentItems: function () {
            //     // AJAX call or any other method to fetch the JSON data
            //     $.ajax({
            //         url: "http://localhost:4004/shiftplanning/day_Model",
            //         method: "GET",
            //         dataType: "json",  
            //         success: function (data) {
            //         console.log("hii");
            //             // Process the received data and format it as per your model structure
            //             var legendAppointmentItems = data.value.map(function (item) {
            //                 return {
            //                     text: item.externalCode,
            //                     type: "Type04", // You need to specify the type based on your application logic
            //                     color: "#43becc" // You can set a default color or determine it dynamically
            //                 };
            //             });

            //             // Get the view model and update the legendAppointmentItems property
            //             var oModel = this.getView().getModel();
            //             oModel.setProperty("/legendAppointmentItems", legendAppointmentItems);
            //         }.bind(this),
            //         error: function (error) {
            //             console.error("Error fetching legend appointment items:", error);
            //         }
            //     });
            // }
        });
    });