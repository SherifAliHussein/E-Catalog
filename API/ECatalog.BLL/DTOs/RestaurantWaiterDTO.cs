using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECatalog.BLL.DTOs
{
    public class RestaurantWaiterDTO
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string BranchTitle { get; set; }
        public long BranchId { get; set; }

        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        //public long RestaurantId { get; set; }
    }
}
