using MISA.MSHOPKEEPER.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MISA.MSHOPKEEPER.Controllers
{
    [RoutePrefix("outwarddetail")]
    public class OutWardDetailController : ApiController
    {
        [Route("")]
        //Lấy các OutWardDetailModel từ danh sách
        // GET: api/OutWardDetail
        public IEnumerable<OutWardDetailModel> Get()
        {
            return OutWardDetailModel.outWardDetails;
        }

        [Route("{id}")]
        //Lấy 1 đối tượng OutWardDetailModel trong danh sách theo idOutWardDetail
        // GET: api/OutWardDetail/5
        public IEnumerable<OutWardDetailModel> Get(Guid id)
        {
            return OutWardDetailModel.outWardDetails.Where(x => x.IDOutWard == id);
        }

        [Route("")]
        //Thêm mới 1 list các OutWardDetailModel vào danh sách
        // POST: api/OutWardDetail
        public int Post([FromBody]List<OutWardDetailModel> outWardDetails)
        {
            foreach (var outWardDetail in outWardDetails)
            {
                try
                {
                    OutWardDetailModel.outWardDetails.Add(outWardDetail);

                }
                catch
                {
                }
            }
            return 1;
        }

        [Route("")]
        //Sửa 1 list các OutWardDetailModel trong danh sách
        // PUT: api/OutWardDetail/5
        public int Put([FromBody]List<OutWardDetailModel> outWardDetails)
        {
            var idOutWard = outWardDetails[0].IDOutWard;
            var outWardDetailsCon = new List<OutWardDetailModel>();
            outWardDetailsCon = OutWardDetailModel.outWardDetails.Where(x => x.IDOutWard == idOutWard).ToList();

            foreach (var outWardDetail in outWardDetailsCon)
            {
                OutWardDetailModel.outWardDetails.Remove(outWardDetail);
            }

            foreach (var outWardDetail in outWardDetails)
            {
                var a = OutWardDetailModel.outWardDetails.Find(x => x.IDOutWardDetail == outWardDetail.IDOutWardDetail);
                try
                {
                    //{
                    //    if (a == null)
                    //    {
                    //        outWardDetail.IDOutWardDetail = Guid.NewGuid();
                    //        OutWardDetailModel.outWardDetails.Add(outWardDetail);
                    //    }
                    //    else
                    //    {
                    //OutWardDetailModel.outWardDetails.Remove(OutWardDetailModel.outWardDetails.Find(x => x.IDOutWardDetail == outWardDetail.IDOutWardDetail));
                    OutWardDetailModel.outWardDetails.Add(outWardDetail);
                    //}
                }
                catch
                {
                }
            }
            return 1;
        }

        [Route("{id}")]
        //Xóa 1 list các OutWardDetailModel trong danh sách theo IDOutWard
        // DELETE: api/OutWardDetail/5
        public void Delete(Guid id)
        {
            var listDetails = OutWardDetailModel.outWardDetails.Where(x => x.IDOutWard == id).ToList();
            foreach (var item in listDetails)
            {
                OutWardDetailModel.outWardDetails.Remove(item);
            }
        }
    }
}
