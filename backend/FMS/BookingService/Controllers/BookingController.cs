using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FMS.DataLayer;
using FMS.Entities;

namespace BookingService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private static BookingsDAO BookingsDAO;
        private static PaymentDAO PaymentDAO;

        public BookingController()
        {
            BookingsDAO = new BookingsDAO();
            PaymentDAO = new PaymentDAO();
        }
        //add booking
        [Route("addbooking")]
        [HttpPost]
        public IActionResult AddBooking(Bookings bookings)
        {
            try
            {
                BookingsDAO.AddBooking(bookings);
                return StatusCode(200);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        //get user bookings
        [Route("getuserbookings/{username}")]
        [HttpGet]
        public IActionResult GetUserBookings(string username)
        {
            try
            {
                List<UserBookings> bookings =  BookingsDAO.GetUserBookings(username);
                return StatusCode(200, bookings);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        //add payment info
        [Route("addpayment")]
        [HttpPost]
        public IActionResult AddPayment(Payment p)
        {
            try
            {
                PaymentDAO.AddPayment(p);
                return StatusCode(200);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        //add booked seat

        //set seat as booked/not booked
/*        [Route("setseatstatus")]
        [HttpPut]
        public IActionResult SetSeatStatus(Seat seat)
        {
            try
            {
                if (seat.status)
                {
                    seatDAO.SetNotBooked(seat);
                }
                else
                {
                    seatDAO.SetBooked(seat);
                }
                return StatusCode(200);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }*/
        //add new seat
/*        [Route("addseat")]
        [HttpPost]
        public IActionResult AddSeat(Seat seat)
        {
            try
            {
                seatDAO.AddSeat(seat);
                return StatusCode(200);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }*/

        [Route("getpaymentcount")]
        [HttpGet]
        public IActionResult GetPaymentCount()
        {
            try
            {
                int size = PaymentDAO.GetSize();
                return StatusCode(200, size);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Route("getbookingcount")]
        [HttpGet]
        public IActionResult GetBookingCount()
        {
            try
            {
                int size = BookingsDAO.GetSize();
                return StatusCode(200, size);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
