using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Entities
{
    public class Seat
    {
        public string flight_id { get; set; }
        public int seat_no { get; set; }
        public string seat_class { get; set; }
        public double price { get; set; }
        public bool status { get; set;  }
    }
}
