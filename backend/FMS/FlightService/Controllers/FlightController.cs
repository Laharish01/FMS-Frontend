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
        [Route("getallflights")]
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
        }
        // get flights by source and destination
        [Route("getfilteredflights")]
        [HttpGet]
        public IActionResult GetFlightBySandD(string source, string destination, string departure_time)
        {
            try
            {
                List<AvailableFlightWithSeat> availableFlights = flightDao.GetFlightsBySandD(source, destination, departure_time);
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

        [Route("getcount/{flight_id}")]
        [HttpGet]
        public IActionResult GetCount(string flight_id)
        {
            try
            {
                int res = flightDao.GetAvailableSeats(flight_id);
                return StatusCode(200, res);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message); 
            }
            
        }
    }
}
