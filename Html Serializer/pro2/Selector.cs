using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace pro2
{
    internal class Selector
    {
        public string TagName{ get; set; }
        public string? Id { get; set; }
        public List<string>? classes { get; set; }
        public Selector Parent { get; set; }    
        public Selector child { get; set; }
        
        public Selector() {
            
        }
        
        //המרת מחרוזת לעציצון סלקטורים
        public static Selector Parse(string query)
        {   
            HtmlHelper s = HtmlHelper.Instance;
            char[] delimiters = new char[] { '.', '#' };
            var RootSelector = new Selector();
            var CurrentSelector = RootSelector;
            string[] parts = query.Split(" ");
            for (int i = 0; i < parts.Length; i++) {
                string[] str = parts[i].Split(delimiters);
                if (s.tags.Contains(str[0]) || s.tagiut.Contains(str[0])) {
                    CurrentSelector.TagName = str[0];
                }
                if (parts[i].IndexOf("#") != -1) {
                    CurrentSelector.Id = parts[i].Split("#")[1].Split(".")[0];
                }
                if (parts[i].IndexOf(".") != -1) {
                    List<string> str2 = parts[i].Substring(parts[i].IndexOf(".")).Split(".", StringSplitOptions.RemoveEmptyEntries).ToList();
                    CurrentSelector.classes = str2;
                }
                var NewSelector = new Selector();
                //ואני אהיה לו לאב והוא יהיה לי לבן
                CurrentSelector.child = NewSelector;
                NewSelector.Parent = CurrentSelector;
                //וחסדי לא יסור ממנו
                CurrentSelector = NewSelector;  
            }
            return RootSelector;
        }
    }

    //hashSet 
    // הגדרת אוסף ללא כפיליות
}
