var ProjId;
$(document).ready(function () {

    var Id = getParameterByName('Id');
    //var TDId = getParameterByName('TDId');
    if (Id > 0) {
        ProjId=Id;

        BindGrid();
    }
    else
    { BindGridForList();
       
    }
       
        //Id = getParameterByName('Id');
        //var CAId = getParameterByName('CAId');
        //if (Id > 0) {
        //    BindGrid(Id,CAId);
    
        //}

});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function BindGrid() {
    var EnterId = $('#EnterpriseId').val();
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.param1,
            param1Value: parseInt(ProjId),
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data, status) {
            data = JSON.parse(data);
            var v = '/Project/ProjectDetailsNew?Id=';
            var Mval = "";
            if (EnterId > 0) {
                Mval = 'E';
            }
            else {
                Mval = '';
            }
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                     {
                         targets: 0,
                         render: function (e, t, a, s) {
                             var m = a.PD_Id;
                             return (
                                                            '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><a href="' + v + m + '" target="_blank"><span class=" fw-normal text-' +
                                       ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                       '">' +
                                            a.PD_ProjectName +
                                            '</span></a><small class="text-muted">' +
                                            a.CA_DurationFromDate + ' - ' + a.CA_DurationToDate +
                                            "</small></div></div>"
                                        );
                         },
                     },
                    {
                        targets: 4,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        render: function (data, type, row) {
                            
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Project/CreateActivity?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '"  ><i class="ti ti-edit"></i></a><a href="javascript:;" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="/Project/CreateTask?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" >Create Task</a><a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">View Task</a>' + (row.IsCompleted == 1 ? "" : "<a class='dropdown-item' onclick='ActivityCompleted(" + row.CA_Id + ")'> Completed </a>") + '</div></div>';
                        },
                    },
                ],
                order: [0, "desc"],
                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search },
                buttons: [
                 {
                     text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Create Activity</span>',
                     className: "add-new btn btn-primary ms-2 waves-effect waves-light btn-shadow-primary",
                     
                     action: function (e, dt, node, config)
                     {
                         //This will send the page to the location specified
                         window.location.href = '/Project/CreateActivity?M=E&Id='+ProjId+'';
                     }
                 },
                     
                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                var name = e.data().full_name ? e.data().full_name : e.data().PD_ProjectName;
                                return "Details of " + (name || "Name not found");
                            },
                        }),
                        type: "column",
                        renderer: function (e, t, a) {
                            a = $.map(a, function (e, t) {
                                return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td> ' + e.title + ':</td> <td class="ps-0">' + e.data + "</td></tr>" : "";
                            }).join("");
                            return !!a && $('<table class="table"/><tbody />').append(a);
                        },
                    },
                },
            })
            $(".dt-action-buttons").addClass("pt-0"),
            $(".dataTables_filter").addClass("me-3 ps-0"),

        setTimeout(() => {
            $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
        }, 300);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    });
}

function BindGridForList() {
    var EnterId = $('#EnterpriseId').val();
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.param1,
            param1Value: parseInt(ProjId),
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data, status) {
            data = JSON.parse(data);
            var v = '/Project/ProjectDetailsNew?Id=';
            var Mval = "";
            if (EnterId > 0) {
                Mval = 'E';
            }
            else {
                Mval = '';
            }
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                        {
                            targets: 0,
                            render: function (e, t, a, s) {
                               var m = a.PD_Id;
                                return (
                                                            '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><a href="' + v + m + '" target="_blank"><span class=" fw-normal text-' +
                                        ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                        '">' +
                                                            a.PD_ProjectName +
                                                            '</span></a><small class="text-muted">' +
                                                            a.CA_DurationFromDate + ' - ' + a.CA_DurationToDate +
                                                            "</small></div></div>"
                                                        );
                            },
                        },
                    {
                        targets: 4,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        render: function (data, type, row) {
                            
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><a class="btn btn-sm btn-icon btnEdit" href="/Project/CreateActivity?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '"  ><i class="ti ti-edit"></i></a><a href="javascript:;" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="/Project/CreateTask?M=' + Mval + '&Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" >Create Task</a><a href="/Project/TaskList?Id=' + row.CA_ProjectId + '&CAId=' + row.CA_Id + '" class="dropdown-item" target="_blank">View Task</a>' + (row.IsCompleted == 1 ? '' : "<a class='dropdown-item text-black' onclick='ActivityCompleted(" + row.CA_Id + ")'> Completed </a>") + '</div></div>';
                        },
                    },
                ],
                order: [0, "desc"],
                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search },
                buttons: [
                 
                     
                ],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                var name = e.data().full_name ? e.data().full_name : e.data().PD_ProjectName;
                                return "Details of " + (name || "Name not found");
                            },
                        }),
                        type: "column",
                        renderer: function (e, t, a) {
                            a = $.map(a, function (e, t) {
                                return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td> ' + e.title + ':</td> <td class="ps-0">' + e.data + "</td></tr>" : "";
                            }).join("");
                            return !!a && $('<table class="table"/><tbody />').append(a);
                        },
                    },
                },
            })
            $(".dt-action-buttons").addClass("pt-0"),
            $(".dataTables_filter").addClass("me-3 ps-0"),

        setTimeout(() => {
            $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
        }, 300);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('request failed');
        }
    });
}



function ActivityCompleted(id) {

    var _data = JSON.stringify({
        entity: {
            TransactionType: "IsCompleted",
            CA_Id: id,
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertCreateActivity',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log('gsjfcgsdjff', data)
            if (data != null && data != undefined && data.IsSuccess == true) {
                if (data.Id > 0) {
                    Swal.fire({
                        title: 'Activity completed successfully..!',
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false,
                    }).then(() => {
                        location.reload();
                    });
                } else {

                    Swal.fire({
                        title: 'This activity already completed',
                        icon: "error",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false
                    });
                }
            } else {

                Swal.fire({
                    title: data.Message || "Unexpected error occurred.",
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
            }
        },
        error: function (data) {

            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}
