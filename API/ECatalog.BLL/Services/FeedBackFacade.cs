using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.BLL.DTOs;
using ECatalog.BLL.Services.Interfaces;
using ECatalog.Common;
using ECatalog.Common.CustomException;
using ECatalog.DAL.Entities.Model;
using Repository.Pattern.UnitOfWork;

namespace ECatalog.BLL.Services
{
    public class FeedBackFacade:BaseFacade,IFeedBackFacade
    {
        private IFeedBackService _feedBackService;
        private IRestaurantWaiterService _restaurantWaiterService;
        private IRestaurantService _restaurantService;

        public FeedBackFacade(IFeedBackService feedBackService, IUnitOfWorkAsync unitOfWork, IRestaurantWaiterService restaurantWaiterService, IRestaurantService restaurantService) : base(unitOfWork)
        {
            _feedBackService = feedBackService;
            _restaurantWaiterService = restaurantWaiterService;
            _restaurantService = restaurantService;
        }

        public void AddFeedBack(FeedBackDto feedBackDto,long userId)
        {
            var waiter = _restaurantWaiterService.Find(userId);
            if (waiter == null) throw new NotFoundException(ErrorCodes.RestaurantAdminNotFound);
            var feedback = Mapper.Map<FeedBack>(feedBackDto);
            feedback.RestaurantId = waiter.RestaurantId;
           // feedback.CreateTime = DateTime.Now;
            _feedBackService.Insert(feedback);
            SaveChanges();
        }

        public PagedResultsDto GetAllFeedBack(long userId, int page, int pageSize,string userRole)
        {
            PagedResultsDto results = new PagedResultsDto();
            if (userRole == Enums.RoleType.Waiter.ToString())
            {
                var waiter = _restaurantWaiterService.Find(userId);
                if (waiter == null) throw new NotFoundException(ErrorCodes.RestaurantAdminNotFound);
                results = _feedBackService.GetAllFeedBack(waiter.RestaurantId, page, pageSize);
            }
            else if (userRole == Enums.RoleType.RestaurantAdmin.ToString())
            {
                var restaurant = _restaurantService.GetRestaurantByAdminId(userId);
                if (restaurant == null) throw new NotFoundException(ErrorCodes.RestaurantNotFound);
                results = _feedBackService.GetAllFeedBack(restaurant.RestaurantId, page, pageSize);
            }
            return results;

        }
    }
}
