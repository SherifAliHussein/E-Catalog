using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECatalog.BLL.DTOs
{
    public class BranchDto
    {
        public long BranchId { get; set; }
        public string BranchTitle { get; set; }
        public string BranchAddress { get; set; }
        public bool IsActive { get; set; }
    }
}
