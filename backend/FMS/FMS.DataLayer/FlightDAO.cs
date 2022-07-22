using System;
using System.Data.SqlClient;
using FMS.Entities;
using System.Collections.Generic;

namespace FMS.DataLayer
{
    public class FlightDAO
    {
        SqlConnection sqlConnection = new SqlConnection(Environment.connection1);
        SqlCommand command = null;

        public void AddFlight(Flight flight)
        {
            try
            {
                String query = "INSERT INTO FLIGHT (flight_id, flight_cmp, source, destination, departure_time, landing_time, economy_seats, business_seats, economy_price, business_price ) VALUES" +
                    " (@id, @cmp, @src, @dest, @dpt_time, @lndg_time, @econ_seats, @biz_seats, @econ_price, @biz_price)";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@id", flight.flight_id);
                command.Parameters.AddWithValue("@cmp", flight.flight_cmp);
                command.Parameters.AddWithValue("@src", flight.source);
                command.Parameters.AddWithValue("@dest", flight.destination);
                command.Parameters.AddWithValue("@dpt_time", flight.departure_time);
                command.Parameters.AddWithValue("@lndg_time", flight.landing_time);
                command.Parameters.AddWithValue("@econ_seats", flight.economy_seats);
                command.Parameters.AddWithValue("@biz_seats", flight.business_seats);
                command.Parameters.AddWithValue("@econ_price", flight.economy_price);
                command.Parameters.AddWithValue("@biz_price", flight.business_price);
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
        /*public List<Flight> GetAllFlights()
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
        }*/
        public List<Flight> GetFlightsBySandD(string source, string destination, string departure_time, string seat_preference)
        {
            try
            {
                String query = "";
                if(seat_preference == "Economy")
                {
                    query = "SELECT * FROM FLIGHT f where f.source = @src and f.destination = @dest and f.departure_time > @dep and f.economy_seats > 0";
                }
                else
                {
                    query = "SELECT * FROM FLIGHT f where f.source = @src and f.destination = @dest and f.departure_time > @dep and f.business_seats > 0";
                }
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@src", source);
                command.Parameters.AddWithValue("@dest", destination);
                command.Parameters.AddWithValue("@dep", departure_time);
                sqlConnection.Open();
                SqlDataReader datareader = command.ExecuteReader();
                List<Flight> flights = new List<Flight>();
                if (datareader.HasRows)
                {
                    while (datareader.Read())
                    {
                        Console.WriteLine(datareader);
                        flights.Add(new Flight()
                        {
                            flight_id = datareader[0].ToString(),
                            flight_cmp = datareader[1].ToString(),
                            source = datareader[2].ToString(),
                            destination = datareader[3].ToString(),
                            departure_time = (DateTime) datareader[4],
                            landing_time = (DateTime) datareader[5],
                            business_seats = (int)datareader[6], 
                            economy_seats = (int)datareader[7],
                            business_price = (int)datareader[8],
                            economy_price = (int) datareader[9]
                        });
                    }
                }
                return flights;
            }
            catch (Exception ex) { throw ex; }
            finally { sqlConnection.Close(); }
        }

        /*public int GetAvailableSeats(string flight_id, string _class)
        {
            try
            {
                String query = "SELECT count(*) FROM SEAT WHERE flight_id = @id and status = 0 and class = @class";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@id", flight_id);
                command.Parameters.AddWithValue("@class", _class);
                sqlConnection.Open();
                var sqldatareader = command.ExecuteScalar();
                if (sqldatareader != null)
                {
                    return (int)sqldatareader;
                }
                return 0;
            }
            catch (Exception ex) { throw ex; }
            finally { sqlConnection.Close(); }
        }*/
        public void BookSeat(string flight_id, string seat_class)
        {
            try
            {
                string query = "";
                if (seat_class == "Economy" | seat_class == "economy")
                {
                    query = "UPDATE FLIGHT SET  economy_seats = economy_seats - 1 WHERE flight_id = @id";
                }
                else 
                {
                    query = "UPDATE FLIGHT SET  business_seats = business_seats - 1 WHERE flight_id = @id";
                }
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@id", flight_id);
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


