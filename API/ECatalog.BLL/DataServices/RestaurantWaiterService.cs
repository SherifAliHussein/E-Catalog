﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.BLL.DTOs;
using ECatalog.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;
using AutoMapper;

namespace ECatalog.BLL.DataServices
{
    public class RestaurantWaiterService:Service<RestaurantWaiter>,IRestaurantWaiterService
    {
        public RestaurantWaiterService(IRepositoryAsync<RestaurantWaiter> repository):base(repository)
        {
            
        }
        public bool CheckUserNameDuplicated(string userName, long restaurantId)
        {
            return _repository.Queryable().Any(u => u.UserName.ToLower() == userName.ToLower() && u.RestaurantId != restaurantId && !u.IsDeleted);
        }
        public PagedResultsDto GetAllRestaurantWaiters(long restaurantId, int page, int pageSize,string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => !x.IsDeleted && x.RestaurantId == restaurantId ).Select().Count();
            var waiters = _repository
                .Query(x => !x.IsDeleted && x.RestaurantId == restaurantId).Select()
                .OrderBy(x => x.RestaurantId).Skip((page - 1) * pageSize)
                .Take(pageSize).ToList();
            results.Data = Mapper.Map<List<RestaurantWaiter>, List<RestaurantWaiterDTO>>(waiters, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (RestaurantWaiter waiter in src)
                        {
                            waiter.Branch.BranchTranslations = waiter.Branch.BranchTranslations
                                .Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
    }
}
