//var at = document.documentElement.getAttribute("data-layout");
//if ((at = "vertical")) {
//    // ==============================================================
//    // Auto select left navbar
//    // ==============================================================

//    document.addEventListener("DOMContentLoaded", function () {
//        "use strict";
//        var isSidebar = document.getElementsByClassName("side-mini-panel");
//        if (isSidebar.length > 0) {
//            var url = window.location + "";
//            var path = url.replace(
//              window.location.protocol + "//" + window.location.host + "/",
//              ""
//            );

//            //****************************
//            // This is for
//            //****************************

//            function findMatchingElement() {
//                var currentUrl = window.location.href;
//                var anchors = document.querySelectorAll("#sidebarnav a");

//                for (var i = 0; i < anchors.length; i++) {
//                    if (anchors[i].href === currentUrl) {
//                        return anchors[i];
//                    }
//                }

//                return null; // Return null if no matching element is found
//            }

//            var elements = findMatchingElement();

//            if (elements) {
//                // Do something with the matching element
//                elements.classList.add("active");
//            }

//            //****************************
//            // This is for the multilevel menu
//            //****************************
//            document.querySelectorAll("#sidebarnav a").forEach(function (link) {
//                link.addEventListener("click", function (e) {
//                    const isActive = this.classList.contains("active");
//                    const parentUl = this.closest("ul");

//                    if (!isActive) {
//                        // hide any open menus and remove all other classes
//                        parentUl.querySelectorAll("ul").forEach(function (submenu) {
//                            submenu.classList.remove("in");
//                        });
//                        parentUl.querySelectorAll("a").forEach(function (navLink) {
//                            navLink.classList.remove("active");
//                        });

//                        // open our new menu and add the open class
//                        const submenu = this.nextElementSibling;
//                        if (submenu) {
//                            submenu.classList.add("in");
//                        }

//                        this.classList.add("active");
//                    } else {
//                        this.classList.remove("active");
//                        parentUl.classList.remove("active");
//                        const submenu = this.nextElementSibling;
//                        if (submenu) {
//                            submenu.classList.remove("in");
//                        }
//                    }
//                });
//            });

//            document
//              .querySelectorAll("#sidebarnav > li > a.has-arrow")
//              .forEach(function (link) {
//                  link.addEventListener("click", function (e) {
//                      e.preventDefault();
//                  });
//              });

//            //****************************
//            // This is for show menu
//            //****************************

//            var closestNav = elements.closest("nav[class^=sidebar-nav]");
//            var menuid = (closestNav && closestNav.id) || "menu-right-mini-1";
//            var menu = menuid[menuid.length - 1];

//            document
//              .getElementById("menu-right-mini-" + menu)
//              .classList.add("d-block");
//            document.getElementById("mini-" + menu).classList.add("selected");

//            //****************************
//            // This is for mini sidebar
//            //****************************
//            document
//              .querySelectorAll("ul#sidebarnav ul li a.active")
//              .forEach(function (link) {
//                  link.closest("ul").classList.add("in");
//                  link.closest("ul").parentElement.classList.add("selected");
//              });
//            document
//              .querySelectorAll(".mini-nav .mini-nav-item")
//              .forEach(function (item) {
//                  item.addEventListener("click", function () {
//                      var id = this.id;
//                      document
//                        .querySelectorAll(".mini-nav .mini-nav-item")
//                        .forEach(function (navItem) {
//                            navItem.classList.remove("selected");
//                        });
//                      this.classList.add("selected");
//                      document
//                        .querySelectorAll(".sidebarmenu nav")
//                        .forEach(function (nav) {
//                            nav.classList.remove("d-block");
//                        });
//                      document
//                        .getElementById("menu-right-" + id)
//                        .classList.add("d-block");
//                      document.body.setAttribute("data-sidebartype", "full");
//                  });
//              });
//        }
//    });
//}



// ----------------------------------------
// Active 2 file at same time 
// ----------------------------------------

//var currentURL =
//  window.location != window.parent.location
//    ? document.referrer
//    : document.location.href;









var path = window.location.pathname;
path = path.replace(/\/$/, "");
path = decodeURIComponent(path);
$('.sbmnu a').each(function () {
    var href = $(this).attr('href');

    href = href.split('?')[0];
  
    if ("#" === href) {
        $(this).closest('li').removeClass('selected');
        $(this).removeClass('active');
    }
    //var id = 'mini-' + localStorage.getItem('menuId');
    //$(''+id+'').addClass('active');
    //console.log(id);
    if (path.substring(0, href.length) === href && href != "") {
        $(this).closest('li').addClass('selected');
        if ($(this).closest('li').hasClass('navmenu')) {
            var id = 'mini-1';
            console.log(getCurentFileName());
            console.log(localStorage.getItem("menuId"));
            if (localStorage.getItem("menuId") === null && getCurentFileName() == "AdminDashboard" ) {

                id = 'mini-1';
            }
            else if (localStorage.getItem("menuId") === null && getCurentFileName() == "EnterpriseDashboard" ) {

                id = 'mini-55';
            }
            else if (localStorage.getItem("menuId") == "87" && getCurentFileName() == "StakeHolderDashboard") {

                id = 'mini-113';
            }
            else if (localStorage.getItem("menuId") === 'mini-1' && getCurentFileName() == "StakeHolderDashboard") {

                id = 'mini-113';
            }

            else if (localStorage.getItem("menuId") === "87" && getCurentFileName() == "SMMEDashboard" && getParameterByName('Id') == "87") {

                id = 'mini-87';
            }
            else {
                id = 'mini-' + localStorage.getItem('menuId');
            }
          
            
            //var clickedAnchorNodeList = document.querySelectorAll('.mini-nav .mini-nav-item').forEach(function (navItem) {
            //    navItem.classList.remove("selected");
            //});
            //console.log("nodeList :" + clickedAnchorNodeList)
            //var getAnchor = clickedAnchor.getAttribute('href')
            //alert(getAnchor)
            document.querySelectorAll('.mini-nav .mini-nav-item').forEach(function (navItem) {
                navItem.classList.remove("selected");
            });
            this.classList.add("selected");
            document.querySelectorAll(".sidebarmenu nav").forEach(function (nav) {
                nav.classList.remove("d-block");
            });

            var menuElement = document.getElementById("menu-right-" + id);
            if (menuElement) {
                menuElement.classList.add("d-block");
            } else {
                console.warn("Element not found: " + "menu-right-" + id);
            }

           // document.getElementById("menu-right-" + id).classList.add("d-block");


            $(this).closest('li').addClass('selected');
            $('#mini-' + localStorage.getItem('menuId')).addClass('selected active');
            $(this).addClass('active');
            document.body.setAttribute("data-sidebartype", "full");
            $('#main-wrapper').removeClass('show-sidebar');
            $('li#' + id).addClass('selected');
        }
        else {
            $(this).closest('li').addClass('selected');
            $(this).addClass('active');
            document.body.setAttribute("data-sidebartype", "mini-sidebar");
            $('#main-wrapper').addClass('show-sidebar');

        }
        //$(this).closest('li#MenuLi_' + id + '').addClass('open');
    }

    //if (path.substring(0, href.length) === href) {
    //    $(this).closest('li').addClass('active');
    //    $(this).closest('li#MenuLi_' + id + '').addClass('open');
    //}
});
function getCurentFileName() {
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}
$('.m-menu-item a').each(function () {
    var href = $(this).attr('href');

    href = href.split('?')[0];

    if ("#" === href) {
        $(this).closest('li').removeClass('active');
        $(this).removeClass('active');
    }
    if (path.substring(0, href.length) === href && href != "") {
        $(this).closest('li').addClass('active');
        $(this).closest('li').addClass('selected');
        $(this).addClass('active');
        $(this).closest('ul.accordion-collapse.collapse.selected').addClass('show');
        //document.body.setAttribute("data-sidebartype", "mini-sidebar");
        //$('#main-wrapper').addClass('show-sidebar');
        var id = 'mini-' + localStorage.getItem('menuId');
        $('.' + id).addClass('selected');
        var width = $(window).width();
        if (width < '991') {
                document.body.setAttribute("data-sidebartype", "mini-sidebar");
                $('#main-wrapper').addClass('show-sidebar');
        }else{
            document.body.setAttribute("data-sidebartype", "full");
            $('#main-wrapper').removeClass('show-sidebar');
        }
        
        //if ($(this).closest('li').hasClass('m-navmenu')) {
            
        //    document.querySelectorAll('.m-menu-item .m-sub-menu .m-navmenu').forEach(function (navItem) {
        //        navItem.classList.remove("selected");
        //    });
        //    this.classList.add("selected");
        //    document.querySelectorAll(".sidebarmenu nav").forEach(function (nav) {
        //        nav.classList.remove("d-block");
        //    });
        //    document.getElementById("menu-right-" + id).classList.add("d-block");

        //    $(this).closest('li').addClass('selected');
        //    //$('#mini-' + localStorage.getItem('menuId')).addClass('selected');
        //    //$(this).addClass('active');
        //    //document.body.setAttribute("data-sidebartype", "full");
        //    //$('#main-wrapper').removeClass('show-sidebar');
        //}
        //else {
        //    $(this).closest('li').addClass('selected');
        //    $(this).addClass('active');
        //    document.body.setAttribute("data-sidebartype", "mini-sidebar");
        //    $('#main-wrapper').addClass('show-sidebar');

        //}
        //$(this).closest('li#MenuLi_' + id + '').addClass('open');
    }

    //if (path.substring(0, href.length) === href) {
    //    $(this).closest('li').addClass('active');
    //    $(this).closest('li#MenuLi_' + id + '').addClass('open');
    //}
});
//var link = document.getElementById("get-url");

//if (currentURL.includes("/main/index.html")) {
//    link.setAttribute("href", "../main/index.html");
//} else if (currentURL.includes("/index.html")) {
//    link.setAttribute("href", "./index.html");
//} else {
//    link.setAttribute("href", "./");
//}

var miniIconNav = document.querySelectorAll('.mini-nav .mini-nav-item');
miniIconNav.forEach(function (item) {
    item.addEventListener('click', function () {
        if ($(this).hasClass('parentnavmenu')) {
            document.body.setAttribute("data-sidebartype", "full");
            $('#headerCollapse').click(function () {
                var dataTheme = document.body.getAttribute("data-sidebartype");
                if (dataTheme === "full") {
                    document.body.setAttribute("data-sidebartype", "mini-sidebar");
                } else {
                    document.body.setAttribute("data-sidebartype", "full");
                }
            })

        } else {
            document.body.setAttribute("data-sidebartype", "mini-sidebar");
            $('#headerCollapse').addClass("disable-click").off('click');
        }
        var id = this.id;
        //var clickedAnchorNodeList = document.querySelectorAll('.mini-nav .mini-nav-item').forEach(function (navItem) {
        //    navItem.classList.remove("selected");
        //});
        //console.log("nodeList :" + clickedAnchorNodeList)
        //var getAnchor = clickedAnchor.getAttribute('href')
        //alert(getAnchor)
        document.querySelectorAll('.mini-nav .mini-nav-item').forEach(function (navItem) {
            navItem.classList.remove("selected");
        });
        this.classList.add("selected");
        document.querySelectorAll(".sidebarmenu nav").forEach(function (nav) {
            nav.classList.remove("d-block");
        });
        document.getElementById("menu-right-" + id).classList.add("d-block");
    })
})
//var navAnchors = document.querySelectorAll(".mini-nav .mini-nav-item a");
//console.log(navAnchors)


function getValue(id) {
    localStorage.setItem('menuId', id);
}

$(document).ready(function () {
    $('#headerCollapse').click(function () {
        var dataTheme = document.body.getAttribute("data-sidebartype");
        if (dataTheme === "full") {
            document.body.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
            document.body.setAttribute("data-sidebartype", "full");
        }
    })
})