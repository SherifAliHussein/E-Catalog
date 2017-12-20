using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECatalog.BLL.DTOs;
using ECatalog.DAL.Entities.Model;
using Service.Pattern;

namespace ECatalog.BLL.DataServices.Interfaces
{
    public interface IBranchTranslationService:IService<BranchTranslation>
    {
        bool CheckBranchTitleExist(string branchTitle, string language, long branchId);
        PagedResultsDto GetAllBranchesByRestaurantAdminId(string language, long restaurantAdminId, int page,int pageSize);
    }
}
