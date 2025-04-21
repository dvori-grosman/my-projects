using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pro2
{
    internal class Arttibute
    {
        private string key1;
        private string value1;

        public Arttibute(string key1, string value1)
        {
            this.key1 = key1;
            this.value1 = value1;
        }

        public static string key{get; set;}
        public static string value { get; set; }
    }
}
