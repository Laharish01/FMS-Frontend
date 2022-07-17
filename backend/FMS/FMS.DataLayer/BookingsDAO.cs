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
        public List<UserBookings> GetUserBookings(User user)
        {
            try
            {
                string query = "select b.booking_id, b.flight_id, b.payment_id, f.flight_cmp, f.source, f.destination, f.departure_time, f.landing_time, p.total_amount, p.payment_mode from bookings b join FLIGHT f on b.flight_id = f.flight_id join Payment p on b.payment_id = p.payment_id where username = @un";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@un", user.username);
                sqlConnection.Open();
                SqlDataReader datareader = command.ExecuteReader();
                List<UserBookings> userBookings = new List<UserBookings>();
                if (datareader.HasRows)
                {
                    while (datareader.Read())
                    {
                        userBookings.Add(new UserBookings()
                        {
                            booking_id = (int)datareader[0],
                            flight_id = datareader[1].ToString(),
                            payment_id = (int)datareader[2],
                            flight_cmp = datareader[3].ToString(),
                            source = datareader[4].ToString(),
                            destination = datareader[5].ToString(),
                            departure_time = DateTime.Parse(datareader[6].ToString()),
                            landing_time = DateTime.Parse(datareader[7].ToString()),
                            total_amount = (float)datareader[8],
                            payment_mode = datareader[9].ToString()
                        });                        
                    }
                }
                return userBookings;       
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
