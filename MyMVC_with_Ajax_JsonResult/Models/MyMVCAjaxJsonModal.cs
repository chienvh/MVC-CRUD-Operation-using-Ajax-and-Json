namespace MyMVC_with_Ajax_JsonResult.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class MyMVCAjaxJsonModal : DbContext
    {
        public MyMVCAjaxJsonModal()
            : base("name=MyMVCAjaxJsonModal")
        {
        }

        public virtual DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
