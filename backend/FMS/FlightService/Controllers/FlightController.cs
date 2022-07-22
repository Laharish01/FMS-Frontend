using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FMS.Entities;
using FMS.DataLayer;

namespace FlightService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        //adding data layer object
        public static FlightDAO flightDao;

        public FlightController()
        {
            flightDao = new FlightDAO();
        }
        //get all flights
/*        [Route("getallflights")]
        [HttpGet]
        public IActionResult GetAllFlights()
        {
            try
            {
                List<Flight> allFlights = flightDao.GetAllFlights();
                return StatusCode(200, allFlights);
            }
            catch (Exception e)
            {

                return StatusCode(500, e.Message);
            }
        }*/
        // get flights by source and destination
        [Route("getfilteredflights")]
        [HttpGet]
        public IActionResult GetFlightBySandD(string source, string destination, string departure_time, string seat_preference)
        {
            try
            {
                List<Flight> availableFlights = flightDao.GetFlightsBySandD(source, destination, departure_time, seat_preference);
                return StatusCode(200, availableFlights);

            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
       
        [Route("addflight")]
        [HttpPost]
        public IActionResult AddFlight(Flight flight)
        {
            try
            {
                flightDao.AddFlight(flight);
                return StatusCode(200);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [Route("bookseat/{flight_id}/{seat_type}")]
        [HttpGet]
        public IActionResult BookSeat(string flight_id, string class_type)
        {
            try
            {
                flightDao.BookSeat(flight_id, class_type);
                return StatusCode(200);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message); 
            }
            
        }
    }
}
