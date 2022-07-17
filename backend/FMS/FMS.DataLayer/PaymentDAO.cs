using System;
using System.Data.SqlClient;
using FMS.Entities;
using System.Collections.Generic;

namespace FMS.DataLayer
{
    public class PaymentDAO
    {
        SqlConnection sqlConnection = new SqlConnection(@"Data Source=HYD-1FVP2N3\SQLEXPRESS;Initial Catalog=AirplaneManagement;Integrated Security=True");
        SqlCommand command = null;

        public void AddPayment(Payment p)
        {
            try
            {
                string query = "insert into payment (total_amount, payment_mode, [status]) values (@total, @mode, @status);";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@total", p.total_amount);
                command.Parameters.AddWithValue("@mode", p.payment_mode);
                command.Parameters.AddWithValue("status", p.status);
                sqlConnection.Open();
                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex; 
            }
            finally
            {
                sqlConnection.Close();
            }

        }
    }
}
