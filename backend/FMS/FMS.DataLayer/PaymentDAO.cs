using System;
using System.Data.SqlClient;
using FMS.Entities;
using System.Collections.Generic;

namespace FMS.DataLayer
{
    public class PaymentDAO
    {
        SqlConnection sqlConnection = new SqlConnection(Environment.connection1);
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

        public int GetSize()
        {
            try
            {
                string query = "Select count(*) from Payment";
                command = new SqlCommand(query, sqlConnection);
                sqlConnection.Open();
                var datareader = command.ExecuteScalar();
                int size = 0;
                if (datareader != null)
                {
                    size = (int)datareader;
                }
                return size;
            }
            catch(Exception ex)
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
