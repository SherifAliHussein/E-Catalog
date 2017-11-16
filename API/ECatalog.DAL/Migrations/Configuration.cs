using ECatalog.Common;
using ECatalog.DAL.Entities.Model;

namespace ECatalog.DAL.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ECatalog.DAL.Entities.ECatalogContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            //AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(ECatalog.DAL.Entities.ECatalogContext context)
        {
            context.Users.Add(new User
            {
                IsDeleted = false,
                Password = "wArilz/QIT55GuLgpRQlCHX0lir/WTXM8yc33MPiN3Bl26dnvS752gHPadYZoL20",
                UserName = "Sherif",
                Role = Enums.RoleType.GlobalAdmin
            });
            //context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 1
            //});
            //context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 2
            //}); context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 3
            //}); context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 4
            //}); context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 5
            //}); context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 6
            //}); context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 7
            //}); context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 8
            //}); context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 9
            //}); context.Backgrounds.Add(new Background
            //{
            //    IsDeleted = false,
            //    IsActive = true,
            //    BackgroundId = 10
            //});
            //context.Users.Add(new RestaurantWaiter()
            //{
            //    IsDeleted = false,
            //    Password = "wArilz/QIT55GuLgpRQlCHX0lir/WTXM8yc33MPiN3Bl26dnvS752gHPadYZoL20",
            //    UserName = "devWaiter",
            //    Role = Enums.RoleType.Waiter
            //});
        }
    }
}
