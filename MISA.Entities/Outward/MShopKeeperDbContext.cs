namespace MISA.Entities
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class MShopKeeperDbContext : DbContext
    {
        public MShopKeeperDbContext()
            : base("name=MShopKeeperDbContext")
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Outward> Outwards { get; set; }
        public virtual DbSet<OutwardDetail> OutwardDetails { get; set; }
        public virtual DbSet<OutwardType> OutwardTypes { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<Stock> Stocks { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .HasMany(e => e.Outwards)
                .WithRequired(e => e.Account)
                .HasForeignKey(e => e.OutwardAccountID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Account>()
                .HasMany(e => e.Outwards1)
                .WithOptional(e => e.Account1)
                .HasForeignKey(e => e.OutwardCreatedBy);

            modelBuilder.Entity<Outward>()
                .Property(e => e.OutwardTotalMoney)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Outward>()
                .HasMany(e => e.OutwardDetails)
                .WithRequired(e => e.Outward)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<OutwardDetail>()
                .Property(e => e.Price)
                .HasPrecision(18, 0);

            modelBuilder.Entity<OutwardType>()
                .HasMany(e => e.Outwards)
                .WithRequired(e => e.OutwardType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.ProductPrice)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Product>()
                .HasMany(e => e.OutwardDetails)
                .WithRequired(e => e.Product)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ProductCategory>()
                .HasMany(e => e.Products)
                .WithRequired(e => e.ProductCategory)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Stock>()
                .HasMany(e => e.OutwardDetails)
                .WithRequired(e => e.Stock)
                .WillCascadeOnDelete(false);
        }
    }
}
