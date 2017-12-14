using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECatalog.BLL.DTOs;

namespace ECatalog.BLL.Services.Interfaces
{
    public interface IBranchFacade
    {
        void AddBranch(BranchDto branchDto, long restaurantAdminId, string language);
        BranchDto GetBranch(long branchId, string language);
        void ActivateBranch(long branchId);
        void DeActivateBranch(long branchId);
        void DeleteBranch(long branchId);
        void UpdateBranch(BranchDto branchDto, string language);
        PagedResultsDto GetAllBranches(string language, long restaurantAdminId, int page, int pageSize);
    }
}
