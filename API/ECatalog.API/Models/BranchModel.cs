using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECatalog.API.Models
{
    public class BranchModel
    {
        public long BranchId { get; set; }
        public string BranchTitle { get; set; }
        public string BranchAddress { get; set; }
        public bool IsActive { get; set; }
    }
}