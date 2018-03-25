﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECatalog.API.Models
{
    public class FeedBackModel
    {
        public long FeedBackId { get; set; }
        public string Comment { get; set; }
        public int Rate { get; set; }
        public long RestaurantId { get; set; }
        public string CreateBy { get; set; }
        public DateTime CreateTime { get; set; }
    }
}