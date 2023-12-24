using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection ApplicationService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(opstions =>{
opstions.UseSqlite(configuration.GetConnectionString("Defaultconnection"));
});

   services.AddScoped<ITokenService,TokenService>();

   services.AddScoped<IUserRepository,UserRepository>();
   services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

return services;
        }
    }
}