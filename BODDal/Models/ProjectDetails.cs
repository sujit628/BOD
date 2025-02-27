using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class ProjectDetails
    {
        public int? PD_Id { get; set; }
        public string PD_ProjectName { get; set; }
        public string PD_DurationFromDate { get; set; }
        public string PD_DurationToDate { get; set; }
        public string PD_Description { get; set; }
        public int? PD_SectorId { get; set; }
        public int? PD_EnterpriseId { get; set; }
        public int? PD_BusinessTypeId { get; set; }
        public string IsBudget { get; set; }
        public int? PD_StakeholderId { get; set; }
        

        public int? PWS_Id { get; set; }
        public int? PWS_ProjectId { get; set; }
        public int? PWS_StakeholderId { get; set; }
        public int? PWS_EnterpriseId { get; set; }


        public int? PSP_Id { get; set; }
        public int? PSP_StakeHolderId { get; set; }
        public bool? PSP_ALL { get; set; }
        public bool? PSP_Task { get; set; }
        public bool? PSP_Activity { get; set; }
        public bool? PSP_Budget { get; set; }
        public bool? PSP_Flies { get; set; }
        public int? PSP_ProjectId { get; set; }
        

        public decimal? PD_Budget { get; set; }
        public int? PD_BudgetType { get; set; }
        public int? PD_CreatedBy { get; set; }
        public bool? IsCompleted { get; set; }
        public string TransactionType { get; set; }
        public int? UserId { get; set; }
        public int? TeamId { get; set; }

        public string Status { get; set; }
        public string IsEnable { get; set; }
    }


}
