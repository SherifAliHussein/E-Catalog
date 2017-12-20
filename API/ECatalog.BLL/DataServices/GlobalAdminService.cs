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
    public class GlobalAdminService:Service<GlobalAdmin>,IGlobalAdminService
    {
        public GlobalAdminService(IRepositoryAsync<GlobalAdmin> repository):base(repository)
        {
            
        }

        public GlobalAdmin GetGlobalAdminByAccountId(Guid userAccountId)
        {
            return _repository.Query(x => x.UserAccountId == userAccountId).Select().FirstOrDefault();
        }
    }
}
