using System.Web;
using System.Web.Mvc;

namespace MyMVC_with_Ajax_JsonResult
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
