using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECatalog.API.Models
{
    public class CategoryNameModel
    {
        public long CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int ItemCount { get; set; }
    }
}