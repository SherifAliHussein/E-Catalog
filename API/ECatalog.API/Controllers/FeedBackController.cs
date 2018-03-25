using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AutoMapper;
using ECatalog.API.Infrastructure;
using ECatalog.API.Models;
using ECatalog.API.Providers;
using ECatalog.BLL.DTOs;
using ECatalog.BLL.Services.Interfaces;
using ECatalog.Common;

namespace ECatalog.API.Controllers
{
    public class FeedBackController : BaseApiController
    {
        private IFeedBackFacade _feedBackFacade;

        public FeedBackController(IFeedBackFacade feedBackFacade)
        {
            _feedBackFacade = feedBackFacade;
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin, Enums.RoleType.Waiter)]
        [Route("api/FeedBacks", Name = "GetAllFeedBack")]
        [HttpGet]
        [ResponseType(typeof(List<FeedBackModel>))]
        public IHttpActionResult GetAllFeedBack(int page = Page, int pagesize = PageSize)
        {
            //var categories = _categoryFacade.GetAllCategoriesByMenuId(Language, menuId, page, pagesize);
            PagedResultsDto feedbacks;
            feedbacks = _feedBackFacade.GetAllFeedBack(UserId, page, pagesize, UserRole);
            var data = Mapper.Map<List<FeedBackModel>>(feedbacks.Data);

            return PagedResponse("GetAllFeedBack", page, pagesize, feedbacks.TotalCount, data, false);
        }

        [AuthorizeRoles(Enums.RoleType.Waiter)]
        [Route("api/FeedBacks", Name = "FeedBacks")]
        [HttpPost]
        public IHttpActionResult AddFeedBack([FromBody]FeedBackModel feedBackModel)
        {
            _feedBackFacade.AddFeedBack(Mapper.Map<FeedBackDto>(feedBackModel),UserId);
            return Ok();
        }
    }
}