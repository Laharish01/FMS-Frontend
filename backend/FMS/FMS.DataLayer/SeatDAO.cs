using System;
using System.Data.SqlClient;
using FMS.Entities;
using System.Collections.Generic;


namespace FMS.DataLayer
{
    public class SeatDAO
    {
        SqlConnection sqlConnection = new SqlConnection(@"Data Source=HYD-1FVP2N3\SQLEXPRESS;Initial Catalog=AirplaneManagement;Integrated Security=True");
        SqlCommand command = null;

        public void SetBooked(Seat seat)
        {
            try
            {
                string query = "update SEAT set [status] = 1 where seat_no = @seat_no and flight_id = @flight_id";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@seat_no", seat.seat_no);
                command.Parameters.AddWithValue("@flight_id", seat.flight_id);
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
        public void SetNotBooked(Seat seat)
        {
            try
            {
                string query = "update SEAT set [status] = 0 where seat_no = @seat_no and flight_id = @flight_id";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@seat_no", seat.seat_no);
                command.Parameters.AddWithValue("@flight_id", seat.flight_id);
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
        public void AddSeat(Seat seat)
        {
            try
            {
                string query = "INSERT INTO SEAT (seat_no, flight_id, price, class, [status]) VALUES (@seat_no, @flight_id, @price, @class, @status)";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@seat_no", seat.seat_no);
                command.Parameters.AddWithValue("@flight_id", seat.flight_id);
                command.Parameters.AddWithValue("@price", seat.price);
                command.Parameters.AddWithValue("@class", seat.seat_class);
                command.Parameters.AddWithValue("@status", seat.status);
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
