
var step = 1;
var SegmntCount = 0;
var optionArray = [];
var allInputValArray = [];
var finalArray = [];
var fileArray = [];



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
           results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function UploadDoc(upload) {
   
    var formData = new FormData();
    var totalFiles = document.getElementById(upload).files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById(upload).files[i];
        formData.append(upload, file);
    }
    $.ajax({

        type: "POST",
        url: '/ScriptJson/UploadAssessment',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false,
        async: false,
        success: function () {
           
        }
    }).done(function (response) {
    
      
        console.log(response);
    }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });
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
function FileUpload(input,id) {
  
    var fileInput = input.files[0];
    
   var size = bytesToSize(500000);
   
    
if (fileInput.size > 500000) {

        Swal.fire({
            title: 'File size is more then ' + size + 'b',
            icon: "error",
            customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
            buttonsStyling: !1
        });
        return false;
    }

    else {
  
            UploadDoc('flie_'+id);
          fileArray.push({ name: '/AssessmentUpload/'+fileInput.name, value: id });
        
        
    }
}


$(document).ready(function () {

 $("#section-block").block({message:'<div class="d-flex justify-content-center"> <p class="mb-0">Please wait loading your Assessment...</p> <div class="sk-wave m-0"><div class="sk-rect sk-wave-rect"></div><div class="sk-rect sk-wave-rect"></div><div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> </div></div>',timeout:3e3,css:{backgroundColor:"transparent",color:"#fff",border:"0"},overlayCSS:{opacity:.9}})
 retriveAssement();
   
});

function retriveAssement() {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildAssessmentListForSMME',
            param1: 'SmmeId',
            param1Value: parseInt($('#hdnSmmeId').val()),
          
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
        success: function (data) {
            SegmntCount = 0;
            data = JSON.parse(data);
            console.log('retriveAssement', data);
            $('#hdnBaId').val(data[0].AAS_BA_Id);
            retriveSegment(data[0].AAS_BA_Id);


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

function getChkAndradiodata(o, value,count) {

    if ($(o).val() == 0) {
        $(o).val(1);
        //if (count==1) {

        //    $(o).attr('name', 'new_name')
        //}
    }
    else {
        
        $(o).val(0);
    }

}

function retriveQuestionOption(QN_Id, QuestionOption, OptionId) {
  
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectQuestionOptionForSMMENew',
            param1: 'QN_Id',
            param1Value: parseInt(QN_Id),
            param2: 'QuestionOption',
            paramString2: QuestionOption,
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
     
        success: function (data) {
            var SingleSlct = '';
            data = JSON.parse(data);
           
                //$.each(data, function (i) {

                //    var optionhtml = '<option value="' +
                //      data[i].QND_QuestionName + '">' + data[i].QND_QuestionName + '</option>';
                $(OptionId).append(data[0].AppendValue);
                //});
            
            //if (QuestionOption == "SingleSelect") {
            //    optionArray = data;

            //    $.each(optionArray, function (i) {
            //        SingleSlct = '';

            //        if (optionArray[i].QND_QN_Id == QN_Id) {
            //            if (optionArray.length > 1) {

            //                SingleSlct = SingleSlct + '<div class="form-check form-check-inline"><input onClick="getChkAndradiodata(this,\'' + optionArray[i].QND_QuestionName + '\','+optionArray.length+')"  class="form-check-input cls_' + QN_Id + '" id="rdo_' + optionArray[i].QND_QuestionName + '|' + QN_Id + '" name="rdo_'+ QN_Id + '" type=radio value="0"> <label class=form-check-label for="' + optionArray[i].QND_QuestionName + '">' + optionArray[i].QND_QuestionName + '</label></div>';

            //            }
            //            else {
            //                SingleSlct = '<div class="form-check"><input class="form-check-input cls_' + QN_Id + '" type="checkbox" onClick="getChkAndradiodata(this,\'' + optionArray[i].QND_QuestionName + '\',' + optionArray.length + ')" value="0"  id="chk' + optionArray[i].QND_QuestionName + '|' + QN_Id + '"  name="chk_' + QN_Id + '"></div>';

            //            }
            //            $(OptionId).append(SingleSlct);
            //            SingleSlct = '';
            //        }
            //    });


            //}

            //if (QuestionOption == "MultiSelect") {
            //    optionArray = data;

            //    $.each(optionArray, function (i) {
            //        MulSlct = '';

            //        if (optionArray[i].QND_QN_Id == QN_Id) {

            //            MulSlct = MulSlct + '<div class="form-check form-check-inline"><input class="form-check-input cls_' + QN_Id + '" onClick="getChkAndradiodata(this,\'' + optionArray[i].QND_QuestionName + '\','+optionArray.length+')" type="checkbox" id="chk_' + optionArray[i].QND_QuestionName + '|' + QN_Id + '" name="chk_' + optionArray[i].QND_QuestionName + '_' + QN_Id + '" value="0"><label class="form-check-label" for="chk_' + optionArray[i].QND_QuestionName + '">' + optionArray[i].QND_QuestionName + '</label></div>';


            //            $(OptionId).append(MulSlct);
            //            MulSlct = '';
            //        }
            //    });





            //}
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

function retriveSegment(Baid) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildSegmentListForSMME',
            param1: 'SmmeId',
            param1Value: parseInt($('#hdnSmmeId').val()),
            param2: 'BA_Id',
            param2Value: parseInt(Baid),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async: false,
      
        success: function (data) {
            SegmntCount = 0;
            data = JSON.parse(data);
            SegmntCount = data.length;

            console.log('affffgyfgh:', data);

            $.each(data, function (i, v) {
                var DvStep = '';
                var active = '';

                var areaselect = false;
                var show = '';
                var dstepperblock = '';
                var QsList = '';
                i = i + 1;
                if (i == 1) {
                    active = 'active';
                    areaselect = true;
                    dstepperblock = 'dstepper-block';
                }

                $("#segmentHeader").append('<div class="step ' + active + '" data-target="#Segdetails-' + v.BAD_SegSlNo + '"><input type="hidden" class="sgemntId" value="' + v.BAD_SegmentId + '" id="SegDetls_' + v.BAD_SegmentId + '" name="SegDetls_' + v.BAD_SegmentId + '"><button class="step-trigger" type="button"><span class=bs-stepper-circle>' + v.BAD_SegSlNo + '</span> <span class=bs-stepper-label><span class=bs-stepper-title>' + v.SegmentName + '</span></span></button></div><div class=line></div>');
                DvStep = DvStep + '<div class="content ' + active + ' ' + dstepperblock + '" id="Segdetails-' + v.BAD_SegSlNo + '" ></div>';
                $('#segmentContentForm').append(DvStep);
                if (i == v.BAD_SegSlNo) {
                    retriveQuestion("Segdetails-" + v.BAD_SegSlNo, v.BAD_SegmentId, v.BAD_BA_Id, v.BAD_SegSlNo);
                }
                $('#spnWizrd').text(v.AssessmentName);
               
                i++;

            });
            //alert('y');


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
function retriveQuestion(Segdetails, SegmentId, BA_Id, SlNo) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectBuildQuestionListForSMME',
            param1: 'SegmentId',
            param1Value: parseInt(SegmentId),
            param2: 'BA_Id',
            param2Value: parseInt(BA_Id),
            StoreProcedure: 'BuildAssessmentSetUp_USP'
        }
    });

    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        async:false,
        success: function (data) {
            data = JSON.parse(data);
           // console.log(data);
            var QsList = '';
            var btnList = '';
            $.each(data, function (index, elem) {
                index = index + 1;
                var option = '';
                var Ids = '';
                var chk = '';
                //if (elem.BAD_QuestionOption == "TextBox") {
                //    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label> <input class="form-control" id="qs_' + elem.BAD_QuestionId + '" name="qs_' + elem.BAD_QuestionId + '" placeholder="">'+elem.QN_IsUpload+'';
                //}
                //else if (elem.BAD_QuestionOption == "TextArea") {
                //    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label> <textarea class="form-control" id="qs_' + elem.BAD_QuestionId + '" name="qs_' + elem.BAD_QuestionId + '" rows="3"></textarea>'+elem.QN_IsUpload+'';
                //}
                //else if (elem.BAD_QuestionOption == "SingleSelect") {
                //    SingleSlct = '';
                //    //retriveQuestionOption(elem.BAD_QuestionId,elem.BAD_QuestionOption ,'');
                //    //console.log(optionArray);

                //    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label><div id="singlDv_' + elem.BAD_QuestionId + '"></div>'+elem.QN_IsUpload+'';
                //    var Ids = '#singlDv_' + elem.BAD_QuestionId + '';
                //}
                //else if (elem.BAD_QuestionOption == "Drop-down") {

                //    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label>   <select class="select2" id="qs_' + elem.BAD_QuestionId + '" name="qs_' + elem.BAD_QuestionId + '"><option label=" "></option> </select>'+elem.QN_IsUpload+'';
                //    var Ids = '#qs_' + elem.BAD_QuestionId + '';
                //}
                //else if (elem.BAD_QuestionOption == "MultiSelect") {


                //    option = '<label class="form-label" for="' + elem.QN_Question + '-vertical">' + elem.QN_Question + '</label><div id="singlDv_' + elem.BAD_QuestionId + '" name="singlDv_' + elem.BAD_QuestionId + '"></div>'+elem.QN_IsUpload+'';
                //    var Ids = '#singlDv_' + elem.BAD_QuestionId + '';
                //}
                QsList = QsList + '<div class="col-sm-6">' + elem.AppendData + '</div>';
                //retriveQuestionOption(elem.BAD_QuestionId, elem.BAD_QuestionOption, Ids);
            });
            
            //QsList = QsList + '<div class="col-sm-6">' + data[0].AppendData + '</div>';
            if (step == 1 && step < SegmntCount && step == SlNo) {
                btnList = '<button class="btn btn-label-secondary btn-prev" disabled=""><i class="ti me-0 me-sm-1 ti-arrow-left"></i> <span class="align-middle d-none d-sm-inline-block">Previous</span></button> <button class="btn btn-next btn-primary" onclick="fnAllInputArray(\''+ Segdetails +'\',' + SegmentId + ')"><span class="align-middle d-none d-sm-inline-block me-sm-1">Next</span> <i class="ti ti-arrow-right"></i></button>';
                $("#"+Segdetails).append('<div class="content-header mb-3"></div><div class="g-3 row"><input type="hidden" id="hdnSegId_' + SegmentId + '" value="' + SegmentId + '"/>' + QsList + '<div class="col-12 d-flex justify-content-between" id="btn" style="position:absolute;bottom:20px;left:0;right:0;">' + btnList + '</div></div>');

            }
            else if (step > 1 && step < SegmntCount && step == SlNo) {

                btnList = '<button class="btn btn-label-secondary btn-prev" ><i class="ti me-0 me-sm-1 ti-arrow-left"></i> <span class="align-middle d-none d-sm-inline-block">Previous</span></button> <button class="btn btn-next btn-primary" onclick="fnAllInputArray(\''+ Segdetails +'\',' + SegmentId + ')"><span class="align-middle d-none d-sm-inline-block me-sm-1">Next</span> <i class="ti ti-arrow-right"></i></button>';
                $("#"+Segdetails).append('<div class="content-header mb-3"></div><div class="g-3 row"><input type="hidden" id="hdnSegId_' + SegmentId + '" value="' + SegmentId + '"/>' + QsList + '<div class="col-12 d-flex justify-content-between" id="btn" style="position:absolute;bottom:20px;left:0;right:0;">' + btnList + '</div></div>');

            }
            else if (step == SegmntCount && step == SlNo) {
                btnList = '<button class="btn btn-label-secondary btn-prev" ><i class="ti me-0 me-sm-1 ti-arrow-left"></i> <span class="align-middle d-none d-sm-inline-block">Previous</span></button> <button class="btn btn-success btn-submit waves-effect waves-light" id="btnsubmit" onclick="fnAllInputArray(\''+ Segdetails +'\',' + SegmentId + ',this.id)">Submit</button>';
                $("#" + Segdetails).append('<div class="content-header mb-3"></div><div class="g-3 row"><input type="hidden" id="hdnSegId_' + SegmentId + '" value="' + SegmentId + '"/> ' + QsList + '<div class="col-12 d-flex justify-content-between" id="btn" style="position:absolute;bottom:20px;left:0;right:0;">' + btnList + '</div></div>');
            }

            btnList = '';
            if (step > 1 && step == SegmntCount) {
                var e = $(".select2"),
       t = $(".selectpicker");
                t.length && t.selectpicker(),
                    e.length &&
                        e.each(function () {
                            var e = $(this);
                            e.wrap('<div class="position-relative"></div>'), e.select2({ placeholder: "Select value", dropdownParent: e.parent() });
                        });
                var e = document.querySelector(".wizard-vertical"),
                    t = [].slice.call(e.querySelectorAll(".btn-next")),
                    l = [].slice.call(e.querySelectorAll(".btn-prev")),
                    r = e.querySelector(".btn-submit");
                if (null !== e) {
                    const c = new Stepper(e, { linear: !1 });
                    t &&
                        t.forEach((e) => {
                            e.addEventListener("click", (e) => {
                                c.next();
                            });
                        }),
                                l &&
                                    l.forEach((e) => {
                                        e.addEventListener("click", (e) => {
                                            c.previous();
                                        });
                                    }),
r &&
    r.addEventListener("click", (e) => {
        //alert("Submitted..!!");
    });
                }
            }
            console.log($("#segmentHeader").find('.step').length);
            QsList = '';
            btnList = '';
            step++;
            //$("#btn").html('');
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

function fnAllInputArray(divid,Segmentid,saveid) {
   
    //var dvsegmentHeader = document.getElementById('segmentHeader');
    var dvStep = document.getElementById($.trim(divid));

    //var inputElementsheader = dvsegmentHeader.querySelectorAll('input[name]');
    var inputElements = dvStep.querySelectorAll('input[id]:not([type="hidden"],[type="file"])');
    var textareaElements = dvStep.querySelectorAll('textarea');
    var selectElements = dvStep.querySelectorAll('select');
    var fileElements = dvStep.querySelectorAll('input[type=file]');
    const valuesArray = [];

   
    inputElements.forEach(input => {
        const name = input.id;
    const value = input.value;

valuesArray.push({ name, value,});
    });
    textareaElements.forEach(input => {
        const name = input.name;
    const value = input.value;

    valuesArray.push({ name, value });
    });
    selectElements.forEach(function (select) {
       
    valuesArray.push({ name: select.name, value: select.value });
    });
//    fileElements.forEach(input=>{
//        //deal with each input
//        let file = input.files[0];
//    const name = input.id;
//    const fileData = file.name;
//    console.log(file);
//    valuesArray.push({ name:name, file:fileData });
   
//    //use file
//});
   
    var newArray = valuesArray.map(item => {
        if (item.name.includes('_')) {
            var parts = item.name.split('_');
            return { name: parts[1], value: item.value };
        }
        else {
            return { name: item.name, value: item.value };
        }
});
        console.log(fileArray);
        $.each(newArray, function (i, v) {
            var fileData="";
        if (v.value != "0" && v.value != "" && v.name != "") {
            //$.each(fileArray, function (i, f) {
              var fileData="";
              
             
            if (v.name.includes('|')) {
                var splitquestion = v.name.split('|');
                
                    for(var i = 0; i < fileArray.length; i++) {
                        if (fileArray[i].value == splitquestion[1]) {
                            fileData = fileArray[i].name;
                            break;
                        }
                    }
                finalArray.push({ ASA_QuestionId: splitquestion[1], ASA_Answer: splitquestion[0], ASA_SegmentId: Segmentid,ASA_File:fileData});
            }
            else {
                for(var i = 0; i < fileArray.length; i++) {
                    if (fileArray[i].value == v.name) {
                        fileData = fileArray[i].name;
                        break;
                    }
                }
                finalArray.push({ ASA_QuestionId: v.name, ASA_Answer: v.value, ASA_SegmentId: Segmentid,ASA_File:fileData  });
            }

            //});
        }
    });

    $.each(fileArray, function (i, v) {
        //if (v.value != "0" && v.value != "" && v.name != "") {
        //    if (v.name.includes('|')) {
        //        var splitquestion = v.name.split('|');
        //        finalArray.push({ ASA_QuestionId: splitquestion[1], ASA_Answer: splitquestion[0], ASA_SegmentId: Segmentid});
        //    }
        //    else {
        //        finalArray.push({ ASA_QuestionId: v.name, ASA_Answer: v.value, ASA_SegmentId: Segmentid  });
        //    }
        //}
    });


   console.log(finalArray);
    if (saveid == 'btnsubmit') {

        Swal.fire({
            title: "Are you sure you Want to Save?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Yes, Save it!",
            customClass: { confirmButton: "btn btn-primary me-3 waves-effect waves-light", cancelButton: "btn btn-label-secondary waves-effect waves-light" },
            buttonsStyling: !1,
        }).then((result) => {

            if (result.isConfirmed) {
                fnSaveData();
               
            }
        });

        
    }

}

function fnSaveData() {
    
    var _data = JSON.stringify({
        entity: {
            //ASM_Id: parseInt($('#hdnPresId').val()),
            ASM_SMME_Id: parseInt($('#hdnSmmeId').val()),
            ASM_BA_Id: parseInt($('#hdnBaId').val()),
            ASM_AssessmentTypeId: parseInt($('#hdnAssessId').val()),
            AssessmentAnswerList: finalArray,

        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/InsertUpdateAssessmentQuesDetails",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,

        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: data.Message,
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                window.location = "/Assessment/AllAssessmentListForSMME";
               // window.location = "/SMME/SMMEDashboard";

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
                title: 'Process Not Success',
                icon: "error",
                customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                buttonsStyling: !1
            });
        }
    });
}
//$('#btnsubmit').click(function () {
//    fnAllInputArray();
//})
