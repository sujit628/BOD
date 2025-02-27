
$(document).ready(function () {
    retriveMenuForChild();
})

function getCurentFileName() { // Fixed the typo
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

function retriveMenuForChild() {
    var currentFileName = getCurentFileName();
    console.log("Current File Name: ", currentFileName);
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectParentIdForChild',
            param1: 'MenuURL',
            paramString: currentFileName, // Using the corrected function
            param2: 'MenuFor',
            paramString2: 'A',
            StoreProcedure: 'Menu_SP'
        }
    });

    console.log("Sending data: ", _data);

    $.ajax({
        type: "POST",
        url: '/ScriptJson/GetGlobalMasterTransactionSingle1',
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data) {
            data = JSON.parse(data);
            // Assuming data is already a JSON object
           // console.log("CMM_ParentId- ", data);
            localStorage.setItem('menuId', data[0].CMM_ParentId);
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
    return false;
}

