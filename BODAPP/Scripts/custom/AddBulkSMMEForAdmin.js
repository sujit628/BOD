
var btnStatus='';
var PageStatus='';
 var Id =0;
 var MId =0;
 var Type = "";
 var elem = document.getElementById("progress-bar");
 var width = 1;
 var interval = 0;
 let percentValue = 0,
    progressBar = $('.progress-bar');

//$("#btnSubmit").click(function () {
//    UploadDoc('uploadFile');
//});


 $(document).ready(function () {
     $('#btnPost').prop('disabled', true);
 });

 $("#btnDownload").click(function (e) {
     e.preventDefault()
         window.location.href = "../Upload/MSME-Bulk-Upload.xlsx";
     });


 $('#uploadFile').on('change', function () {
         if ($(this).val()) {
             progressBarr();
             $('#btnPost').prop('disabled', false)
         } else {
             $('#btnPost').prop('disabled', true)
         }
     });
 $('#btnPost').click(function () {
     UploadDoc('uploadFile');
 })

 function startBar() {
     if (percentValue < 100) {
         percentValue += 20;
     }
     progressBar.css("width", percentValue + "%").html(percentValue + "%");
 }

 function frame() {
     if (width >= 100) {
         clearInterval(interval);
     } else {
         width++;
         elem.style.width = width + '%';
         //SaveRecordForProgressButton(Id, MId, PageStatus);
     }

 }

 function progressBarr() {
     //resetProgressBar();

     interval = setInterval(startBar, 100);
 }

 function resetProgressBar() {
     width = 1;
     clearInterval(interval)
     elem.style.width = width + '%';
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

 function FileUpload(input) {
     var file = $('#uploadFile');
     var fileInput = $('#uploadFile')[0].files[0];

     var size = bytesToSize(800000);

     if (fileInput.size > 800000) {

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

             //UploadDoc('uploadFile');// this code call on button clik
         }

     }
 }

 function UploadDoc(upload) {
     timer = setInterval(startBar, 500);
     var formData = new FormData();
     var totalFiles = document.getElementById(upload).files.length;
     for (var i = 0; i < totalFiles; i++) {
         var file = document.getElementById(upload).files[i];
         formData.append(upload, file);
     }
     $.ajax({

         type: "POST",
         url: '/ScriptJson/UploadBulkSMMEForAdmin',
         data: formData,
         dataType: 'json',
         contentType: false,
         processData: false,
         async: false,
         beforeSend: function () {
             progressBarr();
         },
         success: function () {

             clearInterval(timer);
         }
     }).done(function (data) {
         if (data != null && data != undefined && data.IsSuccess == true && data.Id>0) {
             Swal.fire({
                 title: "Good Job!",
                 icon: "success",
                 customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                 text: "Your File Upload successfully",
                 buttonsStyling: !1
             });
             window.location.href = "/SMME/AddBulkSMMEForAdmin";

         }
         else {
             Swal.fire({
                 title: 'Error!',
                 icon: "error",
                 customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                 text: data.Message,
                 buttonsStyling: !1
             });

         }
     }).fail(function (jqxhr, textStatus, error) {
         var err = textStatus + ", " + error;
         console.log("Request Failed: " + err);
     });
 }


