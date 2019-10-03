using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;

namespace MISA.Entities
{
    public class OutwardView
    {
        private readonly MShopKeeperDbContext dbContext = new MShopKeeperDbContext();

        public Guid OutwardID { get; set; }

        [Required]
        [StringLength(50)]
        public string OutwardCode { get; set; }

        public Guid OutwardAccountID { get; set; }

        public string OutwardAccountCode { get; set; }

        public string OutwardAccountName { get; set; }

        public Guid OutwardTypeID { get; set; }

        public string OutwardTypeName { get; set; }

        [StringLength(500)]
        public string OutwardDescription { get; set; }

        public decimal OutwardTotalMoney { get; set; }

        public DateTime OutwardCreatedDate { get; set; }

        public Guid? OutwardCreatedBy { get; set; }

        public string OutwardCreatedByName { get; set; }

        public OutwardView(Outward outward)
        {
            var account = dbContext.Accounts.Find(outward.OutwardAccountID);

            OutwardID = outward.OutwardID;
            OutwardCode = outward.OutwardCode;
            OutwardAccountID = outward.OutwardAccountID;
            OutwardAccountCode = account.AccountCode;
            OutwardAccountName = account.AccountName;
            OutwardTypeID = outward.OutwardTypeID;
            OutwardTypeName = dbContext.OutwardTypes.Find(outward.OutwardTypeID).OutwardTypeName;
            OutwardDescription = outward.OutwardDescription;
            OutwardTotalMoney = outward.OutwardTotalMoney;
            OutwardCreatedDate = outward.OutwardCreatedDate;
            OutwardCreatedBy = outward.OutwardCreatedBy;
            OutwardCreatedByName = dbContext.Accounts.Find(outward.OutwardCreatedBy).AccountName;
        }
    }
}
