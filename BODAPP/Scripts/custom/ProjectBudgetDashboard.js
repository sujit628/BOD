var UserLogoList = '';
var SMMLogoList = '';
var AcivityList = '';
var EntId = '';
var Id = 0;
var TaskList = '';
var AvailBudgte = 0;
var AvailBudgteTask = 0;
var AvailBudgteSMME = 0;
let shouldPreventChange = true;
var hdnBudget = 0;
"use strict";
var GlobData = [];
var seriseData = [];
var seriseLbl = [];
var sumFundBudget = 0;
var remaningPercentage = 0;
var projectId = 0;
var ActIdForTask = 0;


!(function () {
    var e = $("#ddlBudgetType");
    var f = $("#ddlFundType");
    var g = $("#ddlActivity");
    var h = $("#ddlFundTypeAct");
    var m = $("#ddlTask");
    var l = $("#ddlFundTypeTask");
    var xm = $("#ddlFundTypeSMME");
    var xt = $("#ddlSMME");
    var ma = $("#ddlTaskActivity");
    var fn = $("#ddlBudgetDistActivity");
    var fnt = $("#ddlBudgetDistTask");
    var fns = $("#ddlBudgetDistSMME");
    var x = $("#ddlEnterprise");
    var fy = $("#ddlFinancialYear");
    
    ma.length &&
      ma.each(function () {
          var ma = $(this);
          ma.wrap('<div class="position-relative"></div>'), ma.select2({ placeholder: "Select Activity", dropdownParent: ma.parent() });
      });

    e.length &&
        e.each(function () {
            var e = $(this);
            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select A Budget Type", dropdownParent: e.parent() });
        });

    f.length &&
        f.each(function () {
           var f = $(this);
           f.wrap('<div class="position-relative"></div>'), f.select2({ placeholder: "Select A Fund Type", dropdownParent: f.parent() });
       });

    g.length &&
        g.each(function () {
           var g = $(this);
           g.wrap('<div class="position-relative"></div>'), g.select2({ placeholder: "Select Activity", dropdownParent: g.parent() });
       });

    h.length &&
        h.each(function () {
           var h = $(this);
           h.wrap('<div class="position-relative"></div>'), h.select2({ placeholder: "Select A Fund Type", dropdownParent: h.parent() });
       });

    m.length &&
        m.each(function () {
         var m = $(this);
         m.wrap('<div class="position-relative"></div>'), m.select2({ placeholder: "Select Task", dropdownParent: m.parent() });
     });

    l.length &&
        l.each(function () {
         var l = $(this);
         l.wrap('<div class="position-relative"></div>'), l.select2({ placeholder: "Select Fund", dropdownParent: l.parent() });
     });

    xm.length &&
        xm.each(function () {
       var xm = $(this);
       xm.wrap('<div class="position-relative"></div>'), xm.select2({ placeholder: "Select Fund", dropdownParent: xm.parent() });
   });

    xt.length &&
        xt.each(function () {
     var xt = $(this);
     xt.wrap('<div class="position-relative"></div>'), xt.select2({ placeholder: "Select SMME", dropdownParent: xt.parent() });


 });

    fn.length &&
       fn.each(function () {
           var fn = $(this);
           fn.wrap('<div class="position-relative"></div>'), fn.select2({ placeholder: "Select Fund Name", dropdownParent: fn.parent() });
       });

    fnt.length &&
       fnt.each(function () {
           var fnt = $(this);
           fnt.wrap('<div class="position-relative"></div>'), fnt.select2({ placeholder: "Select Fund Name", dropdownParent: fnt.parent() });
       });

    fns.length &&
       fns.each(function () {
           var fns = $(this);
           fns.wrap('<div class="position-relative"></div>'), fns.select2({ placeholder: "Select Fund Name", dropdownParent: fns.parent() });
       });

     x.length &&
       x.each(function () {
           var x = $(this);
           x.wrap('<div class="position-relative"></div>'), x.select2({ placeholder: "Enterprise", dropdownParent: x.parent() });
       });

     fy.length &&
       fy.each(function () {
           var fy = $(this);
           fy.wrap('<div class="position-relative"></div>'), fy.select2({ placeholder: "Select Date", dropdownParent: fy.parent() });
       });

})();


$(document).ready(function () {
    retriveMenuForChild();

    $("#section-block").block({ message: '<div class="spinner-border text-primary" role="status"></div>', timeout: 5e3, css: { backgroundColor: "transparent", border: "0" }, overlayCSS: { backgroundColor: "#fff", opacity: .8 } })

    Id = getParameterByName('Id');
    projectId = Id;
    var Type = getParameterByName('Type');
    $("#btnBudgetFundDistribution").prop('disabled', true);
    // $(".allcn").prop('disabled',true);

    if (Id > 0) {
        retrive(Id);

        //BindGridAct(Id);
        //BindGridTsk(Id);
        BindGridSMME(Id);

    }
    $('tr.header').click(function () {
        $(this).toggleClass('expand').nextUntil('tr.header').slideToggle(100);
    });

    DropdownBinder.DDLData = {
        tableName: "BudgetType_BT",
        Text: 'BT_Type',
        Value: 'BT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlBudgetType");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlFundType");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlFundTypeAct");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "CreateActivity_CA",
        Text: 'CA_ActivityName',
        Value: 'CA_Id',
        ColumnName: 'CA_ProjectId',
        PId: Id

    };
    DropdownBinder.DDLElem = $('#ddlActivity');
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlFundTypeTask");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem = $("#ddlFundTypeSMME");
    DropdownBinder.Execute();

    DropdownBinderJoin.DDLData = {
        tableName1: "ProjectWiseSmme_PSM",
        tableName2: "SMMERegistration_SMME",
        Text: 'SMME_CompanyName',
        Value: 'PSM_SmmeId',
        ColumnName1: 'SMME_Id',
        ColumnName: 'PSM_SmmeId',
        Param: 'PSM_ProjectId',
        PId: Id
    };
    DropdownBinderJoin.DDLElem = $("#ddlSMME");
    DropdownBinderJoin.Execute();

    DropdownBinder.DDLData = {
        tableName: "EnterpriseRegistration_ENR",
        Text: 'ENR_CompanyName',
        Value: 'ENR_Id'
    };
    DropdownBinder.DDLElem = $("#ddlEnterprise");
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "FinancialYearMaster_FM",
        Text: 'FM_FromDate',
        Value: 'FM_Id'
    };
    DropdownBinder.DDLElem = $("#ddlFinancialYear");
    DropdownBinder.Execute();


    retriveprojectbudget(Id);
});


$('#ddlBudgetType').on('change', function () {
    //var hdnBudgetType = $('#ddlBudgetType').val();
    var hdnBudgetType = $("#ddlBudgetType option:selected").text();
    console.log(hdnBudgetType)
})

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function retriveprojectbudget(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PD_Id',
            param1Value: parseInt(id),
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
            //data = JSON.parse(data);
           // console.log("BudgetType data find --", data)

            //hdnBudget = data["PD_Budget"];
            //hdnBudgetType = data["PD_BudgetType"];
            if (data["IsEnable"] == 'disabled') {
                $("#txtBudget").prop("disabled", true);
                $("#ddlBudgetType").prop("disabled", true);
            } else {
                $("#txtBudget").prop("disabled", false);
                $("#ddlBudgetType").prop("disabled", false);
            }
            //$("#txtBudget").prop("disabled", true);
            //$("#ddlBudgetType").prop("disabled", true);

            $('#hdnTotalProjectBgt').val(data["PD_Budget"]);

            $('#txtBudget').val(data["PD_Budget"]);
            $('#ddlBudgetType').val(data["PD_BudgetType"]).change();
            $('#hdnBdgtType').val($("#ddlBudgetType option:selected").text());
           // hdnBdgtType
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

function validateQTY(t) {
    var QTY = $(t).closest('tr').find('td:eq(9)').text();

    if (parseInt($(t).val()) == '' || isNaN(parseInt($(t).val()))) {

        Swal.fire({
            title: 'Quantity should not be blank',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

    var rate = $(t).closest('tr').find('td:eq(5)').text();
    var qtyr = $(t).closest('tr').find("td:eq(6) input[type='text']").val();
    var camt = parseFloat(parseInt(qtyr) * parseFloat(rate)).toFixed(2);
    $(t).closest('tr').find('td:eq(7)').text(camt);
    //var
    totalsum();


}

function CalculateAmt() {
   
    var amount = isNaN(parseFloat($('#txtAmnt').val())) ? 0 : parseFloat($('#txtAmnt').val());
    var qty = isNaN(parseInt($('#txtQty').val())) ? 0 : parseInt($('#txtQty').val());

    var totalAmount = amount * qty;
    $('#txtTotalAmnt').val(totalAmount);

    var budget = parseInt($('#hdnBdgt').val());
    if (totalAmount > budget) {

        Swal.fire({
            title: 'Total amount should be less than ' + budget,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: false
        });

        $('#btnAddBudget').attr('disabled', 'disabled');
        $('#txtAmnt').val(0);
        $('#txtTotalAmnt').val(0);

        return false; 
    }

    $('#btnAddBudget').removeAttr('disabled');
}



function CalculateAmtForActivity() {
    $('#txtTotalAmnt').val((
         isNaN(parseFloat($('#txtAmnt').val())) ? 0 : parseFloat($('#txtAmnt').val()))
         (isNaN(parseInt($('#txtQty').val())) ? 0 : parseInt($('#txtQty').val())));
    if (parseInt($('#txtTotalAmnt').val()) > parseInt($('#hdnBdgt').val())) {

        Swal.fire({
            title: 'Total amount should be less then - ' + parseInt($('#hdnBdgt').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });

        $('#btnAddBudget').attr('disabled', 'disabled');
        $('#txtAmnt').val(0);
        $('#txtTotalAmnt').val((
         isNaN(parseFloat($('#txtAmnt').val())) ? 0 : parseFloat($('#txtAmnt').val()))
                                             *
         (isNaN(parseInt($('#txtQty').val())) ? 0 : parseInt($('#txtQty').val())));
        return false;
    }
    $('#btnAddBudget').removeAttr('disabled', 'disabled');
}



function AddBudget() {
    //$('#tblBudgetFund > tbody').html('');         
    var ALreadyFbd = 0
    $('#totalFundBudget').text(isNaN(hdnBudget) ? 0 : hdnBudget);

    $.each($('#tblBudgetFund tbody tr'), function (index, value) {
        if (parseInt($(this).find("td:eq(0) option:selected").val()) == parseInt($('#ddlFundType').val())) {
            ALreadyFbd = 1;
        }
    });

    if (ALreadyFbd == 1) {
        ALreadyFbd = 1;
        Swal.fire({
            title: 'Fund already allocated ',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblBudgetFund");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var sumAllocatedBudgt = 0;
    var i = (rows.length - 1);
    tr = $('<tr/>');


    tr.append("<td><select id='ddlFundTypeTbl_" + i + "' name='ddlFundTypeTbl_" + i + "' class='select2 form-select ddlFundTypeTbl' data-allow-clear='true'></select></td>");
    tr.append("<td><select id='ddlEnterpriseTbl_" + i + "' name='ddlEnterpriseTbl_" + i + "' class='select2 form-select ddlEnterpriseTbl' data-allow-clear='true'></select></td>");

    //tr.append("<td><input type='text' value ='" + $('#txtDesc').val() + "' class='form-control' name='txtDesc_" + i + "' id='txtDesc_" + i + "' ></td>");
    tr.append("<td><input type='text' value ='" + $('#txtQty').val() + "'  class='form-control' name='txtQty_" + i + "' id='txtQty_" + i + "' onkeyup='cellAmntChngeForBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
    tr.append("<td><input type='text' value ='" + $('#txtAmnt').val() + "' class='form-control' name='txtAmnt_" + i + "' id='txtAmnt_" + i + "' onkeyup='cellAmntChngeForBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");

    tr.append("<td><input type='hidden' value ='" + $('#txtTotalAmnt').val() + "'  name='hdnTotalAmnt_" + i + "' id='hdnTotalAmnt_" + i + "' ><input type='text' value =" + $('#txtTotalAmnt').val() + "  name='txtTotalAmnt_" + i + "' id='txtTotalAmnt_" + i + "' class='form-control' disabled></td>");
    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClick(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");
    console.log(parseFloat(isNaN($('#txtTotalAmnt').val()) == true ? 0 : $('#txtTotalAmnt').val()));
    if ($('#sumAllocatedBudgtHdn').val() == "") {
        $('#sumAllocatedBudgtHdn').val(0);
    }
    sumAllocatedBudgt = (parseFloat(sumAllocatedBudgt) + parseFloat(isNaN($('#txtTotalAmnt').val()) ? 0 : $('#txtTotalAmnt').val()) + parseFloat(isNaN($('#sumAllocatedBudgtHdn').val()) ? 0 : $('#sumAllocatedBudgtHdn').val()));

    if (parseInt($('#totalFundBudget').val()) < parseInt(sumAllocatedBudgt)) {
        Swal.fire({
            title: 'Total amount should be less then - ' + parseInt($('#totalFundBudget').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }


    $('#tblBudgetFund tbody').append(tr);

    $('#sumAllocatedBudgt').val(sumAllocatedBudgt);
    $('#sumAllocatedBudgtHdn').val(sumAllocatedBudgt);

    var drp = $('#ddlFundTypeTbl_' + i + '');
    drp.length &&
        drp.each(function () {
            var drp = $(this);
            drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
        });
    var drpenr = $('#ddlEnterpriseTbl_' + i + '');
    drpenr.length &&
        drpenr.each(function () {
            var drpenr = $(this);
            drpenr.wrap('<div class="position-relative"></div>'), drpenr.select2({ placeholder: "Select Enterprise", dropdownParent: drpenr.parent() });
        });
    DropdownBinder.DDLData = {
        tableName: "FundType_FT",
        Text: 'FT_Type',
        Value: 'FT_Id'
    };
    DropdownBinder.DDLElem = $('#ddlFundTypeTbl_' + i + '');
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "EnterpriseRegistration_ENR",
        Text: 'ENR_CompanyName',
        Value: 'ENR_Id'
    };
    DropdownBinder.DDLElem = $('#ddlEnterpriseTbl_' + i + '');
    DropdownBinder.Execute();

    $('#ddlFundTypeTbl_' + i + '').val($('#ddlFundType').val()).change();
    $('#ddlEnterpriseTbl_' + i + '').val($('#ddlEnterprise').val()).change();

    $('#ddlFundType').val(0).change();
    $('#ddlEnterprise').val(0).change();
    $('.txtModal').val('');

}

function AddBudgetDetails() {
    $('#totalBdgt').text(isNaN(hdnBudget) ? 0 : hdnBudget);
    function checkBudgetSum() {
        var sumAllocatedBudgt = 0;
       
        $('#tblBudget input[type="text"]').each(function () {
            var inputVal = parseFloat($(this).val()) || 0; 
            sumAllocatedBudgt += inputVal;
        });

       
        if (parseInt(hdnBudget) < sumAllocatedBudgt) {
            Swal.fire({
                title: 'Total amount should be less than ' + parseInt(hdnBudget),
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: false
            });

            $(event.target).val(0);
            return false;
        }
    }

    $(document).on('keyup', '#tblBudget input[type="text"]', function () {
        checkBudgetSum();  
    });

    if ($('#hdnBdgtType').val() == "Quaterly") {
        $('#tblBudget tbody').html('');
        var tr;
        var sumAllocatedBudgt = 0;
        for (var i = 0; i < 4; i++) {

            tr = $('<tr/>');

            tr.append("<td>Quarterly " + (i + 1) + "</td>");

            tr.append("<td><input type='text'   name='txtTotalAmnt_" + (i + 1) + "' id='txtTotalAmnt_" + (i + 1) + "' class='form-control' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) && event.keyCode!=8 && event.keyCode!=46);' ></td>");

            $('#tblBudget tbody').append(tr);

        }
    }
    else if ($('#hdnBdgtType').val() == "Annually") {
        $('#tblBudget tbody').html('');
        var tr;
        var sumAllocatedBudgt = 0;
        for (var i = 0; i < 1; i++) {

            tr = $('<tr/>');

            tr.append("<td>Annually " + (i + 1) + "</td>");

            tr.append("<td><input type='text'   name='txtTotalAmnt_" + (i + 1) + "' id='txtTotalAmnt_" + (i + 1) + "' class='form-control' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) && event.keyCode!=8 && event.keyCode!=46);'></td>");

            $('#tblBudget tbody').append(tr);

        }
    }
    else if ($('#hdnBdgtType').val() == "Monthly") {
        $('#tblBudget tbody').html('');
        var tr;
        var sumAllocatedBudgt = 0;
        for (var i = 0; i < 12; i++) {

            tr = $('<tr/>');

            tr.append("<td>Monthly " + (i + 1) + "</td>");

            tr.append("<td><input type='text'   name='txtTotalAmnt_" + (i + 1) + "' id='txtTotalAmnt_" + (i + 1) + "' class='form-control' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) && event.keyCode!=8 && event.keyCode!=46);'></td>");

            $('#tblBudget tbody').append(tr);

        }
    } else {

    }
}

function deleteconfirmBoxClick(rowNo) {
    var id = $(rowNo).closest('table').attr('id');
    Swal.fire({
        title: "Do you want to Delete this Setup?",
        text: "You won't be able to revert this!",
        icon: "error",
        showCancelButton: !0,
        confirmButtonText: "Yes, Do it!",
        customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then((result) => {

        if (result.isConfirmed) {
            $(rowNo).closest('tr').remove();
            var TotalAmt = 0;
            if (id = 'tblBudgetFund') {
                $.each($('#tblBudgetFund tbody tr'), function (index, value) {
                    TotalAmt += isNaN(parseFloat($(this).find("td:eq(4) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(4) input[type='text']").val());
                });
            }
            //$.each($('#tblBudget tr'), function (i, row) {
            //    //Here I need to loop the tr again ( i.e. row) 
            //    $(row, "input").each(function(i, sr) {
            //        console.log($(sr).eq(4).val());
            //        console.log($(sr).eq(3).val());
            //        TotalAmt +=isNaN(parseFloat($(sr).eq(4).val())) ? 0 : parseFloat($(sr).eq(4).val());

            //    });
            //});

            $('#sumAllocatedBudgt').val(TotalAmt);
            $('#sumAllocatedBudgtHdn').val(TotalAmt);

        }
    });
}

function deleteconfirmBoxClickForSMME(rowNo) {
    var id = $(rowNo).closest('table').attr('id');
    Swal.fire({
        title: "Do you want to Delete this Setup?",
        text: "You won't be able to revert this!",
        icon: "error",
        showCancelButton: !0,
        confirmButtonText: "Yes, Do it!",
        customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then((result) => {

        if (result.isConfirmed) {
            var deletedRowAmount = isNaN(parseFloat($(rowNo).closest('tr').find("td:eq(1) input[type='text']").val())) ? 0 : parseFloat($(rowNo).closest('tr').find("td:eq(1) input[type='text']").val());

            $(rowNo).closest('tr').remove();

            var TotalAmt = 0;
            if (id == 'tblSMME') {
                $.each($('#tblSMME tbody tr'), function (index, value) {
                    TotalAmt += isNaN(parseFloat($(this).find("td:eq(1) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(1) input[type='text']").val());
                });
            }
            var currentTotalAvailableBudget = parseFloat($('#txtTotalAvailableBudgetTaskSMME').val()) || 0;
            var newTotalAvailableBudget = currentTotalAvailableBudget + deletedRowAmount;

            $('#txtTotalAvailableBudgetTaskSMME').val(newTotalAvailableBudget);
            $('#txtsumAllocatedBudgtActivitySMME').val(TotalAmt);
            $('#hdnsumAllocatedBudgtHdnActivitySMME').val(TotalAmt);
        }
    });
}

function SaveBudgetDetailsForProject() {
    var tblBudget = document.getElementById("tblBudget");
    var totalAmntTabl = 0;
    var BudgetArr = [];

    $.each($('#tblBudget tbody tr'), function (index, value) {
        //   TotalAmt += isNaN(parseFloat($(this).find("td:eq(1) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
        BudgetArr.push({
            PBD_FundName: $(this).find("td:eq(0)").text().trim(),
            PBD_Amount: parseFloat($(this).find("td:eq(1) input[type='text']").val()),
        });
        //totalAmntTabl=totalAmntTabl+parseFloat($(this).find("td:eq(1) input[type='text']").val());
    });


    if (totalAmntTabl > parseFloat($('#hdnBdgt').val())) {
        Swal.fire({
            title: "Total Budget Exceed" + parseFloat($('#hdnBdgt').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        }).then((result) => {
            if (result.isConfirmed) {
                $('#exLargeModal').modal('hide');
            }
        });

        return false;
    }

    var _data = JSON.stringify({
        entity: {
            list: BudgetArr,
            PBD_ProjectId: Id,
            PBD_FinancialYearId: parseInt($('#ddlFinancialYear').val()),
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateProjectBudget',
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        //$('#exLargeModal').modal('hide');
                        window.location.href = '/Project/ProjectBudgetDashboard?Id=' + Id;
                    }

                });
                $('#tblBudget > tbody').html('');
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
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}



function retriveProjectBudgetDetails(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(id),
            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            console.log("data>>> ", data);

            if (data.length > 0) {
                $('#totalBdgt').text(isNaN(hdnBudget) ? 0 : hdnBudget);
                function checkBudgetSum() {
                    var sumAllocatedBudgt = 0;

                    $('#tblBudget input[type="text"]').each(function () {
                        var inputVal = parseFloat($(this).val()) || 0;
                        sumAllocatedBudgt += inputVal;
                    });


                    if (parseInt(hdnBudget) < sumAllocatedBudgt) {
                        Swal.fire({
                            title: 'Total amount should be less than ' + parseInt(hdnBudget),
                            icon: "error",
                            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                            buttonsStyling: false
                        });

                        $(event.target).val(0);
                        return false;
                    }
                }

                $(document).on('keyup', '#tblBudget input[type="text"]', function () {
                    checkBudgetSum();
                });

                    $('#tblBudget tbody').html('');
                    var tr;
                    for (var i = 0; i < data.length; i++) {
                        tr = $('<tr/>');
                        $(".allcn").prop('disabled', false);
                        tr = $('<tr/>');
                        tr.append("<td>" + data[i].PBD_FundName + "</td>");
                        tr.append("<td><input type='text' " + data[i].IsEnable + " value =" + data[i].PBD_Amount + " class='form-control' name='txtAmnt_" + (i + 1) + "' id='txtAmnt_" + (i + 1) + "'  onkeyup='cellAmntChngeForBudgetDistribution(this)' ></td>");
                        $('#tblBudget tbody').append(tr);
                    }

                    var financialYears = [];
                    for (var i = 0; i < data.length; i++) {
                        if (financialYears.indexOf(data[i].FM_FromDate) === -1) {
                            financialYears.push(data[i].FM_FromDate); 
                            $('#ddlFinancialYear').append("<option value='" + data[i].FM_FromDate + "'>" + data[i].FM_FromDate + "</option>");
                        }
                    }

               
                    if (data.length > 0) {
                        $('#ddlFinancialYear').val(data[0].FM_FromDate).change(); 
                    }

            } else {
                AddBudgetDetails();
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

function checkForBudget() {
    if ((hdnBudget) > 0) {
        //$('#exLargeModal').modal('show');
        //$('#modalBudgSMME').modal('show');
        //   $('#modalBudgTask').modal('show');

        $('#modalBudgAcitivity').modal('show');
        //$('#modalBudgDistribution').modal('show');
    }
    else {
        Swal.fire({
            title: "Budget Amount Not Set Please Set first Budget Amount",
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
    }
}


//////////////////////////////////////////////////////////////////////-Activity Budget-//////////////////////////////////////////////////////

function SaveBudgetDistribution() {
    var ArrActivity = [];
    var ArrTask = [];
    for (var i = 1; i <= $('#tblActivity tbody tr.header').length; i++) {
        if (($('#childAcitivity' + i + '').val()) > 0) {
            ArrActivity.push({
                AWB_Budget: $('#childAcitivity' + i + '').val(),
                AWB_ActivityId: $('#childAcitivityId' + i + '').val(),
            });
        }
        for (var j = 1; j <= $('#tblActivity tbody tr.childrowcls' + i + '').length; j++) {
            ArrTask.push({
                TWB_Budget: $('#childTask' + i + j + '').val(),
                TWB_TaskId: $('#childTaskId' + i + j + '').val(),
            });
        }
    }
    var total = 0;
    $('#tblActivity tbody tr').each(function (i, row) {
        $(this).find('input.activity').each(function () {

            total = total + parseInt($(this).val());

        })
    });
    if (total > parseInt(hdnBudget)) {
        Swal.fire({
            title: "Budget Cannot Be Greater Than " + parseInt(hdnBudget),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });

    }

    else {


        var _data = JSON.stringify({
            entity: {
                ActivityList: ArrActivity,
                TaskList: ArrTask,
                ProjectId: Id,

            }
        });
        $.ajax({
            type: "POST",
            url: '/ScriptJson/InsertUpdateBudgetAllocation',
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
                    }).then((result) => {

                        if (result.isConfirmed) {
                            $('#modalBudgDistribution').modal('hide');
                            $('#tblActivity tbody').html('');
                        }


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
                    title: "Process Not Complete",
                    icon: "error",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

            }
        });

    }
}

function cellAmntChngeForBudget(t) {
    var amntField = $(t).closest('tr').find("td:eq(3) input[type='text']");
    var qtyField = $(t).closest('tr').find("td:eq(2) input[type='text']");

    var amnt = amntField.val();
    var qty = qtyField.val();
    var total = isNaN(parseFloat(parseInt(qty) * parseFloat(amnt)).toFixed(2)) == false ? parseFloat(parseInt(qty) * parseFloat(amnt)).toFixed(2) : 0;
    $(t).closest('tr').find("td:eq(4) input[type='text']").val(total);

    var sumAllocatedBudg = 0;

    $.each($('#tblBudgetFund tbody tr'), function (index, value) {
        if ($('#sumAllocatedBudgtHdn').val() == "") {
            $('#sumAllocatedBudgtHdn').val(0);
        }
        sumAllocatedBudg = sumAllocatedBudg + (parseFloat($(this).find("td:eq(4) input[type='text']").val()));
    });

    if (parseInt($('#hdnBdgt').val()) < parseInt(sumAllocatedBudg)) {
        Swal.fire({
            title: 'Total amount should be in less than ' + parseInt($('#hdnBdgt').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });

        // Check which field triggered the function and reset that field to 0
        if ($(t).is(amntField)) {
            amntField.val(0);
        } else if ($(t).is(qtyField)) {
            qtyField.val(0);
        }

        // Disable the save buttons
        $('#btnSaveBudgetDetailsForProject').attr('disabled', 'disabled');
        $('#btnSaveBudgeFundtDetails').attr('disabled', 'disabled');

        // Restore original values for hidden inputs (to maintain consistent data)
        $(t).closest('tr').find("td:eq(4) input[type='text']").val($(t).closest('tr').find("td:eq(4) input[type='hidden']").val());
        $(t).closest('tr').find("td:eq(3) input[type='text']").val($(t).closest('tr').find("td:eq(4) input[type='hidden']").val());

        return false;
    } else {
        $(t).closest('tr').find("td:eq(4) input[type='hidden']").val(total);
        $('#btnSaveBudgetDetailsForProject').removeAttr('disabled');
        $('#btnSaveBudgeFundtDetails').removeAttr('disabled');
        $('#sumAllocatedBudgt').val(sumAllocatedBudg);
        $('#sumAllocatedBudgtHdn').val(sumAllocatedBudg);
    }
}



//function cellAmntChngeForBudget(t) {
//    var amnt = $(t).closest('tr').find("td:eq(3) input[type='text']").val();
//    var qty = $(t).closest('tr').find("td:eq(2) input[type='text']").val();
//    var total = isNaN(parseFloat(parseInt(qty) * parseFloat(amnt)).toFixed(2)) == false ? parseFloat(parseInt(qty) * parseFloat(amnt)).toFixed(2) : 0;
//    $(t).closest('tr').find("td:eq(4) input[type='text']").val(total);
//    //var
//    var sumAllocatedBudg = 0;


//    $.each($('#tblBudget tbody tr'), function (index, value) {


//        if ($('#sumAllocatedBudgtHdn').val() == "") {
//            $('#sumAllocatedBudgtHdn').val(0);
//        }
//        sumAllocatedBudg = sumAllocatedBudg + (parseFloat($(this).find("td:eq(4) input[type='text']").val()));



//    });

//    if (parseInt($('#hdnBdgt').val()) < parseInt(sumAllocatedBudg)) {

//        Swal.fire({
//            title: 'Total amount should be in less then - ' + parseInt($('#hdnBdgt').val()),
//            icon: "error",
//            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//            buttonsStyling: !1
//        });

//        $('#btnSaveBudgetDetailsForProject').attr('disabled', 'disabled');
//        $('#btnSaveBudgeFundtDetails').attr('disabled', 'disabled');
//        $(t).closest('tr').find("td:eq(4) input[type='text']").val($(t).closest('tr').find("td:eq(4) input[type='hidden']").val());
//        $(t).closest('tr').find("td:eq(3) input[type='text']").val($(t).closest('tr').find("td:eq(4) input[type='hidden']").val());

//        return false;
//    }
//    else {
//        $(t).closest('tr').find("td:eq(4) input[type='hidden']").val(total);
//        $('#btnSaveBudgetDetailsForProject').removeAttr('disabled');
//        $('#btnSaveBudgeFundtDetails').removeAttr('disabled');
//        $('#sumAllocatedBudgt').val(sumAllocatedBudg);
//        $('#sumAllocatedBudgtHdn').val(sumAllocatedBudg);
//    }
//}

function AddActivityBudget() {
    if (parseFloat($('#txtTotalBudgetForSpacificFund').val()) < parseFloat($('#txtAcitivityAmnt').val())) {
        Swal.fire({
            title: 'Please Enter Amount Less Than ' + parseFloat($('#txtTotalBudgetForSpacificFund').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $('#txtAcitivityAmnt').val(0);
        return false;
    }

    var activi = 0;
   // var fund = 0;
    $.each($('#tblActivity tbody tr'), function (index, value) {
        if ((parseInt($('#ddlActivity').val()) == parseInt($(this).find("td:eq(0) option:selected").val())))  {
            activi = 1;
        }
    });

    if (activi == 1) {
        Swal.fire({
            title: 'Activity already exists',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    activi = 0;
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblActivity");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var txtsumAllocatedBudgtActivity = 0;
    var tr;
    var i = (rows.length);
    console.log('',i);
    tr = $('<tr/>');

    tr.append("<td><select id='ddlActTbl_" + i + "' name='ddlActTbl_" + i + "' class='select2 form-select ddlActTbl' data-allow-clear='true'></select></td>");
    tr.append("<td  style='width:20%;'><input type='text' value ='" + $('#txtActivityDate').val() + "'    class='form-control' name='txtActivityDate_" + i + "' id='txtActivityDate_" + i + "'></td>");
    tr.append("<td  style='width:20%;'><input type='text' value ='" + $('#txtActivityDesc').val() + "'   class='form-control' name='txtActivityDesc_" + i + "' id='txtActivityDesc_" + i + "'></td>");
    tr.append("<td  style='width:20%;'><input type='text' value ='" + $('#txtAcitivityAmnt').val() + "'    class='form-control tblActivityAmount tblActFund" + $('#ddlActivity').val() + "' name='txtAmntAct_" + i + "' id='txtAmntAct_" + i + "' onkeyup='cellAmntChngeForActivityBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlBudgetDistActivity').val() + "' name='hdnBudgetDistActivity_" + i + "' id='hdnBudgetDistActivity_" + i + "'/><input type='text' value='" + $('#txtsumAllocatedBudgtActivity').val() + "' name='txtsumAllocatedBudgtActivity_" + i + "' id='txtsumAllocatedBudgtActivity_" + i + "'/></td>");
    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClickActivity(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");

    $('#tblActivity tbody').append(tr);
   // txtsumAllocatedBudgtActivity = (parseFloat(txtsumAllocatedBudgtActivity) + parseFloat($('#txtAcitivityAmnt').val()));


    var drpAct = $('#ddlActTbl_' + i + '');

    drpAct.length &&
       drpAct.each(function () {
           var drpAct = $(this);
           drpAct.wrap('<div class="position-relative"></div>'), drpAct.select2({ placeholder: "Select A Activity", dropdownParent: drpAct.parent() });
       });

    DropdownBinder.DDLData = {
        tableName: "CreateActivity_CA",
        Text: 'CA_ActivityName',
        Value: 'CA_Id',
        ColumnName: 'CA_ProjectId',
        PId: Id
    };
    DropdownBinder.DDLElem = $('#ddlActTbl_' + i + '');
    DropdownBinder.Execute();

    var txtActAmnt = parseInt($('#txtAcitivityAmnt').val()); 
    var txtsum = parseInt($('#txtsumAllocatedBudgtActivity').val());
    if (isNaN(txtsum)) { 
        $('#txtsumAllocatedBudgtActivity').val(txtActAmnt);
        $('#hdnsumAllocatedBudgtHdnActivity').val(txtActAmnt);
    } else {
        $('#txtsumAllocatedBudgtActivity').val(txtActAmnt + txtsum);
        $('#hdnsumAllocatedBudgtHdnActivity').val(txtActAmnt + txtsum);
    }

    // $.each($('#tblActivity tbody tr'), function (index, value) {
    //    if ((parseInt($('#ddlActivity').val()) == parseInt($(this).find("td:eq(0) option:selected").val())))  {
    //        $(this).find("td:eq(3) input[type='hidden']").val(parseInt($(this).find("td:eq(3) input[type='text']").val()) + parseInt(parseInt($('#txtAcitivityAmnt').val())));
    //    }
    //});

     var AvlBudgt = (parseFloat($('#hdnTotalAvailableBudgetActivity').val()) - parseFloat($('#hdnsumAllocatedBudgtHdnActivity').val()))  
    $('#txtTotalAvailableBudgetActivity').val(AvlBudgt);  
   // $('#hdnTotalAvailableBudgetActivity').val(AvlBudgt);

    $('#ddlActTbl_' + i + '').val($('#ddlActivity').val()).change();
    $('#ddlActivity').val(0).change();
    $('.txtModal').val('');

    if (parseFloat($('#txtsumAllocatedBudgtActivity').val()) <= 0) {
        $('#saveBtnActivity').prop("disabled", true);
    } else {
        $('#saveBtnActivity').prop("disabled", false);
    }

    $('#btnActivityBudg').attr('disabled', 'disabled');
}

$('#navAct').on('click', function () {

    BindGridAct(Id);


});
$('#navTask').on('click', function () {

    BindGridTsk(Id);


});
$('#ddlFundTypeAct').on('change', function () {
    if (this.value > 0) {
        fundWiseAVailBudget(this.value);

    }
});

function fundWiseAVailBudget(fundtype) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_FundName',
            param2Value: parseInt(fundtype),
            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);

            var totalallocatMoney = 0;
            var table = document.getElementById("tblActivity");
            var rows = table.getElementsByTagName("tr")
            if (rows.length > 1) {
                $('#tblActivity tbody tr').each(function (i, row) {
                    $(this).find('select.ddlFundTypeActTbl' + fundtype).each(function () {

                        totalallocatMoney = totalallocatMoney + parseInt($(".tblActFund" + fundtype).val());

                    })
                });
            }

            if (data[0].PBD_AvailbleBudget > 0) {


                AvailBudgte = (data[0].PBD_AvailbleBudget - totalallocatMoney);
                $('#txtAvailableFund').val((data[0].PBD_AvailbleBudget) - totalallocatMoney);
                $('#hdnAvailableFund').val((data[0].PBD_AvailbleBudget) - totalallocatMoney);
                $('.txtAvailAmntTbl' + fundtype).val((data[0].PBD_AvailbleBudget - totalallocatMoney));
            }
            else {
                $('#txtAvailableFund').val(0);
                $('#hdnAvailableFund').val(0);
            }
            //console.log('availbe '+AvailBudgte);
            //console.log('total '+totalallocatMoney);
            //console.log('db '+data[0].PBD_AvailbleBudget);
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

function cellAmntChngeForActivityBudget(input) {
    var row = $(input).closest('tr');
    var updatedAmount = parseFloat($(input).val()) || 0;
    var totalBudgetShow = 0;

    var totalActivityAmount = 0;
    $('#tblActivity tbody tr').each(function () {
        var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
        totalActivityAmount += activityAmount;
    });

    var totalBudgetStr = $('#txtTotalBudgetForSpacificFund').val();
    var totalBudget = parseFloat(totalBudgetStr.replace(/[^0-9.-]+/g, "")) || 0;

    // If total activity amount exceeds total budget, show the alert and reset input
    if (totalActivityAmount > totalBudget) {
        Swal.fire({
            title: 'Amount Should Be Less Than ' + totalBudget,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
            buttonsStyling: false
        });

        // Reset the value of the current input to 0 (this is the problematic line)
        $(input).val(0);

        // Recalculate the total activity amount after reset
        totalActivityAmount = 0; 
        $('#tblActivity tbody tr').each(function () {
            var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
            totalActivityAmount += activityAmount;
        });

        // Recalculate the available budget
        totalBudgetShow = parseFloat(totalBudget) - totalActivityAmount;
        $('#txtTotalAvailableBudgetActivity').val(totalBudgetShow);
        $('#txtsumAllocatedBudgtActivity').val(totalActivityAmount);

        return false;
    }

    // Update the allocated budget field
    $('#txtsumAllocatedBudgtActivity').val(totalActivityAmount);

    // Calculate available budget
    totalBudgetShow = parseFloat(totalBudget) - totalActivityAmount;
    $('#txtTotalAvailableBudgetActivity').val(totalBudgetShow);
}

function cellAmntChngeForTaskBudget(input) {
    var row = $(input).closest('tr');
    var updatedAmount = parseFloat($(input).val()) || 0;
    var totalBudgetShow = 0;
    var totalTaskAmount = 0;

    // Recalculate the total task amount after all inputs
    $('#tblTask tbody tr').each(function () {
        var taskAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
        totalTaskAmount += taskAmount;
    });

    // Get the total budget available for tasks
    var totalBudgetStr = $('#txtTotalActivityBudget').val();
    var totalBudget = parseFloat(totalBudgetStr.replace(/[^0-9.-]+/g, "")) || 0;

    // Check if the total task amount exceeds the total budget
    if (totalTaskAmount > totalBudget) {
        Swal.fire({
            title: 'Amount Should Be Less Than ' + totalBudget,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
            buttonsStyling: false
        });

        // Reset the current input to 0 when the budget exceeds
        $(input).val(0);

        // Recalculate the total task amount after resetting the input
        totalTaskAmount = 0;
        $('#tblTask tbody tr').each(function () {
            var taskAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
            totalTaskAmount += taskAmount;
        });

        // Recalculate available budget after reset
        totalBudgetShow = parseFloat(totalBudget) - totalTaskAmount;
        $('#txtTotalAvailableBudgetTask').val(totalBudgetShow);
        $('#txtsumAllocatedBudgtActivityTask').val(totalTaskAmount);

        return false; // Exit the function
    }

    // Update the allocated budget for tasks
    $('#txtsumAllocatedBudgtActivityTask').val(totalTaskAmount);

    // Calculate the available budget
    totalBudgetShow = parseFloat(totalBudget) - totalTaskAmount;
    $('#txtTotalAvailableBudgetTask').val(totalBudgetShow);
}

function cellAmntChngeForSMMEBudget(input) {
    var row = $(input).closest('tr');
    var updatedAmount = parseFloat($(input).val()) || 0;
    var totalBudgetShow = 0;
    var totalSMMEAmount = 0;

    // Recalculate total SMME amount after all inputs
    $('#tblSMME tbody tr').each(function () {
        var activityAmount = parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
        totalSMMEAmount += activityAmount;
    });

    // Get the total budget for SMME
    var totalBudgetStr = $('#txtTotalTaskBudgetSMME').val();
    var totalBudget = parseFloat(totalBudgetStr.replace(/[^0-9.-]+/g, "")) || 0;

    // Log values for debugging
    console.log("Total SMME Amount: ", totalSMMEAmount);
    console.log("Total Budget: ", totalBudget);

    // Check if the total SMME amount exceeds the total budget
    if (totalSMMEAmount > totalBudget) {
        Swal.fire({
            title: 'Amount Should Be Less Than ' + totalBudget,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-primary waves-effect waves-light' },
            buttonsStyling: false
        });

        // Reset the current input to 0 when the budget exceeds
        $(input).val(0);

        // Recalculate the total SMME amount after resetting the input
        totalSMMEAmount = 0;
        $('#tblSMME tbody tr').each(function () {
            var activityAmount = parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
            totalSMMEAmount += activityAmount;
        });

        // Recalculate the available budget after reset
        totalBudgetShow = parseFloat(totalBudget) - totalSMMEAmount;
        $('#txtTotalAvailableBudgetTaskSMME').val(totalBudgetShow);
        $('#txtsumAllocatedBudgtActivitySMME').val(totalSMMEAmount);

        return false; // Exit the function
    }

    // Update the allocated budget for SMME
    $('#txtsumAllocatedBudgtActivitySMME').val(totalSMMEAmount);

    // Calculate the available budget
    totalBudgetShow = parseFloat(totalBudget) - totalSMMEAmount;
    $('#txtTotalAvailableBudgetTaskSMME').val(totalBudgetShow);
}


function cellAmntForActivityBudget(t) {
   var txtTotalBudgetForSpacificFund = ($('#txtTotalBudgetForSpacificFund').val().substring(1)); //  -- A  1000
   var totalActivityAmount = 0;  // --B
   $('#tblActivity tbody tr').each(function () {
       var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
       totalActivityAmount += activityAmount;
   });
   var calculateValue = txtTotalBudgetForSpacificFund - totalActivityAmount  // - C
   var AcitivityAmnt = t.value;  // -- D

   if (AcitivityAmnt > calculateValue) {
        Swal.fire({
            title: 'Amount Should Be Less Than ' + txtTotalBudgetForSpacificFund,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $("#txtAcitivityAmnt").val(0).focus();
        return false;
    }
}

function SaveBudgetDetailsForActivity() {
    var tblBudget = document.getElementById("tblActivity");
    var totalAmntTabl = 0;
    var ActBudgetArr = [];
    $.each($('#tblActivity tbody tr'), function (index, value) {
        ActBudgetArr.push({
            AWB_ActivityId: parseInt($(this).find("td:eq(0) option:selected").val()),
            AWB_ActivityDate: $(this).find("td:eq(1) input[type='text']").val(),
            AWB_ActivityDescription: $(this).find("td:eq(2) input[type='text']").val(),
            AWB_Budget: parseFloat(parseFloat($(this).find("td:eq(3) input[type='text']").val())),
            AWB_BudgetDistId: parseInt($(this).find("td:eq(4) input[type='hidden']").val()) 
        });
    });

    var _data = JSON.stringify({
        entity: {
            ActivityList: ActBudgetArr,
            ProjectId: Id
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateBudgetAllocationForActivity',
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#modalBudgAcitivity').modal('hide');
                        $('.txtModal').val('');
                    }
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
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}

function retriveActivityBudgetDetails(id,PDBId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectAcitivityWiseBudget',
            param1: 'ProjectId',
            param1Value: parseInt(id),
            param2: 'PBD_Id',
            param2Value: parseInt(PDBId),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            $('#tblActivity tbody').html('');
            var TotalBudgtForActivity = 0;
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblActivity");
                var rows = table.getElementsByTagName("tr");
                var enble = '';
                if (parseInt(data[i].AWB_Budget) > parseInt(data[i].AWB_AvailBudget)) {
                    enble = 'disabled';
                }

                //alert(rows.length);
                var tr;

                tr = $('<tr/>');

                tr.append("<td><select " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + "  id='ddlActTbl_" + (i + 1) + "' name='ddlActTbl_" + (i + 1) + "' class='select2 form-select ddlActTbl' data-allow-clear='true'></select></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].AWB_ActivityDate + "' name='txtDate_" + (i + 1) + "' id='txtDate_" + (i + 1) + "' class='form-control bs-datepicker-autoclose date-from dtcls txtDate" + data[i].AWB_BudgetDistId + "' ></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].AWB_ActivityDescription + "' name='txtDescription_" + (i + 1) + "' id='txtDescription_" + (i + 1) + "' class='form-control txtDescription" + data[i].AWB_BudgetDistId + "' ></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].AWB_Budget + "'    class='form-control tblActFund" + data[i].AWB_BudgetDistId + "' name='txtAmntAct_" + (i + 1) + "' id='txtAmntAct_" + (i + 1) + "' " + enble + " onkeyup='cellAmntChngeForActivityBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'><input type='hidden'   name='hdnTotalAvailActivityAmnt_" + (i + 1) + "' id='hdnTotalAvailActivityAmnt_" + (i + 1) + "' class='hdnTotalAvailActivityAmntTbl" + data[i].AWB_BudgetDistId + "' disabled ></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].AWB_BudgetDistId + "' name='hdnBudgetDist_" + i + "' id='hdnBudgetDist_" + i + "' class='form-control txtDescription" + data[i].AWB_BudgetDistId + "'/></td>");
                tr.append("<td><button " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " onclick='deleteconfirmBoxClickActivity(this)' href='javascript:;' class='text-body' style='border-style: none;background: none;'><i class='ti ti-trash me-2 ti-sm'></i></button></td>");
               // tr.append("<td style='text-align:center'><button " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " onclick='deleteconfirmBoxClickActivity(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></button></td>");
                $('#tblActivity tbody').append(tr);

                $('.txtAvailAmntTbl' + data[i].AWB_BudgetDistId + '').val(data[i].PBD_AvailbleBudget);
                $('#hdnTotalAvailActivityAmnt_' + (i + 1) + '').val(data[i].PBD_AvailbleBudget + data[i].AWB_Budget);
                $('.hdnAvailAmntTbl' + data[i].AWB_BudgetDistId + '').val(data[i].PBD_AvailbleBudget);
                //AvailBudgte=data[i].PBD_AvailbleBudget;--old

                TotalBudgtForActivity = TotalBudgtForActivity + data[i].AWB_Budget;
                AvailBudgte = data[i].PBD_AvailbleBudget + data[i].AWB_Budget;

                var drpAct = $('#ddlActTbl_' + (i + 1) + '');

                drpAct.length &&
                   drpAct.each(function () {
                       var drpAct = $(this);
                       drpAct.wrap('<div class="position-relative"></div>'), drpAct.select2({ placeholder: "Select A Activity", dropdownParent: drpAct.parent() });
                   });

                DropdownBinder.DDLData = {
                    tableName: "CreateActivity_CA",
                    Text: 'CA_ActivityName',
                    Value: 'CA_Id',
                    ColumnName: 'CA_ProjectId',
                    PId: Id

                };
                DropdownBinder.DDLElem = $('#ddlActTbl_' + (i + 1) + '');
                DropdownBinder.Execute();

                $('#ddlFundTypeAct').val(0).change();
                $('#ddlActTbl_' + (i + 1) + '').val(data[i].AWB_ActivityId).change();
                $('#ddlActivity').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgAcitivity').modal('show');
            }
            $('#txtsumAllocatedBudgtActivity').val(TotalBudgtForActivity);
            $('#hdnsumAllocatedBudgtHdnActivity').val(TotalBudgtForActivity);

            if (parseFloat($('#txtsumAllocatedBudgtActivity').val()) <= 0) {
                $('#saveBtnActivity').prop("disabled", true);
            } else {
                $('#saveBtnActivity').prop("disabled", false);
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

function deleteconfirmBoxClickActivity(rowNo) {
    var id = $(rowNo).closest('table').attr('id');
    Swal.fire({
        title: "Do you want to Delete this Setup?",
        text: "You won't be able to revert this!",
        icon: "error",
        showCancelButton: !0,
        confirmButtonText: "Yes, Do it!",
        customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then((result) => {

        if (result.isConfirmed) {
            var deletedRowAmount = isNaN(parseFloat($(rowNo).closest('tr').find("td:eq(3) input[type='text']").val())) ? 0 : parseFloat($(rowNo).closest('tr').find("td:eq(3) input[type='text']").val());

            $(rowNo).closest('tr').remove();

            var TotalAmt = 0;
            if (id == 'tblActivity') {
                $.each($('#tblActivity tbody tr'), function (index, value) {
                    TotalAmt += isNaN(parseFloat($(this).find("td:eq(3) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(3) input[type='text']").val());
                });
            }
            var currentTotalAvailableBudget = parseFloat($('#txtTotalAvailableBudgetActivity').val()) || 0;
            var newTotalAvailableBudget = currentTotalAvailableBudget + deletedRowAmount;

            $('#txtTotalAvailableBudgetActivity').val(newTotalAvailableBudget);
            $('#txtsumAllocatedBudgtActivity').val(TotalAmt);
            $('#hdnsumAllocatedBudgtHdnActivity').val(TotalAmt);
        }
    });
}

function deleteconfirmBoxClickForTask(rowNo) {
    var id = $(rowNo).closest('table').attr('id');
    Swal.fire({
        title: "Do you want to Delete this Setup?",
        text: "You won't be able to revert this!",
        icon: "error",
        showCancelButton: !0,
        confirmButtonText: "Yes, Do it!",
        customClass: { confirmButton: "btn btn-danger me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
        buttonsStyling: !1,
    }).then((result) => {

        if (result.isConfirmed) {
            var deletedRowAmount = isNaN(parseFloat($(rowNo).closest('tr').find("td:eq(3) input[type='text']").val())) ? 0 : parseFloat($(rowNo).closest('tr').find("td:eq(3) input[type='text']").val());

            $(rowNo).closest('tr').remove();

            var TotalAmt = 0;
            if (id == 'tblTask') {
                $.each($('#tblTask tbody tr'), function (index, value) {
                    TotalAmt += isNaN(parseFloat($(this).find("td:eq(3) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(3) input[type='text']").val());
                });
            }
            var currentTotalAvailableBudget = parseFloat($('#txtTotalAvailableBudgetTask').val()) || 0;
            var newTotalAvailableBudget = currentTotalAvailableBudget + deletedRowAmount;

            $('#txtTotalAvailableBudgetTask').val(newTotalAvailableBudget);
            $('#txtsumAllocatedBudgtActivityTask').val(TotalAmt);
            $('#hdnsumAllocatedBudgtHdnActivityTask').val(TotalAmt);
        }
    });
}


/////////////////////////////////////////////////////////////////////////////TaskWiseBudget///////////////////////////////////////////////////


function AddTaskBudget() {

    if (parseFloat($('#txtTotalActivityBudget').val()) < parseFloat($('#txtTaskAmnt').val())) {
        Swal.fire({
            title: 'Please Enter Amount Less Than ' + parseFloat($('#txtTotalActivityBudget').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $('#txtTaskAmnt').val(0);
        return false;
    }
    var task = 0;
    var acti = 0;
    $.each($('#tblTask tbody tr'), function (index, value) {
        //$(t).closest('tr').find("td:eq(3) input[type='hidden']").val()
        if ((parseInt($('#ddlTask').val()) == parseInt($(this).find("td:eq(0) option:selected").val())) && (parseInt($('#ddlTaskActivity').val()) == parseInt($(this).closest('tr').find("td:eq(5) input[type='hidden']").val()))) {
            task = 1;
            acti = 1;
        }
    });

    if (task == 1 && acti == 1) {
        Swal.fire({
            title: 'Same task and along with this activity already exists',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    task = 0;
    acti = 0;
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblTask");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var i = (rows.length);
    tr = $('<tr/>');
    tr.append("<td><select id='ddlTaskTbl_" + i + "' name='ddlTaskTbl_" + i + "' class='select2 form-select ddlTaskTbl' data-allow-clear='true'></select></td>");
    tr.append("<td ><input type='text' value ='" + $('#txtTaskDate').val() + "' class='form-control' name='txtTaskDate_" + i + "' id='txtTaskDate_" + i + "'></td>");
    tr.append("<td ><input type='text' value ='" + $('#txtTaskDesc').val() + "' class='form-control' name='txtTaskDesc_" + i + "' id='txtTaskDesc_" + i + "'></td>");
    tr.append("<td ><input type='text' value ='" + $('#txtTaskAmnt').val() + "' class='form-control tblActivityAmount tblActFund" + $('#txtTaskAmnt').val() + "' name='txtAmntTask_" + i + "' id='txtAmntTask_" + i + "' onkeyup='cellAmntChngeForTaskBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlBudgetDistTask').val() + "' name='hdnBudgetDistTask_" + i + "' id='hdnBudgetDistTask_" + i + "' /></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlTaskActivity').val() + "' name='hdnTaskActivity_" + i + "' id='hdnTaskActivity_" + i + "' /></td>");
    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClickForTask(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");
    $('#tblTask tbody').append(tr);


    var txtActAmnt = parseInt($('#txtTaskAmnt').val());
    var txtsum = parseInt($('#txtsumAllocatedBudgtActivityTask').val());
    if (isNaN(txtsum)) {
        $('#txtsumAllocatedBudgtActivityTask').val(txtActAmnt);
        $('#hdnsumAllocatedBudgtHdnActivityTask').val(txtActAmnt);
    } else {
        $('#txtsumAllocatedBudgtActivityTask').val(txtActAmnt + txtsum);
        $('#hdnsumAllocatedBudgtHdnActivityTask').val(txtActAmnt + txtsum);
    }

    $.each($('#tblTask tbody tr'), function (index, value) {
        if ((parseInt($('#ddlTask').val()) == parseInt($(this).find("td:eq(0) option:selected").val()))) {
            $(this).find("td:eq(3) input[type='hidden']").val(parseInt($(this).find("td:eq(3) input[type='text']").val()) + parseInt(parseInt($('#txtTaskAmnt').val())));
        }
    });

    var AvlBudgt = ($('#hdnTotalAvailableBudgetTask').val() - $('#hdnsumAllocatedBudgtHdnActivityTask').val())
    $('#txtTotalAvailableBudgetTask').val(AvlBudgt);

    var drpact = $('#ddlTaskActivityTbl_' + i + '');
    var drpTask = $('#ddlTaskTbl_' + i + '');
   
    drpact.length &&
        drpact.each(function () {
            var drpact = $(this);
            drpact.wrap('<div class="position-relative"></div>'), drpact.select2({ placeholder: "Select A Activity", dropdownParent: drpact.parent() });
        });

    drpTask.length &&
       drpTask.each(function () {
           var drpTask = $(this);
           drpTask.wrap('<div class="position-relative"></div>'), drpTask.select2({ placeholder: "Select A Task", dropdownParent: drpTask.parent() });
       });

    DropdownBinder.DDLData = {
        tableName: "CreateActivity_CA",
        Text: 'CA_ActivityName',
        Value: 'CA_Id',
        ColumnName: 'CA_ProjectId',
        PId: Id

    };
    DropdownBinder.DDLElem = $('#ddlTaskActivityTbl_' + i + '');
    DropdownBinder.Execute();

    DropdownBinder.DDLData = {
        tableName: "TaskDeatils_TD",
        Text: 'TD_TaskName',
        Value: 'TD_Id',
        ColumnName: 'TD_ProjectId',
        PId: Id,
        PId1: $('#ddlTaskActivity').val(),
        ColumnName1: 'TD_ActivityId',
    };
    DropdownBinder.DDLElem = $('#ddlTaskTbl_' + i + '');
    DropdownBinder.Execute();

    $('#ddlTaskActivityTbl_' + i + '').val($('#ddlTaskActivity').val()).change();


    $('#ddlFundTypeTask').val(0).change();
    $('#ddlTaskTbl_' + i + '').val($('#ddlTask').val()).change();

    $('#ddlTask').val(0).change();

    $('.txtModal').val('');

    if (parseFloat($('#txtsumAllocatedBudgtActivityTask').val()) <= 0) {
        $('#btnSaveBudgetDetailsForTask').prop("disabled", true);
    } else {
        $('#btnSaveBudgetDetailsForTask').prop("disabled", false);
    }

    $('#btnTaskBudg').attr('disabled', 'disabled');
}

$('#ddlFundTypeTask').on('change', function () {
    if (this.value > 0) {
        fundWiseAvailBudgetTask(this.value);
    }
});

function fundWiseAvailBudgetTask(fundtype) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTask',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_FundName',
            param2Value: parseInt(fundtype),
            param3: 'ActivityId',
            param3Value: parseInt($('#ddlTaskActivity').val()),
            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);

            var totalavalfundtbl = 0;
            var totalallocatMoney = 0;
            var table = document.getElementById("tblTask");
            var rows = table.getElementsByTagName("tr")
            if (rows.length > 1) {
                $('#tblTask tbody tr').each(function (i, row) {
                    $(this).find('select.ddlFundTypeTaskTbl' + fundtype + $('#ddlTaskActivity').val()).each(function () {
                        totalallocatMoney = totalallocatMoney + parseInt($(".tblTaskFund" + fundtype + $('#ddlTaskActivity').val()).val());
                        totalavalfundtbl = parseInt($(".hdnAvailTaskAmntTbl" + fundtype + $('#ddlTaskActivity').val()).val());
                    })
                });
            }
            if (data[0].PBD_AvailbleBudget > 0) {
                AvailBudgteTask = (totalavalfundtbl > 0 ? totalavalfundtbl : data[0].PBD_AvailbleBudget);
                $('#txtAvailableFundTask').val((AvailBudgteTask));
                $('#hdnAvailableFundTask').val((AvailBudgteTask));
                $('.txtAvailTaskAmntTbl' + fundtype + $('#ddlTaskActivity').val()).val((AvailBudgteTask));
                $('#btnAddTaskBudget').removeAttr('disabled');
            }else {
                $('#txtAvailableFundTask').val(0);
                $('#hdnAvailableFundTask').val(0);
                $('#btnAddTaskBudget').attr('disabled', 'disabled');
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



function cellAmntForTaskBudget(t) {
    var txtTotalActivityBudget = $('#txtTotalActivityBudget').val()   //($('#txtTotalActivityBudget').val().substring(1)); //  -- A  1000
    var totalActivityAmount = 0;  // --B
    $('#tblTask tbody tr').each(function () {
        var activityAmount = parseFloat($(this).find("td:eq(3) input[type='text']").val()) || 0;
        totalActivityAmount += activityAmount;
    });

    var calculateValue = txtTotalActivityBudget - totalActivityAmount  // - C

    var AcitivityAmnt = t.value;  // -- D

    if (AcitivityAmnt > calculateValue) {
        Swal.fire({
            title: 'Amount Should Be Less Than ' + txtTotalActivityBudget,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $("#txtTaskAmnt").val(0).focus();
        return false;
    }
}



//function cellAmntChngeForTaskBudget(t) {
//    var totalAvlAmnt = $(t).closest('tr').find("td:eq(3) input[type='hidden']").val();
//    var AvlAmnt = $(t).closest('tr').find("td:eq(4) input[type='text']").val();
//    var hdnAvlAmnt = $(t).closest('tr').find("td:eq(4) input[type='hidden']").val();
//    var Amnt = $(t).closest('tr').find("td:eq(3) input[type='text']").val() == '' ? 0 : $(t).closest('tr').find("td:eq(3) input[type='text']").val();
//    $('#btnSaveBudgetDetailsForTask').removeAttr('disabled');
//    if (parseInt(Amnt) > parseInt((totalAvlAmnt))) {
//        Swal.fire({
//            title: 'Amount Should Be Less Than ' + (totalAvlAmnt),
//            icon: "error",
//            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
//            buttonsStyling: !1
//        });
//        $('#btnSaveBudgetDetailsForTask').attr('disabled', 'disabled');
//        $(t).closest('tr').find("td:eq(3) input[type='text']").val(parseInt(totalAvlAmnt) - parseInt(AvlAmnt));
//        return false;
//    }
//    $(t).closest('tr').find("td:eq(4) input[type='text']").val(isNaN(parseInt(totalAvlAmnt) - parseInt(Amnt)) == true ? totalAvlAmnt : (parseInt(totalAvlAmnt) - parseInt(Amnt)));
//    $(t).closest('tr').find("td:eq(4) input[type='hidden']").val(isNaN(parseInt(totalAvlAmnt) - parseInt(Amnt)) == true ? totalAvlAmnt : (parseInt(totalAvlAmnt) - parseInt(Amnt)));
//    console.log(isNaN(parseInt(totalAvlAmnt) - parseInt(Amnt)) == true ? totalAvlAmnt : (parseInt(totalAvlAmnt) - parseInt(Amnt)));

//    $('.hdnAvailTaskAmntTbl' + $(t).closest('tr').find("td:eq(2) option:selected").val()).val(isNaN(parseInt(totalAvlAmnt) - parseInt(Amnt)) == true ? totalAvlAmnt : (parseInt(totalAvlAmnt) - parseInt(Amnt)))
//    $('.txtAvailTaskAmntTbl' + $(t).closest('tr').find("td:eq(2) option:selected").val()).val(isNaN(parseInt(totalAvlAmnt) - parseInt(Amnt)) == true ? totalAvlAmnt : (parseInt(totalAvlAmnt) - parseInt(Amnt)))
//    $.each($('#tblTask tbody tr'), function (index, value) {
//        if (parseInt($(t).closest('tr').find("td:eq(2) option:selected").val()) == parseInt($(this).find("td:eq(2) option:selected").val())) {
//            $(this).find("td:eq(3) input[type='hidden']").val(($(this).find("td:eq(3) input[type='text']").val() == '' ? 0 : parseInt(($(this).find("td:eq(3) input[type='text']").val()))) + parseInt($(this).find("td:eq(4) input[type='text']").val()));

//        }

//    });
//    //var

//    //  $(t).closest('tr').find("td:eq(3) input[type='text']").val(AvailBudgte-Amnt);

//}


function SaveBudgetDetailsForTask() {
    var totalAmntTabl = 0;
    var TaskBudgetArr = [];
    $.each($('#tblTask tbody tr'), function (index, value) {
        TaskBudgetArr.push({
            TWB_TaskId: parseInt($(this).find("td:eq(0) option:selected").val()),
            TWB_TaskDate:  $(this).find("td:eq(1) input[type='text']").val(),
            TWB_TaskDescription: $(this).find("td:eq(2) input[type='text']").val(),
            TWB_Budget: parseFloat(parseFloat($(this).find("td:eq(3) input[type='text']").val())),
            TWB_BudgetDistId: parseInt($(this).find("td:eq(4) input[type='hidden']").val()),
            TWB_ActivityId: parseInt($(this).find("td:eq(5) input[type='hidden']").val()),
        });
    });

    var _data = JSON.stringify({
        entity: {
            TaskList: TaskBudgetArr,
            ProjectId: Id
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateBudgetAllocationForTask',
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#modalBudgTask').modal('hide');
                    }
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
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });
}



function retriveTaskBudgetDetails(id, ActId, PbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskWiseBudget',
            param1: 'ProjectId',
            param1Value: parseInt(id),
            param2: 'ActivityId',
            param2Value: parseInt(ActId),
            param3: 'PBD_Id',
            param3Value: parseInt(PbdId),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            //console.log('Dyaadg- ',data)

            $('#tblTask tbody').html('');
            var TotalBudgtForTask = 0;
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblTask");
                var rows = table.getElementsByTagName("tr")
                //alert(rows.length);
                var tr;
                tr = $('<tr/>');
                tr.append("<td><select " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + "  id='ddlTaskTbl_" + (i + 1) + "' name='ddlTaskTbl_" + (i + 1) + "' class='select2 form-select ddlTaskTbl' data-allow-clear='true'></select></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].TWB_TaskDate + "' name='txtDate_" + (i + 1) + "' id='txtDate_" + (i + 1) + "' class='form-control txtDate" + data[i].TWB_BudgetDistId + "' ></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].TWB_TaskDescription + "' name='txtDescription_" + (i + 1) + "' id='txtDescription_" + (i + 1) + "' class='form-control txtDescription" + data[i].TWB_BudgetDistId + "' ></td>");
                tr.append("<td><input " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " type='text' value ='" + data[i].TWB_Budget + "'    class='form-control tblTaskFund" + data[i].TWB_BudgetDistId + "" + data[i].TWB_ActivityId + "' name='txtAmntTask_" + (i + 1) + "' id='txtAmntTask_" + (i + 1) + "' onkeyup='cellAmntChngeForTaskBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'><input type='hidden'   name='hdnTotalAvailTaskAmnt_" + (i + 1) + "' id='hdnTotalAvailTaskAmnt_" + (i + 1) + "' class='hdnTotalAvailTaskAmntTbl" + data[i].TWB_BudgetDistId + "" + data[i].TWB_ActivityId + "' ></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].TWB_BudgetDistId + "' name='hdnBudgetDistTask_" + i + "' id='hdnBudgetDistTask_" + i + "' class='form-control txtDescription" + data[i].TWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].TWB_ActivityId + "' name='hdnActivity_" + i + "' id='hdnActivity_" + i + "' class='form-control txtDescription" + data[i].TWB_BudgetDistId + "'/></td>");
                tr.append("<td><button " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " onclick='deleteconfirmBoxClickForTask(this)' href='javascript:;' class='text-body' style='border-style: none;background: none;'><i class='ti ti-trash me-2 ti-sm'></i></button></td>");
             
                // tr.append("<td><input type='hidden'   name='hdnAvailTaskAmnt_" + (i + 1) + "' id='hdnAvailTaskAmnt_" + (i + 1) + "' class='hdnAvailTaskAmntTbl" + data[i].TWB_BudgetDistId + "" + data[i].TWB_ActivityId + "' ><input type='text'   name='txtAvailTaskAmnt_" + (i + 1) + "' id='txtAvailTaskAmnt_" + (i + 1) + "' class='form-control txtAvailTaskAmntTbl" + data[i].TWB_BudgetDistId + "" + data[i].TWB_ActivityId + "' disabled></td>");
               // tr.append("<td style='text-align:center'><button " + (data[i].IsEnable === 'disabled' ? 'disabled' : '') + " onclick='deleteconfirmBoxClickForTask(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></button></td>");
                $('#tblTask tbody').append(tr);

                TotalBudgtForTask = TotalBudgtForTask + data[i].TWB_Budget;
                AvailBudgte = data[i].PBD_AvailbleBudget + data[i].TWB_Budget;

                //$('#hdnTotalAvailTaskAmnt_' + (i + 1) + '').val(data[i].PBD_AvailbleBudget + data[i].TWB_Budget);
                //$('.txtAvailTaskAmntTbl' + data[i].TWB_BudgetDistId + '').val(data[i].PBD_AvailbleBudget);
                //$('.hdnAvailTaskAmntTbl' + data[i].TWB_BudgetDistId + '').val(data[i].PBD_AvailbleBudget);
                //AvailBudgteTask = data[i].PBD_AvailbleBudget + data[i].TWB_Budget;

               // var drpact = $('#ddlTaskActivityTbl_' + (i + 1) + '');
                var drp = $('#ddlFundTypeTaskTbl_' + (i + 1) + '');
                var drpTask = $('#ddlTaskTbl_' + (i + 1) + '');

                //drpact.length &&
                //    drpact.each(function () {
                //        var drpact = $(this);
                //        drpact.wrap('<div class="position-relative"></div>'), drpact.select2({ placeholder: "Select A Activity Type", dropdownParent: drpact.parent() });
                //    });

                drp.length &&
                    drp.each(function () {
                        var drp = $(this);
                        drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
                    });

                drpTask.length &&
                   drpTask.each(function () {
                       var drpTask = $(this);
                       drpTask.wrap('<div class="position-relative"></div>'), drpTask.select2({ placeholder: "Select A Task", dropdownParent: drpTask.parent() });
                   });

                //DropdownBinder.DDLData = {
                //    tableName: "CreateActivity_CA",
                //    Text: 'CA_ActivityName',
                //    Value: 'CA_Id',
                //    ColumnName: 'CA_ProjectId',
                //    PId: Id

                //};
                //DropdownBinder.DDLElem = $('#ddlTaskActivityTbl_' + (i + 1) + '');
                //DropdownBinder.Execute();

                DropdownBinder.DDLData = {
                    tableName: "FundType_FT",
                    Text: 'FT_Type',
                    Value: 'FT_Id'
                };
                DropdownBinder.DDLElem = $('#ddlFundTypeTaskTbl_' + (i + 1) + '');
                DropdownBinder.Execute();


                DropdownBinder.DDLData = {
                    tableName: "TaskDeatils_TD",
                    Text: 'TD_TaskName',
                    Value: 'TD_Id',
                    ColumnName: 'TD_ProjectId',
                    PId: Id,
                    PId1: data[i].TWB_ActivityId,
                    ColumnName1: 'TD_ActivityId',

                };
                DropdownBinder.DDLElem = $('#ddlTaskTbl_' + (i + 1) + '');
                DropdownBinder.Execute();


                $('#ddlTaskActivityTbl_' + (i + 1) + '').val(data[i].TWB_ActivityId).change();
                $('#ddlFundTypeTaskTbl_' + (i + 1) + '').val(data[i].TWB_BudgetDistId).change();

                $('#ddlFundTypeTask').val(0).change();


                $('#ddlTaskTbl_' + (i + 1) + '').val(data[i].TWB_TaskId).change();

                $('#ddlTask').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgTask').modal('show');
            }
            $('#txtsumAllocatedBudgtActivityTask').val(TotalBudgtForTask);
            $('#hdnsumAllocatedBudgtHdnActivityTask').val(TotalBudgtForTask);

            if (parseFloat($('#txtsumAllocatedBudgtActivityTask').val()) <= 0) {
                $('#btnSaveBudgetDetailsForTask').prop("disabled", true);
            } else {
                $('#btnSaveBudgetDetailsForTask').prop("disabled", false);
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



//////////////////////////////////////////////////////////////////////////////////Budget For SMME//////////////////////////////////////////////////////////////////////////////


$('#ddlFundTypeSMME').on('change', function () {
    if (this.value > 0) {
        fundWiseAvailBudgetSMME(this.value);

    }
});



function fundWiseAvailBudgetSMME(fundtype) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_FundName',
            param2Value: parseInt(fundtype),

            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);

            var totalallocatMoney = 0;
            var totalavalfundtbl = 0;
            var table = document.getElementById("tblSMME");
            var rows = table.getElementsByTagName("tr")
            if (rows.length > 1) {
                $('#tblSMME tbody tr').each(function (i, row) {
                    $(this).find('select.ddlFundTypeSMMETbl' + fundtype).each(function () {

                        totalallocatMoney = totalallocatMoney + parseInt($(".tblSMMEFund" + fundtype).val());
                        totalavalfundtbl = parseInt($(".hdnAvailSMMEAmntTbl" + fundtype).val());

                    })
                });
            }
            if (data[0].PBD_AvailbleBudget > 0) {

                AvailBudgteSMME = (totalavalfundtbl > 0 ? totalavalfundtbl : data[0].PBD_AvailbleBudget);
                $('#txtAvailableFundSMME').val((AvailBudgteSMME));
                $('#hdnAvailableFundSMME').val((AvailBudgteSMME));
                $('.txtAvailSMMEAmntTbl' + fundtype).val((AvailBudgteSMME));
                $('#btnAddSMMEBudget').removeAttr('disabled');
            }else {
                $('#txtAvailableFundSMME').val(0);
                $('#hdnAvailableFundSMME').val(0);
                $('#btnAddSMMEBudget').attr('disabled', 'disabled');
            }
            //console.log('availbe '+AvailBudgte);
            //console.log('total '+totalallocatMoney);
            //console.log('db '+data[0].PBD_AvailbleBudget);
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

function cellAmntForSMMEBudget(t) {
    var txtTotalTaskSMMEBudget = $('#txtTotalTaskBudgetSMME').val()   //($('#txtTotalActivityBudget').val().substring(1)); //  -- A  1000
    var totalSMMEAmount = 0;  // --B
    $('#tblSMME tbody tr').each(function () {
        var smmeAmount = parseFloat($(this).find("td:eq(1) input[type='text']").val()) || 0;
        totalSMMEAmount += smmeAmount;
    });

    var calculateValue = txtTotalTaskSMMEBudget - totalSMMEAmount  // - C

    var SmmeAmnt = t.value;  // -- D

    if (SmmeAmnt > calculateValue) {
        Swal.fire({
            title: 'Amount Should Be Less Than ' + txtTotalTaskSMMEBudget,
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        $("#txtSMMEAmnt").val(0).focus();
        return false;
    }
}


function AddSMMEBudget() {
    var actsmme = 0;
    var tasksmme = 0;
    var smme = 0;
    $.each($('#tblSMME tbody tr'), function (index, value) {
        if ((parseInt($('#ddlSMME').val()) == parseInt($(this).find("td:eq(0) option:selected").val()))){
            smme = 1;
        }
    });

    if (smme == 1) {
        Swal.fire({
            title: 'Same MSME already exists',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }
    smme = 0
    actsmme = 0;
    tasksmme = 0;
    var totalRowCount = 0;
    var rowCount = 0;
    var txtsumAllocatedBudgtForSMME = 0;
    var table = document.getElementById("tblSMME");
    var rows = table.getElementsByTagName("tr")
    //alert(rows.length);
    var tr;
    var m = (rows.length);
    tr = $('<tr/>');

    tr.append("<td> <select id='ddlSMMETbl_" + m + "' name='ddlSMMETbl_" + m + "' class='select2 form-select ddlSMMETbl' data-allow-clear='true'></select></td>");
    tr.append("<td  style='width:20%;'><input type='text' value =" + $('#txtSMMEAmnt').val() + "    class='form-control tblSMMEFund" + $('#ddlFundTypeSMME').val() + "' name='txtAmntSMME_" + m + "' id='txtAmntSMME_" + m + "' onkeyup='cellAmntChngeForSMMEBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'><input type='hidden'   name='hdnTotalAvailSMMEAmnt_" + m + "' id='hdnTotalAvailSMMEAmnt_" + m + "' class='hdnTotalAvailSMMEAmntTbl" + $('#ddlFundTypeSMME').val() + "' ></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlBudgetDistSMME').val() + "' name='hdnBudgetDistSMME_" + m + "' id='hdnBudgetDistSMME_" + m + "'/></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlTaskActivitySMME').val() + "' name='hdnActivity_" + m + "' id='hdnActivity_" + m + "'/></td>");
    tr.append("<td hidden><input type='hidden' value='" + $('#ddlTaskSMME').val() + "' name='hdnTask_" + m + "' id='hdnTask_" + m + "'/></td>");
    tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClickForSMME(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");
    $('#tblSMME tbody').append(tr);

    var txtActAmnt = parseInt($('#txtSMMEAmnt').val());
    var txtsum = parseInt($('#txtsumAllocatedBudgtActivitySMME').val());
    if (isNaN(txtsum)) {
        $('#txtsumAllocatedBudgtActivitySMME').val(txtActAmnt);
        $('#hdnsumAllocatedBudgtHdnActivitySMME').val(txtActAmnt);
    } else {
        $('#txtsumAllocatedBudgtActivitySMME').val(txtActAmnt + txtsum);
        $('#hdnsumAllocatedBudgtHdnActivitySMME').val(txtActAmnt + txtsum);
    }

    var AvlBudgt = ($('#hdnTotalAvailableBudgetTaskSMME').val() - $('#hdnsumAllocatedBudgtHdnActivitySMME').val())
    $('#txtTotalAvailableBudgetTaskSMME').val(AvlBudgt);


    var drpSmme = $('#ddlSMMETbl_' + m + '');

    drpSmme.length &&
        drpSmme.each(function () {
            var drpSmme = $(this);
            drpSmme.wrap('<div class="position-relative"></div>'), drpSmme.select2({ placeholder: "Select A SMME", dropdownParent: drpSmme.parent() });
        });

    DropdownBinderJoin.DDLData = {
        tableName1: "ProjectWiseSmme_PSM",
        tableName2: "SMMERegistration_SMME",
        Text: 'SMME_CompanyName',
        Value: 'PSM_SmmeId',
        ColumnName1: 'SMME_Id',
        ColumnName: 'PSM_SmmeId',
        Param: 'PSM_ProjectId',
        PId: Id
    };
    DropdownBinderJoin.DDLElem = $('#ddlSMMETbl_' + m + '');
    DropdownBinderJoin.Execute();

    //$('#hdnTotalAvailSMMEAmnt_' + m + '').val(parseInt($('#txtAvailableFundSMME').val()) + parseInt($('#txtAmntSMME_' + m + '').val()));
    ////$('.txtAvailSMMEAmntTbl' + $('#ddlFundTypeSMME').val() + '').val($('#txtAvailableFundSMME').val());
    ////$('.hdnAvailSMMEAmntTbl' + $('#ddlFundTypeSMME').val() + '').val($('#txtAvailableFundSMME').val());

    //AvailBudgteSMME = $('#txtAvailableFundSMME').val();

    //$('#ddlTaskActivitySMMETbl_' + m + '').val($('#ddlTaskActivitySMME').val()).change();
    //$('#ddlTaskSMMETbl_' + m + '').val($('#ddlTaskSMME').val()).change();
    //$('#ddlFundTypeSMMETbl_' + m + '').val($('#ddlFundTypeSMME').val()).change();

    $('#ddlSMMETbl_' + m + '').val($('#ddlSMME').val()).change();

    ////$.each($('#tblSMME tbody tr'), function (index, value) {
    ////    if (parseInt($(this).closest('tr').find("td:eq(1) option:selected").val()) == parseInt($('#ddlFundTypeSMME').val())) {
    ////        $(this).find("td:eq(2) input[type='hidden']").val(parseInt($(this).find("td:eq(2) input[type='text']").val()) + parseInt(parseInt($('#txtAvailableFundSMME').val())));
    ////    }
    ////});
    $('.txtModal').val('');
    $('#ddlSMME').val(0).change();
    //$('#ddlTaskActivitySMME').val(0).change();
    //$('#ddlTaskSMME').val(0).change();
    ////$('#ddlFundTypeSMME').val(0).change();
    if (parseFloat($('#txtsumAllocatedBudgtActivitySMME').val()) <= 0) {
        $('#saveBtnSMME').prop("disabled", true);
    } else {
        $('#saveBtnSMME').prop("disabled", false);
    }

    $('#btnAddSMMEBudget').attr('disabled', 'disabled');
}


function SaveBudgetDetailsForSMME() {

    var totalAmntTabl = 0;
    var SMMEBudgetArr = [];
    $.each($('#tblSMME tbody tr'), function (index, value) {

        SMMEBudgetArr.push({
            SWB_SMMEId: parseInt($(this).find("td:eq(0) option:selected").val()),
            SWB_Budget: parseFloat($(this).find("td:eq(1) input[type='text']").val()),
            SWB_BudgetDistId: parseInt($(this).find("td:eq(2) input[type='hidden']").val()),
            SWB_ActivityId: parseInt($(this).find("td:eq(3) input[type='hidden']").val()),
            SWB_TaskId: parseInt($(this).find("td:eq(4) input[type='hidden']").val())
        });
    });

    var _data = JSON.stringify({
        entity: {
            SMMEWiseBudgetList: SMMEBudgetArr,
            ProjectId: Id
        }
    });
    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateBudgetAllocationForSMME',
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
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#modalBudgSMME').modal('hide');
                        $('.txtEmpFld').val('');
                    }
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
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}

function retriveSMMEBudgetDetails(Id, acId, taskId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseBudget',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'ActivityId',
            param2Value: parseInt(acId),
            param3: 'TaskId',
            param3Value: parseInt(taskId),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            console.log('SMME Data dgdh-   ', data);

            $('#tblSMME tbody').html('');
            var TotalBudgtForSMME = 0;
            for (var i = 0; i < data.length; i++) {
                var totalRowCount = 0;
                var rowCount = 0;
                var table = document.getElementById("tblSMME");
                var rows = table.getElementsByTagName("tr")
                //alert(rows.length);
                var tr;

                tr = $('<tr/>');
                tr.append("<td><select id='ddlSMMETbl_" + (i + 1) + "' name='ddlSMMETbl_" + (i + 1) + "' class='select2 form-select ddlSMMETbl' data-allow-clear='true'></select></td>");
                tr.append("<td style='width:20%;'><input type='text' value ='" + data[i].SWB_Budget + "'    class='form-control tblSMMEFund" + data[i].SWB_BudgetDistId + "' name='txtAmntSMME_" + (i + 1) + "' id='txtAmntSMME_" + (i + 1) + "' onkeyup='cellAmntChngeForSMMEBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].SWB_BudgetDistId + "' name='hdnBudgetDistSMME_" + i + "' id='hdnBudgetDistSMME_" + i + "' class='form-control txtDescription" + data[i].SWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].SWB_ActivityId + "' name='hdnSMME_" + i + "' id='hdnSMME_" + i + "' class='form-control txtDescription" + data[i].SWB_BudgetDistId + "'/></td>");
                tr.append("<td hidden><input type='hidden' value='" + data[i].SWB_TaskId + "' name='hdnTaskSMME_" + i + "' id='hdnTaskSMME_" + i + "' class='form-control txtDescription" + data[i].SWB_BudgetDistId + "'/></td>");
                tr.append("<td><button  onclick='deleteconfirmBoxClickForSMME(this)' href='javascript:;' class='text-body' style='border-style: none;background: none;'><i class='ti ti-trash me-2 ti-sm'></i></button></td>");

                //tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClickForSMME(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");
                $('#tblSMME tbody').append(tr);

                TotalBudgtForSMME = TotalBudgtForSMME + data[i].SWB_Budget;

                // AvailBudgte = data[i].PBD_AvailbleBudget + data[i].TWB_Budget;
                //$('.txtAvailSMMEAmntTbl' + data[i].SWB_FundTypeId + '').val(data[i].PBD_AvailbleBudget);
                //$('#hdnTotalAvailSMMEAmnt_' + (i + 1) + '').val(data[i].PBD_AvailbleBudget + data[i].SWB_Budget);
                //$('.hdnAvailSMMEAmntTbl' + data[i].SWB_FundTypeId + '').val(data[i].PBD_AvailbleBudget);
                //AvailBudgteSMME = data[i].PBD_AvailbleBudget + data[i].SWB_Budget;

                var drpSMME = $('#ddlSMMETbl_' + (i + 1) + '');

                drpSMME.length &&
                   drpSMME.each(function () {
                       var drpSMME = $(this);
                       drpSMME.wrap('<div class="position-relative"></div>'), drpSMME.select2({ placeholder: "Select A SMME", dropdownParent: drpSMME.parent() });
                   });

                DropdownBinderJoin.DDLData = {
                    tableName1: "ProjectWiseSmme_PSM",
                    tableName2: "SMMERegistration_SMME",
                    Text: 'SMME_CompanyName',
                    Value: 'PSM_SmmeId',
                    ColumnName1: 'SMME_Id',
                    ColumnName: 'PSM_SmmeId',
                    Param: 'PSM_ProjectId',
                    PId: Id
                };
                DropdownBinderJoin.DDLElem = $('#ddlSMMETbl_' + (i + 1) + '');
                DropdownBinderJoin.Execute();

                $('#ddlSMMETbl_' + (i + 1) + '').val(data[i].SWB_SMMEId).change();
                $('#ddlSMME').val(0).change();
                $('.txtModal').val('');
                $('#modalBudgSMME').modal('show');
            }
            $('#txtsumAllocatedBudgtActivitySMME').val(TotalBudgtForSMME);
            $('#hdnsumAllocatedBudgtHdnActivitySMME').val(TotalBudgtForSMME);

            if (parseFloat($('#txtsumAllocatedBudgtActivitySMME').val()) <= 0) {
                $('#saveBtnSMME').prop("disabled", true);
            } else {
                $('#saveBtnSMME').prop("disabled", false);
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


/////////////////////////////////////////////////////////Save///////////////////////////////////////
function SaveBudgetForProject() {

    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        entity: {
            PD_Id: Id,
            PD_BudgetType: $('#ddlBudgetType').val(),
            PD_Budget: $('#txtBudget').val(),
            TransactionType: "UpdateBudget",
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.SaveRecord,
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                $('#hdnBudget').val($('#txtBudget').val());
                $('#hdnBdgtType').val($("#ddlBudgetType option:selected").text());

                retrive(Id)
               // $('#totalbudget').text($('#txtBudget').val());

                Swal.fire({
                    title: "Your Save Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                }).then((result) => {

                    if (result.isConfirmed) {
                        $('#backDropModal').modal('hide');
                    }


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
                title: "Process Not Complete",
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });

        }
    });

}

function retrive(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: globalData.TransactionType,
            param1: globalData.param1,
            param1Value: parseInt(id),
            StoreProcedure: globalData.StoreProcedure
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);

            $('#hdnBdgtType').val(data[0].BT_Type);
            if (data[0].PD_Budget > 0) {
                $("#btnBudgetFundDistribution").prop('disabled', false);
                // $(".allcn").prop('disabled',true);
            }
            hdnBudget = data[0].PD_Budget;
            sumFundBudget = data[0].PD_Budget;
            $('#hdnBudget').val(data[0].PD_Budget);

            $('#totalbudget').html(data[0].PD_Budget);

            retriveFundDetails(id);
            retriveFundDistribution(id);
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

$("#btnBudgetAllocation").click(function () {
    retriveprojectbudget(Id);
    $('#backDropModal').modal('show');
    if (hdnBudget > 0) {
        $("#btnBudgetFundDistribution").prop('disabled', false);
    }
});

//$("#btnBudgetAllocation").click(function () {
//    retriveprojectbudget(Id);
//    $('#backDropModal').modal('show');
//    if (hdnBudget > 0) {
//        $("#modalBudgetAllocation").prop('disabled', false);
//    }
//});

$("#btnBudgetFundDistribution").click(function () {
    retriveProjectBudgetDetails(Id);
    $('#exLargeModal').modal('show');
});
$("#btnBudgetFundAllocation").click(function () {
    retriveProjectBudgetFundDetails(Id);
    $('#modalBudgetAllocation').modal('show');
});


$('#txtAmnt').on('change', function () {
    if (parseFloat($('#txtAmnt').val()) <= 0) {
        $('.AddBgtAllocaBtn').prop("disabled", true);
    } else {
        $('.AddBgtAllocaBtn').prop("disabled", false);
    }
});


//------------------- // Start SMME--------------------
$("#btnAsgnSMME").click(function () {
    $('#ddlBudgetDistSMME').find('option').remove();
    $('#ddlTaskActivitySMME').find('option').remove();
    $('#ddlTaskSMME').find('option').remove(); 
   // $('#ddlSMME').find('option').remove();

    DropdownBinder.DDLData = {
        tableName: "ProjectBudgetDetails_PBD",
        Text: 'PBD_FundName',
        Value: 'PBD_Id',
        ColumnName: 'PBD_ProjectId',
        PId: parseInt(Id)
    };
    DropdownBinder.DDLElem = $("#ddlBudgetDistSMME");
    DropdownBinder.Execute();

    $('#tblSMME tbody').html('');
    $('.txSMME').val('');
    $('.txSMMESpan').text('');

    $('#modalBudgSMME').modal('show');
    //var totalbudget = $('#totalbudget').text();
    //$('#txtTotalProjectBudgetSMME').val('R ' + totalbudget);
});

$('#ddlBudgetDistSMME').on('change', function () {
    if (parseFloat($('#txtTotalBudgetForSpacificFundSMME').val()) <= 0) {
        $('#txtSMMEAmnt').prop("disabled", true);
    } else {
        $('#txtSMMEAmnt').prop("disabled", false);
    }
    var txtSMMEGetId = $('#ddlBudgetDistSMME').val();
    fundWiseBudgetDistributionDetailsSMME(txtSMMEGetId);
});

$('#txtSMMEAmnt').on('change', function () {
    if (parseFloat($('#txtSMMEAmnt').val()) <= 0) {
        $('.AddSMMEBtn').prop("disabled", true);
    } else {
        $('.AddSMMEBtn').prop("disabled", false);
    }
});

//------------------- // End SMME--------------------


//------------------- // Start Task--------------------
$("#btnAsgnTASK").click(function () {
    $('#ddlBudgetDistTask').find('option').remove();
    $('#ddlTaskActivity').find('option').remove(); 
    $('#ddlTask').find('option').remove();
    DropdownBinder.DDLData = {
        tableName: "ProjectBudgetDetails_PBD",
        Text: 'PBD_FundName',
        Value: 'PBD_Id',
        ColumnName: 'PBD_ProjectId',
        PId: parseInt(Id)
    };
    DropdownBinder.DDLElem = $("#ddlBudgetDistTask");
    DropdownBinder.Execute();

    $('#tblTask tbody').html('');
    $('.txtask').val('');
    $('.txtaskSpan').text('');
    $('#modalBudgTask').modal('show');
});

$('#ddlBudgetDistTask').on('change', function () {
    if (parseFloat($('#txtTotalBudgetForSpacificFundTask').val()) <= 0) {
        $('#txtTaskAmnt').prop("disabled", true);
    } else {
        $('#txtTaskAmnt').prop("disabled", false);
    }
    var txtTaskGetId = $('#ddlBudgetDistTask').val();
    fundWiseBudgetDistributionDetailsTask(txtTaskGetId);
});

$('#txtTaskAmnt').on('change', function () {
    if (parseFloat($('#txtTaskAmnt').val()) <= 0) {
        $('.AddTaskBtn').prop("disabled", true);
    } else {
        $('.AddTaskBtn').prop("disabled", false);
    }
});
//------------------- // End Task--------------------

//------------------- // Start Activity--------------------
$("#btnAsgnAct").click(function () {
    $('#ddlBudgetDistActivity').find('option').remove();
    DropdownBinder.DDLData = {
        tableName: "ProjectBudgetDetails_PBD",
        Text: 'PBD_FundName',
        Value: 'PBD_Id',
        ColumnName: 'PBD_ProjectId',
        PId: parseInt(Id)
    };
    DropdownBinder.DDLElem = $("#ddlBudgetDistActivity");
    DropdownBinder.Execute();

    $('#tblActivity tbody').html('');
    $('.txtact').val('');
    $('.txtactSpan').text('');
    $('#modalBudgAcitivity').modal('show');
  
    
});
$('#ddlBudgetDistActivity').on('change', function () {
    if (parseFloat($('#txtTotalBudgetForSpacificFund').val()) <= 0) {
        $('#txtAcitivityAmnt').prop("disabled", true);
    } else {
        $('#txtAcitivityAmnt').prop("disabled", false);
    }
    var txtActGetId = $('#ddlBudgetDistActivity').val();
    fundWiseBudgetDistributionDetailsActivity(txtActGetId);
});

$('#txtAcitivityAmnt').on('change', function () {
    if (parseFloat($('#txtAcitivityAmnt').val()) <= 0) {
        $('.AddActBtn').prop("disabled", true);
    } else {
        $('.AddActBtn').prop("disabled", false);
    }
});
//------------------- // End Activity--------------------

function retriveFundDistribution(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectFundWiseBudget',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(id),
            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            console.log('Fund disribution- ',data);
            var div = '';
            var tblFund = '';
            var totalfund = 0;
            var totalbudget = $('#totalbudget').text();
            var totalUnallocatedBudget = 0;

            $('#divfundDistribution').html('');
            $('#tblFund tbody').html('');
           // var count = (data.length > 4) ? 4 : data.length;
            var count = (data.length);
            for (var i = 0; i < count; i++) {
                div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><small>' + data[i].PBD_FundName + '</small><h5 class="mb-0"> R ' + data[i].PBD_Amount + '</h5></div></div></div>';
                seriseData.push(data[i].PBD_Amount);
                seriseLbl.push(data[i].PBD_FundName);
                totalfund = totalfund + data[i].PBD_Amount;

            }

            totalUnallocatedBudget = (totalbudget - totalfund);

            $('#totalUnallocatedBudget').html('R '+totalUnallocatedBudget)

            $('#divfundDistribution').append(div);
         
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


function BindGridAct(Id) {
    // Make sure to clear any previous table data
    $('#datatable-act').empty();

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectActivityWiseBudgetForDashboard',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (response) {
            var data = JSON.parse(response);

            // Define all static column headers
            var columnDataAct = [
                { data: "AWB_ActivityDate", title: "Date" },
                { data: "CA_ActivityName", title: "Activity Name" },
                { data: "Quarterly 1", title: "Quarterly 1" },
                { data: "Quarterly 2", title: "Quarterly 2" },
                { data: "Quarterly 3", title: "Quarterly 3" },
                { data: "Quarterly 4", title: "Quarterly 4" }
            ];

            // Ensure all missing fields in data are filled with empty values
            data = data.map(function (row) {
                return columnDataAct.reduce(function (acc, col) {
                    acc[col.data] = (row[col.data] !== undefined && row[col.data] !== null) ? row[col.data] : ""; // Fill empty values
                    return acc;
                }, {});
            });

            // Calculate the totals for each quarterly column
            var totals = {
                "Quarterly 1": 0,
                "Quarterly 2": 0,
                "Quarterly 3": 0,
                "Quarterly 4": 0
            };

            // Create the table header dynamically
            var tableHeader = '<thead><tr>';
            for (var i = 0; i < columnDataAct.length; i++) {
                tableHeader += '<th>' + columnDataAct[i].title + '</th>';
            }
            tableHeader += '</tr></thead>';

            // Create the table body dynamically
            var tableBody = '<tbody>';
            for (var j = 0; j < data.length; j++) {
                tableBody += '<tr>';
                for (var k = 0; k < columnDataAct.length; k++) {
                    var col = columnDataAct[k];
                    tableBody += '<td>' + data[j][col.data] + '</td>';
                    // If it's a quarterly column, add its value to the total
                    if (col.title.startsWith("Quarterly")) {
                        totals[col.title] += parseFloat(data[j][col.data]) || 0;  // Add the value, default to 0 if NaN
                    }
                }
                tableBody += '</tr>';
            }
            tableBody += '</tbody>';

            // Create the table footer (totals row)
            var tableFooter = '<tfoot><tr>';
            for (var l = 0; l < columnDataAct.length; l++) {
                var col = columnDataAct[l];
                if (col.title.startsWith("Quarterly")) {
                    // Add the total sum for each quarterly column
                    tableFooter += '<td><strong>' + totals[col.title] + '</strong></td>';
                } else {
                    // Activity Name column will be left empty in the footer
                    tableFooter += '<td></td>';
                }
            }
            tableFooter += '</tr></tfoot>';

            // Combine the header, body, and footer into the final table HTML
            var tableHTML = tableHeader + tableBody + tableFooter;

            // Append the table to the element with id 'datatable-act'
            $('#datatable-act').html(tableHTML);

            // Optional: Add a class for styling
            $('#datatable-act').addClass('table table-bordered table-striped');
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request failed');
        }
    });
}



//function BindGridAct(Id) {
//    // Make sure to clear any previous table data
//    $('#datatable-act').empty();

//    var _data = JSON.stringify({
//        global: {
//            TransactionType: 'SelectActivityWiseBudgetForDashboard',
//            param1: 'ProjectId',
//            param1Value: parseInt(Id),
//            StoreProcedure: 'BudgetAllocation_USP'
//        }
//    });

//    $.ajax({
//        type: "POST",
//        url: URLList.GetList,
//        contentType: "application/json; charset=utf-8",
//        data: _data,
//        dataType: "json",
//        success: function (response) {
//            let data = JSON.parse(response);

//            // Define all static column headers
//            const columnDataAct = [
//                { data: "CA_ActivityName", title: "Activity Name" },
//                { data: "Quarterly 1", title: "Quarterly 1" },
//                { data: "Quarterly 2", title: "Quarterly 2" },
//                { data: "Quarterly 3", title: "Quarterly 3" },
//                { data: "Quarterly 4", title: "Quarterly 4" }
//            ];

//            // Ensure all missing fields in data are filled with empty values
//            data = data.map(row => {
//                return columnDataAct.reduce((acc, col) => {
//                    acc[col.data] = row[col.data] !== undefined && row[col.data] !== null ? row[col.data] : ""; // Fill empty values
//                    return acc;
//                }, {});
//            });

//            // Create the table header dynamically
//            let tableHeader = '<thead><tr>';
//            columnDataAct.forEach(function (col) {
//                tableHeader += `<th>${col.title}</th>`;
//            });
//            tableHeader += '</tr></thead>';

//            // Create the table body dynamically
//            let tableBody = '<tbody>';
//            data.forEach(function (row) {
//                tableBody += '<tr>';
//                columnDataAct.forEach(function (col) {
//                    tableBody += `<td>${row[col.data]}</td>`;
//                });
//                tableBody += '</tr>';
//            });
//            tableBody += '</tbody>';

//            // Combine the header and body into the final table HTML
//            const tableHTML = tableHeader + tableBody;

//            // Append the table to the element with id 'datatable-act'
//            $('#datatable-act').html(tableHTML);

//            // Optional: Add a class for styling
//            $('#datatable-act').addClass('table table-bordered table-striped');
//        },
//        error: function (xhr, textStatus, errorThrown) {
//            alert('Request failed');
//        }
//    });
//}




function BindGridTsk(Id) {
    $('#datatable-tsk').DataTable().destroy();
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectTaskWiseBudgetForDashboard',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            //param2: 'ProjectId',
            //param2Value: parseInt(Id),
            StoreProcedure: 'BudgetAllocation_USP'
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

            var oTable = $('#datatable-tsk').DataTable({
                data: data,
                columns: columnDataTsk,
                columnDefs: [

                ],

                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search_tsk },
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

function BindGridSMME(Id) {

    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectSMMEWiseBudgetForDashboard',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            StoreProcedure: 'BudgetAllocation_USP'
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

            var oTable = $('#datatable-smme').DataTable({
                data: data,
                columns: columnDataSMME,
                columnDefs: [

                ],

                dom:
                    '<"card-header d-flex flex-wrap pb-2"<f><"d-flex justify-content-center justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex justify-content-center flex-md-row mb-3 mb-md-0 ps-1 ms-1 align-items-baseline"lB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 20, 50, 70, 100],
                language: { sLengthMenu: "_MENU_", search: "", searchPlaceholder: search_smme },
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

function SidePopUpForShowFund() {
    $('#viewFundPopUp').addClass('show');
}

function SidePopUpForShowFundClose() {
    $('#viewFundPopUp').removeClass('show');
}

///////////////////////////////////////
function SaveBudgeFundtDetails() {
    var tblBudgetFund = document.getElementById("tblBudgetFund");
    var totalAmntTabl=0;
    var BudgetArr = [];

    $.each($('#tblBudgetFund tbody tr'), function (index, value) {


        //TotalAmt += isNaN(parseFloat($(this).find("td:eq(4) input[type='text']").val())) ? 0 : parseFloat($(this).find("td:eq(4) input[type='text']").val());
        BudgetArr.push({
            PBFD_FundType: parseInt($(this).find("td:eq(0) option:selected").val()),
            PBFD_Enterprise: parseInt($(this).find("td:eq(1) option:selected").val()),
           // PBFD_Desc: $(this).find("td:eq(1) input[type='text']").val(),
            PBFD_Qty: parseInt( $(this).find("td:eq(2) input[type='text']").val()),
            PBFD_Amount: parseFloat($(this).find("td:eq(3) input[type='text']").val()),
            PBFD_TotalAmount: parseFloat($(this).find("td:eq(4) input[type='text']").val()),
               
        });
        totalAmntTabl=totalAmntTabl+parseFloat($(this).find("td:eq(4) input[type='text']").val());
    
    });

    //    for (var i = 1; i <= $('#tblBudgetFund tbody tr').length; i++) {
       

    //        BudgetArr.push({
    //            PBD_FundType: parseInt($('#ddlFundTypeTbl_'+i+'').val()),
    //            PBD_Desc: $('#txtDesc_'+i+'').val(),
    //            PBD_Qty: parseInt($('#txtQty_'+i+'').val()),
    //            PBD_Amount: parseFloat($('#txtAmnt_'+i+'').val()),
    //            PBD_TotalAmount: parseFloat($('#txtTotalAmnt_'+i+'').val()),
               
    //        });
       
    //    }
    ////    if(totalAmntTabl<parseFloat($('#hdnBdgt').val()))
    //    {
    //        Swal.fire({
    //            title: "Please Add More  Fund!",
    //            icon: "error",
    //            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
    //            buttonsStyling: !1
    //        }).then((result) => {
       
    //            if (result.isConfirmed) {
    //             $(".allcn").prop('disabled',false);
    //     $('#exLargeModal').modal('hide');
               
                
    //    }
        
    //});
    //return false;
    //}


    if(totalAmntTabl>parseFloat($('#hdnBdgt').val()))
    {
        Swal.fire({
            title: "Total Budget Exceed"+parseFloat($('#hdnBdgt').val()),
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        }).then((result) => {
       
            if (result.isConfirmed) {
     $('#exLargeModal').modal('hide');
               
                
    }
        
});
return false;
}

var _data = JSON.stringify({
    entity: {
        list: BudgetArr,
        PBFD_ProjectId:Id
    }
}); 
$.ajax({
    type: "POST",
    url: '/ScriptJson/InsertUpdateProjectBudgetFundDetails',
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
            }).then((result) => {
       
                if (result.isConfirmed) {
           //$('#exLargeModal').modal('hide');
             window.location.href='/Project/ProjectBudgetDashboard?Id='+Id;
                
        }
        
    });
            $('#tblBudgetFund > tbody').html('');
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

function retriveProjectBudgetFundDetails(id) {// Ai functien rmdhye cll kro
    var _data = JSON.stringify({
        global: {
            TransactionType: 'Select',
            param1: 'PBFD_ProjectId',
            param1Value: parseInt(id),
            StoreProcedure: 'ProjectBudgetFundDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            

            $('#hdnBdgt').val(hdnBudget);
            $('#totalBudget').text(hdnBudget);
            $('#totalBudgetFund').text(hdnBudget);


            $('#tblBudgetFund tbody').html('');
            var tr;
            var sumAllocatedBudgt = 0;
            for (var i = 0; i < data.length; i++) {
                $(".allcn").prop('disabled', false);
                tr = $('<tr/>');

                tr.append("<td><select id='ddlFundTypeTbl_" + (i + 1) + "' name='ddlFundTypeTbl_" + (i + 1) + "' class='select2 form-select ddlFundTypeTbl' data-allow-clear='true'></select></td>");
                //tr.append("<td><input type='text' value ='" + data[i].PBFD_Desc + "'    class='form-control' name='txtDesc_" + (i + 1) + "' id='txtDesc_" + (i + 1) + "' ></td>");
                tr.append("<td><select id='ddlEnterpriseTbl_" + (i + 1) + "' name='ddlEnterpriseTbl_" + (i + 1) + "' class='select2 form-select ddlEnterpriseTbl' data-allow-clear='true'></select></td>");

                tr.append("<td><input type='text' value ='" + data[i].PBFD_Qty + "'    class='form-control' name='txtQty_" + (i + 1) + "' id='txtQty_" + (i + 1) + "' onkeyup='cellAmntChngeForBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
                tr.append("<td><input type='text' value ='" + data[i].PBFD_Amount + "'    class='form-control' name='txtAmnt_" + (i + 1) + "' id='txtAmnt_" + (i + 1) + "'  onkeyup='cellAmntChngeForBudget(this)' onkeydown='return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 8 && event.keyCode != 46)'></td>");
                tr.append("<td><input type='text' value ='" + data[i].PBFD_TotalAmount + "'  name='txtTotalAmnt_" + (i + 1) + "' id='txtTotalAmnt_" + (i + 1) + "' class='form-control' disabled><input type='hidden' value ='" + data[i].PBFD_TotalAmount + "'  name='txtTotalAmnt_" + (i + 1) + "' id='txtTotalAmnt_" + (i + 1) + "' ></td>");
                tr.append("<td style='text-align:center'><a onclick='deleteconfirmBoxClick(this)' href='javascript:;' class='text-body'  ><i class='ti ti-trash me-2 ti-sm'></i></a></td>");
                $('#tblBudgetFund tbody').append(tr);

                sumAllocatedBudgt = (parseFloat(sumAllocatedBudgt) + parseFloat(data[i].PBFD_TotalAmount));

                var drp = $('#ddlFundTypeTbl_' + (i + 1) + '');
                drp.length &&
                    drp.each(function () {
                        var drp = $(this);
                        drp.wrap('<div class="position-relative"></div>'), drp.select2({ placeholder: "Select A Fund Type", dropdownParent: drp.parent() });
                    });

                var drpenr = $('#ddlEnterpriseTbl_' + (i + 1) + '');
                drpenr.length &&
                    drpenr.each(function () {
                        var drpenr = $(this);
                        drpenr.wrap('<div class="position-relative"></div>'), drpenr.select2({ placeholder: "Select Enterprise", dropdownParent: drpenr.parent() });
                    });

                DropdownBinder.DDLData = {
                    tableName: "FundType_FT",
                    Text: 'FT_Type',
                    Value: 'FT_Id'
                };
                DropdownBinder.DDLElem = $('#ddlFundTypeTbl_' + (i + 1) + '');
                DropdownBinder.Execute();

                DropdownBinder.DDLData = {
                    tableName: "EnterpriseRegistration_ENR",
                    Text: 'ENR_CompanyName',
                    Value: 'ENR_Id'
                };
                DropdownBinder.DDLElem = $('#ddlEnterpriseTbl_' + (i + 1) + '');
                DropdownBinder.Execute();

                $('#ddlFundTypeTbl_' + (i + 1) + '').val(data[i].PBFD_FundType).change();
                $('#ddlEnterpriseTbl_' + (i + 1) + '').val(data[i].PBFD_Enterprise).change();

                $('#ddlFundType').val(0).change();
                $('#ddlEnterprise').val(0).change();

                $('.txtModal').val('');
                $('#sumAllocatedBudgt').val(sumAllocatedBudgt);
                $('#sumAllocatedBudgtHdn').val(sumAllocatedBudgt);
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

function retriveFundDetails(id) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectFundWiseBudgetAllocation',
            param1: 'PBFD_ProjectId',
            param1Value: parseInt(id),
            StoreProcedure: 'ProjectBudgetFundDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            console.log('Top 4 Fund-',data);
            var div = '';
            var tblFund = '';
            var totalfund = 0;
            $('#divfund').html('');
            $('#tblFund tbody').html('');
            var count = (data.length > 4) ? 4 : data.length;
            for (var i = 0; i < count; i++) {
                div = div + '<div class="col-md-3 col-6"><div class="d-flex align-items-center"><div class="badge rounded-pill bg-label-' + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + ' me-3 p-2"><i class="ti ti-chart-pie-2 ti-sm"></i></div><div class="card-info"><h5 class="mb-0">' + data[i].PBFD_TotalAmount + '</h5><small>' + data[i].FT_Type + '</small></div></div></div>';
                seriseData.push(data[i].PBFD_TotalAmount);
                seriseLbl.push(data[i].FT_Type);
                totalfund = totalfund + data[i].PBFD_TotalAmount;

            }
            for (var j = 0; j < data.length; j++) {
                tblFund = tblFund + '<tr><td> <div class="d-flex align-items-center"> <div class="d-flex flex-column"><h6 class="mb-0">' + data[j].FT_Type + '</h6><small class="text-truncate text-muted">' + data[j].PBFD_Desc + '</small></div></div></td><td class="text-end"><div class="user-progress"> <p class="mb-0 fw-medium">' + data[j].PBFD_TotalAmount + '</p></div> </td><tr/>'
            }

            remaningPercentage = isNaN(parseFloat(((hdnBudget - totalfund) * 100) / hdnBudget)) == true ? 0 : parseFloat(((hdnBudget - totalfund) * 100) / hdnBudget);
            $('#divfund').append(div);
            $('#tblFund > tbody').append(tblFund);
           // $('#remaningPerc').html((isNaN(parseFloat(((hdnBudget - totalfund) * 100) / hdnBudget)) == true ? 0 : parseFloat(((hdnBudget - totalfund) * 100) / hdnBudget)).toFixed(2) + '%');

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

function fundWiseBudgetDistributionDetailsActivity(fundtype) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForBudgetDistribution',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_Id',
            param2Value: parseInt(fundtype),

            StoreProcedure: 'ProjectBudgetDetails_USP'// aiita khlo
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);
           // console.log('jgfjddvf', data);
            // $('#txtPeriod').text(data[0].PBD_FundName);
            $('#hdnddlBudgetDistActivity').val(fundtype)

            $('.txtPeriod').text(data[0].PBD_FundName); 
            $('#txtTotalProjectBudgetAct').val($('#totalbudget').text())
            $('#txtTotalBudgetForSpacificFund').val('R ' + data[0].PBD_Amount);

            $('#txtTotalAvailableBudgetActivity').val(data[0].AWb_AvailableBudget);
            $('#hdnTotalAvailableBudgetActivity').val(data[0].PBD_Amount);
          
            $('#tblActivity tbody').html('');

            retriveActivityBudgetDetails(Id, fundtype);    ///newadded   here should be pass PBD_ProjectId and PBD_Id
            //$('#txtFundNameTask').text(data[0].PBD_FundName);
            //$('#txtTotalBudgetForSpacificFundTask').val('R ' + data[0].PBD_Amount);

            //$('#txtFundNameSMME').text(data[0].PBD_FundName);
            //$('#txtTotalBudgetForSpacificFundSMME').val('R ' + data[0].PBD_Amount);
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

function fundWiseBudgetDistributionDetailsTask(pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForBudgetDistribution',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_Id',
            param2Value: parseInt(pbdId),
            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);

            $('.txtPeriodTask').text(data[0].PBD_FundName);
            $('#txtTotalProjectBudgetTask').val($('#totalbudget').text())
            $('#txtTotalBudgetForSpacificFundTask').val('R ' + data[0].PBD_Amount);

            $('#ddlTaskActivity').find('option').remove();

            DropdownBinder.DDLData = {
                tableName: "CreateActivity_CA",
                Text: 'CA_ActivityName',
                Value: 'CA_Id',
                ColumnName: 'CA_ProjectId',
                PId: Id
            };
            DropdownBinder.DDLElem = $('#ddlTaskActivity');
            DropdownBinder.Execute();
            
            $('#ddlTaskActivity').on('change', function () {

                $('#tblTask tbody').html('');

                if (this.value > 0) {
                    $('#ddlTask').find("option").remove();
                    DropdownBinder.DDLData = {
                        tableName: "TaskDeatils_TD",
                        Text: 'TD_TaskName',
                        Value: 'TD_Id',
                        ColumnName: 'TD_ProjectId',
                        PId: Id,
                        ColumnName1: 'TD_ActivityId',
                        PId1: this.value,
                    };
                    DropdownBinder.DDLElem = $('#ddlTask');
                    DropdownBinder.Execute();

                    var mt = $("#ddlTask");
                    mt.length &&
                        mt.each(function () {
                            var mt = $(this);
                            mt.wrap('<div class="position-relative"></div>'), mt.select2({ placeholder: "Select Task", dropdownParent: mt.parent() });
                        });
                }

                var ActId = $('#ddlTaskActivity').val();
                fundWiseBudgetActivityDetailsForTask(Id, ActId, pbdId)
                retriveTaskBudgetDetails(Id, ActId, pbdId);
            });
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

function fundWiseBudgetActivityDetailsForTask(Id, acId, pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForActivityDetailsForTask',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'ActivityId',
            param2Value: parseInt(acId),
            param3: 'PBD_Id',
            param3Value: parseInt(pbdId),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            try {
                data = JSON.parse(data);

                if (Array.isArray(data) && data.length > 0) {
                    $('.txtActLabelTask').text(data[0].ActivityName);
                    $('#txtTotalActivityBudget').val(data[0].AWB_Budget);
                    $('#txtTotalAvailableBudgetTask').val(data[0].TWB_AvailableBudget);
                    $('#hdnTotalAvailableBudgetTask').val(data[0].AWB_Budget);
                } else {
                    $('#txtTotalActivityBudget').val(0);
                    $('#txtTotalAvailableBudgetTask').val(0);
                    $('#hdnTotalAvailableBudgetTask').val(0);
                }
            } catch (e) {
                console.error("Error parsing data:", e);
                $('#txtTotalActivityBudget').val(0);
                $('#txtTotalAvailableBudgetTask').val(0);
                $('#hdnTotalAvailableBudgetTask').val(0);
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

function fundWiseBudgetDistributionDetailsSMME(pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForBudgetDistribution',
            param1: 'PBD_ProjectId',
            param1Value: parseInt(Id),
            param2: 'PBD_Id',
            param2Value: parseInt(pbdId),
            StoreProcedure: 'ProjectBudgetDetails_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            data = JSON.parse(data);

            $('.txtPeriodSMME').text(data[0].PBD_FundName);
            $('#txtTotalProjectBudgetSMME').val($('#totalbudget').text())
            $('#txtTotalBudgetForSpacificFundSMME').val('R ' + data[0].PBD_Amount);

            $('#ddlTaskActivitySMME').find('option').remove();

            DropdownBinder.DDLData = {
                tableName: "CreateActivity_CA",
                Text: 'CA_ActivityName',
                Value: 'CA_Id',
                ColumnName: 'CA_ProjectId',
                PId: Id
            };
            DropdownBinder.DDLElem = $('#ddlTaskActivitySMME');
            DropdownBinder.Execute();

            $('#ddlTaskActivitySMME').on('change', function () {
                if (this.value > 0) {
                    $('#tblSMME tbody').html('');
                    
                    $('#ddlTaskSMME').find("option").remove();
                    $('#txtTotalActivityBudgetSMME').val('');
                    $('#txtTotalTaskBudgetSMME').val('');
                    $('#txtTotalAvailableBudgetTaskSMME').val('');
                    $('#hdnTotalAvailableBudgetTaskSMME').val('');
                    $('#txtsumAllocatedBudgtActivitySMME').val('');
                    $('#hdnsumAllocatedBudgtActivitySMME').val('');
                    $('.txlblActTaskClr').text('');
          
                    DropdownBinder.DDLData = {
                        tableName: "TaskDeatils_TD",
                        Text: 'TD_TaskName',
                        Value: 'TD_Id',
                        ColumnName: 'TD_ProjectId',
                        PId: Id,
                        ColumnName1: 'TD_ActivityId',
                        PId1: this.value,
                    };
                    DropdownBinder.DDLElem = $('#ddlTaskSMME');
                    DropdownBinder.Execute();

                    var mt = $("#ddlTaskSMME");
                    mt.length &&
                        mt.each(function () {
                            var mt = $(this);
                            mt.wrap('<div class="position-relative"></div>'), mt.select2({ placeholder: "Select Task", dropdownParent: mt.parent() });
                        });
                }

                var ActId = $('#ddlTaskActivitySMME').val();
                fundWiseBudgetActivityDetailsForSMME(Id, ActId, pbdId)

            });
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

function fundWiseBudgetActivityDetailsForSMME(Id, acId, pbdId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForActivityDetailsForSMME',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'ActivityId',
            param2Value: parseInt(acId),
            param3: 'PBD_Id',
            param3Value: parseInt(pbdId),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });
    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            try {
                data = JSON.parse(data);

                if (Array.isArray(data) && data.length > 0) {
                    
                    $('.txtActivityLabelSMME').text(data[0].ActivityNameSMME);
                    $('#txtTotalActivityBudgetSMME').val(data[0].AWB_BudgetSMME);
                    $('#txtTotalAvailableBudgetSMME').val(data[0].TWB_AvailableBudgetSMME);
                    $('#hdnTotalActivityBudgetSMME').val(data[0].TWB_AvailableBudgetSMME);
                } else {
                    $('#txtTotalActivityBudgetSMME').val(0);
                    $('#txtTotalAvailableBudgetSMME').val(0);
                    $('#hdnTotalActivityBudgetSMME').val(0);
                }

                //Onchange Task in SMME
                $('#ddlTaskSMME').on('change', function () {
                    $('#tblSMME tbody').html('');
                    $('#btnAddSMMEBudget').attr('disabled', 'disabled');
                    var taskId = $('#ddlTaskSMME').val();
                    fundWiseBudgetTaskDetails(Id, acId, taskId);
                    retriveSMMEBudgetDetails(Id, acId, taskId);
                });

            } catch (e) {
                console.error("Error parsing data:", e);
                $('#txtTotalActivityBudgetSMME').val(0);
                $('#txtTotalAvailableBudgetSMME').val(0);
                $('#hdnTotalActivityBudgetSMME').val(0);
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

function fundWiseBudgetTaskDetails(Id, ActId, taskId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectForTaskDetails',
            param1: 'ProjectId',
            param1Value: parseInt(Id),
            param2: 'ActivityId',
            param2Value: parseInt(ActId),
            param3: 'TaskId',
            param3Value: parseInt(taskId),
            StoreProcedure: 'BudgetAllocation_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: URLList.GetList,
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            try {
                data = JSON.parse(data);

                console.log('SMME Taka ',data);

                if (Array.isArray(data) && data.length > 0) {
                    $('.txtTaskLabelSMME').text(data[0].TaskNameSMME);
                    $('#txtTotalTaskBudgetSMME').val(data[0].TWB_BudgetSMME);
                    $('#txtTotalAvailableBudgetTaskSMME').val(data[0].TWB_AvailableBudgetSMME);
                    $('#hdnTotalAvailableBudgetTaskSMME').val(data[0].TWB_BudgetSMME);
                } else {
                    $('#txtTotalTaskBudgetSMME').val(0);
                    $('#txtTotalAvailableBudgetTaskSMME').val(0);
                    $('#hdnTotalAvailableBudgetTaskSMME').val(0);
                }
            } catch (e) {
                console.error("Error parsing data:", e);
                $('#txtTotalTaskBudgetSMME').val(0);
                $('#txtTotalAvailableBudgetTaskSMME').val(0);
                $('#hdnTotalAvailableBudgetTaskSMME').val(0);
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
