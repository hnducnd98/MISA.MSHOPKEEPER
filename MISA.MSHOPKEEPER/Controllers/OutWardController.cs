using MISA.MSHOPKEEPER.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MISA.MSHOPKEEPER.Controllers
{
    [RoutePrefix("outward")]
    public class OutWardController : ApiController
    {
        [Route("")]
        //Lấy tất cả các OutWardDto và delay lại 1s
        // GET: api/OutWard
        public async Task<IEnumerable<OutWardDto>> GetAsync()
        {
            await Task.Delay(1000);
            var listOutWardDto = new List<OutWardDto>();
            foreach (var item in OutWardModel.outWards)
            {
                var outwardDto = new OutWardDto(item);
                listOutWardDto.Add(outwardDto);
            }
            return listOutWardDto;
        }

        //[Route("/save")]
        //// GET: api/OutWard
        //public IEnumerable<OutWardDto> GetSave()
        //{
        //    var listOutWardDto = new List<OutWardDto>();
        //    foreach (var item in OutWardModel.outWards)
        //    {
        //        var outwardDto = new OutWardDto(item);
        //        listOutWardDto.Add(outwardDto);
        //    }
        //    return listOutWardDto;
        //}

        [Route("{id}")]
        //Lấy 1 đối tượng OutWardDto theo idOutWard
        // GET: api/OutWard/5
        public OutWardDto Get(Guid id)
        {
            var outWard = OutWardModel.outWards.Find(x => x.ID == id);
            return new OutWardDto(outWard);
        }

        [Route("")]
        //Thêm mới 1 OutWardModel vào danh sách
        // POST: api/OutWard
        public Guid Post([FromBody]OutWardModel outWard)
        {
            outWard.ID = Guid.NewGuid();
            OutWardModel.outWards.Insert(0, outWard);
            return outWard.ID;
        }

        [Route("")]
        //Sửa 1 OutWardModel trong danh sách theo idOutWard
        // PUT: api/OutWard/5
        public Guid Put([FromBody]OutWardModel outWard)
        {
            var outWardEdited = OutWardModel.outWards.Find(x => x.ID == outWard.ID);
            outWardEdited.TimeOutWard = outWard.TimeOutWard;
            outWardEdited.DateOutWard = outWard.DateOutWard;
            outWardEdited.CodeOutWard = outWard.CodeOutWard;
            outWardEdited.IDObject = outWard.IDObject;
            outWardEdited.DeliverOutWard = outWard.DeliverOutWard;
            outWardEdited.TotalMoney = outWard.TotalMoney;
            outWardEdited.Explain = outWard.Explain;
            outWardEdited.TypeOutWard = outWard.TypeOutWard;
            return outWard.ID;
        }

        [Route("{id}")]
        //Xóa 1 OutWardModel trong danh sách theo idOutWard
        // DELETE: api/OutWard/5
        public void Delete(Guid id)
        {
            OutWardModel.outWards.Remove(OutWardModel.outWards.Find(x => x.ID == id));
        }
    }
}
