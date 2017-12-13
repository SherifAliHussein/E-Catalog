using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECatalog.API.Models
{
    public class GlobalAdminModel
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Guid UserAccountId { get; set; }
        public int MaxNumberOfWaiters { get; set; }
    }
}