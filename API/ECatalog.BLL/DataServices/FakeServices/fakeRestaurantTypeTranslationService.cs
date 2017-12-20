using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.DAL.Entities;
using ECatalog.DAL.Entities.Model;
using Service.Pattern;

namespace ECatalog.BLL.DataServices.FakeServices
{
    public class fakeRestaurantTypeTranslationService:Service<RestaurantTypeTranslation>,IRestaurantTypeTranslationService
    {
        private fakeData dbFakeData;

        public fakeRestaurantTypeTranslationService()
        {
            dbFakeData = new fakeData();
        }
        public bool CheckRepeatedType(string typeName, string language, long restaurantTypeId, long userId)
        {
            var restaurantTypeTranslations = dbFakeData._RestaurantTypeTranslations
                .Where(x => x.Language.ToLower() == language.ToLower() &&
                            x.TypeName.ToLower() == typeName.ToLower() &&
                            !x.RestaurantType.IsDeleted && x.RestaurantTypeId != restaurantTypeId && x.RestaurantType.GlobalAdminId == userId).ToList();
            return restaurantTypeTranslations.Count > 0;
        }

        public List<RestaurantTypeTranslation> GeRestaurantTypeTranslation(string language, long userId)
        {

            return dbFakeData._RestaurantTypeTranslations.Where(x => x.Language.ToLower() == language.ToLower() && x.RestaurantType.GlobalAdminId == userId).ToList();
        }

        public override void InsertRange(IEnumerable<RestaurantTypeTranslation> entities)
        {
            dbFakeData._RestaurantTypeTranslations.AddRange(entities);
        }

       
    }
}
