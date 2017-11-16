﻿using System;
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
    public class BackgroundsController : BaseApiController
    {
        private readonly IBackgroundFacade _backgroundFacade;
        public BackgroundsController(IBackgroundFacade backgroundFacade)
        {
            _backgroundFacade = backgroundFacade;
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Backgrounds", Name = "AddBackground")]
        [HttpPost]
        public IHttpActionResult AddBackground()
        {

            if (!HttpContext.Current.Request.Files.AllKeys.Any())
                throw new ValidationException(ErrorCodes.EmptyBackgroundImage);
            var httpPostedFile = HttpContext.Current.Request.Files[0];

            var backgroundModel = new JavaScriptSerializer().Deserialize<BackgroundModel>(HttpContext.Current.Request.Form.Get(0));

            if (httpPostedFile == null)
                throw new ValidationException(ErrorCodes.EmptyBackgroundImage);

            if (httpPostedFile.ContentLength > 2 * 1024 * 1000)
                throw new ValidationException(ErrorCodes.ImageExceedSize);


            if (Path.GetExtension(httpPostedFile.FileName).ToLower() != ".jpg" &&
                Path.GetExtension(httpPostedFile.FileName).ToLower() != ".png" &&
                Path.GetExtension(httpPostedFile.FileName).ToLower() != ".jpeg")

                throw new ValidationException(ErrorCodes.InvalidImageType);

            var backgroundDto = Mapper.Map<BackgroundDto>(backgroundModel);
            backgroundDto.Image = new MemoryStream();
            httpPostedFile.InputStream.CopyTo(backgroundDto.Image);

            _backgroundFacade.AddBackground(backgroundDto, HostingEnvironment.MapPath("~/Images/"));
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Backgrounds/{BackgroundId:long}", Name = "GetBackground")]
        [HttpGet]
        [ResponseType(typeof(BackgroundModel))]
        public IHttpActionResult GetBackground(long backgroundId)
        {
            var background = Mapper.Map<BackgroundModel>(_backgroundFacade.GetBackground(backgroundId));
            background.ImageUrl = Url.Link("BackgroundImage", new { background.BackgroundId });

            return Ok(background);
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Backgrounds/{BackgroundId:long}", Name = "DeleteBackground")]
        [HttpDelete]
        public IHttpActionResult DeleteBackground(long backgroundId)
        {
            _backgroundFacade.DeleteBackground(backgroundId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Backgrounds/{BackgroundId:long}/Activate", Name = "ActivateBackground")]
        [HttpGet]
        public IHttpActionResult ActivateBackground(long backgroundId)
        {
            _backgroundFacade.ActivateBackground(backgroundId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Backgrounds/{BackgroundId:long}/DeActivate", Name = "DeActivateBackground")]
        [HttpGet]
        public IHttpActionResult DeActivateBackground(long backgroundId)
        {
            _backgroundFacade.DeActivateBackground(backgroundId);
            return Ok();
        }

        [AuthorizeRoles(Enums.RoleType.RestaurantAdmin)]
        [Route("api/Backgrounds", Name = "UpdateBackground")]
        [HttpPut]
        public IHttpActionResult UpdateBackground()
        {
            var backgroundModel =
                new JavaScriptSerializer().Deserialize<BackgroundModel>(HttpContext.Current.Request.Form.Get(0));
            var backgroundDto = Mapper.Map<BackgroundDto>(backgroundModel);
            if (backgroundModel.IsImageChange)
            {
                if (!HttpContext.Current.Request.Files.AllKeys.Any())
                    throw new ValidationException(ErrorCodes.EmptyBackgroundImage);
                var httpPostedFile = HttpContext.Current.Request.Files[0];


                if (httpPostedFile.ContentLength > 2 * 1024 * 1000)
                    throw new ValidationException(ErrorCodes.ImageExceedSize);


                if (Path.GetExtension(httpPostedFile.FileName).ToLower() != ".jpg" &&
                    Path.GetExtension(httpPostedFile.FileName).ToLower() != ".png" &&
                    Path.GetExtension(httpPostedFile.FileName).ToLower() != ".jpeg")

                    throw new ValidationException(ErrorCodes.InvalidImageType);

                //restaurantDto.Image = (MemoryStream) restaurant.Image.InputStream;
                backgroundDto.Image = new MemoryStream();
                httpPostedFile.InputStream.CopyTo(backgroundDto.Image);
            }
            _backgroundFacade.UpdateBackground(backgroundDto, HostingEnvironment.MapPath("~/Images/"));
            return Ok();
        }



        [Route("api/Backgrounds/GetAllBackground", Name = "GetAllBackground")]
        [HttpGet]
        [ResponseType(typeof(List<BackgroundModel>))]
        public IHttpActionResult GetAllBackground(int page = Page, int pagesize = PageSize)
        {
            PagedResultsDto backgorundObj = _backgroundFacade.GetAllBackgrounds(page, pagesize);

            var data = Mapper.Map<List<BackgroundModel>>(backgorundObj.Data);


            return PagedResponse("GetAllBackground", page, pagesize, backgorundObj.TotalCount, data, backgorundObj.IsParentTranslated);

        }

        [Route("api/Backgrounds/GetActivatedBackgroundByUserId", Name = "GetActivatedBackgroundByUserId")]
        [HttpGet]
        [ResponseType(typeof(List<BackgroundModel>))]
        public IHttpActionResult GetActivatedBackgroundByUserId(int page = Page, int pagesize = PageSize)
        {
            var data = Mapper.Map<List<BackgroundModel>>(_backgroundFacade.GetActivatedBackgroundByUserId(UserId, page, pagesize));
            return Ok(data);
        }
    }
}
