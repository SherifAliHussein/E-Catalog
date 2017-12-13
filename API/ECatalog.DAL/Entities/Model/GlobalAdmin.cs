using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Pattern.Ef6;

namespace ECatalog.DAL.Entities.Model
{
    public class GlobalAdmin:User
    {
        public GlobalAdmin()
        {
            Restaurants = new List<Restaurant>();
            RestaurantTypes = new List<RestaurantType>();
        }
        public int MaxNumberOfWaiters{ get; set; }
        public Guid UserAccountId { get; set; }
        public ICollection<Restaurant> Restaurants { get; set; }
        public ICollection<RestaurantType> RestaurantTypes { get; set; }
    }
}
