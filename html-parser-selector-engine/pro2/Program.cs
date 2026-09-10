
using DocumentFormat.OpenXml.Wordprocessing;
using pro2;
using System;
using System.Text.RegularExpressions;
using System.Xml.Linq;

var html = await Load("https://learn.malkabruk.co.il/practicode/projects/pract-2/#_5");
async Task<string> Load(string url)
{
    HttpClient client = new HttpClient();
    var response = await client.GetAsync(url);
    var html = await response.Content.ReadAsStringAsync();
    return html;
}

var cleanHtml = new Regex("\\n").Replace(html,"");

List<string> htmlLines = new Regex("<(.*?)>")
    .Split(cleanHtml)
    .Where(x=>(x.Length>0 && new Regex("\\s")
    .Replace(x,"").Length>0)).ToList();
Console.WriteLine(htmlLines[276]);

Selector selector = new Selector();

string slc = ".container";

HashSet<HtmlElement> htmlz = new HashSet<HtmlElement>();

selector =Selector.Parse(slc);

HtmlElement htmlElement = new HtmlElement();

htmlElement= htmlElement.BuildTree(htmlLines);

htmlz = HtmlElement.Find(htmlElement,selector,htmlz);

//htmlz.ToList();

Console.WriteLine(htmlz.ToList());

Console.ReadLine();
  




