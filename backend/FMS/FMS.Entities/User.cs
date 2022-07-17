using System;

namespace FMS.Entities
{
    public class User
    {
        public string username { get; set; }
        public string password { get; set;  }
        public string seat_preference { get; set; }
        public string role { get; set; }
    }
}
