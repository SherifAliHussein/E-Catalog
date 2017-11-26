using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECatalog.BLL.DTOs
{
    public class PageTemplateDTO
    {
        public int PageNumber { get; set; }

        public long TemplateId { get; set; }
        public List<ItemDTO> ItemDto { get; set; }
    }
}
