using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECatalog.API.Models
{
    public class TemplateModel
    {
        public long Id { get; set; }
        public int ItemCount { get; set; }
        public string ImageURL { get; set; }
    }
}