using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BODDal.Models
{
    public class AssessmentAnswer
    {
        public int? ASA_QuestionId { get; set; }
        public string ASA_Answer { get; set; }
        public int? ASA_SegmentId { get; set; }
        public string ASA_File {  get; set; }
    }
}
