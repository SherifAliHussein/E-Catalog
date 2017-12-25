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
            AutomaticMigrationDataLossAllowed = true;
        }   

        protected override void Seed(ECatalog.DAL.Entities.ECatalogContext context)
        {
            //var r= context.Users.Find(1);
            // r.Password =  "sF2rhreY13MaVWANerqTgpBjKmSiRkU7oU4zHYM/niU=";
            // context.SaveChanges();
            //context.Users.Add(new User
            //{
            //    IsDeleted = false,
            //    Password = "wArilz/QIT55GuLgpRQlCHX0lir/WTXM8yc33MPiN3Bl26dnvS752gHPadYZoL20",
            //    UserName = "admin",
            //    Role = Enums.RoleType.GlobalAdmin
            //});
            context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 1
            });
            context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 2
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 3
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 4
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 5
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 6
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 7
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 8
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 9
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 10
            });
            context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 11
            });
            context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 12
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 13
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 14
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 15
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 16
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 17
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 18
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 19
            }); context.Backgrounds.Add(new Background
            {
                IsDeleted = false,
                IsActive = true,
                BackgroundId = 20
            });

            context.Templates.Add(new Template
            {
                Id = 1,
                ItemCount = 3
            });
            context.Templates.Add(new Template
            {
                Id = 2,
                ItemCount = 4
            });
            context.Templates.Add(new Template
            {
                Id = 3,
                ItemCount = 2
            });
            context.Templates.Add(new Template
            {
                Id = 4,
                ItemCount = 5
            });
            //context.Users.Add(new RestaurantWaiter()
            //{
            //    IsDeleted = false,
            //    Password = "wArilz/QIT55GuLgpRQlCHX0lir/WTXM8yc33MPiN3Bl26dnvS752gHPadYZoL20",
            //    UserName = "devWaiter",
            //    Role = Enums.RoleType.Waiter
            //});


            //context.Templates.Add(new Template()
            //{
            //    Id = 1,
            //    ItemCount = 3
            //});

            //context.Packages.Add(new Package()
            //{
            //    GlobalAdminId = 1,
            //    MaxNumberOfWaiters = 10,
            //    PackageGuid = Guid.NewGuid(),
            //    Start = DateTime.Now,
            //    End = DateTime.Now.AddMonths(1)
            //});
        }
    }
}
