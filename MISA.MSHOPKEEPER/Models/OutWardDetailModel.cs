using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.MSHOPKEEPER.Models
{
    public class OutWardDetailModel
    {
        public OutWardDetailModel()
        {
            IDOutWardDetail = Guid.NewGuid();
        }
        public Guid IDOutWardDetail { get; set; }

        public Guid IDOutWard { get; set; }
        public string PriceOutWardDetail { get; set; }
        public string AmountOutWardDetail { get; set; }
        public Guid IDItem { get; set; }

        public static List<OutWardDetailModel> outWardDetails = new List<OutWardDetailModel>()
        {
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("f1fd5ca3-d33a-4a2c-b2c2-31f298c433ca"),PriceOutWardDetail="2.000.000",AmountOutWardDetail="5",IDItem=new Guid("810d750f-cf04-4c5c-a324-241938940132")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("d388b7c8-0e11-4956-845e-1fa1f4e70e8f"),PriceOutWardDetail="2.000.000",AmountOutWardDetail="5",IDItem=new Guid("ae8923b4-6043-40df-b9bf-bea40e2f1564")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("42d5c202-b3ca-405b-a164-13e2a7d7264f"),PriceOutWardDetail="3.000.000",AmountOutWardDetail="5",IDItem=new Guid("f30ff9fc-4e0d-4c4f-b670-6d626a7d560f")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("39bd7d66-566f-429d-ba85-85467066e6fa"),PriceOutWardDetail="2.000.000",AmountOutWardDetail="5",IDItem=new Guid("d1842be1-97c5-436b-853e-e81e8e83437f")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("736942a0-8c93-4e0e-adc5-2787138a49bd"),PriceOutWardDetail="3.000.000",AmountOutWardDetail="5",IDItem=new Guid("83c7919c-b016-4cbc-90fe-bb94ae9905cd")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("40703557-75b6-4450-9949-5719bf9f26f5"),PriceOutWardDetail="2.000.000",AmountOutWardDetail="5",IDItem=new Guid("810d750f-cf04-4c5c-a324-241938940132")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("39bd7d66-566f-429d-ba85-85467066e6fa"),PriceOutWardDetail="3.000.000",AmountOutWardDetail="5",IDItem=new Guid("fd13942b-3fb5-40fb-aeaf-4f6758f32c6d")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("f1fd5ca3-d33a-4a2c-b2c2-31f298c433ca"),PriceOutWardDetail="3.000.000",AmountOutWardDetail="5",IDItem=new Guid("83c7919c-b016-4cbc-90fe-bb94ae9905cd")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("40703557-75b6-4450-9949-5719bf9f26f5"),PriceOutWardDetail="2.000.000",AmountOutWardDetail="5",IDItem=new Guid("af4e390b-8d54-407d-ae2c-8f1413b27465")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("736942a0-8c93-4e0e-adc5-2787138a49bd"),PriceOutWardDetail="3.000.000",AmountOutWardDetail="5",IDItem=new Guid("83c7919c-b016-4cbc-90fe-bb94ae9905cd")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("40703557-75b6-4450-9949-5719bf9f26f5"),PriceOutWardDetail="2.000.000",AmountOutWardDetail="5",IDItem=new Guid("d1842be1-97c5-436b-853e-e81e8e83437f")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("39bd7d66-566f-429d-ba85-85467066e6fa"),PriceOutWardDetail="3.000.000",AmountOutWardDetail="5",IDItem=new Guid("f30ff9fc-4e0d-4c4f-b670-6d626a7d560f")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("42d5c202-b3ca-405b-a164-13e2a7d7264f"),PriceOutWardDetail="2.000.000",AmountOutWardDetail="5",IDItem=new Guid("af4e390b-8d54-407d-ae2c-8f1413b27465")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("d388b7c8-0e11-4956-845e-1fa1f4e70e8f"),PriceOutWardDetail="3.000.000",AmountOutWardDetail="5",IDItem=new Guid("fd13942b-3fb5-40fb-aeaf-4f6758f32c6d")},
            new OutWardDetailModel(){IDOutWardDetail=Guid.NewGuid(),IDOutWard=new Guid("f1fd5ca3-d33a-4a2c-b2c2-31f298c433ca"),PriceOutWardDetail="2.000.000",AmountOutWardDetail="5",IDItem=new Guid("ae8923b4-6043-40df-b9bf-bea40e2f1564")},
        };
    }
}