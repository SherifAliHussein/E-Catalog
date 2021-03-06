﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECatalog.DAL.Entities.Model;
using Service.Pattern;

namespace ECatalog.BLL.DataServices.Interfaces
{
    public interface IPackageService:IService<Package>
    {
        int GetWaitersCountByAdminId(long globalAdminId);
        List<Package> GetAllPackagesByGlobalAdminId(long globalAdminId);
    }
}
