namespace MISA.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Account")]
    public partial class Account
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Account()
        {
            Outwards = new HashSet<Outward>();
            Outwards1 = new HashSet<Outward>();
        }

        public Guid AccountID { get; set; }

        [Required]
        [StringLength(50)]
        public string AccountCode { get; set; }

        [Required]
        [StringLength(200)]
        public string AccountName { get; set; }

        [StringLength(500)]
        public string AccountAddress { get; set; }

        public Guid? AccountTypeID { get; set; }

        [StringLength(500)]
        public string AccountEmail { get; set; }

        [StringLength(50)]
        public string AccountPhone { get; set; }

        public DateTime? AccountCreatedDate { get; set; }

        [StringLength(500)]
        public string AccountImage { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outward> Outwards { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Outward> Outwards1 { get; set; }
    }
}
