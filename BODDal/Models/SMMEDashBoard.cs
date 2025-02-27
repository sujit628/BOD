using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class SMMEDashBoard
    {
        public int? TotalCust { get; set; }
        public int? TotalEmployee { get; set; }
        public int? TotalProject { get; set; }
        public int? TotalJOB { get; set; }
        public int? TotalTask { get; set; }
        public int? TaskOpen { get; set; }

        public int? TaskProgress { get; set; }
        public int? TaskCompleted { get; set; }


        public int? TotalAssesment { get; set; }

        public decimal? TotalBudget { get; set; }
        public int? TotalActivity { get; set; }

        public int? TotalCompletedJOB { get; set; }

        public int? TotalOpenJOB { get; set; }
        public int? TotalProgressJOB { get; set; }

        public int? ProjectOnTrack { get; set; }

        public int? ProjectBehind { get; set; }
        public int? ProjectCompleted { get; set; }

        public int? TotalProjectsLastYr { get; set; }
        public int? TotalProjectsLastMonth { get; set; }
        public int? TotalProjectsLastWeek { get; set; }

        //public int? TotalEMEProtfolioGrowth { get; set; }
        //public int? TotalQSEProtfolioGrowth { get; set; }

        //public int? QSEPerProtfolioGrowth { get; set; }
        //public int? EMEPerProtfolioGrowth { get; set; }
    }
}
