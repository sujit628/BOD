
$(document).ready(function () {
    $('.toggle-password').on('click', function () {
        const input = $(this).siblings('input');
        const type = input.attr('type') === 'password' ? 'text' : 'password';
        input.attr('type', type);
    });
});

$('#btnSubmit').on('click', function () {
    SaveRecords();
})

function SaveRecords() {
    //var _data = formElem.serialize();
    var _data = JSON.stringify({
        User: {
           // UM_Id: $('#Id').val(),
            UM_CurrentPassword: $.trim($('#txtcurrentPassword').val()),
            UM_NewPassword: $.trim($('#txtnewPassword').val()),
            UM_ConfirmPassword: $.trim($('#txtconfirmPassword').val()),
           
        }
    });
    $.ajax({
        type: "POST",
        url: "/ScriptJson/ResetPassword",
        data: _data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
               // SendMail()

                Swal.fire({
                    title: "Your changes were saved successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });

                //var oTable = $('#datatable-example').DataTable();
                //oTable.destroy();
                //BindGrid();
                //$('#setUPFormUserModal').modal('hide');
                //$('#setUPFormUserModal').find('input, select').val('');

                window.location.reload();
            } else {
                //var Email = $('#txtUserEmail').val();
                //var Phone = $('#txtContact').val();

                //var titleText = '';
                //if (data.Id == -1) {
                //    titleText = '"' + Email + '"' + " this email already exists..!";
                //} else if (data.Id == -2) {
                //    titleText = '"' + Phone + '"' + " this phone number already exists..!";
                //} else {
                //    titleText = data.Message;
                //}
                Swal.fire({
                    title: titleText,
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


document.addEventListener('DOMContentLoaded', function () {
    const passwordField = document.getElementById('txtnewPassword');
    const confirmPasswordField = document.getElementById('txtconfirmPassword');
    const passwordMessageField = document.getElementById('pass-msg');
    const confirmPasswordMessageField = document.getElementById('confirmpass-msg');
    const submitButton = document.getElementById('btnSubmit');

    // Function to validate password requirements
    function validatePassword() {
        const password = passwordField.value;

        // Check for password requirements and show the first unmet one
        if (password.length < 8) {
            passwordField.style.borderColor = 'red';
            passwordMessageField.textContent = 'Password must be more than 8 characters';
            passwordMessageField.style.color = '#ff4c51';
        } else if (!/[a-z]/.test(password)) {
            passwordField.style.borderColor = 'red';
            passwordMessageField.textContent = 'Password must contain at least one lowercase letter';
            passwordMessageField.style.color = '#ff4c51';
        } else if (!/[0-9\s\W]/.test(password)) {
            passwordField.style.borderColor = 'red';
            passwordMessageField.textContent = 'Password must contain at least one number, symbol, or whitespace';
            passwordMessageField.style.color = '#ff4c51';
        } else {
            passwordField.style.borderColor = 'green';
            passwordMessageField.textContent = '';
        }

        checkPasswordMatch(); // Check password match whenever password changes
    }

    // Function to validate confirm password and check match
    function validateConfirmPassword() {
        const confirmPassword = confirmPasswordField.value;

        if (confirmPassword.length < 8) {
            confirmPasswordField.style.borderColor = 'red';
            confirmPasswordMessageField.textContent = 'Confirm password must be more than 8 characters';
            confirmPasswordMessageField.style.color = '#ff4c51';
        } else {
            confirmPasswordField.style.borderColor = 'green';
            confirmPasswordMessageField.textContent = '';
        }

        checkPasswordMatch(); // Check password match whenever confirm password changes
    }

    // Function to check if passwords match and enable submit button
    function checkPasswordMatch() {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;

        if (confirmPassword === password && password.length >= 8 && confirmPassword.length >= 8) {
            confirmPasswordMessageField.textContent = 'Passwords match';
            confirmPasswordMessageField.style.color = 'green';
            submitButton.disabled = false; // Enable the submit button
        } else {
            confirmPasswordMessageField.textContent = 'Confirm password does not match';
            confirmPasswordMessageField.style.color = 'red';
            submitButton.disabled = true; // Disable the submit button
        }
    }

    // Event listeners for input fields
    passwordField.addEventListener('input', validatePassword);
    confirmPasswordField.addEventListener('input', validateConfirmPassword);
});


