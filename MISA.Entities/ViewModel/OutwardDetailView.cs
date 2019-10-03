using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;

namespace MISA.Entities
{
    public class OutwardDetailView
    {
        private readonly MShopKeeperDbContext dbContext = new MShopKeeperDbContext();

        public Guid OutwardDetailID { get; set; }

        public Guid OutwardID { get; set; }

        public string OutwardCode { get; set; }

        public Guid ProductID { get; set; }

        public string ProductCode { get; set; }

        public string ProductName { get; set; }

        public decimal? ProductPrice { get; set; }

        public string ProductUnit { get; set; }

        public Guid StockID { get; set; }

        public string StockName { get; set; }

        public int Amount { get; set; }

        public decimal? Price { get; set; }

        public DateTime? CreatedDate { get; set; }

        public OutwardDetailView(OutwardDetail outwardDetail)
        {
            var product = dbContext.Products.Find(outwardDetail.ProductID);

            OutwardDetailID = outwardDetail.OutwardDetailID;
            OutwardID = outwardDetail.OutwardID;
            OutwardCode = dbContext.Outwards.Find(outwardDetail.OutwardID).OutwardCode;
            ProductID = outwardDetail.ProductID;
            ProductCode = product.ProductCode;
            ProductName = product.ProductName;
            ProductPrice = product.ProductPrice;
            ProductUnit = product.ProductUnit;
            StockID = outwardDetail.StockID;
            StockName = dbContext.Stocks.Find(outwardDetail.StockID).StockName;
            Amount = outwardDetail.Amount;
            Price = outwardDetail.Price;
            CreatedDate = outwardDetail.CreatedDate;
        }
    }
}
