namespace MISA.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Product")]
    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            OutwardDetails = new HashSet<OutwardDetail>();
        }

        public Guid ProductID { get; set; }

        [Required]
        [StringLength(50)]
        public string ProductCode { get; set; }

        [Required]
        [StringLength(500)]
        public string ProductName { get; set; }

        public Guid ProductCategoryID { get; set; }

        [StringLength(200)]
        public string ProductSize { get; set; }

        [StringLength(200)]
        public string ProductColor { get; set; }

        public decimal ProductPrice { get; set; }

        [Required]
        [StringLength(50)]
        public string ProductUnit { get; set; }

        public DateTime? ProductCreatedDate { get; set; }

        [StringLength(500)]
        public string ProductImage { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OutwardDetail> OutwardDetails { get; set; }

        public virtual ProductCategory ProductCategory { get; set; }
    }
}
