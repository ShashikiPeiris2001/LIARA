/*using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Your React app URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Register the database context with the connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<LiaraDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add Identity services with Entity Framework
builder.Services.AddIdentityCore<User>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    options.Password.RequireDigit = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 0;

    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    options.User.AllowedUserNameCharacters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-._@+";
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<LiaraDbContext>()
.AddDefaultTokenProviders();
builder.Services.AddDataProtection();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(); // Apply the CORS policy
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
*/

//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.DependencyInjection;
//using Newtonsoft.Json;
//using Microsoft.EntityFrameworkCore;
//using WebApplication1.Models;
//using Microsoft.AspNetCore.Authentication.JwtBearer;

//var builder = WebApplication.CreateBuilder(args);


//// Add services to the container.
//builder.Services.AddControllers()
//    .AddNewtonsoftJson(options =>
//    {
//        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
//    });
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.Authority = "https://your-identity-server";
//    options.Audience = "your-api";
//    // … other JWT options …
//});
//builder.Services.AddAuthorization();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
//    {
//        Title = "My API",
//        Version = "v1"
//    });
//});


//// ✅ Ensure configuration is available in the service container
//var configuration = builder.Configuration;
//builder.Services.AddSingleton<IConfiguration>(configuration);

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll",
//        policy => policy.AllowAnyOrigin()  // Allow requests from any origin
//                        .AllowAnyMethod()  // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
//                        .AllowAnyHeader()); // Allow all headers
//});

//// Register the database context with the connection string
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//builder.Services.AddDbContext<LiaraDbContext>(options =>
//    options.UseSqlServer(connectionString));

//builder.Services.AddDataProtection();

////builder.Services.AddDistributedMemoryCache(); // ✅ Add this line
////builder.Services.AddSession();             // Already present



//builder.WebHost.UseWebRoot("wwwroot");


//var app = builder.Build();
//app.UseRouting();
////app.UseSession(); // should be before UseAuthorization and UseEndpoints
//app.UseAuthentication();
//app.UseAuthorization();

//app.MapControllers();

//app.UseCors("AllowAll");

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseDeveloperExceptionPage(); // 🔥 Add this line
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

////app.UseCors(MyAllowSpecificOrigins); // Apply the CORS policy
//app.UseHttpsRedirection();


//app.MapControllers();

//app.Run();

// Program.cs
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

var builder = WebApplication.CreateBuilder(args);

// 1) Add your DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<LiaraDbContext>(options =>
    options.UseSqlServer(connectionString));

// 2) Controllers + Newtonsoft settings
builder.Services.AddControllers()
    .AddNewtonsoftJson(opts =>
        opts.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

// 3) Configure JWT-Bearer as the default scheme
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)    // ← sets both DefaultAuthenticate & DefaultChallenge
    .AddJwtBearer(options =>
    {
        options.Authority = "https://your-identity-server";
        options.Audience = "your-api";
        // … any other JWT options …
    });

// 4) Authorization (for [Authorize] to work)
builder.Services.AddAuthorization();

// 5) CORS policy
builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AllowAll", p => p
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

// 6) Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "My API", Version = "v1" });
});

var app = builder.Build();

// 7) Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseCors("AllowAll");

app.UseAuthentication();   // ← MUST come before UseAuthorization
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
