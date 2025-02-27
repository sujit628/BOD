var EntId = "";
var ProjId="";
$(document).ready(function () {

    InitUI();
   

});

function InitUI() {

    BindGrid();
}

function BindGrid() {
    //var _data = JSON.stringify({
    //    global: {
    //        TransactionType: globalData.TransactionType,
    //        param1: 'EnterpriseId',
    //        param1Value: $('#EnterpriseId').val(),
    //        StoreProcedure: globalData.StoreProcedure
    //    }
    //});


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAssignProjectForSMMEFromEntrpStakeholder',
            param1: 'EnterpriseId',
            param1Value: parseInt($('#hdnEntrId').val()),
            param2: 'StakeholderId',
            param2Value: parseInt($('#hdnStakeHolderId').val()),
            StoreProcedure: 'ProjectDetails_USP'
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
            var oTable = $('#datatable-example').DataTable({
                data: data,
                columns: columnData,
                columnDefs: [
                    {
                        targets: 0,
                        render: function (e, t, a, s) {
                            return (
                                                           '<div class="d-flex justify-content-start align-items-center user-name"><div class="d-flex flex-column"><span class=" fw-normal text-' +
                                      ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                      '">' +
                                                           a.PD_ProjectName +
                                                           '</span></a><small class="text-muted">' +
                                                           a.PD_DurationFromDate +' // '+ a.PD_DurationToDate+
                                                           "</small></div></div>"
                                                       );
                        },
                    },
                    {
                        targets: 3,
                        title: "Actions",
                        //searchable: !1,
                        //orderable: !1,
                        render: function (data, type, row) {
                            return '<div class="d-flex align-items-sm-center justify-content-sm-center"><button class="btn btn-sm btn-icon btnEdit" data-bs-target="#shareProject" data-bs-toggle="modal" onclick="ShowAllSMME(' + row.PD_Enterpriseid + ','+row.PD_Id+')" data-bs-dismiss="modal"><i class="ti ti-users-plus"></i></button></div>';

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
                                return "Details of " + e.data().SectorName;
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
function ShowAllSMME(id, PdId) {

    EntId = id;
    ProjId=PdId;
    //alert(PdId);
    $("#ulSmmeList").html("");
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseWiseSMMEForStakeholder',
            param1: 'StakeholderId',
            param1Value: parseInt($('#hdnStakeHolderId').val()),
            param2: 'PD_Id',
            param2Value: parseInt(PdId),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetEntityMasterById,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            var count = data.length;
            $.each(data, function (i, v) {
                var logo="";
                var index = i + 1;
                if(v.SMME_Logo=="")
                {
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-'+ ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] +'">'+v.SMME_Prefix+'</span> </div><div class="ms-1"><h6 class="mb-0">'+ v.SMME_CompanyName +'</h6><span>'+ v.SMME_PrimaryContactEmail +'</span></div></div>';
                }
                else{
                    logo='<div class="d-flex flex-grow-1"><div class="avatar me-2">  <img src="'+ v.SMME_Logo +'" alt="Avatar" class="rounded-circle"> </div><div class="ms-1"><h6 class="mb-0">'+ v.SMME_CompanyName +'</h6><span>'+ v.SMME_PrimaryContactEmail +'</span></div></div>';

                }
                //$("#ulProjectList").append("<li class='d-flex flex-wrap mb-3'><div class='d-flex flex-grow-1 justify-content-between'><div class=me-2><h6 class=mb-0>" + v.PD_ProjectName + "</h6><p class='mb-0 text-muted'>Duration: " + v.PD_DurationFromDate + "-" + v.PD_DurationToDate + "</div><div class='d-flex align-items-center col-3 justify-content-end'><div class='form-check form-switch'><input class='float-end form-check-input' type='checkbox' id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.PD_Id + ")'></div></div></div>");
                $("#ulSmmeList").append("<li class='d-flex flex-wrap mb-3'>" + logo + "<div class='form-check form-switch'><input class='float-end form-check-input'type=checkbox " + v.checked + " id='chkId_" + index + "' onclick='AssignProject(" + index + "," + v.SMME_Id + ")'></div>");

            });

        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function AssignProject(index, SmmeId) {
    var TransactionType = "";
    if ($('#chkId_' + index).is(':checked')) {

        TransactionType = 'Insert';
    } else {

        TransactionType = 'Update';
    }

    var _data = JSON.stringify({
        entity: {

            TransactionType: TransactionType,
            PSM_EnterpriseId: EntId,
            PSM_SmmeId: SmmeId,
            PSM_ProjectId: ProjId

        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/AssignProjectToSMME',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Your Changes Successfully done!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
            else {

                Swal.fire({
                    title: data.Message,
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
            }
        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Complete',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}