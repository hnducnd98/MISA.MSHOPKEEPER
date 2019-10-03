namespace MISA.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("OutwardType")]
    public partial class OutwardType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OutwardType()
        {
            Outwards = new HashSet<Outward>();
        }

        public Guid OutwardTypeID { get; set; }

        [Required]
        [StringLength(50)]
        public string OutwardTypeCode { get; set; }

        [Required]
        [StringLength(500)]
        public string OutwardTypeName { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outward> Outwards { get; set; }
    }
}
