using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ECatalog.BLL.DataServices.Interfaces;
using ECatalog.BLL.DTOs;
using ECatalog.BLL.Services.Interfaces;
using ECatalog.BLL.Services.ManageStorage;
using ECatalog.Common;
using ECatalog.Common.CustomException;
using ECatalog.DAL.Entities.Model;
using Repository.Pattern.UnitOfWork;

namespace ECatalog.BLL.Services
{
    public class BackgroundFacade : BaseFacade, IBackgroundFacade
    {
        private readonly IBackgroundService _backgroundService;
        private readonly IManageStorage _manageStorage;

        public BackgroundFacade(IBackgroundService backgroundService, IManageStorage manageStorage, IUnitOfWorkAsync unitOfWork) : base(unitOfWork)
        {
            _backgroundService = backgroundService;
            _manageStorage = manageStorage;
        }

        public BackgroundFacade(IBackgroundService backgroundService, IManageStorage manageStorage)
        {
            _backgroundService = backgroundService;
            _manageStorage = manageStorage;
        }

        public void AddBackground(BackgroundDto backgroundDto, string path)
        {
            var background = Mapper.Map<Background>(backgroundDto);
            _backgroundService.Insert(background);
            SaveChanges();
              _manageStorage.UploadImage(path + "\\"  + "Background" , backgroundDto.Image, background.BackgroundId);
        }

        public BackgroundDto GetBackground(long backgroundId)
        {
            var background = _backgroundService.Find(backgroundId);
            if (background == null) throw new NotFoundException(ErrorCodes.BackgroundNotFound);
            if (background.IsDeleted) throw new NotFoundException(ErrorCodes.BackgroundDeleted);
            return Mapper.Map<Background, BackgroundDto>(background);
        }

        public PagedResultsDto GetAllBackgrounds(int page, int pageSize)
        {
            var backgroundObj = _backgroundService.GetAllBackgrounds(page, pageSize);
            if (backgroundObj == null) throw new NotFoundException(ErrorCodes.BackgroundNotFound);
            var results = backgroundObj;
            return results;
        }

        public PagedResultsDto GetActivatedBackgroundByUserId(long userId, int page, int pageSize)
        {
            var backgroundObj = _backgroundService.Find(userId);
            if (backgroundObj == null) throw new NotFoundException(ErrorCodes.BackgroundNotFound);
            if (backgroundObj.IsDeleted) throw new ValidationException(ErrorCodes.BackgroundDeleted);
            var results = _backgroundService.GetActivatedBackgroundByUserId(userId,page, pageSize);
            return results;
        }

        public void ActivateBackground(long backgroundId)
        {
            var background = _backgroundService.Find(backgroundId);
            if (background == null) throw new NotFoundException(ErrorCodes.MenuNotFound); 

            background.IsActive = true;
            _backgroundService.Update(background);
            SaveChanges();
        }

        public void DeActivateBackground(long backgroundId)
        {
            var background = _backgroundService.Find(backgroundId);
            if (background == null) throw new NotFoundException(ErrorCodes.BackgroundNotFound);
            background.IsActive = false;
            _backgroundService.Update(background);
            SaveChanges();
        }
        public void DeleteBackground(long backgroundId)
        {
            var background = _backgroundService.Find(backgroundId);
            if (background == null) throw new NotFoundException(ErrorCodes.BackgroundNotFound);
            background.IsDeleted = true;
            background.IsActive = false;
            _backgroundService.Update(background);

            SaveChanges();
        }

        public void UpdateBackground(BackgroundDto backgroundDto, string path)
        {
            var background = _backgroundService.Find(backgroundDto.BackgroundId);
            if (background == null) throw new NotFoundException(ErrorCodes.BackgroundNotFound);
             
            _backgroundService.Update(background);
            SaveChanges();
            if (backgroundDto.IsImageChange)
                _manageStorage.UploadImage(path + "\\" + "Background", backgroundDto.Image, background.BackgroundId); 
        }
    }
}
