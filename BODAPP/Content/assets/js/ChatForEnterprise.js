$(document).ready(function () {
    retrieveUserStatus();
    ChatCotactsRetrieve();
});

// status-update 
$('input[name="chat-user-status"]').on('change', function () {
    var status = $(this).val();

    var dbStatus = {
        'active': 'active',
        'away': 'away',
        'busy': 'busy', // Do not Disturb
        'offline': 'offline'
    };

    $.ajax({
        url: '/ScriptJson/UpdateEnterpriseChatStatus',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            US_UserId: parseInt($('#hdnUserId').val()),
            US_Availability: dbStatus[status]
        }),
        success: function (response) {
            console.log('Status updated successfully:', response);

            var userId = parseInt($('#hdnUserId').val());
            retrieveUserStatus(userId);
        },
        error: function (xhr, status, error) {
            console.error('Error updating status:', error);
        }
    });
});

// status-retrieve 
function retrieveUserStatus(userId) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'SelectEnterpriseChatStatus',
            param1: userId,
            // param1Value: UserId,
            StoreProcedure: 'UserChat_USP',
        }
    });

    $.ajax({
        url: '/ScriptJson/GetUserStatus',
        type: 'GET',
        contentType: 'application/json',
        data: { userId: parseInt($('#hdnUserId').val()) },
        success: function (response) {

            if (response.IsSuccess) {
                var currentStatus = response.Message;
              //  console.log("Tiishjdgg   ---", currentStatus);
                $('input[name="chat-user-status"][value="' + currentStatus + '"]').prop('checked', true);

                var statusClassMap = {
                    'online': 'avatar-online',
                    'offline': 'avatar-offline',
                    'busy': 'avatar-busy',
                    'away': 'avatar-away'
                };


                var avatarElement = $('.user-avatar');


                for (var status in statusClassMap) {
                    avatarElement.removeClass(statusClassMap[status]);
                }

                if (statusClassMap[currentStatus]) {
                    avatarElement.addClass(statusClassMap[currentStatus]);
                }
            } else {
                console.log("Somethings went wrong...!")
                // console.error('Error retrieving status:', response.Message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error retrieving status:', error);
        }
    });
}

//chat-cotacts-retrieve 
function ChatCotactsRetrieve() {

    var currentUserRole = $('#hdnUserRole').val();

    console.log('This is U_Role: ', currentUserRole);
    if (currentUserRole == 'A') {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectAdminUserForChat',
                param1: 'UM_Id',
                StoreProcedure: 'UserChat_USP',
            }
        });
    } else {
        var _data = JSON.stringify({
            global: {
                TransactionType: 'SelectEnterpriseUserForChat',
                param1: 'ENR_Id',
                StoreProcedure: 'UserChat_USP',
            }
        });
    }


    $.ajax({
        type: "POST",
        url: "/ScriptJson/GetGlobalMasterTransaction",
        contentType: "application/json; charset=utf-8",
        data: _data,
        dataType: "json",
        success: function (data, status) {
            data = JSON.parse(data);

            console.log(data);

            $('#contact-list').find('.chat-contact-list-item:not(.chat-contact-list-item-title)').remove();

            if (data.length === 0) {
                $('#contact-list').find('.contact-list-item-0').removeClass('d-none');
            } else {
                $('#contact-list').find('.contact-list-item-0').addClass('d-none');

                $.each(data, function (index, user) {
                    //var cls=    ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] 

                    let avatarHtml;
                    if (user.UM_ProfilePic === 'NO') {
                        avatarHtml = "<span class='avatar-initial rounded-circle bg-label-" + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + " p-2'>" + user.UM_Prefix + "</span>";
                    } else {
                        avatarHtml = '<div class="flex-shrink-0 avatar"> <img src=' + user.UM_ProfilePic + ' alt="Avatar" class="rounded-circle"></div>';
                    }

                    // Create the list item HTML
                    const listItem = "<li class='chat-contact-list-item'><a class ='d-flex align-items-center chat-contact-info click-for-chat' data-user-id=" + user.UM_Id + "><input type='hidden' class =''  data-user-name=" + user.UM_Name + " /><input  type='hidden' class ='' data-user-status= " + user.UM_SubRole + " /><input type='hidden' data-user-pic = " + user.UM_ProfilePic + " /><input type='hidden' class =''  data-user-prefix=" + user.UM_Prefix + " /> " + avatarHtml + " <div class='chat-contact-info flex-grow-1 ms-4'> <h6 class='chat-contact-name text-truncate m-0 fw-normal'> " + user.UM_Name + " </h6> <small class='chat-contact-status text-truncate'> " + user.UM_SubRole + "</small><input type='hidden' class =''  data-user-availability=" + user.US_Availability + " /></div></a></li>";

                    // Append the new item to the contact list
                    $('#contact-list').append(listItem);
                });

                setChatContactClickHandler();
                if (data.length > 0) {
                    $('.click-for-chat').first().trigger('click');
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Request failed');
        }
    });
}

function setChatContactClickHandler() {
    $('.click-for-chat').off('click').on('click', function () {
        $('.chat-contact-list-item').removeClass('active');
        $(this).closest('li').addClass('active');

        const userId = parseInt($(this).data('user-id'), 10);
        const userName = $(this).find('input[data-user-name]').data('user-name');
        const userStatus = $(this).find('input[data-user-status]').data('user-status');
        const userPic = $(this).find('input[data-user-pic]').data('user-pic');
        const userPrefix = $(this).find('input[data-user-prefix]').data('user-prefix');
        const userAvailability = $(this).find('input[data-user-availability]').data('user-availability');

        $('#chat-history-body ul').empty();
        updateSideHeader(userId, userName, userStatus, userPic, userPrefix);
       // retrieveUserStatus(userAvailability);
        updateSideFooter(userId, userName, userStatus, userPic, userPrefix);
        $('#chat-history-body .chat-history').empty();
        loadChatHistory(userId, userPic, userPrefix);
    });
}



//load-chat-history
function loadChatHistory(UserId, userPic, userPrefix) {
    var _data = JSON.stringify({
        global: {
            TransactionType: 'GetChatHistory',
            param1: 'UCC_ChatReciver',
            param1Value: UserId,
            StoreProcedure: 'UserChat_USP',
        }
    });

  

    $.ajax({
        type: 'POST',
        url: '/ScriptJson/GetGlobalMasterTransaction',
        contentType: 'application/json; charset=utf-8',
        data: _data,
        dataType: 'json',
        success: function (data, status) {
            var currentUserId = $('#hdnUserId').val();   // send-by
            var currentSendToUserId = UserId;   // send-to

            data = JSON.parse(data);
            console.log("Chatting data:", data);

            console.log("Current User ID:", currentUserId);

            // Clear existing chat messages
            $('#chat-history-body .chat-history').empty();

            if (data.length > 0) {
               
                //const firstMessage = data[0];
                //const UCC_Id = message.UCC_Id;
                //    updateSideHeader(UserId, userName, userStatus, userPic, userPrefix, UCC_Id);

                $.each(data, function (index, message) {
                    var chtcls = '';
                    var txtcht = 'text-muted';
                    var viewTickIcon = '';
                    var loadmsg = '';
                    console.log(message.UCC_CreatedId, "This is database Id");


                    //const date = new Date(parseInt(message.UC_DateTime.replace(/\/Date\((\d+)\)\//, '$1')));
                    //const formattedTime = date.toLocaleTimeString(); 
                    const date = new Date(parseInt(message.UC_DateTime.replace(/\/Date\((\d+)\)\//, '$1')));
                    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
                    const formattedTime = date.toLocaleTimeString([], options).replace(':', ' '); // Replace ':' with a space for HH MM format
                   

                   
                    var avatarHtml = '';
                    var sideavatarHtml = '';
                    if (message.UC_UserId != currentUserId) {
                        chtcls = '';
                        if (message.UM_ProfilePic == 'NO') {
                            avatarHtml = "<div class='avatar ms-2 me-4'><span class='avatar-initial rounded-circle bg-" + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + " p-2'>" + message.UM_Prefix + "</span></div>";
                        } else {
                            avatarHtml = '<div class="flex-shrink-0 avatar me-4"> <img src=' + message.UM_ProfilePic + ' alt="Avatar" class="rounded-circle"></div>';
                        }
                    }
                   
                    if (message.UC_UserId == currentUserId) {
                        chtcls = 'chat-message-right';
                        if (message.UM_ProfilePic == 'NO') {
                            sideavatarHtml = "<div class='avatar ms-4 me-2'><span class='avatar-initial rounded-circle bg-" + ["success", "danger", "warning", "info", "primary", "secondary"][Math.floor(6 * Math.random())] + " p-2'>" + message.UM_Prefix + "</span></div>";
                        } else {
                            sideavatarHtml = '<div class="flex-shrink-0 avatar ms-4"> <img src=' + message.UM_ProfilePic + ' alt="Avatar" class="rounded-circle"></div>';
                        }
                    }

                    var fileHtml = '';
                    if (message.UC_File != '') {
                        var fileIcon = getFileIcon(message.UC_File); 
                        fileHtml = "<div class='chat-message-file p-2 d-flex align-items-center' style='background-color: #f1f0f0; border-radius: 8px;'>";
                        fileHtml += fileIcon;  
                        fileHtml += "<div class='file-info'><p class='mb-0 text-black' style='max-width: 250px;'></p>";
                        fileHtml += "<a href='" + message.UC_File + "' download class='text-primary'>Download</a></div></div>";
                    }

                    
                    if (message.UC_UserId == currentUserId && message.UCC_ChatReciver !== currentSendToUserId) {
                        txtcht = 'text-end';
                        viewTickIcon = 'ti ti-checks ti-16px text-success me-1';
                    }

                    loadmsg = "<li class='chat-message " + chtcls + "'><div class='d-flex overflow-hidden'>" + avatarHtml + "<div class='chat-message-wrapper flex-grow-1'><div class='chat-message-text'>" + fileHtml + "<p class= 'mb-0 pb-0'>" + message.UC_Msg + "</p></div><div class='mt-0 text-end'><small style='font-size: 10px; color: #999;'><i class='pt-0 " + viewTickIcon + "'></i>" + formattedTime + "</small></div> </div>" + sideavatarHtml + "</div></li>";

                    $('#chat-history-body .chat-history').append(loadmsg);
                });
                scrollToBottom();
            } else {
                $('#chat-history-body .chat-history').append('<li>No messages found</li>');
                scrollToBottom();
            }
        },
            
        error: function (xhr, textStatus, errorThrown) {
            alert('Failed to load chat history');
        }
    });
}

function scrollToBottom() {
    $('#chat-history-body').animate({
        scrollTop: $('#chat-history-body .chat-history')[0].scrollHeight
    }, 500);
}

function getFileIcon(fileName) {
    var ext = fileName.split('.').pop().toLowerCase(); 
    var icon = '';
    var iconSize = "style='font-size: 32px;'";

    if (ext === 'pdf') {
        icon = "<i class='fas fa-file-pdf text-danger me-2' " + iconSize + "></i>";
    } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
        icon = "<i class='fas fa-file-image text-primary me-2' " + iconSize + "></i>";
    } else if (ext === 'doc' || ext === 'docx') {
        icon = "<i class='fas fa-file-word text-info me-2' " + iconSize + "></i>";
    } else if (ext === 'xls' || ext === 'xlsx') {
        icon = "<i class='fas fa-file-excel text-success me-2' " + iconSize + "></i>";
    } else if (ext === 'zip' || ext === 'rar') {
        icon = "<i class='fas fa-file-archive text-warning me-2' " + iconSize + "></i>";
    } else {
        icon = "<i class='fas fa-file-alt text-secondary me-2' " + iconSize + "></i>";
    }

    return icon;
}

function updateSideHeader(userId, userName, userStatus, userPic, userPrefix) {
    var avatarHtml = userPic === 'NO' ? '<span class="avatar-initial rounded-circle bg-label-success p-2 avatar-clickable">' + userPrefix + '</span>' : '<img src="' + userPic + '" alt="Avatar" class="rounded-circle user-avatar avatar-clickable">';

    var sidebarContentHead = '<div class="chat-history-header border-bottom"><div class="d-flex justify-content-between align-items-center"><div class="d-flex overflow-hidden align-items-center"><i class="ti ti-menu-2 ti-lg cursor-pointer d-lg-none d-block me-4" data-bs-toggle="sidebar" data-target="#app-chat-contacts"></i>' + '<div class="flex-shrink-0 avatar">' + avatarHtml + '</div><div class="chat-contact-info flex-grow-1 ms-4"><h6 class="m-0 fw-normal">' + userName + '</h6><small class="user-status text-body">' + userStatus + '</small></div></div><div class="d-flex align-items-center"><i class="ti ti-search ti-md cursor-pointer d-sm-inline-flex d-none me-1 btn btn-sm btn-text-secondary text-secondary btn-icon rounded-pill"></i><div class="dropdown"><button class="btn btn-sm btn-icon btn-text-secondary text-secondary rounded-pill dropdown-toggle hide-arrow" data-bs-toggle="dropdown" id="chat-header-actions"><i class="ti ti-dots-vertical ti-md"></i></button><div class="dropdown-menu dropdown-menu-end" aria-labelledby="chat-header-actions"><a class="dropdown-item"  id="view-contact">View Contact</a><a class="dropdown-item" href="javascript:void(0);" id="clear-chat">Clear Chat</a></div></div></div></div></div>';

    $('#sidebar-user-info').html(sidebarContentHead);

    $('.avatar-clickable').off('click').on('click', function () {
        openOffcanvas();
    });

    //$('#view-contact').off('click').on('click', function () {
    //    openOffcanvas();
    //});

    function openOffcanvas() {
        var userAvatarHtml = userPic === 'NO' ? '<span class="avatar-initial rounded-circle bg-label-success p-2">' + userPrefix + '</span>' : '<img src="' + userPic + '" alt="Avatar" class="rounded-circle">';

        $('#offcanvas-user-avatar').html(userAvatarHtml);
        $('#offcanvas-user-name').text(userName || 'Unknown User');
        $('#offcanvas-user-status').text(userStatus || 'No Status');

        // Show the offcanvas
        var offcanvasElement = new bootstrap.Offcanvas(document.getElementById('app-chat-sidebar-right'), {
            backdrop: false
        });
        offcanvasElement.show();
    }
}






function updateSideFooter(userId, userName, userStatus, userPic, userPrefix) {
    const sidebarContentFooter = "<div class='chat-history-footer shadow-xs'><form id='form-send-message' class='mb-0 form-send-message d-flex justify-content-between align-items-center' onsubmit='return false;'><input id='message-input' name='message-input' class='form-control message-input border-0 me-4 shadow-none' placeholder='Type your message here...'><input type='hidden' id='userId' name='userId' value='" + userId + "'><input type='hidden' id='UCC_Id' name='UCC_Id'><input type='hidden' id='hdnupload'><div class='message-actions d-flex align-items-center'><label for='uploadFile' class='form-label mb-0'> <i class='ti ti-paperclip ti-md cursor-pointer btn btn-sm btn-text-secondary btn-icon rounded-pill mx-1 text-heading'></i> <input type='file' name='uploadFile' id='uploadFile' hidden data-max-size='200000' accept='application/pdf,csv,jpg,jpeg' onchange='FileUpload(this)' /> </label><button type='submit' id='ChatSubmitBtn' class='btn btn-primary d-flex send-msg-btn'><span class='align-middle d-md-inline-block d-none'>Send</span> <i class='ti ti-send ti-16px ms-md-2 ms-0'></i> </button> </div> </form></div> ";

    $('#chat-history-footer').html(sidebarContentFooter);

    // Bind the submit event
    $('#form-send-message').on('submit', function () {
        handleChatSubmit(userId);
        return false;
    });
}

function handleChatSubmit(userId) {
    UploadDoc('uploadFile');
    SaveRecords();
    loadChatHistory(userId);
}


/// saveRecords
function SaveRecords() {
    var formData = new FormData();
    formData.append('UC_UCC_Id', parseInt($('#UCC_Id').val()));
    formData.append('UCC_CreatedId', parseInt($('#hdnUserId').val()));
    formData.append('UCC_ChatReciver', parseInt($('#userId').val()));
    formData.append('UC_Msg', $('#message-input').val());
    formData.append('UC_File', $('#hdnupload').val());

    $.ajax({
        type: "POST",
        url: '/ScriptJson/InsertUpdateEnterpriseChatting',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data, status) {
            $('#message-input').val('');
            $('#hdnupload').val('');
           // loadChatHistory(UserId);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Failed to send message. Please try again.');
        }
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

            //UploadDoc('uploadFile');
        }
    }
}

function UploadDoc(upload) {
    // timer = setInterval(startBar, 500);
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
        async: false,

        success: function () {
            console.log('Is Success...!');
            clearInterval();
        }
    }).done(function (response) {
        console.log(response);
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });
}





// Function to handle form submission
//function attachChatFormListener() {
//    const chatForm = document.querySelector(".form-send-message"),
//        messageInput = document.querySelector("#message-input"),
//        chatHistoryBody = document.querySelector(".chat-history-body");

//    function scrollToBottom() {
//        chatHistoryBody.scrollTo(0, chatHistoryBody.scrollHeight);
//    }

//    if (chatForm) {
//        chatForm.addEventListener("submit", (e) => {
//            e.preventDefault();

//            if (messageInput.value.trim()) {
//                const messageContainer = document.createElement("div");
//                messageContainer.className = "chat-message-text mt-2";

//                const messageWrapper = document.querySelector("li:last-child .chat-message-wrapper");
//                if (messageWrapper) {
//                    messageWrapper.appendChild(messageContainer);
//                }
//                console.log("Message Wrapper:", messageWrapper);

//                messageContainer.innerHTML = '<p class="mb-0 text-break">' + messageInput.value + '</p>';
//                messageInput.value = "";
//                scrollToBottom();
//            }
//        });
//    }
//}













