using System;
using System.Data.SqlClient;
using FMS.Entities;
using System.Collections.Generic;

namespace FMS.DataLayer
{
    public class BookingsDAO
    {
        SqlConnection sqlConnection = new SqlConnection(@"Data Source=HYD-1FVP2N3\SQLEXPRESS;Initial Catalog=AirplaneManagement;Integrated Security=True");
        SqlCommand command = null;

        public void AddBooking(Bookings booking)
        {
            try
            {
                string query = "insert into bookings (username, flight_id, payment_id) values (@un,@flight_id, @payment_id)";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@un", booking.username);
                command.Parameters.AddWithValue("@flight_id", booking.flight_id);
                command.Parameters.AddWithValue("@payment_id", booking.payment_id);
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
        public void GetUserBookings(User user)
        {
            try
            {
                string query = "select b.booking_id, b.flight_id, b.payment_id, f.flight_cmp, f.source, f.destination, f.departure_time, f.landing_time, p.total_amount, p.payment_mode from bookings b join FLIGHT f on b.flight_id = f.flight_id join Payment p on b.payment_id = p.payment_id where username = @un";
                
                
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
