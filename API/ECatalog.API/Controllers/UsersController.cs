using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using ECatalog.API.Infrastructure;
using ECatalog.API.Models;
using ECatalog.BLL.DTOs;
using ECatalog.BLL.Services.Interfaces;
using ECatalog.API.Providers;
using ECatalog.Common;

namespace ECatalog.API.Controllers
{
    public class UsersController : BaseApiController
    {
        private IUserFacade _userFacade;
        public UsersController(IUserFacade userFacade)
        {
            _userFacade = userFacade;
        }
        [Route("api/Users/Register", Name = "Register")]
        [HttpPost]
        public IHttpActionResult Register([FromBody] GlobalAdminModel globalAdminModel)
        {
            if (Request.Headers.Authorization.Scheme == "faaf" &&
                Request.Headers.Authorization.Parameter == "asdasdas")

                _userFacade.AddNewGlobalUser(Mapper.Map<GlobalAdminDto>(globalAdminModel));
            return Ok();
            return Unauthorized();
        }

        [AuthorizeRoles(Enums.RoleType.GlobalAdmin)]
        [Route("api/Users/GetMaxAndConUsers", Name = "GetMaxAndConUsers")]
        [HttpGet]
        public IHttpActionResult GetMaxAndConUsers()
        {
            MaxAndConsUserModel maxCon = Mapper.Map<MaxAndConsUserModel>(_userFacade.GetMaxAndConsumedUsers(UserId));

            return Ok(maxCon);

        }
    }
}
