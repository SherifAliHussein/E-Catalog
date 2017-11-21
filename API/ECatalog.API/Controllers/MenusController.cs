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
    public class MenusController : BaseApiController
    {
        private IMenuFacade _menuFacade;
        private ICategoryFacade _categoryFacade;

        public MenusController(IMenuFacade menuFacade, ICategoryFacade categoryFacade)
        {
            _categoryFacade = categoryFacade;
            _menuFacade = menuFacade;
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Menus", Name = "AddMenu")]
        [HttpPost]
        public IHttpActionResult AddMenu()
        {
            if (!HttpContext.Current.Request.Files.AllKeys.Any())
                throw new ValidationException(ErrorCodes.EmptyCategoryImage);
            var httpPostedFile = HttpContext.Current.Request.Files[0];

            var menuModel = new JavaScriptSerializer().Deserialize<MenuModel>(HttpContext.Current.Request.Form.Get(0));

            if (httpPostedFile == null)
                throw new ValidationException(ErrorCodes.EmptyCategoryImage);

            if (httpPostedFile.ContentLength > 2 * 1024 * 1000)
                throw new ValidationException(ErrorCodes.ImageExceedSize);


            if (Path.GetExtension(httpPostedFile.FileName).ToLower() != ".jpg" &&
                Path.GetExtension(httpPostedFile.FileName).ToLower() != ".png" &&
                Path.GetExtension(httpPostedFile.FileName).ToLower() != ".jpeg")

                throw new ValidationException(ErrorCodes.InvalidImageType);

            var menuDto = Mapper.Map<MenuDTO>(menuModel);
            //restaurantDto.Image = (MemoryStream) restaurant.Image.InputStream;
            menuDto.Image = new MemoryStream();
            httpPostedFile.InputStream.CopyTo(menuDto.Image);

            _menuFacade.AddMenu(menuDto, UserId,Language, HostingEnvironment.MapPath("~/Images/"));
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Menus/{MenuId:long}", Name = "GetMenu")]
        [HttpGet]
        [ResponseType(typeof(MenuModel))]
        public IHttpActionResult GetMenu(long menuId)
        {
            return Ok(Mapper.Map<MenuModel>(_menuFacade.GetMenu(menuId,Language)));
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin,Enums.RoleType.Waiter)]
        [Route("api/Menus/", Name = "GetAllMenuForRestaurant")]
        [HttpGet]
        [ResponseType(typeof(List<MenuModel>))]
        public IHttpActionResult GetAllMenuForRestaurant( int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto menus;
            menus = UserRole == Enums.RoleType.RestaurantAdmin.ToString() ? _menuFacade.GetAllMenusByRestaurantId(Language, UserId, page, pagesize) : _menuFacade.GetActivatedMenusByRestaurantId(Language, UserId, page, pagesize);
            var data = Mapper.Map<List<MenuModel>>(menus.Data);
            foreach (var menu in data)
            {
                menu.ImageURL = Url.Link("MenuImage", new { menu.RestaurantId, menu.MenuId });
            }
            return PagedResponse("GetAllMenuForRestaurant", page, pagesize, menus.TotalCount,data, menus.IsParentTranslated);
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Menus/Name", Name = "GetAllMenuNameForRestaurant")]
        [HttpGet]
        [ResponseType(typeof(List<MenuModel>))]
        public IHttpActionResult GetAllMenuNameForRestaurant()
        {
            var menus = _menuFacade.GetAllAcivatedMenusNameByRestaurantId(Language, UserId);
            return Ok(menus);
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Menus/{menuId:long}", Name = "DeleteMenu")]
        [HttpDelete]
        public IHttpActionResult DeleteMenu(long menuId)
        {
            _menuFacade.DeleteMenu(menuId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Menus/{menuId:long}/Activate", Name = "ActivateMenu")]
        [HttpGet]
        public IHttpActionResult ActivateMenu(long menuId)
        {
            _menuFacade.ActivateMenu(menuId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Menus/{menuId:long}/DeActivate", Name = "DeActivateMenu")]
        [HttpGet]
        public IHttpActionResult DeActivateMenu(long menuId)
        {
            _menuFacade.DeActivateMenu(menuId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Menus", Name = "UpdateMenu")]
        [HttpPut]
        public IHttpActionResult UpdateMenu()
        {
            var menuModel =
                new JavaScriptSerializer().Deserialize<MenuModel>(HttpContext.Current.Request.Form.Get(0));
            var menuDto = Mapper.Map<MenuDTO>(menuModel);
            if (menuDto.IsImageChange)
            {
                if (!HttpContext.Current.Request.Files.AllKeys.Any())
                    throw new ValidationException(ErrorCodes.EmptyCategoryImage);
                var httpPostedFile = HttpContext.Current.Request.Files[0];


                if (httpPostedFile == null)
                    throw new ValidationException(ErrorCodes.EmptyCategoryImage);

                if (httpPostedFile.ContentLength > 2 * 1024 * 1000)
                    throw new ValidationException(ErrorCodes.ImageExceedSize);


                if (Path.GetExtension(httpPostedFile.FileName).ToLower() != ".jpg" &&
                    Path.GetExtension(httpPostedFile.FileName).ToLower() != ".png" &&
                    Path.GetExtension(httpPostedFile.FileName).ToLower() != ".jpeg")

                    throw new ValidationException(ErrorCodes.InvalidImageType);
                
                menuDto.Image = new MemoryStream();
                httpPostedFile.InputStream.CopyTo(menuDto.Image);
            }
            _menuFacade.UpdateMenu(menuDto, UserId, Language, HostingEnvironment.MapPath("~/Images/"));
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin, Enums.RoleType.Waiter)]
        [Route("api/Menus/{menuId:long}/Categories", Name = "GetAllCategoriesForMenu")]
        [HttpGet]
        [ResponseType(typeof(List<CategoryModel>))]
        public IHttpActionResult GetAllCategoriesForMenu(long menuId, int page = Page, int pagesize = PageSize)
        {
            //var categories = _categoryFacade.GetAllCategoriesByMenuId(Language, menuId, page, pagesize);
            PagedResultsDto categories;
            categories = UserRole == Enums.RoleType.RestaurantAdmin.ToString() ? _categoryFacade.GetAllCategoriesByMenuId(Language, menuId, page, pagesize) : _categoryFacade.GetActivatedCategoriesByMenuId(Language, menuId, page, pagesize);
            var data = Mapper.Map<List<CategoryModel>>(categories.Data);
            foreach (var category in data)
            {
                category.ImageURL = Url.Link("CategoryImage", new { category.RestaurantId, category.MenuId, category.CategoryId });
            }
            return PagedResponse("GetAllCategoriesForMenu", page, pagesize, categories.TotalCount, data, categories.IsParentTranslated);
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Menus/{menuId:long}/Categories/Name", Name = "GetAllCategoriesNameForMenu")]
        [HttpGet]
        [ResponseType(typeof(List<CategoryNameModel>))]
        public IHttpActionResult GetAllCategoriesNameForMenu(long menuId)
        {
            var data = Mapper.Map<List<CategoryNameModel>>(_categoryFacade.GetAllCategoriesNameByMenuId(Language, menuId));
            return Ok(data);
        }
    }
}
