using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;

namespace ECatalog.BLL.DataServices
{
    public class PackageService:Service<Package>,IPackageService
    {
        public PackageService(IRepositoryAsync<Package> repository):base(repository)
        {
            
        }

        public int GetWaitersCountByAdminId(long globalAdminId)
        {
            return _repository.Query(x => x.GlobalAdminId == globalAdminId).Select(x => x.MaxNumberOfWaiters).Sum();
        }

        public List<Package> GetAllPackagesByGlobalAdminId(long globalAdminId)
        {
            return _repository.Query(x => x.GlobalAdminId == globalAdminId).Include(x=>x.Waiters).Select().ToList();
        }
    }
}
