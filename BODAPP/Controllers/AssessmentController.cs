using BODDal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BODAPP.Controllers
{
    public class AssessmentController : Controller
    {
        public static UserModel UserModel { get; set; }
        public static UserModel EnterpriseEMPUserDataModel { get; set; }
        public static UserModel EnterpriseUserModel { get; set; }
        public static UserModel SMMEUserModel { get; set; }
        public static GlobalPages pageName { get; set; }
        public static UserModel AdminUserModel { get; set; }
        public static void GetSession()
        {
            UserModel = (UserModel)System.Web.HttpContext.Current.Session["UserDataModel"];
            EnterpriseUserModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseUserDataModel"];
            SMMEUserModel = (UserModel)System.Web.HttpContext.Current.Session["SMMEUserDataModel"];
            EnterpriseEMPUserDataModel = (UserModel)System.Web.HttpContext.Current.Session["EnterpriseEMPUserDataModel"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            pageName = (GlobalPages)System.Web.HttpContext.Current.Session["LoginPageName"];
            AdminUserModel = (UserModel)System.Web.HttpContext.Current.Session["AdminUserDataModel"];
        }


        public AssessmentController()
        {
            GetSession();

        }
        public ActionResult AddQuestionSetup()
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
            ViewBag.EntrId = 0;
            return View();
        }
        public ActionResult QuestionSetupList()
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
            ViewBag.EntrId = 0;
            return View();
        }
        public ActionResult QuestionBuilding()
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
            ViewBag.EntrId = 0;
            return View();
        }
        public ActionResult ViewAllBuildQuestion()
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
            ViewBag.EntrId = 0;
            return View();
        }
        public ActionResult ViewAllBuildQuestionEnterprise()
        {
           
                if (EnterpriseUserModel != null)
                {
                    ViewBag.EntrId = EnterpriseUserModel.UM_MainID;
                    
                }

                if (EnterpriseEMPUserDataModel != null)
                {
                    ViewBag.EntrId = EnterpriseEMPUserDataModel.UM_MainID;

                }
            
            ViewBag.EntrId = 0;
            return View();
        }
        public ActionResult YourAssessment()
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ShowAssessment()
        {
            //if (SMMEUserModel == null)
            //{
            //    return RedirectToAction("SMMELogin", "Account");
            //}
            if (SMMEUserModel != null)
            {
                ViewBag.SmmeId = SMMEUserModel.UM_MainID;
                //ViewBag.BAId = SMMEUserModel.BA_Id;
                //ViewBag.AssessmentId = SMMEUserModel.Assessment_Id;
            }
                
            return View();
        }
        public ActionResult AssignSMMEAssessmentForadmin()
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }
        public ActionResult ViewAssessment(int? BAId)
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.BaId = BAId;
            

            return View();
        }
        public ActionResult ViewAssessmentForEnterprise()
        {

            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }


            return View();
        }
        public ActionResult AssignSMMEAssessmentForEnterprise()
        {

            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            return View();
        }
        public ActionResult AllAssignAssessmnetByAdmin()
        {
            if (UserModel == null)
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            return View();
        }

        public ActionResult AllAssignAssessmnetByAdminForSingleSMME(int? Id)
        {
            if ((UserModel == null) && (EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {
                return RedirectToAction("AdminLogin", "Account");
            }
            ViewBag.Id = Id;
            return View();
        } 

        public ActionResult AllAssignAssessmnetByEnterp()
        {

            if ((EnterpriseUserModel == null) && (EnterpriseEMPUserDataModel == null))
            {

                return RedirectToAction(pageName.PageName, "Account");
            }
            return View();
        }
        public ActionResult AllAssessmentListForSMME()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            ViewBag.SmmeId = SMMEUserModel.UM_MainID;
            return View();
        }
        public ActionResult ViewAssessmentForSMME()
        {
            if (SMMEUserModel == null)
            {
                return RedirectToAction("SMMELogin", "Account");
            }
            ViewBag.SmmeId = SMMEUserModel.UM_MainID;
            return View();
        }
        public ActionResult AssessmnetWiseSMMEByAdmin()
        {
           
            return View();
        }
        public ActionResult ViewSMMEWiseAssessment(int?Id)
        {
            ViewBag.SmmeId = Id;
            
            return View();
        }

        //***********************
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