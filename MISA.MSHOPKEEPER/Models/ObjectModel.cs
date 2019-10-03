using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.MSHOPKEEPER.Models
{
    public class ObjectModel
    {
        public Guid ID { get; set; }
        public string CodeObject { get; set; }
        public string NameObject { get; set; }
        public string TypeObject { get; set; }
        public string AddressObject { get; set; }

        public static List<ObjectModel> objects = new List<ObjectModel>()
        {
            new ObjectModel(){ ID =new Guid("2120099b-246f-4aad-aa3a-ec078775bc12"),CodeObject="NCC000001",NameObject="Nguyễn Ngọc Khánh",TypeObject="Nhà cung cấp",AddressObject="Hà Nội"},
            new ObjectModel(){ ID =new Guid("768e9638-3201-45eb-b1be-031deb1867a9"),CodeObject="NCC000002",NameObject="Ngô Hoàng Thái",TypeObject="Nhà cung cấp",AddressObject="An Giang"},
            new ObjectModel(){ ID =new Guid("8f6d3f11-2600-41d0-a914-7bdfdaf211dd"),CodeObject="NCC000003",NameObject="Nguyễn Xuân Phong",TypeObject="Nhà cung cấp",AddressObject="15 Duy Tân"},
            new ObjectModel(){ ID =new Guid("9828500c-7520-47ce-bc7b-ab2e37ca7e6a"),CodeObject="NCC000004",NameObject="Nguyễn Thùy Linh",TypeObject="Nhà cung cấp",AddressObject="Hà Nội"},
            new ObjectModel(){ ID =new Guid("af8ff6e6-bf49-4b5d-b04e-fe15b111272f"),CodeObject="KH000001",NameObject="Lưu Phi Long",TypeObject="Khách hàng",AddressObject="Bạch Mai"},
            new ObjectModel(){ ID =new Guid("aa1f4986-f6d7-4c06-a44d-efa2fdfc9687"),CodeObject="KH000002",NameObject="Khánh",TypeObject="Khách hàng"},
            new ObjectModel(){ ID =new Guid("296ded5d-eb84-4da7-a884-7fa809ef5576"),CodeObject="KH000003",NameObject="Trần Quang Trung",TypeObject="Khách hàng",AddressObject="Bạch Mai"},
            new ObjectModel(){ ID =new Guid("4529310a-579e-4c18-ab2f-00a43a627fed"),CodeObject="namph.misa",NameObject="Phan Hồng Nam",TypeObject="Nhân viên"},
            new ObjectModel(){ ID =new Guid("e28565b7-db60-460e-b50f-6be15f3b20ef"),CodeObject="NV000001",NameObject="Nguyễn Xuân Phong",TypeObject="Nhân viên"},
            new ObjectModel(){ ID =new Guid("0a2d5596-16bf-46f7-bb04-ae8e050c8a0f"),CodeObject="NV000002",NameObject="Nguyễn Văn Sơn",TypeObject="Nhân viên"},
            new ObjectModel(){ ID =new Guid("0400e62c-6138-47f8-ab4d-439c63d1f40f"),CodeObject="NV000003",NameObject="Phan Hồng Nam",TypeObject="Nhân viên"}
        };
    }
}