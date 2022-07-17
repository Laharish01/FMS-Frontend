using System;
using System.Collections.Generic;
using System.Text;

namespace FMS.Entities
{
    public class Payment
    {
        public int payment_id { get; set; }
        public float total_amount { get; set; }
        public string payment_mode { get; set; }
        public bool status { get; set;  }
    }
}
