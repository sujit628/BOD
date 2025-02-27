using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace BODAPP
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Account", action = "AdminLogin", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               name: "Multiple",
               url: "{controller}/{action}/{id}/{type}",
               defaults: new { controller = "Job", action = "JobProgressSMME", id = UrlParameter.Optional,type=UrlParameter.Optional }
           );
           
        }
    }
}
