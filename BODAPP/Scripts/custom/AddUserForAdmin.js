/// <reference path="financialyearmaster.js" />
//Get Data From URL   
var Id = 0;
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var formElem = document.getElementById("formEnterpriseUser");
function SaveRecords() {
   
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        User: {
            UM_Id: $('#Id').val(),
            UserName: $.trim($('#txtUserName').val()),
            UM_EmailId: $('#txtUserEmail').val(),
            UM_ContactNo: $('#txtContact').val(),
            UM_ProfilePic: $('#hdnupload').val(),
            UM_Role: 'A',
            UM_SubRoleId: $('#ddlRole').val(),
            UM_SubRole: $('#ddlRole option:selected').text(),
            UM_Age: $('#txtAge').val(),
            UM_Gender: $('#ddlGender').val()
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.SaveRecordData,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Your Save Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                window.location.href = "/Home/ViewAllUser";

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
                title:"Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}
$(document).ready(function () {
     $('.alphabets').on('input', function () {

        let inputValue = $(this).val();

        let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

        $(this).val(alphabeticValue);
    });
    DropdownBinder.DDLData = {
        tableName: "RoleSetUp_RM",
        Text: 'RM_Role',
        Value: 'RM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlRole");
    DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "EnterpriseRegistration_ENR",
    //    Text: 'ENR_CompanyName',
    //    Value: 'ENR_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlEnterprise");
    //DropdownBinder.Execute();

    $("#alrtmainDiv").hide();
    //$("#lnkSaveUser").click(function () {
    //    SaveRecord();
    //});
    $("#lnlcncl").click(function () {
        location.reload();
    });
    var Id = getParameterByName('Id');
    if (Id != '') {
        retrive(Id);
        $('#Id').val(Id);
    }
    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/userpic.png');
});

$(function () {
    var e = $(".ddlEnterprise");
    var f = $(".ddlRole");
    var h = $(".ddlGender");
    h.length &&
h.each(function () {
    var h = $(this);
    h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select A Gender", dropdownParent: h.parent() });
});
    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Enterprise", dropdownParent: e.parent() });
        });

    f.length &&
       f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Role", dropdownParent: f.parent() });
       });

    FormValidation.formValidation(formElem, {
        fields: {
            txtUserName: {
                validators: {
                    notEmpty: {
                        message: "Please enter Username"
                    }
                }
            },
            txtUserEmail: {
                validators: {
                    notEmpty: {
                        message: "Please enter Email"
                    },
					emailAddress: { message: "The value is not a valid email address" }
                }
            },
            txtContact: {
                validators: {
                    notEmpty: {
                        message: "Please enter Contact Number"
                    }
                }
            },
            
            ddlRole: {
                 validators: {
                     notEmpty: {
                         message: "Please Select Role"
                     }
                 }
             },

        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                eleValidClass: "is-valid",
                rowSelector: function (formElem, t) {
                    return ".mb-3";
                },
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            autoFocus: new FormValidation.plugins.AutoFocus(),
        },
    }).on('core.form.valid', function () {

        SaveRecords();
    });
}),


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.Param,
            param1Value: parseInt(id),
            param2: 'UM_MainID',
            
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetEntityMasterById,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            //data = JSON.parse(data);
            $('#Id').val(data["UM_Id"]);
            $('#txtUserName').val(data["UM_Name"]);
            $('#txtUserEmail').val(data["UM_EmailId"]);
            $('#txtContact').val(data["UM_ContactNo"]);
            //$('#ddlEnterprise').val(data["UM_ParentId"]).change();
            $('#ddlRole').val(data["UM_SubRoleId"]).change();
            $('#txtAge').val(data["UM_Age"]);

            $('#ddlGender').val(data["UM_Gender"]).change();
            if (data["UM_ProfilePic"] == "NO") {

                $('#dvImage').css('display', 'none');

                var avatar = ' <div class="avatar avatar-xl"><span class="avatar-initial bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '">' + data["UM_Prefix"] + '</span></div>';
                $('#dvAvatar').append(avatar);
            }
            else {
                $('#dvAvatar').css('display', 'none');
                $('#hdnupload').val(data["UM_ProfilePic"]);
                $('#prfpicIMG').attr('src', data["UM_ProfilePic"]);
            }
        },
        error: function (data) {
            Swal.fire({
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
    return false;

}
//For upload file into folder
function UploadDoc(upload) {
    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }
    $.ajax({
        type: "POST",
        url: '/ScriptJson/Upload',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (response) {
            $('#dvAvatar').css('display', 'none');
            $('#dvImage').css('display', 'block');
            if (Id > 0) {
               
                UpdatePhoto();
            }

        }
    });
}
function UpdatePhoto() {
    Id = getParameterByName('Id');
    if ($('#Id').val() == "") {
        var id = Id;
    } else {
        var id = $('#hdnId').val();
    }
    var _data = JSON.stringify({
        entr: {
            UM_Id: id,
            UM_ProfilePic: $('#hdnupload').val(),
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/EnterpriseUserPhotoUpdate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: data.Message,
                    icon: "success",
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


function fnCancelRedirect() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, Cancel it!",
        customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then(function (t) {
        t.value && Swal.fire({
            icon: "danger",
            title: "Cancel!",
            text: "Your data has been cleared.",
            customClass: { confirmButton: "btn btn-danger waves-effect waves-light" }
        }).then(function () {
            //$('#formAccountSettings').trigger("reset");
            window.location.href = "/Home/ViewAllUser";
        });

    });
}
function ShowPreview(input) {

    var fileInput = $('#upload');
    var maxSize = fileInput.data('max-size');

    var size = bytesToSize(maxSize);

    if (fileInput.get(0).files.length) {
        var fileSize = fileInput.get(0).files[0].size; // in bytes


        if (fileSize > maxSize) {

            Swal.fire({
                title: 'File size is more then ' + size + 'b',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
            return false;
        }

        else {
            if (input.files && input.files[0]) {
                var ImageDir = new FileReader();
                ImageDir.onload = function (e) {
                    $('#prfpicIMG').attr('src', e.target.result);
                }

                ImageDir.readAsDataURL(input.files[0]);

                UploadDoc('upload');
                pathFl = $('#upload').val().substring(12);
                pathStringFl = '/Upload/' + pathFl;
                var hdnImagePath = pathStringFl;
                $('#hdnupload').val(hdnImagePath);
            }
        }
    } else {

        Swal.fire({
            title: 'choose any one image, please',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

}
function bytesToSize(bytes) {
    var sizes = ['B', 'K', 'M', 'G', 'T', 'P'];
    for (var i = 0; i < sizes.length; i++) {
        if (bytes <= 1024) {
            return bytes + ' ' + sizes[i];
        } else {
            bytes = parseInt(bytes / 1000);
        }
    }
    return bytes + ' P';
}
$("#btnResetUpload").on("click", function () {

    $('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');
});
$("#btnCancelRedirect").on("click", function () {
    fnCancelRedirect();
});