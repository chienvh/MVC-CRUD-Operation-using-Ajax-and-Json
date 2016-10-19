using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyMVC_with_Ajax_JsonResult.Startup))]
namespace MyMVC_with_Ajax_JsonResult
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
