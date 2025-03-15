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


using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
/*builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:300xsssxx36363636363636363636363636363636
0") // Your React app URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});*/

// ✅ Ensure configuration is available in the service container
var configuration = builder.Configuration;
builder.Services.AddSingleton<IConfiguration>(configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()  // Allow requests from any origin
                        .AllowAnyMethod()  // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                        .AllowAnyHeader()); // Allow all headers
});

//var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//        policy => policy.WithOrigins("https://localhost:5174") // React app URL
//                        .AllowAnyMethod()
//                        .AllowAnyHeader()
//                        .AllowCredentials());
//});

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//        policy => policy.WithOrigins("http://localhost:5005") // React app URL
//                        .AllowAnyMethod()
//                        .AllowAnyHeader()
//                        .AllowCredentials());
//});


// Register the database context with the connection string
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<LiaraDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddDataProtection();




builder.WebHost.UseWebRoot("wwwroot");


var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCors(MyAllowSpecificOrigins); // Apply the CORS policy
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
