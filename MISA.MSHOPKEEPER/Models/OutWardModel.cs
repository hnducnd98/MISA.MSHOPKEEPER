using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.MSHOPKEEPER.Models
{
    public class OutWardModel
    {
        public OutWardModel()
        {
            ID = Guid.NewGuid();
        }
        public Guid ID { get; set; }
        public string TimeOutWard { get; set; }
        public string DateOutWard { get; set; }
        public string CodeOutWard { get; set; }
        public Guid IDObject { get; set; }
        public string DeliverOutWard { get; set; }
        public string TotalMoney { get; set; }
        public string Explain { get; set; }
        public string TypeOutWard { get; set; }

        public static List<OutWardModel> outWards = new List<OutWardModel>()
        {
            new OutWardModel(){ ID =new Guid("f1fd5ca3-d33a-4a2c-b2c2-31f298c433ca"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Nguyễn Thị Thu Ngân",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000001",TypeOutWard="Phiếu xuất kho kiểm kê",TotalMoney="10.560.560",IDObject=new Guid("2120099b-246f-4aad-aa3a-ec078775bc12"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("d388b7c8-0e11-4956-845e-1fa1f4e70e8f"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Nguyễn Văn Anh",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000002",TypeOutWard="Phiếu xuất kho điều chuyển sang cửa hàng khác",TotalMoney="10.243.560",IDObject=new Guid("0400e62c-6138-47f8-ab4d-439c63d1f40f"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("39bd7d66-566f-429d-ba85-85467066e6fa"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Trần Văn Bắc",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000003",TypeOutWard="Phiếu trả lại hàng mua - Giảm trừ công nợ",TotalMoney="10.567.560",IDObject=new Guid("9828500c-7520-47ce-bc7b-ab2e37ca7e6a"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("42d5c202-b3ca-405b-a164-13e2a7d7264f"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Trương Thị Nam",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000004",TypeOutWard="Phiếu trả lại hàng mua - Tiền mặt",TotalMoney="10.560.560",IDObject=new Guid("2120099b-246f-4aad-aa3a-ec078775bc12"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("736942a0-8c93-4e0e-adc5-2787138a49bd"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Nguyễn Hải Tây",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000005",TypeOutWard="Phiếu trả lại hàng mua - Tiền gửi",TotalMoney="10.760.560",IDObject=new Guid("0400e62c-6138-47f8-ab4d-439c63d1f40f"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("40703557-75b6-4450-9949-5719bf9f26f5"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Trần Văn Tiến",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000006",TypeOutWard="Phiếu trả lại hàng mua - Tiền mặt",TotalMoney="10.560.560",IDObject=new Guid("9828500c-7520-47ce-bc7b-ab2e37ca7e6a"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("e07045bf-7ed1-4883-a9f6-959532357355"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Trần Văn Tiến",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000007",TypeOutWard="Phiếu trả lại hàng mua - Tiền mặt",TotalMoney="10.124.560",IDObject=new Guid("9828500c-7520-47ce-bc7b-ab2e37ca7e6a"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("aa0777ff-c46e-420b-becf-512bafe6ade6"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Trần Văn Tiến",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000008",TypeOutWard="Phiếu trả lại hàng mua - Tiền gửi",TotalMoney="10.560.560",IDObject=new Guid("9828500c-7520-47ce-bc7b-ab2e37ca7e6a"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("1030b150-2839-432e-8208-85017ed3ca07"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Trần Văn Tiến",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000009",TypeOutWard="Phiếu trả lại hàng mua - Tiền mặt",TotalMoney="10.560.658",IDObject=new Guid("9828500c-7520-47ce-bc7b-ab2e37ca7e6a"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("8f281986-c7ed-4d63-8406-3c5f6bece544"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Nguyễn Thị Thu Ngân",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000010",TypeOutWard="Phiếu xuất kho khác",TotalMoney="10.650.560",IDObject=new Guid("2120099b-246f-4aad-aa3a-ec078775bc12"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("73ed6390-426c-48d9-937b-56702fcf986e"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Nguyễn Thị Thu Ngân",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000011",TypeOutWard="Phiếu xuất kho khác",TotalMoney="10.560.560",IDObject=new Guid("2120099b-246f-4aad-aa3a-ec078775bc12"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("97cd4bd9-af3d-4e42-ba55-1009a6320d16"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Nguyễn Thị Thu Ngân",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000012",TypeOutWard="Phiếu xuất kho điều chuyển sang cửa hàng khác",TotalMoney="10.560.560",IDObject=new Guid("2120099b-246f-4aad-aa3a-ec078775bc12"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("384fdceb-8b88-4b17-8f0f-94aefedb0482"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Nguyễn Thị Thu Ngân",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000013",TypeOutWard="Phiếu xuất kho điều chuyển sang cửa hàng khác",TotalMoney="10.560.560",IDObject=new Guid("2120099b-246f-4aad-aa3a-ec078775bc12"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("8c7579f7-7cb7-4932-af47-cde0d553c104"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Nguyễn Thị Thu Ngân",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000014",TypeOutWard="Phiếu xuất kho bán hàng",TotalMoney="10.560.769",IDObject=new Guid("2120099b-246f-4aad-aa3a-ec078775bc12"),Explain="Chi tiền mua vật liệu xây dựng"},
            new OutWardModel(){ ID =new Guid("89161864-a762-4c4b-a4d1-3a1538106aea"),TimeOutWard=DateTime.Now.ToString("HH:mm"),DeliverOutWard="Nguyễn Thị Thu Ngân",DateOutWard=DateTime.Now.ToString("dd/MM/yyyy"),CodeOutWard="NTTK000015",TypeOutWard="Phiếu trả lại hàng mua - Tiền gửi",TotalMoney="10.560.324",IDObject=new Guid("2120099b-246f-4aad-aa3a-ec078775bc12"),Explain="Chi tiền mua vật liệu xây dựng"},
        };
    }
}