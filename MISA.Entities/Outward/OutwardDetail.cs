namespace MISA.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("OutwardDetail")]
    public partial class OutwardDetail
    {
        public Guid OutwardDetailID { get; set; }

        public Guid OutwardID { get; set; }

        public Guid ProductID { get; set; }

        public Guid StockID { get; set; }

        public int Amount { get; set; }

        public decimal? Price { get; set; }

        public DateTime? CreatedDate { get; set; }

        public virtual Outward Outward { get; set; }

        public virtual Product Product { get; set; }

        public virtual Stock Stock { get; set; }
    }
}
