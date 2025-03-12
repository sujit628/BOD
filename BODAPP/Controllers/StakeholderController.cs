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
    public class StakeholderController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static UserModel StakeHolderUserModel { get; set; }
        public static GlobalPages pageName { get; set; }
        public GlobalData global = new GlobalData();
        public static DataTable dt = new DataTable();
        DAL dl = new DAL();

        public static void GetSession()
        {
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            EnterpriseUserModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseUserDataModel"];
            EnterpriseEMPUserDataModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseEMPUserDataModel"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
            StakeHolderUserModel = (UserModel)System.Web.HttpContext.Current.Session["StakeHolderUserModel"];
        }

        public StakeholderController()
        {
            GetSession();
        }
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

            T data = Activator.CreateInstance<T>();
            foreach (DataRow row in dt.Rows)
            {
                data = GetItem<T>(row);
            }

            return data;
        }

        public ActionResult StakeHolderDashboard(int? Id)
        {
            if (EnterpriseUserModel.StakeHolderId == null || EnterpriseUserModel.StakeHolderId != Id)

            {
                EnterpriseUserModel.StakeHolderId = Id;
            }

            DataSet ds = new DataSet();

            global.param1 = "EnrId";
            global.param1Value = EnterpriseUserModel.StakeHolderId;
            global.StoreProcedure = "EnterpriseDashBoard_USP";
            global.TransactionType = "SelectEnterpriseDashBoard";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            EnrDashBoard dash = new EnrDashBoard();
            dash = GetItem1<EnrDashBoard>(ds.Tables[0]);

            string stakeholderLogo = GetStakeholderLogo(EnterpriseUserModel);

            ViewBag.EnrId = EnterpriseUserModel.StakeHolderId;
            ViewBag.StakeholderLogo = stakeholderLogo;
            
            var Srecord = dash;
            return View(Srecord);
        }

        public string GetStakeholderLogo(UserModel user)
        {
            // Call the DAL method to get the logo
            string StakeholderLogo = dl.GetStakeholderLogo(user);
            return StakeholderLogo;
        }


        public ActionResult ViewAllUser()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            return View();
        }

        public ActionResult UserPermissionList()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            return View();
        }

        public ActionResult ProjectDetails()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    ViewBag.StakeholderId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult ProjectListForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }
          
            return View();
        }

        public ActionResult CreateActivity()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
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
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }
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
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }

        public ActionResult SMMESettings_company(int? Id, string M)
        {
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = 0;
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            { ViewBag.M = M; }
            else
            {
                ViewBag.M = "";
            }
            return View();
        }

        public ActionResult SMMESettings_contact(int? Id, string M)
        {
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = 0;
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            { ViewBag.M = M; }
            else
            {
                ViewBag.M = "";
            }

            return View();
        }

        public ActionResult SMMESettings_legalentity(int? Id, string M)
        {
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = 0;
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            { ViewBag.M = M; }
            else
            {
                ViewBag.M = "";
            }
            return View();
        }

        public ActionResult SMMESettings_financial(int? Id, string M)
        {
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = 0;
            }
            if (Id > 0)
            {
                ViewBag.Id = Id;
            }
            else
            {
                ViewBag.Id = 0;
            }
            if (M == "A")
            {
                ViewBag.M = M;
            }
            else if (M == "E")
            { ViewBag.M = M; }
            else
            {
                ViewBag.M = "";
            }
            return View();
        }


        public ActionResult ViewAllSMMEForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            return View();
        }

        public ActionResult AssessmentCategorySetUp()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult AssessmentSegmentSetUp()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult AddQuestionSetup()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult QuestionSetupList()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult QuestionBuilding()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    return View();
                }

                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult ViewAllBuildQuestionStakeholder()
        {

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }

            if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }

            ViewBag.EntrId = 0;
            return View();
        }

        public ActionResult AssignSMMEAssessmentForStakeholder()
        {

            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            return View();
        }

        public ActionResult AllAssignAssessmnetByStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction(pageName.PageName, "Account");
            }
            return View();
        }

        public ActionResult ViewAssessmentForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction(pageName.PageName, "Account");
            }
            return View();
        }

        public ActionResult CreateTask()
        {
            if (UserModel == null)
            {
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
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
                    ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
                    return View();
                }
                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                    ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
                    return View();
                }
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult AddCustomerDetails()
        {
            //if (SMMEUserModel != null)
            //{
            //    ViewBag.SMMEId = SMMEUserModel.StakeHolderId;
            //}
            //else

            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else if (EnterpriseEMPUserDataModel != null)
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            else
            {
                ViewBag.Id = UserModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult ViewAllCustomerForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }

        public ActionResult CustomerDetails(int? Id)
        {
            //if (SMMEUserModel != null)
            //{
            //    ViewBag.JobType = "SMME";
            //}
            //else
            if (EnterpriseUserModel != null)
            {
                ViewBag.JobType = "Enterprise";
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.JobType = "Admin";
            }
            DataTable dt = new DataTable();
            global.StoreProcedure = "CustomerDetails_USP";
            global.TransactionType = "SelectForDetails";
            global.param1 = "CD_Id";
            global.param1Value = Id;
            dt = dl.GetGlobalMasterTransaction(global);
            CustomerDetails cust = new CustomerDetails();
            cust = GetItem1<CustomerDetails>(dt);
            var Srecord = cust;
            return View(Srecord);
        }

        public ActionResult CreateJobsForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult ViewAllJobsForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseUserModel.UM_MainID;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
                ViewBag.StakeHolderId = EnterpriseEMPUserDataModel.UM_MainID;
            }
            return View();
        }

        public ActionResult JobInvoiceStakeholderList()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            return View();
        }

        public ActionResult JobInvoice(int? Id, string M, int? MId)
        {
            //if (SMMEUserModel == null)
            //{
            //    return RedirectToAction("SMMELogin", "Account");
            //}
            DataSet ds = new DataSet();
            if (M == "E")
            {
                global.param1Value = Id;
                global.param1 = "JI_Id";

                //  global.param2Value = SMMEUserModel.StakeHolderId;
                global.param2 = "JI_SMMEId";
                global.StoreProcedure = "JobInvoice_USP";
                global.TransactionType = "SelectForInvoicePreview";
            }
            else
            {
                global.param1Value = Id;
                global.param1 = "JI_JobId";
                global.param3Value = MId;
                global.param3 = "JI_ChildId";
                //  global.param2Value = SMMEUserModel.StakeHolderId;
                global.param2 = "JI_SMMEId";
                global.StoreProcedure = "JobInvoice_USP";
                global.TransactionType = "SelectForInvoice";

            }
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobInvoice job = new JobInvoice();
            job = GetItem1<JobInvoice>(ds.Tables[0]);
           // job.UserName = SMMEUserModel.UserName;
            ViewBag.JI_Id = Id;
            ViewBag.MId = MId;
            ViewBag.Mode = M;
            return View(job);
        }

        public ActionResult JobInvoicePreview(int? Id, int? MId)
        {

            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "JI_Id";
            global.param3Value = MId;
            global.param3 = "JI_ChildId";
            // global.param2Value = SMMEUserModel.StakeHolderId;
            global.param2 = "JI_SMMEId";
            global.StoreProcedure = "JobInvoice_USP";
            global.TransactionType = "SelectForInvoicePreview";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobInvoice job = new JobInvoice();
            job = GetItem1<JobInvoice>(ds.Tables[0]);
            job.JobInvoiceTransactionList = ConvertDataTable<JobInvoiceTransaction>(ds.Tables[1]);
        //    job.UserName = SMMEUserModel.UserName;
            ViewBag.JI_Id = Id;
            ViewBag.MId = MId;
            return View(job);
        }

        public ActionResult JobInvoicePreviewPrint(int? Id, int? MId)
        {
            DataSet ds = new DataSet();
            global.param1Value = Id;
            global.param1 = "JI_Id";
            global.param3Value = MId;
            global.param3 = "JI_ChildId";
            // global.param2Value = SMMEUserModel.StakeHolderId;
            global.param2 = "JI_SMMEId";
            global.StoreProcedure = "JobInvoice_USP";
            global.TransactionType = "SelectForInvoicePreview";
            ds = dl.GetGlobalMasterTransactionSingle1(global);
            JobInvoice job = new JobInvoice();
            job = GetItem1<JobInvoice>(ds.Tables[0]);
            job.JobInvoiceTransactionList = ConvertDataTable<JobInvoiceTransaction>(ds.Tables[1]);
         //   job.UserName = SMMEUserModel.UserName;
            ViewBag.JI_Id = Id;
            ViewBag.MId = MId;
            return View(job);
        }

        public ActionResult AssignProjectWiseStakeholderForStakeholder()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
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

        public ActionResult AssignStakeholderWiseSMME()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
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

        public ActionResult AssignStakeholderWiseAssessment()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult AssignStakeholderWiseJob()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult EnterpriseProfieView_Profiles(int? Id)
        {
            if (EnterpriseUserModel == null)
            {
                return RedirectToAction("EnterpriseLogin", "Account");
            }
            if (Id == null)
            {
                Id = EnterpriseUserModel.StakeHolderId;
            }
            ViewBag.EntrId = Id;
            DataTable dt = new DataTable();
            global.StoreProcedure = "EnterpriseRegistration_USP";
            global.TransactionType = "Select";
            global.param1 = "ENR_Id";
            global.param1Value = Id;
            dt = dl.GetGlobalMasterTransaction(global);
            EnterpriseRegistration Entreg = new EnterpriseRegistration();
            Entreg = GetItem1<EnterpriseRegistration>(dt);
            var Srecord = Entreg;
            return View(Srecord);
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

        public ActionResult ViewAllBranch()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
            }
            return View();
        }

        public ActionResult AddBranch()
        {
            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            if (EnterpriseUserModel != null)
            {
                ViewBag.EntrId = EnterpriseUserModel.StakeHolderId;
            }
            else
            {
                ViewBag.EntrId = EnterpriseEMPUserDataModel.StakeHolderId;
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

        public ActionResult ProjectBudgetDashboard(int? Id)
        {
            ViewBag.Id = Id;
            return View();
        }
        public ActionResult ProjectWiseDoc(int? Id)
        {
            ViewBag.Id = Id;
            return View();
        }

    }
}
