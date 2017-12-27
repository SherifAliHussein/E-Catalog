
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECatalog.API.Models
{
    public class RestaurantWaiterModel
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string BranchTitle { get; set; }
        public long BranchId { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
    }
}