using MISA.MSHOPKEEPER.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MISA.MSHOPKEEPER.Controllers
{
    [RoutePrefix("object")]
    public class ObjectController : ApiController
    {
        [Route("")]
        //Lấy tất cả các object
        // GET: api/Object
        public IEnumerable<ObjectModel> Get()
        {
            return ObjectModel.objects;
        }

        [Route("{id}")]
        // GET: api/Object/5
        public string Get(string id)
        {
            return "value";
        }

        // POST: api/Object
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Object/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Object/5
        public void Delete(int id)
        {
        }
    }
}
