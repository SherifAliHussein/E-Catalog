using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ECatalog.BLL.DataService.Interfaces;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.BLL.DTOs;
using ECatalog.BLL.Services.Interfaces;
using ECatalog.Common;
using ECatalog.Common.CustomException;
using ECatalog.DAL.Entities.Model;
using Repository.Pattern.UnitOfWork;
using ApplicationException = System.ApplicationException;

namespace ECatalog.BLL.Services
{
    public class UserFacade : BaseFacade, IUserFacade
    {
        private IUserService _UserService;
        private IRestaurantWaiterService _restaurantWaiterService;
        private IRestaurantService _restaurantService;
        private IGlobalAdminService _globalAdminService;
        private IPackageService _packageService;

        public UserFacade(IUserService userService, IRestaurantWaiterService restaurantWaiterService, IRestaurantService restaurantService, IGlobalAdminService globalAdminService,IPackageService packageService
            , IUnitOfWorkAsync unitOFWork) : base(unitOFWork)
        {
            _UserService = userService;
            _restaurantWaiterService = restaurantWaiterService;
            _restaurantService = restaurantService;
            _globalAdminService = globalAdminService;
            _packageService = packageService;
        }

        public UserFacade(IUserService userService, IRestaurantWaiterService restaurantWaiterService, IRestaurantService restaurantService)
        {
            _UserService = userService;
            _restaurantWaiterService = restaurantWaiterService;
            _restaurantService = restaurantService;
        }
        public UserDto ValidateUser(string email, string password)
        {
            string encryptedPassword = PasswordHelper.Encrypt(password);
            var user = Mapper.Map<UserDto>(_UserService.ValidateUser(email, encryptedPassword)) ?? Mapper.Map<UserDto>(_UserService.CheckUserIsDeleted(email, encryptedPassword));
            if (user == null) throw new ValidationException(ErrorCodes.UserNotFound);
            if (user.Role == Enums.RoleType.Waiter)
            {
                var waiter = _restaurantWaiterService.Find(user.UserId);
                var restaurant = _restaurantService.Find(waiter.RestaurantId);
                if (!restaurant.IsActive) throw new ValidationException(ErrorCodes.RestaurantIsNotActivated);
                if(DateTime.Now.Date > waiter.Package.End) throw new ValidationException(ErrorCodes.PackageExpired);
            }
            return user;
        }
        public UserDto GetUser(long UserId)
        {
            return Mapper.Map<UserDto>(_UserService.Find(UserId));
        }

        public void AddRestaurantWaiter(RestaurantWaiterDTO restaurantWaiterDto, long restaurantAdminId)
        {
            ValidateRestaurantWaiter(restaurantWaiterDto, 0);

            var restaurant = _restaurantService.GetRestaurantByAdminId(restaurantAdminId);
            if (restaurant == null) throw new NotFoundException(ErrorCodes.RestaurantNotFound);
            var consumedWaiters = restaurant.GlobalAdmin.Restaurants.Where(x => !x.IsDeleted).Select(x => x.WaitersLimit).Sum();
            Package package;
            while (true)
            {
                package = restaurant.GlobalAdmin.Packages.OrderBy(x=>x.Start).Skip(1).FirstOrDefault();
                if (package.MaxNumberOfWaiters > consumedWaiters)
                {
                    break;
                }
                else
                {
                    consumedWaiters = consumedWaiters - package.MaxNumberOfWaiters;
                }

            }
            var packages = restaurant.GlobalAdmin.Packages;
            RestaurantWaiter restaurantWaiter = Mapper.Map<RestaurantWaiter>(restaurantWaiterDto);
            restaurantWaiter.RestaurantId = restaurant.RestaurantId;
            restaurantWaiter.Password = PasswordHelper.Encrypt(restaurantWaiterDto.Password);
            restaurantWaiter.Role = Enums.RoleType.Waiter;
            restaurantWaiter.PackageId = package.PackageId;
            _restaurantWaiterService.Insert(restaurantWaiter);
            SaveChanges();
        }

        public RestaurantWaiterDTO GetRestaurantWaiter(long waiterId)
        {
            var waiter = _restaurantWaiterService.Find(waiterId);
            if (waiter == null) throw new NotFoundException(ErrorCodes.UserNotFound);
            return Mapper.Map<RestaurantWaiterDTO>(waiter);
        }

        public PagedResultsDto GetAllRestaurantWaiters(long restaurantAdminId, int page, int pageSize, string language)
        {
            var restaurant = _restaurantService.GetRestaurantByAdminId(restaurantAdminId);
            if (restaurant == null) throw new NotFoundException(ErrorCodes.RestaurantNotFound);
            return _restaurantWaiterService.GetAllRestaurantWaiters(restaurant.RestaurantId, page, pageSize, language);
        }
        public void UpdateRestaurantWaiter(RestaurantWaiterDTO restaurantWaiterDto)
        {
            var restaurantWaiter = _restaurantWaiterService.Find(restaurantWaiterDto.UserId);
            if (restaurantWaiter == null) throw new NotFoundException(ErrorCodes.UserNotFound);

            ValidateRestaurantWaiter(restaurantWaiterDto,restaurantWaiter.RestaurantId);
            restaurantWaiter.Name = restaurantWaiterDto.Name;
            restaurantWaiter.UserName = restaurantWaiterDto.UserName;
            restaurantWaiter.Password = PasswordHelper.Encrypt(restaurantWaiterDto.Password);
            restaurantWaiter.BranchId = restaurantWaiterDto.BranchId;
            _restaurantWaiterService.Update(restaurantWaiter);
            SaveChanges();
        }
        private void ValidateRestaurantWaiter(RestaurantWaiterDTO restaurantWaiterDto, long restaurantId)
        {
            if (string.IsNullOrEmpty(restaurantWaiterDto.Name)) throw new ValidationException(ErrorCodes.EmptyRestaurantWaiterUserName);
            if (restaurantWaiterDto.Name.Length > 100) throw new ValidationException(ErrorCodes.RestaurantWaiterNameExceedLength);
            if (string.IsNullOrEmpty(restaurantWaiterDto.UserName)) throw new ValidationException(ErrorCodes.EmptyRestaurantWaiterUserName);
            if (restaurantWaiterDto.UserName.Length > 100) throw new ValidationException(ErrorCodes.RestaurantWaiterNameExceedLength);
            if (string.IsNullOrEmpty(restaurantWaiterDto.Password)) throw new ValidationException(ErrorCodes.EmptyRestaurantAdminPassword);
            if (restaurantWaiterDto.Password.Length < 8 || restaurantWaiterDto.Password.Length > 25) throw new ValidationException(ErrorCodes.RestaurantAdminPasswordLengthNotMatched);
            if (_restaurantWaiterService.CheckUserNameDuplicated(restaurantWaiterDto.UserName, restaurantId)) throw new ValidationException(ErrorCodes.RestaurantAdminUserNameAlreadyExist);
            if (_UserService.CheckUserNameDuplicatedForWaiter(restaurantWaiterDto.UserName)) throw new ValidationException(ErrorCodes.RestaurantAdminUserNameAlreadyExist);
        }
        public void DeleteRestaurantWaiter(long restaurantWaiterId)
        {
            var restaurantWaiter = _restaurantWaiterService.Find(restaurantWaiterId);
            if (restaurantWaiter == null) throw new NotFoundException(ErrorCodes.UserNotFound);
            restaurantWaiter.IsDeleted = true;
            _restaurantWaiterService.Update(restaurantWaiter);
            SaveChanges();
        }

        public int GetWaiterLimitByRestaurantAdminId(long restaurantAdminId)
        {
            var restaurant = _restaurantService.GetRestaurantByAdminId(restaurantAdminId);
            return restaurant.WaitersLimit;
        }

        public void AddNewGlobalUser(GlobalAdminDto globalAdminDto)
        {
            GlobalAdmin admin = new GlobalAdmin();
            admin.UserName = globalAdminDto.UserName;
            admin.UserAccountId = globalAdminDto.UserAccountId;
            admin.Role = Enums.RoleType.GlobalAdmin;
            admin.Password = PasswordHelper.Encrypt(globalAdminDto.Password);
            admin.Packages.Add(new Package
            {
                End = globalAdminDto.End,
                Start = globalAdminDto.Start,
                MaxNumberOfWaiters = globalAdminDto.MaxNumberOfWaiters,
                PackageGuid = globalAdminDto.PackageGuid
            });
            _packageService.InsertRange(admin.Packages);
            _globalAdminService.Insert(admin);
            SaveChanges();
        }

        public void UpdateGlobalUser(GlobalAdminDto globalAdminDto)
        {
            var globalAdmin = _globalAdminService.GetGlobalAdminByAccountId(globalAdminDto.UserAccountId);
            globalAdmin.UserName = globalAdminDto.UserName;
            globalAdmin.Password = PasswordHelper.Encrypt(globalAdminDto.Password);
            var package = globalAdmin.Packages.FirstOrDefault(x => x.PackageGuid == globalAdminDto.PackageGuid);
            if (package == null)
            {
                globalAdmin.Packages.Add(new Package
                {
                    End = globalAdminDto.End,
                    Start = globalAdminDto.Start,
                    MaxNumberOfWaiters = globalAdminDto.MaxNumberOfWaiters,
                    PackageGuid = globalAdminDto.PackageGuid
                });
            _packageService.InsertRange(globalAdmin.Packages);
            }
            else
            {
                package.End = globalAdminDto.End;
                _packageService.Update(package); 
            }

            _globalAdminService.Update(globalAdmin);
            SaveChanges();
        }


        public MaxAndConsUserDTO GetMaxAndConsumedUsers(long userId)
        {
            var maxNum = _packageService.GetWaitersCountByAdminId(userId);

            var consumedUsers = _restaurantService.GetAllResturantsLimits(userId);

            MaxAndConsUserDTO MaxCon = new MaxAndConsUserDTO();
            MaxCon.MaxNumUsers = maxNum;
            MaxCon.ConsumedUsers = consumedUsers;
            

            return MaxCon;
        }

    }
}
