var SMMLogoList = '';
$(document).ready(function () {
    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 6e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })

    fnProjectForEnterprise();

});

function showDocument() {
    //$(".add-new").trigger("click");
    $('#setUPFormPopUp').addClass('show');
    $('.btn-close').click(function () {

        $('#setUPFormPopUp').removeClass('show');
        $('.form-control').val('');
    });

}
$('#btnreset').click(function () {
    $('.form-control').val('');
    $('#setUPFormPopUp').removeClass('show');
  
});
function fnSmmeForEnterprise(ProjectId) {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectWiseSMMELogo',
            param1: 'PD_Id',
            param1Value: parseInt(ProjectId),
            StoreProcedure: 'ProjectDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async:false,
        success: function (data) {
            data = JSON.parse(data);
            var count = data.length;
            SMMLogoList = '';
            if (count > 0) {
                $.each(data, function (i, v) {

                    SMMLogoList = SMMLogoList + v.SMME_Logo;

                });
            }
            else {
                SMMLogoList = '<div class="d-flex align-items-center" >No MSME Found</div>';
            }
            
        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function fnProjectForEnterprise() {


    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectProjectForStakeholder',
            param1: 'EnterpriseId',
            param1Value: parseInt($('#hdnEntrId').val()),
            param2: 'PWS_StakeholderId',
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
        success: function (data) {

          //  console.log('This is Data:  ',data);

            data = JSON.parse(data);
            var count = data.length;
            $.each(data, function (i, v) {
                var index = i + 1;
                var active = '';
                if (index == 1)
                { active = 'active' }
                var line = '';
              
                if (count > 0) {
                    fnSmmeForEnterprise(v.PD_Id);
                    //$("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class=card><div class=card-header><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href=javascript:;>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=#>Create Task</a><li><a class=dropdown-item href=javascript:void(0);>View details</a><li><a class=dropdown-item href=javascript:void(0);>Add to favorites</a><li><hr class=dropdown-divider><li><a class='dropdown-item text-danger'href=javascript:void(0);>Leave Project</a></ul></div></div></div></div><div class='card-body p-3'><div class='d-flex align-items-center flex-wrap'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0>" + v.PD_Budget + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class=mb-0>" + v.PD_Description + "</div><div class='card-body border-top'><div class='d-flex align-items-center mb-3'>Task: <span class='text-body fw-normal'>0/0</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>0% Completed</small></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:0% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1'><div class='d-flex align-items-center'>No SMME Found</div><div class=ms-auto><a class=text-body href=javascript:void(0);><i class='ti ti-edit ti-sm'></i> </a></div></div></div></div></div>");
                    //$("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3' ><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt=Avatar class=rounded-circle src=../Content/assets/img/icons/brands/social-label.png></div><div class='me-2 ms-1'><h5 class=mb-0><a class='text-body stretched-link'href='/Project/ProjectDetailsNew?Id=" + v.PD_Id + "'>" + v.PD_ProjectName + "</a></h5></div></div><div class=ms-auto><div class='dropdown z-2'><button aria-expanded=false class='btn dropdown-toggle hide-arrow p-0'data-bs-toggle=dropdown type=button><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class=dropdown-item href=/Project/ProjectDetails?Id=" + v.PD_Id + ">Edit</a></li><li><a class=dropdown-item href=/Project/CreateActivity?Id=" + v.PD_Id + "&M=E>Create Activity</a></li></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class=mb-0> R " + formatNumber(v.PD_Budget) + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class=mb-0>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class=mb-1>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class=mb-1>Task: <span class='text-body fw-normal'>" + v.TaskCountCompleted + "/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'> <small>" + v.Status + "% Completed</small><button class='btn btn-sm btn-secondary py-1' data-bs-target='#asignShareholder' data-bs-toggle='modal' onclick='ShowList("+ v.PD_Id +")' data-bs-dismiss='modal' >Assign</button></div><div class='mb-2 progress'style=height:8px><div class=progress-bar style=width:" + v.Status + "% aria-valuemax=100 aria-valuemin=0 aria-valuenow=95 role=progressbar></div></div><div class='d-flex align-items-center pt-1' style='min-height: 40px;'><div class='d-flex align-items-center'><ul class='list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1'>" + SMMLogoList + "</ul></div></div></div></div></div>");
                    $("#dvproject").append("<div class='col-lg-6 col-md-6 col-xl-4'><div class='card'><div class='card-header p-1 py-3'><div class='d-flex align-items-start'><div class='d-flex align-items-start'><div class='avatar me-2'><img alt='Avatar' class='rounded-circle' src='../Content/assets/img/icons/brands/social-label.png'></div><div class='me-2 ms-1'><h5 class='mb-0'><a class='text-body stretched-link' href='/Stakeholder/ProjectDetailsNew?Id=" + v.PD_Id + "'>" + v.PD_ProjectName + "</a></h5></div></div><div class='ms-auto'><div class='dropdown z-2'><button aria-expanded='false' class='btn dropdown-toggle hide-arrow p-0' data-bs-toggle='dropdown' type='button'><i class='text-muted ti ti-dots-vertical'></i></button><ul class='dropdown-menu dropdown-menu-end'><li><a class='dropdown-item' href='/Stakeholder/ProjectDetails?Id=" + v.PD_Id + "'>Edit</a></li>" + (v.IsCompleted == 1 ? '' : "<li><a class='dropdown-item' onclick='ProjectCompleted(" + v.PD_Id + ")'> Completed </a></li>") + "<li><a class='dropdown-item' href='/Stakeholder/CreateActivity?Id=" + v.PD_Id + "&M=E'>Create Activity</a></li></ul></div></div></div></div><div class='card-body p-2 py-3'><div class='d-flex align-items-center flex-wrap justify-content-between'><div class='mb-3 bg-lighter me-auto px-3 py-2 rounded'><h6 class='mb-0'> R " + formatNumber(v.PD_Budget) + "</h6><span>Total Budget</span></div><div class='mb-3 text-end'><h6 class='mb-0'>Start Date: <span class='text-body fw-normal'>" + v.PD_DurationFromDate + "</span></h6><h6 class='mb-1'>Deadline: <span class='text-body fw-normal'>" + v.PD_DurationToDate + "</span></h6></div></div><p class='mb-0 ellipsisWrap-new-ln'>" + v.PD_Description + "</p></div><div class='card-body p-2 py-3 border-top'><div class='d-flex align-items-center mb-3'><h6 class='mb-1'>Task: <span class='text-body fw-normal'>" + v.TaskCountCompleted + "/" + v.TaskCount + "</span></h6><span class='ms-auto badge bg-label-success'>" + v.ProjectDaysLeft + " Days left</span></div><div class='d-flex align-items-center justify-content-between mb-2 pb-1'><small>" + v.Status + "% Completed</small></div><div class='mb-2 progress' style='height:8px'><div class='progress-bar' style='width:" + v.Status + "%' aria-valuemax='100' aria-valuemin='0' aria-valuenow='95' role='progressbar'></div></div><div class='d-flex align-items-center pt-1' style='min-height: 40px;'><div class='d-flex align-items-center'><ul class='list-unstyled d-flex align-items-center avatar-group mb-0 z-2 mt-1'>" + SMMLogoList + "</ul></div></div></div></div>");
                    // <button class='btn btn-sm btn-primary py-1' data-bs-target='#asignShareholder' data-bs-toggle='modal' onclick='showEnterpriseList(" + v.PD_Enterpriseid + ","+v.PD_Id+ ");'>Assign</button>
                }
                else {
                    $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
                }

            });
            if (count == 0) {
                $("#dvproject").append('<div class=card><div class=layout-demo-wrapper><div><h3>No Data Found</h3><br></div></div></div>');
            }

        },
        error: function (data) {
            Swal.fire({
                title: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}

function FileUpload(input) {
    var file = $('#uploadFile');
    var fileInput = $('#uploadFile')[0].files[0];
    
    var size = bytesToSize(200000);
    if (fileInput.size > 200000) {

        Swal.fire({
            title: 'File size is more then ' + size + 'b',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

    else {
        if ($('#uploadFile').prop('files') && $('#uploadFile').prop('files')[0]) {
            var fileDir = new FileReader();
            fileDir.readAsDataURL($('#uploadFile').prop('files')[0]);
            pathFl = $('#uploadFile').val().substring(12);
            pathStringFl = '/Upload/' + pathFl;
            var hdnFilePath = pathStringFl;
            $('#hdnupload').val(hdnFilePath);

            UploadDoc('uploadFile');
        } 
    } 
}

//*************retrive currency*******
function formatNumber(value) {
    let number = parseFloat(value).toFixed(2); // Ensure it's a float with 2 decimal places
    const [integerPart, decimalPart] = number.split('.');

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return formattedInteger + '.' + (decimalPart || '00');
}



function ProjectCompleted(id) {
   
    var _data = JSON.stringify({
        entity: {
            PD_Id: id,
        }
    });

    $.ajax({
        type: "POST",
        url: '/ScriptJson/UpdateProjectIsCompleted',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
   // console.log('gsjfcgsdjff',data)
            if (data != null && data != undefined && data.IsSuccess == true) {
                if (data.Id > 0) {
                    Swal.fire({
                        title: data.Message,
                        icon: "success",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: false
                    })
                } else {
                    
                    Swal.fire({
                        title: 'This project already completed',
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
