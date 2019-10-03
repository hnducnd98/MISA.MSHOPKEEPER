using MISA.MSHOPKEEPER.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MISA.MSHOPKEEPER.Controllers
{
    [RoutePrefix("item")]
    public class ItemController : ApiController
    {
        [Route("")]
        //Lấy tất cả các item
        // GET: api/Item
        public IEnumerable<ItemModel> Get()
        {
            return ItemModel.itemModels;
        }

        [Route("{id}")]
        //Lấy item đầu tiền theo mã item
        // GET: api/Item/5
        public ItemModel Get(Guid id)
        {
            return ItemModel.itemModels.Where(x => x.IDItem == id).First();
        }

        // POST: api/Item
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Item/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Item/5
        public void Delete(int id)
        {
        }
    }
}
