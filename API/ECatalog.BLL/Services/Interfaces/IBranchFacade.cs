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
        void AddBranch(BranchDto branchDto, long restaurantAdminId);
        BranchDto GetBranch(long branchId);
        void ActivateBranch(long branchId);
        void DeActivateBranch(long branchId);
        void DeleteBranch(long branchId);
        void UpdateBranch(BranchDto branchDto);
        PagedResultsDto GetAllBranches(string language, long restaurantAdminId, int page, int pageSize);
    }
}
