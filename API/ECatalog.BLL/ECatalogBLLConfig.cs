﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using ECatalog.BLL.DataService;
using ECatalog.BLL.DataService.Interfaces;
using ECatalog.BLL.DataServices;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.BLL.DTOs;
using ECatalog.BLL.Services.ManageStorage;
using ECatalog.Common;
using ECatalog.DAL;
using ECatalog.DAL.Entities.Model;
using Microsoft.Practices.ObjectBuilder2;
using Microsoft.Practices.Unity;

namespace ECatalog.BLL
{
    public static class ECatalogBLLConfig
    {

        public static void RegisterMappings(MapperConfigurationExpression mapperConfiguration)
        {
            mapperConfiguration.CreateMap<User, UserDto>();
            mapperConfiguration.CreateMap<RestaurantTypeTranslation, RestaurantTypeDto>();
            mapperConfiguration.CreateMap<RestaurantType, RestaurantTypeDto>()
                .ForMember(dto => dto.TypeNameDictionary, m => m.MapFrom(src => src.RestaurantTypeTranslations.ToDictionary(translation => translation.Language.ToLower(), translation=> translation.TypeName)));

            mapperConfiguration.CreateMap<Restaurant, RestaurantDTO>()
                .ForMember(dto => dto.RestaurantName,
                    m => m.MapFrom(src => src.RestaurantTranslations.FirstOrDefault().RestaurantName))
                .ForMember(dto => dto.RestaurantDescription,
                    m => m.MapFrom(src => src.RestaurantTranslations.FirstOrDefault().RestaurantDescription))
                .ForMember(dto => dto.RestaurantTypeName,
                    m => m.MapFrom(src => src.RestaurantType.RestaurantTypeTranslations.FirstOrDefault().TypeName))
                .ForMember(dto => dto.RestaurantAdminPassword,
                    m => m.MapFrom(src => PasswordHelper.Decrypt(src.RestaurantAdmin.Password)))
                .ForMember(dto => dto.Image,m => m.Ignore())
                .ForMember(dto => dto.ConsumedWaiters,m => m.MapFrom(src => src.RestaurantWaiters.Count(x=>!x.IsDeleted)))
                .ForMember(dto => dto.RestaurantNameDictionary, m => m.MapFrom(src => src.RestaurantTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.RestaurantName)))
                .ForMember(dto => dto.RestaurantDescriptionDictionary, m => m.MapFrom(src => src.RestaurantTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.RestaurantDescription)));
                //.ForMember(dto => dto.RestaurantAdminUserName,
                //    m => m.MapFrom(src => PasswordHelper.Decrypt(src.RestaurantAdmin.UserName)));


            mapperConfiguration.CreateMap<CategoryDTO, Category>();
            mapperConfiguration.CreateMap<Category, CategoryDTO>()
                .ForMember(dest => dest.CategoryName, m => m.MapFrom(src => src.CategoryTranslations.FirstOrDefault().CategoryName))
                .ForMember(dest => dest.RestaurantId, m => m.MapFrom(src => src.Menu.RestaurantId))
                .ForMember(dto => dto.CategoryNameDictionary, m => m.MapFrom(src => src.CategoryTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.CategoryName)));

            mapperConfiguration.CreateMap<MenuDTO, Menu>();
            mapperConfiguration.CreateMap<Menu, MenuDTO>()
                .ForMember(dest => dest.MenuName, m => m.MapFrom(src => src.MenuTranslations.FirstOrDefault().MenuName))
                .ForMember(dto => dto.MenuNameDictionary, m => m.MapFrom(src => src.MenuTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.MenuName)));

            mapperConfiguration.CreateMap<Menu, MenuWithCategoriesDTO>()
                .ForMember(dest => dest.MenuName, m => m.MapFrom(src => src.MenuTranslations.FirstOrDefault().MenuName))
                .ForMember(dest => dest.Categories, m => m.MapFrom(src => src.Categories));

            mapperConfiguration.CreateMap<ItemSize, SizeDto>()
                .ForMember(dest => dest.SizeName, m => m.MapFrom(src => src.Size.SizeTranslations.FirstOrDefault(x => x.Language.ToLower() == Thread.CurrentThread.CurrentCulture.Name.ToLower()).SizeName))
                .ForAllMembers(opts => opts.Condition(src=>
                {
                    var firstOrDefault = src.Size.SizeTranslations
                        .FirstOrDefault(x => x.Language.ToLower() ==
                                             Thread.CurrentThread.CurrentCulture.Name.ToLower());
                    return firstOrDefault != null && firstOrDefault.SizeName != null;
                }));
            mapperConfiguration.CreateMap<ItemSideItem, SideItemDTO>()
                .ForMember(dest => dest.SideItemName, m => m.MapFrom(src => src.SideItem.SideItemTranslations.FirstOrDefault(x => x.Language.ToLower() == Thread.CurrentThread.CurrentCulture.Name.ToLower()).SideItemName))
                .ForMember(dest => dest.Value, m => m.MapFrom(src => src.SideItem.Value))
                .ForAllMembers(opts => opts.Condition(src =>
                {
                    var sideItemTranslation = src.SideItem.SideItemTranslations
                        .FirstOrDefault(x => x.Language.ToLower() ==
                                             Thread.CurrentThread.CurrentCulture.Name.ToLower());
                    return sideItemTranslation != null && sideItemTranslation
                                   .SideItemName != null;
                }));
            mapperConfiguration.CreateMap<ItemDTO, Item>();
            mapperConfiguration.CreateMap<Item, ItemDTO>()
                .ForMember(dest => dest.ItemName, m => m.MapFrom(src => src.ItemTranslations.FirstOrDefault().ItemName))
                .ForMember(dest => dest.ItemDescription, m => m.MapFrom(src => src.ItemTranslations.FirstOrDefault().ItemDescription))
                .ForMember(dest => dest.MenuId, m => m.MapFrom(src => src.Category.MenuId))
                .ForMember(dest => dest.RestaurantId, m => m.MapFrom(src => src.Category.Menu.RestaurantId))
                .ForMember(dest => dest.Sizes, m => m.MapFrom(src => src.ItemSizes.Where(x=>!x.Size.IsDeleted)))
                .ForMember(dest => dest.SideItems, m => m.MapFrom(src => src.ItemSideItems.Where(x=>!x.SideItem.IsDeleted)))
                .ForMember(dto => dto.ItemNameDictionary, m => m.MapFrom(src => src.ItemTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.ItemName)))
                .ForMember(dto => dto.ItemDescriptionDictionary, m => m.MapFrom(src => src.ItemTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.ItemDescription)));


            mapperConfiguration.CreateMap<RefreshToken, RefreshTokenDto>().ReverseMap();

            mapperConfiguration.CreateMap<SizeDto, Size>();
            mapperConfiguration.CreateMap<Size, SizeDto>()
                .ForMember(dest => dest.SizeName, m => m.MapFrom(src => src.SizeTranslations.FirstOrDefault().SizeName))
                .ForMember(dto => dto.SizeNameDictionary, m => m.MapFrom(src => src.SizeTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.SizeName)));

            mapperConfiguration.CreateMap<SideItemDTO, SideItem>();
            mapperConfiguration.CreateMap<SideItem, SideItemDTO>()
                .ForMember(dest => dest.SideItemName, m => m.MapFrom(src => src.SideItemTranslations.FirstOrDefault().SideItemName));

            mapperConfiguration.CreateMap<Item, ItemNamesDto>()
                .ForMember(dest => dest.ItemName, m => m.MapFrom(src => src.ItemTranslations.FirstOrDefault().ItemName));

            mapperConfiguration.CreateMap<RestaurantWaiterDTO, RestaurantWaiter>();
            mapperConfiguration.CreateMap<RestaurantWaiter, RestaurantWaiterDTO>()
                .ForMember(dto => dto.Password,m => m.MapFrom(src => PasswordHelper.Decrypt(src.Password)))
                .ForMember(dto => dto.BranchTitle, m => m.MapFrom(src => src.Branch.BranchTranslations.FirstOrDefault().BranchTitle))
                .ForMember(dto => dto.Start, m => m.MapFrom(src => src.Package.Start.Date.ToShortDateString()))
                .ForMember(dto => dto.End, m => m.MapFrom(src => src.Package.End.Date.ToShortDateString()));

            mapperConfiguration.CreateMap<Background, BackgroundDto>();
            mapperConfiguration.CreateMap< BackgroundDto, Background>();
            mapperConfiguration.CreateMap<Template, TemplateDTO>();

            mapperConfiguration.CreateMap<Category, CategoryNamesDTO>()
                .ForMember(dest => dest.ItemCount, m => m.MapFrom(src => src.Items.Count(x=>x.IsActive)))
                .ForMember(dest => dest.CategoryName, m => m.MapFrom(src => src.CategoryTranslations.FirstOrDefault().CategoryName));

            mapperConfiguration.CreateMap<PageDTO, Page>();

            mapperConfiguration.CreateMap<BranchDto, Branch>();
            mapperConfiguration.CreateMap<Branch, BranchDto>()
                .ForMember(dest => dest.BranchTitle, m => m.MapFrom(src => src.BranchTranslations.FirstOrDefault().BranchTitle))
                .ForMember(dest => dest.BranchAddress, m => m.MapFrom(src => src.BranchTranslations.FirstOrDefault().BranchAddress))
                .ForMember(dto => dto.BranchTitleDictionary, m => m.MapFrom(src => src.BranchTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.BranchTitle)))
                .ForMember(dto => dto.BranchAddressDictionary, m => m.MapFrom(src => src.BranchTranslations.ToDictionary(translation => translation.Language.ToLower(), translation => translation.BranchAddress)));

            mapperConfiguration.CreateMap<GlobalAdminDto, GlobalAdmin>();

            mapperConfiguration.CreateMap<FeedBackDto, FeedBack>();
            mapperConfiguration.CreateMap<FeedBack, FeedBackDto>();


            Mapper.Initialize(mapperConfiguration);
            //Mapper.Initialize(m =>
            //{
            //    m.CreateMap<User, UserDto>();

            //});
        }

        public static void RegisterTypes(IUnityContainer container)
        {
            ECatalogDALConfig.RegisterTypes(container);
            container.RegisterType<IRestaurantTypeService, RestaurantTypeService>(new PerResolveLifetimeManager())
                .RegisterType<IRestaurantTypeTranslationService, RestaurantTypeTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<IUserService, UserService>(new PerResolveLifetimeManager())
                .RegisterType<IRestaurantService, RestaurantService>(new PerResolveLifetimeManager())
                .RegisterType<IRestaurantTranslationService, RestaurantTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<IMenuService, MenuService>(new PerResolveLifetimeManager())
                .RegisterType<IMenuTranslationService, MenuTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<ICategoryService, CategoryService>(new PerResolveLifetimeManager())
                .RegisterType<ICategoryTranslationService, CategoryTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<IitemService, ItemService>(new PerResolveLifetimeManager())
                .RegisterType<IitemTranslationService, ItemTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<IRestaurantAdminService, RestaurantAdminService>(new PerResolveLifetimeManager())
                .RegisterType<IManageStorage, ManageStorage>(new PerResolveLifetimeManager())
                .RegisterType<IRefreshTokenService, RefreshTokenService>(new PerResolveLifetimeManager())
                .RegisterType<ISizeService, SizeService>(new PerResolveLifetimeManager())
                .RegisterType<ISizeTranslationService, SizeTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<ISideItemService, SideItemService>(new PerResolveLifetimeManager())
                .RegisterType<ISideItemTranslationService, SideItemTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<IItemSideItemService, ItemSideItemService>(new PerResolveLifetimeManager())
                .RegisterType<IItemSizeService, ItemSizeService>(new PerResolveLifetimeManager())
                .RegisterType<IRestaurantWaiterService, RestaurantWaiterService>(new PerResolveLifetimeManager())
                .RegisterType<IBackgroundService, BackgroundService>(new PerResolveLifetimeManager())
                .RegisterType<ITemplateService, TemplateService>(new PerResolveLifetimeManager())
                .RegisterType<IPageService, PageService>(new PerResolveLifetimeManager())
                .RegisterType<IBranchService, BranchService>(new PerResolveLifetimeManager())
                .RegisterType<IBranchTranslationService, BranchTranslationService>(new PerResolveLifetimeManager())
                .RegisterType<IGlobalAdminService, GlobalAdminService>(new PerResolveLifetimeManager())
                .RegisterType<IPackageService, PackageService>(new PerResolveLifetimeManager())
                .RegisterType<IFeedBackService, FeedBackService>(new PerResolveLifetimeManager());
        }
    }

}
