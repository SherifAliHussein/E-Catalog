using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.BLL.DTOs;
using ECatalog.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;

namespace ECatalog.BLL.DataServices
{
    public class BranchTranslationService:Service<BranchTranslation>,IBranchTranslationService
    {
        public BranchTranslationService(IRepositoryAsync<BranchTranslation> repository):base(repository)
        {
            
        }
        public bool CheckBranchTitleExist(string branchTitle, string language, long branchId)
        {
            return Queryable()
                .Any(x => x.Language.ToLower() == language.ToLower() &&
                          x.BranchTitle.ToLower() == branchTitle.ToLower() &&
                          x.BranchId != branchId && !x.Branch.IsDeleted);
        }
        public PagedResultsDto GetAllBranchesByRestaurantAdminId(string language, long restaurantAdminId, int page, int pageSize)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.Branch.IsDeleted && x.Language.ToLower() == language.ToLower() && x.Branch.Restaurant.RestaurantAdminId == restaurantAdminId).Select(x => x.Branch).Count(x => !x.IsDeleted);
            List<Branch> branches;
            if (pageSize > 0)
                branches = _repository.Query(x => !x.Branch.IsDeleted && x.Language.ToLower() == language.ToLower() && x.Branch.Restaurant.RestaurantAdminId == restaurantAdminId).Select(x => x.Branch)
                    .OrderBy(x => x.BranchId).Skip((page - 1) * pageSize)
                    .Take(pageSize).ToList();
            else
                branches = _repository.Query(x => !x.Branch.IsDeleted && x.Language.ToLower() == language.ToLower() && x.Branch.Restaurant.RestaurantAdminId == restaurantAdminId).Select(x => x.Branch)
                    .OrderBy(x => x.BranchId).ToList();
            results.Data = Mapper.Map<List<Branch>, List<BranchDto>>(branches, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (Branch branch in src)
                        {
                            branch.BranchTranslations = branch.BranchTranslations
                                .Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
    }
}
