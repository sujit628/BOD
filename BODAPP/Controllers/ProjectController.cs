using BODDal;
using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Reflection;
//using BODDal.Model;
namespace BODAPP.Controllers
{
    public class ProjectController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static GlobalPages pageName { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static UserModel SMMEUserModel { get; set; }
        public GlobalData global = new GlobalData();
        public static DataTable dt = new DataTable();
        DAL dl = new DAL();

        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
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
            T obj = Activator.CreateInstance<T>();

            T data = Activator.CreateInstance<T>();
            foreach (DataRow row in dt.Rows)
            {
                data = GetItem<T>(row);
            }


            return data;
        }
        public static void GetSession()
        {
            //UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            EnterpriseUserModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseUserDataModel"];
            SMMEUserModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserDataModel"];
            EnterpriseEMPUserDataModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseEMPUserDataModel"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
        }


        public ProjectController()
        {
            GetSession();

        }

        public ActionResult ProjectDetails()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    ViewBag.EnrEmailId = EnterpriseUserModel.UM_EmailId;
                    ViewBag.UserName = EnterpriseUserModel.UserName;
                    ViewBag.CompanyName = EnterpriseUserModel.CompanyName;
                    return View();
                }
                else if(EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    ViewBag.EnrEmailId = EnterpriseEMPUserDataModel.UM_EmailId;
                    ViewBag.UserName = EnterpriseEMPUserDataModel.UserName;
                    ViewBag.CompanyName = EnterpriseEMPUserDataModel.CompanyName;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult ProjectListForAdmin()
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {
                return RedirectToAction(pageName.PageName, "Account");
            }

            else
            {

                DataSet ds = new DataSet();


                global.StoreProcedure = "AdminDashBoard_USP";
                global.TransactionType = "SelectAdminDashBoard";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                AdminDashBoard dash = new AdminDashBoard();
                dash = GetItem1<AdminDashBoard>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = dash;
                return View(Srecord);
            }

        }

        //public ActionResult ProjectListForAdmin()
        //{
        //    if ((UserModel == null) && (AdminUserModel == null))
        //    {

        //        return RedirectToAction(pageName.PageName, "Account");
        //    }
        //    return View();
        //}
        public ActionResult ProjectListForEnterprise()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }
        public ActionResult AssignProjectToEnterprise()
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult CreateTask()
        {
        
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult TaskList()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ProjectListToAssignSMME()
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ProjectListToAssignSMMEFromEnterp()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }
        public ActionResult AssignProjectListForSMME()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            ViewBag.SmmeId = SMMEUserModel.UM_MainID;
            return View();
        }
        public ActionResult AllEnterpriseWiseProject()
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult CreateActivity()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult CreateActivityList()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult ActivityListForSMME()
        {

            if (SMMEUserModel != null)
            {

                ViewBag.SMMEId = SMMEUserModel.UM_MainID;
            }
            else
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            return View();
        }

        public ActionResult TaskListForSMME()
        {

            if (SMMEUserModel != null)
            {
                 ViewBag.SMMEId = SMMEUserModel.UM_MainID;
            }
            else
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            return View();
        }
  
        public ActionResult ProjectDetailsNew(int? Id)
        {
            ViewBag.Id = Id;
            if (EnterpriseUserModel != null)
            {
                ViewBag.UserMainId = EnterpriseUserModel.UM_MainID;
            }
            if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.UserMainId = EnterpriseEMPUserDataModel.UM_MainID;
            }

            return View();
        }

        public ActionResult TaskProgressSMME(int? Id)
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            else
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;

                DataSet ds = new DataSet();
                global.param1Value = Id;
                global.param1 = "TD_Id";
      
                global.StoreProcedure = "TaskDetails_USP";
                global.TransactionType = "SelectTaskForProgress";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                CreateTask task = new CreateTask();
                task = GetItem1<CreateTask>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = task;
                return View(Srecord);
            }
        }
        public ActionResult TaskProgressEnterprise(int? Id)
        {

            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
               
            else
            {
                

                DataSet ds = new DataSet();
                global.param1Value = Id;
                global.param1 = "TD_Id";

                global.StoreProcedure = "TaskDetails_USP";
                global.TransactionType = "SelectTaskForProgress";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                CreateTask task = new CreateTask();
                task = GetItem1<CreateTask>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = task;
                return View(Srecord);
            }
        }
        public ActionResult TaskProgressAdmin(int? Id)
        {
            if ((UserModel == null) && (AdminUserModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }

            else
            {

                DataSet ds = new DataSet();
                global.param1Value = Id;
                global.param1 = "TD_Id";

                global.StoreProcedure = "TaskDetails_USP";
                global.TransactionType = "SelectTaskForProgress";
                ds = dl.GetGlobalMasterTransactionSingle1(global);
                CreateTask task = new CreateTask();
                task = GetItem1<CreateTask>(ds.Tables[0]);
                //smme.CustomerDetailsList = ConvertDataTable<CustomerDetails>(ds.Tables[1]);
                var Srecord = task;
                return View(Srecord);
            }
        }
        public ActionResult ProjectBudgetDashboard(int? Id)
        {
            ViewBag.Id = Id;
            return View();
        }
        public ActionResult ProjectFundExpenditure(int? Id)
        {
            ViewBag.Id = Id;
            return View();
        }
        public ActionResult ProjectWiseDoc(int? Id)
        {
            ViewBag.Id = Id;
            return View();
        }
        public ActionResult TaskBoard()
        {
            return View();
        }
        
    }
}