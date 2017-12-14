using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECatalog.BLL.DTOs;
using ECatalog.DAL.Entities.Model;
using Service.Pattern;

namespace ECatalog.BLL.DataServices.Interfaces
{
    public interface IRestaurantTranslationService:IService<RestaurantTranslation>
    {
        bool CheckRestaurantNameExist(string restaurantName, string language, long restaurantId, long userId);
        RestaurantTranslation GetRestaurantTranslation(string language, long restaurantId);
        PagedResultsDto GetAllRestaurant(string language, int page, int pageSize, long userId);
        bool CheckRestaurantByLanguage(long restaurantAdminId, string language);
    }
}
