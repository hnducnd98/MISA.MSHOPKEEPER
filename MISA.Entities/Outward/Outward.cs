namespace MISA.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Outward")]
    public partial class Outward
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Outward()
        {
            OutwardDetails = new HashSet<OutwardDetail>();
        }

        public Guid OutwardID { get; set; }

        [Required]
        [StringLength(50)]
        public string OutwardCode { get; set; }

        public Guid OutwardAccountID { get; set; }

        public Guid OutwardTypeID { get; set; }

        [StringLength(500)]
        public string OutwardDescription { get; set; }

        public decimal OutwardTotalMoney { get; set; }

        public DateTime OutwardCreatedDate { get; set; }

        public Guid? OutwardCreatedBy { get; set; }

        public virtual Account Account { get; set; }

        public virtual Account Account1 { get; set; }

        public virtual OutwardType OutwardType { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutwardDetail> OutwardDetails { get; set; }
    }
}
