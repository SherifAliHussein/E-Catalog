using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Pattern.Ef6;

namespace ECatalog.DAL.Entities.Model
{
    public class FeedBack : Entity
    {
        public long FeedBackId { get; set; }
        public string Comment { get; set; }
        public int Rate { get; set; }
        [ForeignKey("Restaurant")]
        public long RestaurantId { get; set; }
        public virtual Restaurant Restaurant { get; set; }
        public string CreateBy { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime CreateTime { get; set; }
    }
}
