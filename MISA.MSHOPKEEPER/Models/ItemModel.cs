using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.MSHOPKEEPER.Models
{
    public class ItemModel
    {
        public Guid IDItem { get; set; }
        public string CodeItem { get; set; }
        public string NameItem { get; set; }
        public string WardItem { get; set; }
        public string UnitItem { get; set; }
        public string PriceItem { get; set; }

        public static List<ItemModel> itemModels = new List<ItemModel>(){
            new ItemModel(){IDItem=new Guid("810d750f-cf04-4c5c-a324-241938940132"),CodeItem="G01",NameItem="Giày đen 35",WardItem="Kho cửa hàng Duy Tân",UnitItem="Đôi",PriceItem="400.000"},
            new ItemModel(){IDItem=new Guid("ae8923b4-6043-40df-b9bf-bea40e2f1564"),CodeItem="G02",NameItem="Giày đen 36",WardItem="Kho cửa hàng Thanh Xuân",UnitItem="Đôi",PriceItem="400.000"},
            new ItemModel(){IDItem=new Guid("af4e390b-8d54-407d-ae2c-8f1413b27465"),CodeItem="G03",NameItem="Giày đen 37",WardItem="Kho cửa hàng Hoàng Mai",UnitItem="Đôi",PriceItem="400.000"},
            new ItemModel(){IDItem=new Guid("d1842be1-97c5-436b-853e-e81e8e83437f"),CodeItem="G04",NameItem="Giày đen 38",WardItem="Kho cửa hàng Thanh Trì",UnitItem="Đôi",PriceItem="400.000"},
            new ItemModel(){IDItem=new Guid("1d81cd50-cef6-4e34-8b9c-7f5c8d91dd61"),CodeItem="G05",NameItem="Giày đen 39",WardItem="Kho cửa hàng Cầu Giấy",UnitItem="Đôi",PriceItem="600.000"},
            new ItemModel(){IDItem=new Guid("f30ff9fc-4e0d-4c4f-b670-6d626a7d560f"),CodeItem="G06",NameItem="Giày đen 40",WardItem="Kho cửa hàng Nam Từ Liêm",UnitItem="Đôi",PriceItem="600.000"},
            new ItemModel(){IDItem=new Guid("fd13942b-3fb5-40fb-aeaf-4f6758f32c6d"),CodeItem="G07",NameItem="Giày đen 41",WardItem="Kho cửa hàng Bắc Từ Liêm",UnitItem="Đôi",PriceItem="600.000"},
            new ItemModel(){IDItem=new Guid("83c7919c-b016-4cbc-90fe-bb94ae9905cd"),CodeItem="G08",NameItem="Giày đen 42",WardItem="Kho cửa hàng Sóc Sơn",UnitItem="Đôi",PriceItem="600.000"}
        };
    }
}