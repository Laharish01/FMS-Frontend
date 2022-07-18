using System;
using System.Data.SqlClient;
using FMS.Entities;
using System.Collections.Generic;
namespace FMS.DataLayer
{
    public class BookedSeatDAO
    {
        SqlConnection sqlConnection = new SqlConnection(Environment.connection1);
        SqlCommand command = null;

        public void AddBookedSeat(BookedSeats bs)
        {
            try
            {
                string query = "insert into bookedseats (booking_id, seat_no) values (@booking_id, @seat_no)";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@booking_id", bs.booking_id);
                command.Parameters.AddWithValue("@seat_no", bs.seat_no);
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
