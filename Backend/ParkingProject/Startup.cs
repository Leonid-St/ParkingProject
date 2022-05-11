using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ParkingProject.Database;
// using  ParkingProject.Hubs;
using ParkingProject.Services;

namespace ParkingProject
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();

            services.AddDbContext<ApplicationContext>();

            services.AddIdentity<User, Role>(options =>
                {
                  /*  TODO если нужна настройка пороля
                   *  options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequiredLength = 5;*/
                }).AddEntityFrameworkStores<ApplicationContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["AuthSettings:Audience"],
                    ValidIssuer = Configuration["AuthSettings:Issuer"],
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    IssuerSigningKey =
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["AuthSettings:Key"])),
                    ValidateIssuerSigningKey = true
                };
                options.RequireHttpsMetadata = false;
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        // если запрос направлен хабу
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            (path.StartsWithSegments("/RoomHub")))
                        {
                            // получаем токен из строки запроса
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });
            services.AddScoped<IUserService, UserService>();


            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                /*
                                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                                {
                                    Description = "JWT Authorization header",
                                    Name = "Authorization",
                                    In = ParameterLocation.Header,
                                    Type = SecuritySchemeType.ApiKey,
                                    Scheme = "Bearer"
                                });
                                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                                    {
                                        {
                                            new OpenApiSecurityScheme
                                            {
                                                Reference = new OpenApiReference
                                                {
                                                    Type = ReferenceType.SecurityScheme,
                                                    Id = "Bearer"
                                                },
                                                Scheme = "oauth2",
                                                Name = "Bearer",
                                                In = ParameterLocation.Header,

                                            },
                                            new List<string>()
                                        }
                                    });*/
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "ParkingProject",
                    Version = "v1",
                    Description = "ParkingProject swagger API v1",
                });

            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(option =>
                {
                    option.SwaggerEndpoint("/swagger/v1/swagger.json", "ParkingProject v1");
                    option.DocumentTitle = "ParkingProject";
                    // option.RoutePrefix = "ParkingProject";
                    option.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.List);
                });
            }

            app.UseHttpsRedirection();
            //  app.UseCookiePolicy();
            app.UseRouting();
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                 // endpoints.MapHub<RoomHub>("/RoomHub");
            });
        }
    }
}