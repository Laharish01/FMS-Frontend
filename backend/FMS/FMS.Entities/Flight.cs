using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Entities
{
    public class Flight
    {
        public string flight_id { get; set;  }
        public string flight_cmp { get; set;  }
        public string source { get; set;  }
        public string destination { get; set;  }
        public DateTime departure_time { get; set;  }
        public DateTime landing_time { get; set; }
    }
}
