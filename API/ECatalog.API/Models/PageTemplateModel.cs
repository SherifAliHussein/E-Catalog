using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECatalog.API.Models
{
    public class PageTemplateModel
    {
        public int PageNumber { get; set; }

        public long TemplateId { get; set; }
        public List<ItemModel> ItemModels { get; set; }
    }
}