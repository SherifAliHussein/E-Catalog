using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Script.Serialization;
using AutoMapper;
using ECatalog.API.Infrastructure;
using ECatalog.API.Models;
using ECatalog.API.Providers;
using ECatalog.BLL.DTOs;
using ECatalog.BLL.Services.Interfaces;
using ECatalog.Common;
using ECatalog.Common.CustomException;

namespace ECatalog.API.Controllers
{
    public class BranchesController : BaseApiController
    {
        private IBranchFacade _branchFacade;
        public BranchesController(IBranchFacade branchFacade)
        {
            _branchFacade = branchFacade;
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Branches", Name = "AddBranch")]
        [HttpPost]
        public IHttpActionResult AddBranch([FromBody] BranchModel branchModel)
        {
            _branchFacade.AddBranch(Mapper.Map<BranchDto>(branchModel),UserId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Branches/{branchId:long}", Name = "GetBranch")]
        [HttpGet]
        [ResponseType(typeof(BranchModel))]
        public IHttpActionResult GetBranch(long branchId)
        {
            return Ok(Mapper.Map<BranchModel>(_branchFacade.GetBranch(branchId)));
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin, Enums.RoleType.Waiter)]
        [Route("api/Branches/", Name = "GetAllBranches")]
        [HttpGet]
        [ResponseType(typeof(List<BranchModel>))]
        public IHttpActionResult GetAllBranches(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto branches = _branchFacade.GetAllBranches(Language, UserId, page, pagesize);
            var data = Mapper.Map<List<BranchModel>>(branches.Data);
            
            return PagedResponse("GetAllBranches", page, pagesize, branches.TotalCount, data, branches.IsParentTranslated);
        }
        

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Branches/{branchId:long}", Name = "DeleteBranch")]
        [HttpDelete]
        public IHttpActionResult DeleteBranch(long branchId)
        {
            _branchFacade.DeleteBranch(branchId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Branches/{branchId:long}/Activate", Name = "ActivateBranch")]
        [HttpGet]
        public IHttpActionResult ActivateBranch(long branchId)
        {
            _branchFacade.ActivateBranch(branchId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Branches/{branchId:long}/DeActivate", Name = "DeActivateBranch")]
        [HttpGet]
        public IHttpActionResult DeActivateBranch(long branchId)
        {
            _branchFacade.DeActivateBranch(branchId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Branches", Name = "UpdateBranch")]
        [HttpPut]
        public IHttpActionResult UpdateBranch([FromBody] BranchModel branchModel)
        {
            _branchFacade.UpdateBranch(Mapper.Map<BranchDto>(branchModel));
            return Ok();
        }
    }
}
