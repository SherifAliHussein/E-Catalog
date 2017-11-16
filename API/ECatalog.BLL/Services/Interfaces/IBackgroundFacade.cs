using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECatalog.BLL.DTOs;

namespace ECatalog.BLL.Services.Interfaces
{
    public interface IBackgroundFacade
    {
        void AddBackground(BackgroundDto backgroundDto, string path);
        BackgroundDto GetBackground(long backgroundId);
        PagedResultsDto GetAllBackgrounds(  int page, int pageSize);
        void ActivateBackground(long backgroundId);
        void DeActivateBackground(long backgroundId);
        void DeleteBackground(long backgroundId);
        void UpdateBackground(BackgroundDto backgroundDto, string path);
        PagedResultsDto GetActivatedBackgroundByUserId(long userId, int page, int pageSize);
    }
}
