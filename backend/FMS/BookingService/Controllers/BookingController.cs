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
        private static BookedSeatDAO BookedSeatDAO;
        private static SeatDAO seatDAO;
        public BookingController()
        {
            BookingsDAO = new BookingsDAO();
            PaymentDAO = new PaymentDAO();
            BookedSeatDAO = new BookedSeatDAO();
            seatDAO = new SeatDAO();
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
        [Route("getuserbookings")]
        [HttpGet]
        public IActionResult GetUserBookings(User user)
        {
            try
            {
                List<UserBookings> bookings =  BookingsDAO.GetUserBookings(user);
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
        public IActionResult AddPayment(Payment payment)
        {
            try
            {
                PaymentDAO.AddPayment(payment);
                return StatusCode(200);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        //add booked seat
        [Route("addbookedseat")]
        [HttpPost]
        public IActionResult AddBookedSeat(BookedSeats bs)
        {
            try
            {
                BookedSeatDAO.AddBookedSeat(bs);
                return StatusCode(200);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        //set seat as booked/not booked
        [Route("setseatstatus")]
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
        }
        //add new seat
        [Route("addseat")]
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
        }
    }
}
