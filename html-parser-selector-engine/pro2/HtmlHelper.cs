using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using Newtonsoft.Json;
using System.ComponentModel;
using DocumentFormat.OpenXml.Spreadsheet;

namespace pro2
{
  
    internal class HtmlHelper
    {
        private static readonly HtmlHelper _instance =new HtmlHelper();
        
        public static HtmlHelper Instance=>_instance;

        string jsonData = File.ReadAllText("HtmlTags.json");

        string jsonData1 = File.ReadAllText("HtmlVoidTags.json");
        
        public string[] tagiut { get; set; }
        public string[] tags { get; set; }

        
        
        private HtmlHelper()
        {
            
            List<string> dataList1 = JsonConvert.DeserializeObject<List<string>>(jsonData1);
            List<string> dataList = JsonConvert.DeserializeObject<List<string>>(jsonData);
            tagiut = new string[dataList.Count];
            tags = new string[dataList1.Count];
            for (int i = 0; i < dataList.Count; i++) {
                tagiut[i] = dataList[i].ToString();
            }
            for (int j = 0; j < dataList1.Count; j++) {
                tags[j] = dataList1[j].ToString();  
            }
        }
    }
}
