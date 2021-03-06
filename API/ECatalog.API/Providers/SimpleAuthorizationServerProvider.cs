﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using ECatalog.BLL.DTOs;
using ECatalog.BLL.Services.Interfaces;
using ECatalog.Common;
using ECatalog.Common.CustomException;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Practices.ObjectBuilder2;
using Microsoft.Practices.Unity;

namespace ECatalog.API.Providers
{
    public class SimpleAuthorizationServerProvider: OAuthAuthorizationServerProvider
    {
        public override  Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();

            return Task.FromResult<object>(null);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });


            var container = (IUnityContainer)GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IUnityContainer));

            var userFacade = container.Resolve<IUserFacade>();

            // validate user credentials from the DB
            UserDto user = null;
            try
            {
                user = userFacade.ValidateUser(context.UserName, context.Password);

            }
            catch (ValidationException exception)
            {
                if (exception.ErrorCode == ErrorCodes.RestaurantIsNotActivated)
                {
                    context.SetError("restaurant deactivated", "Restaurant is not activated, please contact your admin.");
                    //Add your flag to the header of the response
                    context.Response.Headers.Add("X-Challenge",
                        new[] { ((int)HttpStatusCode.Unauthorized).ToString() });
                    return Task.FromResult<object>(null);
                }
                else if (exception.ErrorCode == ErrorCodes.PackageExpired)
                {
                    context.SetError("Package Expired", "Package is expired.");
                    //Add your flag to the header of the response
                    context.Response.Headers.Add("X-Challenge",
                        new[] { ((int)HttpStatusCode.Unauthorized).ToString() });
                    return Task.FromResult<object>(null);
                }
                else if (exception.ErrorCode == ErrorCodes.PackageNotActivated)
                {
                    context.SetError("Package Not Activated", "Package is not activated.");
                    //Add your flag to the header of the response
                    context.Response.Headers.Add("X-Challenge",
                        new[] { ((int)HttpStatusCode.Unauthorized).ToString() });
                    return Task.FromResult<object>(null);
                }
                else if ((exception.ErrorCode == ErrorCodes.GlobalAdminInactive)|| (exception.ErrorCode == ErrorCodes.BranchDeleted))
                {
                    context.SetError("Account deactivated", "Your Account is deactivated.");
                    //Add your flag to the header of the response
                    context.Response.Headers.Add("X-Challenge",
                        new[] { ((int)HttpStatusCode.Unauthorized).ToString() });
                    return Task.FromResult<object>(null);
                }
                else if (exception.ErrorCode == ErrorCodes.RestaurantDeleted)
                {
                    context.SetError("Account deleted", "Your Account is deleted.");
                    //Add your flag to the header of the response
                    context.Response.Headers.Add("X-Challenge",
                        new[] { ((int)HttpStatusCode.Unauthorized).ToString() });
                    return Task.FromResult<object>(null);
                }

            }
            catch (Exception e)
            {
                //user = new UserDto();
            }
            
            if (user == null)
            {
                context.SetError("invalid grant", "The user name or password is incorrect.");
                //Add your flag to the header of the response
                context.Response.Headers.Add("X-Challenge",
                    new[] { ((int)HttpStatusCode.Unauthorized).ToString() });
                return Task.FromResult<object>(null);
            }
            if (user.IsDeleted)
            {
                context.SetError("inactive user", "The user is deleted.");
                //Add your flag to the header of the response
                context.Response.Headers.Add("X-Challenge",
                    new[] { ((int)HttpStatusCode.Unauthorized).ToString() });
                return Task.FromResult<object>(null);
            }

            var ticket = GetAuthenticationTicket(user);
            context.Validated(ticket);
            
            return Task.FromResult<object>(null);
        }
        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            var newIdentity = new ClaimsIdentity(context.Ticket.Identity);

            var newClaim = newIdentity.Claims.FirstOrDefault(c => c.Type == "UserID");
            if (newClaim != null)
            {
                // reset existing claims collection
                newIdentity.Claims.ForEach(s => newIdentity.RemoveClaim(s));
                var container = (IUnityContainer)GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IUnityContainer));
                var userFacade = container.Resolve<IUserFacade>();

                UserDto user = userFacade.GetUser(long.Parse(newClaim.Value));
                if (user == null)
                {
                    context.SetError("Invalid grant", "The user name or password is incorrect");
                    //Add your flag to the header of the response
                    context.Response.Headers.Add("X-Challenge",
                        new[] { ((int)HttpStatusCode.Unauthorized).ToString() });
                    return Task.FromResult<object>(null);
                }
                if (user.IsDeleted)
                {
                    context.SetError("inactive user", "The user is deleted.");
                    //Add your flag to the header of the response
                    context.Response.Headers.Add("X-Challenge",
                        new[] { ((int)HttpStatusCode.Unauthorized).ToString() });
                    return Task.FromResult<object>(null);
                }
                var newTicket = GetAuthenticationTicket(user);
                context.Validated(newTicket);

            }

            return Task.FromResult<object>(null);
        }

        private AuthenticationTicket GetAuthenticationTicket(UserDto user)
        {
            var identity = new ClaimsIdentity(Strings.JWT);
            identity.AddClaim(new Claim(Strings.userName, user.UserName));
            identity.AddClaim(new Claim(Strings.userID, user.UserId.ToString()));
            identity.AddClaim(new Claim(ClaimTypes.Role, user.Role.ToString()));

            var props = new AuthenticationProperties(AuthProps(user));

            var ticket = new AuthenticationTicket(identity, props);
            return ticket;
        }
        private Dictionary<string, string> AuthProps(UserDto user)
        {
            return new Dictionary<string, string>
            {
                {
                    "UserId", user.UserId.ToString()
                },
                {
                    "Username", user.UserName
                },
                {
                    "Role", user.Role.ToString()
                }
            };
        }
    }
}