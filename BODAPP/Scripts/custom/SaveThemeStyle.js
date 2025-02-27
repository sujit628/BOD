

function changeTheme(element, themeStyle, themeColor) {
    var themestyle = themeStyle;
    var themecolor = themeColor;
    


    var selectedTheme = $(element).data("theme");

//var themeStyle = selectedTheme;

    if (selectedTheme == "light") {
        var _data = JSON.stringify({
            User: {
                ThemeColor: themeColor,
                ThemeStyle: "light-style",
                TheamLink: "/Content/assets/vendor/css/rtl/theme-" + themestyle + "-" + themecolor + ".css",
                CoreLink: "/Content/assets/vendor/css/rtl/core.css",
                
            }
        });
    } else if (selectedTheme == "dark") {
        var _data = JSON.stringify({
            User: {
                ThemeColor: themeColor,
                ThemeStyle: "dark-style",
                TheamLink: "/Content/assets/vendor/css/rtl/theme-" + themestyle + "-" + themecolor + ".css",
                CoreLink: "/Content/assets/vendor/css/rtl/core-dark.css",
                
            }
        });
    } else if (selectedTheme == "semi-dark") {
        var _data = JSON.stringify({
            User: {
              ThemeColor: themeColor,
                ThemeStyle: "semi-dark light-style",
                TheamLink: "/Content/assets/vendor/css/rtl/theme-" + themestyle + "-" + themecolor + ".css",
                CoreLink: "/Content/assets/vendor/css/rtl/core.css",
                
            }
        });
    }
    

    $.ajax({
        url: '/ScriptJson/ChangeThemeStyle', 
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: _data,
        dataType: 'json',
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                Swal.fire({
                    title: "Theme Changes Successfully!",
                    icon: "success",
                    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                    buttonsStyling: !1
                });
                window.location.reload();

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

function changeThemeStyle(selectedTheme, themestyle, themecolor) {
    //var selectedTheme = $(element).data("theme");
    if (selectedTheme == "light") {
        var _data = JSON.stringify({
            User: {
                ThemeColor : themecolor,
                ThemeStyle: "light-style",
                TheamLink: "/Content/assets/vendor/css/rtl/theme-" + themestyle + "-" + themecolor + ".css",
                CoreLink: "/Content/assets/vendor/css/rtl/core.css",
                
            }
        });
    } else if (selectedTheme == "dark") {
        var _data = JSON.stringify({
            User: {
                ThemeColor: themecolor,
                ThemeStyle: "dark",
                TheamLink: "/Content/assets/vendor/css/rtl/theme-" + themestyle + "-" + themecolor + ".css",
                CoreLink: "/Content/assets/vendor/css/rtl/core-dark.css",
                
            }
        });
    } else if (selectedTheme == "semidark") {
        var _data = JSON.stringify({
            User: {
                ThemeColor: themecolor,
                ThemeStyle: "semi-dark light-style",
                TheamLink: "/Content/assets/vendor/css/rtl/theme-" + themestyle + "-" + themecolor + ".css",
                CoreLink: "/Content/assets/vendor/css/rtl/core.css",
                CustomCSSLink: "/Content/assets/css/demo-dark.css",
            }
        });
    }


    $.ajax({
        url: '/ScriptJson/ChangeThemeStyle',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: _data,
        dataType: 'json',
        success: function (data) {
            if (data != null && data != undefined && data.IsSuccess == true) {
                //Swal.fire({
                //    title: "Theme Changes Successfully!",
                //    icon: "success",
                //    customClass: { confirmButton: "btn btn-primary waves-effect waves-light" },
                //    buttonsStyling: !1
                //});
                //window.location.reload();

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
//function retriveThemeStyle() {

//}

