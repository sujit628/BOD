
$(document).ready(function () {
    $('.alphabets').on('input', function () {

        let inputValue = $(this).val();

        let alphabeticValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

        $(this).val(alphabeticValue);
    });
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
    txtApntDate = $("#txtApntDate").val();


    if (txtApntDate == "") {
        document.getElementById("txtApntDate").value = today;
    }

    DropdownBinder.DDLData = {
        tableName: "SectorSetUp_SM",
        Text: 'SM_SectorName',
        Value: 'SM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlSector");
    DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "EnterpriseTypeSetUp_ETM",
    //    Text: 'ETM_EnterpriseType',
    //    Value: 'ETM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlBusinessType");
    //DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "CountryMasterSetUp_CM",
        Text: 'CM_CountryName',
        Value: 'CM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlCountry");
    DropdownBinder.Execute();

    //DropdownBinder.DDLData = {
    //    tableName: "ProvinceSetUp_PM",
    //    Text: 'PM_Province',
    //    Value: 'PM_Id'
    //};
    //DropdownBinder.DDLElem = $("#ddlProvince");
    //DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "LegalEntitySetUp_LEM",
        Text: 'LEM_LegalEntity',
        Value: 'LEM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlLegalEntity");
    DropdownBinder.Execute();

});

$("#btnSave").click(function () {
    SaveRecords();
});
function SaveRecords() {

    var _data = JSON.stringify({
        entity: {
            SMME_Id: $('#hdnId').val(),
           // SMME_PrimaryContactName: $.trim($('#txtContactName').val()),

            SMME_PrimaryContactFirstName: $.trim($('#txtContactFirstName').val()),
            SMME_PrimaryContactLastName: $.trim($('#txtContactLastName').val()),

            SMME_PrimaryContactEmail: $('#txtContactEmail').val(),
            SMME_Password: $('#txtPassword').val(),
            SMME_SecondaryContactName: $('#SecondaryContactName').val(),
            SMME_SecondaryContactEmail: $('#SecondaryContactEmail').val(),
            SMME_PrimaryContactNo: $('#PrimaryContactNumber').val(),
            SMME_SecondaryContactNo: $('#SecondaryContactNumber').val(),

            SMME_CompanyName: $.trim($('#txtCompanyName').val()),
            SMME_RegNumber: $('#txtRegNum').val(),
            SMME_SectorId: $('#ddlSector').val(),
            SMME_SMMETypeId: $('#ddlBusinessType').val(),
            SMME_CountryId: $('#ddlCountry').val(),
            SMME_ProvinceId: $('#ddlProvince').val(),
            SMME_BusinessAddress: $('#txtBusinessAddress').val(),

            SMME_LegalEntityTypeId: $('#ddlLegalEntity').val(),
            SMME_TaxNumber: $('#txtTaxNumber').val(),
            SMME_VatNumber: $('#txtVatNumber').val(),
            SMME_IncorporationDate: $('#txtIncorporationDate').val(),
            SMME_RegNum2: $('#txtRegNum2').val(),
            
            SMME_BillingContactNumber: $('#txtBillingContactNum').val(),
            SMME_BillingAddress: $('#txtBillingAddress').val(),
            
        }
    }); $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateSMMERegistration',
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                if (data.Id > 0) {
                SendMail()
                    //Swal.fire({
                    //    title: data.Message,
                    //    icon: "success",
                    //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    //    buttonsStyling: !1
                    //});
                    //$(".form-control").val('')
                    //window.location.href='/Account/SMMELogin'
                    //GetUSMMELoginForAfterReg(data.Id);
                }
                else {
                    Swal.fire({
                        title: data.Message,
                        icon: "error",
                        customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                        buttonsStyling: !1
                    });
                }
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
function GetUSMMELoginForAfterReg(Id) {

    var _data = JSON.stringify({
        global: {
            param1Value: Id,

        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetUSMMELoginForAfterReg",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            //data = JSON.parse(data);
            //$('#spnHeadName').text(data[0].ENR_CompanyName);
            //$('#spnHeadRole').text(data[0].UM_SubRole);
            //$('#spnCity').text(data[0].PM_Province);
            //$('#spnDate').text(data[0].ENR_CreatedDate);

            //if (data["ENR_Logo"] == "NO") {
            //    //$('#prfpicIMG').attr('src', '/Content/assets/img/avatars/default_photo.png');

            //    $('#dvPic').html('<div class="avatar avatar-xl d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"> <span class="avatar-initial  bg-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + '>' + data["ENR_PreFix"] + '</span></div>');
            //    //<div class="avatar avatar-xl d-block h-auto ms-0 ms-sm-4 rounded user-profile-img">
            //    //         <span class="avatar-initial  bg-@list[index]">@Model.ENR_Prefix</span>
            //    //     </div>
            //}
            //else {


            //    $('#prfpicIMG').attr('src', data["ENR_Logo"]);
            //}
            window.location.href = '/SMME/SMMEDashBoard';
        },
        error: function (data) {
            window.location.href = '/SMME/SMMEDashBoard';
        }
    });
    return false;

}


function SendMail() {
    $('#btnSave').prop('disabled', true);
    $("#btnSave").html('Please Wait.....');

    var action = 'smmeregistration';

    var _data = JSON.stringify({
        emailcontent: {
            UserName: $('#txtContactFirstName').val(),
            SMMEName: $('#txtCompanyName').val(),
            Email: $('#txtContactEmail').val(),
        },
        Action: action
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetEmailExistsByTemplate",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.IsSuccess === true) {
                Swal.fire({
                    title: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                $(".form-control").val('')
                window.location.href='/Account/SMMELogin'
                //Swal.fire({
                //    title: "Project created successfully..!",
                //    icon: "success",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //}).then((result) => {

                //    if (result.isConfirmed) {

                //        if ($('#EntrId').val() > 0) {
                //            window.location.href = "/Project/ProjectListForEnterprise";
                //        }
                //        else {
                //            window.location.href = "/Project/ProjectListForAdmin";
                //        }

                //    }


                //});
                $(document).ajaxStop(function () {
                    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 0.5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })

                });
                $("#btnSave").html('Save');
                $('#btnSave').removeAttr('disabled');


            } else {
                Swal.fire({
                    title: "Invalid email, try another email..!",
                    icon: "warning",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: false
                });
                $("#btnSave").html('Save');
                $('#btnSave').removeAttr('disabled');
                //setTimeout(function () {
                //    window.location.reload();  
                //}, 2000);
            }
        },
        error: function () {
            Swal.fire({
                title: "Process not complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });
        }
    });
}

