using BODDal;
using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;


namespace BODAPP.Controllers
{
    public class SMMEController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static UserModel SMMEUserModel { get; set; }
        public GlobalData global = new GlobalData();
        public static DataTable dt = new DataTable();
        DAL dl = new DAL();

        public static void GetSession()
        {
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            SMMEUserModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserDataModel"];
            //pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
        private static T GetItem1<T>(DataTable dt)
        {
            Type temp = typeof(T);

            T data = Activator.CreateInstance<T>();
            foreach (DataRow row in dt.Rows)
            {
                data = GetItem<T>(row);
            }

            return data;
        }
        public SMMEController()
        {
            GetSession();

        }
        //public ActionResult SMMEProfieView_SMME()
        //{
        //    if (UserModel == null)
        //    {
        //        return RedirectToAction("SMMELogin", "Account");
        //    }
        //    return View();
        //}
        public ActionResult SMMEProfieView_Teams()
        {
            if (UserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            return View();
        }
        public ActionResult SMMEProfieView_Projects()
        {
            if (UserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            return View();
        }
        public ActionResult SMMEProfieView_Profiles()
        {
            if (UserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            return View();
        }
        public ActionResult SMMELists()
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult SMMEDashboard()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            else
            {

                DataSet ds = new DataSet();

                global.param1 = "SMMEId";
                global.param1Value = SMMEUserModel.UM_MainID;
                global.StoreProcedure = "SMMEDashBoard_USP";
                global.TransactionType = "SelectSMMEDashBoard";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                SMMEDashBoard dash = new SMMEDashBoard();
                dash = GetItem1<SMMEDashBoard>(ds.Tables[0]);
                ViewBag.SMMEId = SMMEUserModel.UM_MainID;
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = dash;
                return View(Srecord);
            }
        }
        public ActionResult AddSMMEUser()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            return View();
        }
        public ActionResult ViewAllSMMEUser()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            return View();
        }
        public ActionResult TeamBuilding()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            ViewBag.SMMEId = SMMEUserModel.UM_MainID;
            return View();
        }

        public ActionResult TeamBuildingList()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            ViewBag.SmmeId = SMMEUserModel.UM_MainID;
            return View();
        }

        public ActionResult SMMEProfile(int? Id)
        {
            ViewBag.Id = Id;
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "SMME_Id";
            global.StoreProcedure = "SMMERegistration_USP";
            global.TransactionType = "SelectSMME";
            global.TransactionType = "SelectSMME";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            SMMERegistration sme = new SMMERegistration();
            sme = GetItem1<SMMERegistration>(ds.Tables[0]);

            var Srecord = sme;
            return View(Srecord);
        }
        public ActionResult SMMEProfile_Job(int? Id)
        {
            ViewBag.Id = Id;
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "SMME_Id";
            global.StoreProcedure = "SMMERegistration_USP";
            global.TransactionType = "SelectSMME";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            SMMERegistration sme = new SMMERegistration();
            sme = GetItem1<SMMERegistration>(ds.Tables[0]);

            var Srecord = sme;
            return View(Srecord);
        }
        public ActionResult SMMEProfile_Task(int? Id)
        {
            ViewBag.Id = Id;
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "SMME_Id";
            global.StoreProcedure = "SMMERegistration_USP";
            global.TransactionType = "SelectSMME";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            SMMERegistration sme = new SMMERegistration();
            sme = GetItem1<SMMERegistration>(ds.Tables[0]);

            var Srecord = sme;
            return View(Srecord);
        }
        public ActionResult CostManagement()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            ViewBag.SMMEId = SMMEUserModel.UM_MainID;
            return View();

        }
        public ActionResult ViewCostManagement()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            ViewBag.SMMEId = SMMEUserModel.UM_MainID;
            return View();

        }

        public ActionResult AddBulkSMMEForAdmin()
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }


        //*****//
        public ActionResult ExportToExcelDynamic()
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

    }
}