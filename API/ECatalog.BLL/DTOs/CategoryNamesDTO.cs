using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECatalog.BLL.DTOs
{
    public class CategoryNamesDTO
    {
        public long CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int ItemCount { get; set; }
    }
}
