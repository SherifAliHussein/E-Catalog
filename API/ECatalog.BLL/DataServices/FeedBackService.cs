using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.BLL.DTOs;
using ECatalog.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;

namespace ECatalog.BLL.DataServices
{
    public class FeedBackService:Service<FeedBack>,IFeedBackService
    {
        public FeedBackService(IRepositoryAsync<FeedBack> repository):base(repository)
        {
            _repository = repository;
        }

        public PagedResultsDto GetAllFeedBack(long restaurantId, int page, int pageSize)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => x.RestaurantId == restaurantId).Select().Count();
            List<FeedBack> feedBacks;
            if (pageSize > 0)
                feedBacks = _repository.Query(x => x.RestaurantId == restaurantId).Select()
                    .OrderByDescending(x => x.CreateTime).Skip((page - 1) * pageSize)
                    .Take(pageSize).ToList();
            else
                feedBacks = _repository.Query(x => x.RestaurantId == restaurantId).Select()
                    .OrderByDescending(x => x.CreateTime).ToList();
            results.Data = Mapper.Map<List<FeedBackDto>>(feedBacks);
            return results;
        }
    }
}
