using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ECatalog.BLL.DTOs;

namespace ECatalog.API.Models
{
    public class ItemOrderModel
    {
        public List<ItemNamesDto> ItemNames{ get; set; }
    }
}