using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Pattern.Ef6;

namespace ECatalog.DAL.Entities.Model
{
    public class Package:Entity
    {
        public Package()
        {
            Waiters = new List<RestaurantWaiter>();
        }
        public long PackageId { get; set; }
        public Guid PackageGuid { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        [ForeignKey("GlobalAdmin")]
        public long GlobalAdminId { get; set; }
        public virtual GlobalAdmin GlobalAdmin { get; set; }
        public int MaxNumberOfWaiters { get; set; }

        public ICollection<RestaurantWaiter> Waiters { get; set; }
    }
}
