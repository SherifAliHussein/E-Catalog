using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECatalog.BLL.DTOs;

namespace ECatalog.BLL.Services.Interfaces
{
    public interface IFeedBackFacade
    {
        void AddFeedBack(FeedBackDto feedBackDto, long userId);
        PagedResultsDto GetAllFeedBack(long userId, int page, int pageSize, string userRole);
    }
}
