using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECatalog.API.Models
{
    public class PageModel
    {
        public long CategoryId { get; set; }
        public long TemplateId { get; set; }
        public int PageNumber { get; set; }
    }
}