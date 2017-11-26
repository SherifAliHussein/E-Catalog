using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECatalog.BLL.DTOs
{
    public class CategoryPageTemplateDTO
    {
        public long RestaurantId { get; set; }
        public long MenuId { get; set; }
        public long CategoryId { get; set; }
        public string MenuName { get; set; }
        public string CategoryName { get; set; }
        public List<PageTemplateDTO> Templates { get; set; }
    }
}
