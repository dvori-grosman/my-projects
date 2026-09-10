using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace pro2
{
    internal class HtmlElement
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Arttibute>? Attributes { get; set; }
        public List<string>? classes { get; set; }
        public string? InnerHtml { get; set; }
        public HtmlElement? Parent { get; set; }
        public List<HtmlElement>? Child { get; set; }

        public HtmlElement()
        {
            Attributes = new List<Arttibute>();
            classes = new List<string>();
            Child = new List<HtmlElement>();
        }


        static IEnumerable<HtmlElement> Descendants(HtmlElement current)
        {
            Queue<HtmlElement> queue = new Queue<HtmlElement>();
            queue.Enqueue(current);

            while (queue.Count > 0)
            {
                HtmlElement element = queue.Dequeue();
                yield return element; // Yield the current element

                foreach (var child in element.Child)
                {
                    queue.Enqueue(child); // Enqueue each child for further processing
                }
            }
        }

        public void Ancestors(HtmlElement MASASHORASHIM) {
            HtmlElement current = MASASHORASHIM.Parent;
            List<HtmlElement> maasaa = new List<HtmlElement>();
            while (current != null) {
                maasaa.Add(current);
                current = current.Parent;
            }
        }

        //לבנות פונקציית מעטפת - שמקבלת רק את הסלקטור
        //     public static HashSet<HtmlElement> Find(string selector)
        //{
        //    Selector selector1 = Selector.Parse(selector);


        //}
        //public static HashSet<HtmlElement> Find(HtmlElement root,Selector s,HashSet<HtmlElement> hand) {
        //    List<HtmlElement> l = Descendants(root).ToList(); 

        //    for (int i = 0; i < l.Count; i++) {
        //        bool flag = true;
        //        if (!(s.Id!=null && s.Id == l[0].Id))
        //        {
        //            flag = false;
        //        }
        //        if (!(s.classes == l[0].classes)) { 
        //            flag = false;
        //        }
        //        if (flag == true)
        //        {
        //            hand.Add(l[i]); 
        //        }
        //    }
        //    if (s.child == null)
        //    {
        //        hand.Add(root);
        //        return hand;
        //    }
        //    //השתמשי בפונקציית Descendants כדי לקבל את רשימת כל הצאצאים של האלמנט הנוכחי
        //    //.
        //    else
        //    {
        //        Find(root, s, hand); 

        //    }
        //    return hand;    
        //}
        public static HashSet<HtmlElement> Find(HtmlElement? root, Selector s, HashSet<HtmlElement> hand)
        {
            List<HtmlElement> descendants;
            if (root != null)
            {
                descendants = Descendants(root).ToList();
            }
            else {
                descendants=hand.ToList();
            }

            foreach (var element in descendants)
            {
                bool matchName = true;
                if (s.TagName != null) {
                    matchName = s.TagName.Equals(element.Name);
                }
                bool matchesId = true;
                if (s.Id!=null)
                matchesId = s.Id.Equals(element.Id);
                bool matchesClasses=true;
                if (s.classes != null) {
                matchesClasses = s.classes.SequenceEqual(element.classes); ;
                }
                
                if (matchesId && matchesClasses&&matchName)
                {
                    hand.Add(element);
                }
            }

            if (s.child == null)
            {
                return hand;
            }
            else
            {
                return Find(null,s.child, hand);
            }
        }

        HtmlHelper s = HtmlHelper.Instance;


        public override string ToString() {
            return "Id " + Id + "Name " + Name +"classes " + classes + "InnerHtml " + InnerHtml;
        }
        public HtmlElement BuildTree(List<string> htmlLines)
         
        {
            HtmlElement root = new HtmlElement();
            HtmlElement currentElement = root;
            foreach (var line in htmlLines)
            {
                string firstWord = line.Split(new char[] { ' ', '/' })[0];
                Char lastChar = line[line.Length - 1];
                if (firstWord == @"/html")
                    break;
                HtmlElement newElement = new HtmlElement();
                var attributes = new Regex("([^\\s]*?)=\"(.*?)\"").Matches(line);
                newElement.Name = firstWord;
                foreach (Match attribute in attributes)
                {
                    string key = attribute.Groups[1].Value;
                    string value = attribute.Groups[2].Value;
                    if (attribute.Success)
                    {
                        switch (key)
                        {
                            case "id":
                                newElement.Id = value;
                                break;
                            case "class":
                                newElement.classes = value.Split("=").ToList();
                                break;
                            default:
                                newElement.Attributes.Add(new Arttibute(key, value));
                                // Handle other cases if needed
                                break;
                        }
                    }
                }
                if (s.tags.Contains(firstWord)) {      
                    newElement.Parent = currentElement;
                    currentElement.Child.Add(newElement);
                }
                if (s.tagiut.Contains(firstWord)&&!s.tags.Contains(firstWord) && !lastChar.Equals(@"/"))
                {
                    newElement.Parent = currentElement;
                    currentElement.Child.Add(newElement);
                    currentElement = newElement; // Move to the new element
                }
                else if (firstWord.StartsWith(@"/") && firstWord.Contains(currentElement.Name))
                {
                    currentElement = currentElement.Parent; // Move back to the parent element
                }
                else if (!line.Equals("!DOCTYPE html"))
                {
                    currentElement.InnerHtml += line;
                }
            }
            return root;
        }
    }
    
    
}

