using System;
using System.Data.SqlClient;
using FMS.Entities;
using System.Collections.Generic;

namespace FMS.DataLayer
{
    public class FlightDAO
    {
        SqlConnection sqlConnection = new SqlConnection(@"Data Source=HYD-1FVP2N3\SQLEXPRESS;Initial Catalog=AirplaneManagement;Integrated Security=True");
        SqlCommand command = null;

        public void AddFlight(Flight flight)
        {
            try
            {
                String query = "INSERT INTO FLIGHT (flight_id, flight_cmp, source, destination, departure_time, landing_time) VALUES" +
                    " (@id, @cmp, @src, @dest, @dpt_time, @lndg_time)";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@id", flight.flight_id);
                command.Parameters.AddWithValue("@cmp", flight.flight_cmp);
                command.Parameters.AddWithValue("@src", flight.source);
                command.Parameters.AddWithValue("@dest", flight.destination);
                command.Parameters.AddWithValue("@dpt_time", flight.departure_time);
                command.Parameters.AddWithValue("@lndg_time", flight.landing_time);
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
        public List<Flight> GetAllFlights()
        {
            try
            {
                String query = "SELECT * FROM FLIGHT";
                command = new SqlCommand(query, sqlConnection);
                sqlConnection.Open();
                SqlDataReader datareader = command.ExecuteReader();
                List<Flight> flights = new List<Flight>();
                if (datareader.HasRows)
                {
                    while (datareader.Read())
                    {
                        flights.Add(new Flight()
                        {
                            flight_id = datareader[0].ToString(),
                            flight_cmp = datareader[1].ToString(),
                            source = datareader[2].ToString(),
                            destination = datareader[3].ToString(),
                            departure_time = (DateTime)datareader[4],
                            landing_time = (DateTime)datareader[5]
                        });
                    }
                }
                return flights;
            }
            catch (Exception ex) { throw ex; }
            finally { sqlConnection.Close(); }
        }
        public List<AvailableFlightWithSeat> GetFlightsBySandD(string source, string destination)
        {
            try
            {
                String query = "SELECT * FROM FLIGHT f JOIN SEAT s ON f.flight_id = s.flight_id WHERE" +
                    " (f.source = @src) and (f.destination = @dest) and (s.status = 0)";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@src", source);
                command.Parameters.AddWithValue("@dest", destination);
                sqlConnection.Open();
                SqlDataReader datareader = command.ExecuteReader();
                List<AvailableFlightWithSeat> flights = new List<AvailableFlightWithSeat>();
                if (datareader.HasRows)
                {
                    while (datareader.Read())
                    {
                        Console.WriteLine(datareader);
                        flights.Add(new AvailableFlightWithSeat()
                        {
                            flight_id = datareader[0].ToString(),
                            flight_cmp = datareader[1].ToString(),
                            source = datareader[2].ToString(),
                            destination = datareader[3].ToString(),
                            departure_time = (DateTime)datareader[4],
                            landing_time = (DateTime)datareader[5],
                            seat_no = (int)datareader[7],
                            class_type = datareader[8].ToString(),
                            price = (double)datareader[9],
                            status = (bool) datareader[10]

                        });
                    }
                }
                return flights;
            }
            catch (Exception ex) { throw ex; }
            finally { sqlConnection.Close(); }
        }
    }

}
