namespace MISA.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Stock")]
    public partial class Stock
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Stock()
        {
            OutwardDetails = new HashSet<OutwardDetail>();
        }

        public Guid StockID { get; set; }

        [Required]
        [StringLength(50)]
        public string StockCode { get; set; }

        [Required]
        [StringLength(500)]
        public string StockName { get; set; }

        [Required]
        [StringLength(500)]
        public string StockAddress { get; set; }

        [StringLength(50)]
        public string StockPhone { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutwardDetail> OutwardDetails { get; set; }
    }
}
