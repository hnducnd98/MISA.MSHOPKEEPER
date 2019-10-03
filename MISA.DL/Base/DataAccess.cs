using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{
    public class DataAccess : IDisposable
    {
        private string connectionString;
        private SqlConnection sqlConnection;
        private SqlCommand sqlCommand;

        public SqlCommand SqlCommand()
        {
            return sqlCommand;
        }

        public void Dispose()
        {
            sqlConnection.Close();
        }

        /// <summary>
        /// Hàm khởi tạo DB
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns></returns>
        /// Created by HNDuc 03/10/2019
        public DataAccess()
        {
            //Chuỗi kết nối database
            connectionString = @"Data Source=DESKTOP-IJH129F\SQLEXPRESS;Initial Catalog=MISA_MSHOPKEEPER;Integrated Security=True";
            //Kết nối với đatabase
            sqlConnection = new SqlConnection(connectionString);

            //Khởi tạo đối tượng SqlCommand để thao tác với database
            sqlCommand = sqlConnection.CreateCommand();

            //Khai báo kiểu thao tác với database
            sqlCommand.CommandType = CommandType.StoredProcedure;

            //Mở kết nối
            sqlConnection.Open();

        }

        /// <summary>
        /// Hàm thực thi câu lệnh trả về dữ liệu
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns></returns>
        /// Created by HNDuc 03/10/2019
        public SqlDataReader ExecuteReader(string commandText)
        {
            sqlCommand.CommandText = commandText;
            return sqlCommand.ExecuteReader();
        }

        /// <summary>
        /// Hàm thực thi câu lệnh trả về ID bản ghi cuối cùng
        /// </summary>
        /// <param name="commandText"></param>
        /// <returns></returns>
        /// Created by HNDuc 03/10/2019
        public object ExecuteScalar(string commandText)
        {
            sqlCommand.CommandText = commandText;
            return sqlCommand.ExecuteScalar();
        }
    }
}
