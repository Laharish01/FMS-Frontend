using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Entities
{
    public class Bookings
    {
        public int booking_id { get; set; }
        public string username { get; set; }
        public int flight_id { get; set;  }
        public int payment_id { get; set;  }
    }
}
