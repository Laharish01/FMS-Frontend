using System;
using System.Data.SqlClient;
using FMS.Entities;
using System.Collections.Generic;


namespace FMS.DataLayer
{
    public class UserDAO
    {
        SqlConnection sqlConnection = new SqlConnection(Environment.connection1);
        SqlCommand command = null;

        public void AddUser(User user)
        {
            try
            {
                string query = "INSERT INTO [USER] (username, password, seat_preference, role) VALUES (@un, @pwd, @seat_pref, @role)";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@un", user.username);
                command.Parameters.AddWithValue("@pwd", user.password);
                command.Parameters.AddWithValue("@seat_pref", user.seat_preference);
                command.Parameters.AddWithValue("@role", user.role);
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
        public bool CheckAdmin(User user)
        {
            try
            {
                string query = "SELECT * FROM [User] WHERE USER.USERNAME = @un";
                command = new SqlCommand(query,sqlConnection);
                command.Parameters.AddWithValue("@un", user.username);
                sqlConnection.Open();
                SqlDataReader datareader = command.ExecuteReader();
                if (datareader.HasRows)
                {
                    datareader.Read();
                    if (datareader["role"].ToString() == "Admin")
                    {
                        return true;
                    }
                }
                return false;
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
        public bool CheckUser(string username)
        {
            try
            {
                string query = "SELECT * FROM [User] WHERE USERNAME = @un";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@un", username);
                sqlConnection.Open();
                SqlDataReader datareader = command.ExecuteReader();
                if (datareader.HasRows)
                {
                    return true;
                }
                return false;
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

        public User GetUser(string username)
        {
            try
            {
                string query = "SELECT * FROM [USER] WHERE username = @un";
                command = new SqlCommand(query, sqlConnection);
                command.Parameters.AddWithValue("@un", username);
                sqlConnection.Open();
                SqlDataReader datareader = command.ExecuteReader();
                User user = new User();
                if (datareader.HasRows)
                {
                    datareader.Read();
                    user.username = datareader[0].ToString();
                    user.password = datareader[1].ToString();
                    user.seat_preference = datareader[2].ToString();
                    user.role = datareader[3].ToString();
                    return user;
                }
                return user;
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
