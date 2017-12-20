using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.BLL.DTOs;
using ECatalog.BLL.Services.Interfaces;
using ECatalog.Common.CustomException;
using ECatalog.DAL.Entities.Model;
using Repository.Pattern.UnitOfWork;

namespace ECatalog.BLL.Services
{
    public class BranchFacade:BaseFacade,IBranchFacade
    {
        private IBranchService _branchService;
        private IBranchTranslationService _branchTranslationService;
        private IRestaurantService _restaurantService;
        public BranchFacade(IBranchService branchService, IBranchTranslationService branchTranslationService, IRestaurantService restaurantService, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _branchService = branchService;
            _branchTranslationService = branchTranslationService;
            _restaurantService = restaurantService;
        }

        public void AddBranch(BranchDto branchDto, long restaurantAdminId, string language)
        {
            var restaurant = _restaurantService.GetRestaurantByAdminId(restaurantAdminId);
            if (restaurant == null) throw new NotFoundException(ErrorCodes.RestaurantNotFound);
            if (restaurant.IsDeleted) throw new ValidationException(ErrorCodes.RestaurantDeleted);
            ValidateBranch(branchDto, language);

            var branch = Mapper.Map<Branch>(branchDto);
            branch.RestaurantId = restaurant.RestaurantId;
            branch.BranchTranslations.Add(new BranchTranslation
            {
                BranchTitle = branchDto.BranchTitle,
                BranchAddress = branchDto.BranchAddress,
                Language = language
            });

            _branchTranslationService.InsertRange(branch.BranchTranslations);
            _branchService.Insert(branch);
            SaveChanges();
            
        }

        private void ValidateBranch(BranchDto branchDto, string language)
        {
            if (string.IsNullOrEmpty(branchDto.BranchTitle))
                throw new ValidationException(ErrorCodes.EmptyBranchTitle);
            if (branchDto.BranchTitle.Length > 300)
                throw new ValidationException(ErrorCodes.BranchTiteExceedLength);
            if (string.IsNullOrEmpty(branchDto.BranchAddress))
                throw new ValidationException(ErrorCodes.EmptyBranchAddress);
            if (branchDto.BranchAddress.Length > 300)
                throw new ValidationException(ErrorCodes.BranchAddressExceedLength);
            if (_branchTranslationService.CheckBranchTitleExist(branchDto.BranchTitle, language, branchDto.BranchId)) throw new ValidationException(ErrorCodes.BranchTitleAlreadyExist);
        }
        public BranchDto GetBranch(long branchId, string language)
        {
            var branch = _branchService.Find(branchId);
            if (branch == null) throw new NotFoundException(ErrorCodes.BranchNotFound);
            if (branch.IsDeleted) throw new NotFoundException(ErrorCodes.BranchDeleted);
            return Mapper.Map<Branch,BranchDto>(branch, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        src.BranchTranslations = src.BranchTranslations
                            .Where(x => x.Language.ToLower() == language.ToLower())
                            .ToList();
                    }
                );
            });
        }

        public void ActivateBranch(long branchId)
        {
            var branch = _branchService.Find(branchId);
            if (branch == null) throw new NotFoundException(ErrorCodes.BranchNotFound);
            branch.IsActive = true;
            _branchService.Update(branch);
            SaveChanges();
        }

        public void DeActivateBranch(long branchId)
        {
            var branch = _branchService.Find(branchId);
            if (branch == null) throw new NotFoundException(ErrorCodes.BranchNotFound);
            branch.IsActive = false;
            _branchService.Update(branch);
            SaveChanges();
        }
        public void DeleteBranch(long branchId)
        {
            var branch = _branchService.Find(branchId);
            if (branch == null) throw new NotFoundException(ErrorCodes.BranchNotFound);
            branch.IsDeleted = true;
            branch.IsActive = false;
            _branchService.Update(branch);
            SaveChanges();
        }
        public void UpdateBranch(BranchDto branchDto, string language)
        {
            ValidateBranch(branchDto, language);
            var branch = _branchService.Find(branchDto.BranchId);
            if (branch == null) throw new NotFoundException(ErrorCodes.BranchNotFound);

            var branchTranslation =
                branch.BranchTranslations.FirstOrDefault(x => x.Language.ToLower() == language.ToLower());
            if (branchTranslation == null)
            {
                branch.BranchTranslations.Add(new BranchTranslation
                {
                    Language = language,
                    BranchTitle = branchDto.BranchTitle,
                    BranchAddress = branchDto.BranchAddress
                });
            }
            else
            {
                branchTranslation.BranchTitle = branchDto.BranchTitle;
                branchTranslation.BranchAddress = branchDto.BranchAddress;
            }

            _branchService.Update(branch);
            SaveChanges();
        }
        public PagedResultsDto GetAllBranches(string language, long restaurantAdminId, int page, int pageSize)
        {
            var results = _branchTranslationService.GetAllBranchesByRestaurantAdminId(language, restaurantAdminId, page, pageSize);
            return results;
        }
    }
}
