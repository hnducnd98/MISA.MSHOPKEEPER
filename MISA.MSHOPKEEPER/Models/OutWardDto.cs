using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.MSHOPKEEPER.Models
{
    public class OutWardDto
    {
        public Guid ID { get; set; }
        public string TimeOutWard { get; set; }
        public string DateOutWard { get; set; }
        public string CodeOutWard { get; set; }
        public Guid IDObject { get; set; }
        public string TotalMoney { get; set; }
        public string Explain { get; set; }
        public string TypeOutWard { get; set; }
        public string DeliverOutWard { get; set; }

        public string CodeObject { get; set; }
        public string NameObject { get; set; }
        public string TypeObject { get; set; }
        public string AddressObject { get; set; }

        public OutWardDto(OutWardModel outward)
        {
            ID = outward.ID;
            TimeOutWard = outward.TimeOutWard;
            DateOutWard = outward.DateOutWard;
            CodeOutWard = outward.CodeOutWard;
            TotalMoney = outward.TotalMoney;
            Explain = outward.Explain;
            DeliverOutWard = outward.DeliverOutWard;
            TypeOutWard = outward.TypeOutWard;
            IDObject = outward.IDObject;
            NameObject = ObjectModel.objects.FirstOrDefault(x => x.ID == outward.IDObject).NameObject;
            CodeObject = ObjectModel.objects.FirstOrDefault(x => x.ID == outward.IDObject).CodeObject;
            TypeObject = ObjectModel.objects.FirstOrDefault(x => x.ID == outward.IDObject).TypeObject;
            AddressObject = ObjectModel.objects.FirstOrDefault(x => x.ID == outward.IDObject).AddressObject;
        }
    }
}