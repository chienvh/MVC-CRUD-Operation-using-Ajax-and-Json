using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MyMVC_with_Ajax_JsonResult.Models;
using System.Data.Entity;

namespace MyMVC_with_Ajax_JsonResult.Controllers
{
    public class ProductController : Controller
    {
        MyMVCAjaxJsonModal _dbContext;
        public ProductController()
        {
            _dbContext = new Models.MyMVCAjaxJsonModal();
        }

        // GET: Products
        public ActionResult Index()
        {
            return View();
        }

        // Get Products list
        public ActionResult GetProducts()
        {
            var tblProducts = _dbContext.Products.ToList();

            return Json(tblProducts, JsonRequestBehavior.AllowGet);
        }

        // Get product by id
        public ActionResult Get(int id)
        {
            var product = _dbContext.Products.ToList().Find(x => x.Id == id);
            return Json(product, JsonRequestBehavior.AllowGet);
        }

        // Create a new product
        [HttpPost]
        public ActionResult Create([Bind(Exclude = "Id")] Product product)
        {
            if (ModelState.IsValid)
            {
                _dbContext.Products.Add(product);
                _dbContext.SaveChanges();
            }

            return Json(product, JsonRequestBehavior.AllowGet);
        }

        // Update product
        [HttpPost]
        public ActionResult Update(Product product)
        {
            if (ModelState.IsValid)
            {
                _dbContext.Entry(product).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }

            return Json(product, JsonRequestBehavior.AllowGet);
        }

        // Delete product by id
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var product = _dbContext.Products.ToList().Find(x => x.Id == id);
            if (product != null)
            {
                _dbContext.Products.Remove(product);
                _dbContext.SaveChanges();
            }

            return Json(product, JsonRequestBehavior.AllowGet);
        }
    }
}
