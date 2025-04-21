
using pro;
using System.CommandLine;
using System.IO;
using System.Text;

internal class Program
{
    private static void Main(string[] args)
    {
        var bundleOption = new Option<DirectoryInfo>("--output", "File path and name");
        var lanOption = new Option<string>("--l", "Type of the file") { IsRequired = true };
        var noteOption = new Option<bool>("--note", "Include file names in the output");
        var emptyLineOption = new Option<bool>("--line", "Remove empty lines from the output");
        var authorOption = new Option<string>("--author", "Specify the author of the bundled file");
        var sortOption = new Option<string>("--sort", "Sort files before copying");

        bundleOption.AddAlias("--o");
        lanOption.AddAlias("--l");
        noteOption.AddAlias("--n");
        emptyLineOption.AddAlias("--e");
        authorOption.AddAlias("--u");
        sortOption.AddAlias("--s");

        string[] supportedLanguages = { "cs", "js", "java", "html", "css", "ts", "jsx", "ALL" };

        var bundleCommand = new Command("bundle", "Bundle code files into a single file")
        {
            bundleOption,
            lanOption,
            noteOption,
            authorOption,
            emptyLineOption,
            sortOption
        };

        var rspCommand = new Command("rsp", "do the prosses short - Bundle code files into a single file")
        {

        };

        bundleCommand.SetHandler((outputDir, language, note, empty, author, sort) =>
        {
            try
            {
                ValidateLanguage(language, supportedLanguages);
                string bundledContent = BuildBundledContent(outputDir, language, note, empty, author, sort);
                WriteToFile(outputDir, bundledContent);
                Console.WriteLine($"Bundled files into {Path.Combine(outputDir.FullName, "bundle.txt")}");
            }
            catch (DirectoryNotFoundException)
            {
                Console.WriteLine("Directory path is invalid");
            }
        }, bundleOption, lanOption, noteOption, emptyLineOption, authorOption, sortOption);

       
        rspCommand.SetHandler(() =>
        {
            Console.WriteLine("input path you want put the files");
            string outputDir = Console.ReadLine();
            while (outputDir == null)
            {
                Console.WriteLine("invalid value, input now");
                outputDir = Console.ReadLine();
            }
            Console.WriteLine("input the language you want your bundle file will incloud");
            string language = Console.ReadLine();
            while (supportedLanguages.Contains(language)==false)
            {
                Console.WriteLine("invalid value, input now");
                language = Console.ReadLine();  
            }
            Console.WriteLine("input true if you want the directory before each file if not write false");
            string note = Console.ReadLine();
            while (string.IsNullOrEmpty(note) || (!note.Equals("true") && !note.Equals("false")))
            {
                Console.WriteLine("Invalid value, please input again:");
                note = Console.ReadLine();
            }
            Console.WriteLine("input true if you want clear empty line");
            string empty = Console.ReadLine();
            while (string.IsNullOrEmpty(empty) || (!empty.Equals("true") && !empty.Equals("false")))
            { 
                Console.WriteLine("invalid value, input now");
                empty = Console.ReadLine();
            }
            Console.WriteLine("input the name of the author");
            string author = Console.ReadLine();
            while (author?.Length<4)
            {
                Console.WriteLine("invalid value, input now");
                author = Console.ReadLine();
            }
            Console.WriteLine("input 'abc' if you want sort by this. Or 'l-order' if you want to order by the exetention");
            string sort = Console.ReadLine();
                sort = Console.ReadLine();
            

            string defaultDirectory = Directory.GetCurrentDirectory();
            Console.WriteLine("Now write the RSP file name:");
            string fileName = Console.ReadLine();
            string filePath = Path.Combine(defaultDirectory +@"\", fileName + ".rsp");

            using (StreamWriter writer = new StreamWriter(filePath))
            {
            writer.WriteLine("#This is a sample RSP file.");
            writer.WriteLine("bundle");
            writer.WriteLine("--output "+ outputDir);
            writer.WriteLine("--l "+language);
                if (string.IsNullOrEmpty(note) == false)
                    writer.WriteLine("--n " + note);
                if (string.IsNullOrEmpty(author) == false)
                    writer.WriteLine("--u " + author);
                if (string.IsNullOrEmpty(empty) == false)
                    writer.WriteLine("--e " + empty);
                if (string.IsNullOrEmpty(sort) == false)
                    writer.WriteLine("--s " + sort);
            }
            Console.WriteLine("now write @ and the rsp name file");

        });

         
        var rootCommand = new RootCommand("Root command for File Bundler CLI")
        {
            bundleCommand,
            rspCommand
        };

        rootCommand.InvokeAsync(args);
        }

    

    private static void ValidateLanguage(string language, string[] supportedLanguages)
    {
        if (!supportedLanguages.Contains(language))
        {
            throw new ArgumentException("The spelling of language is invalid");
        }
    }

    private static string BuildBundledContent(DirectoryInfo outputDir, string language, bool note, bool empty, string author, string sort)
    {
        StringBuilder contentBuilder = new StringBuilder();

        
        if (!string.IsNullOrEmpty(author))
        {   
           
            contentBuilder.AppendLine($"// {author}");
        }

        string searchPattern = language.Equals("ALL", StringComparison.OrdinalIgnoreCase) ? "*" : $"*.{language}";
        var files = Directory.GetFiles(outputDir.FullName, searchPattern);
        if(sort!=null) { 
        files = SortFiles(files, sort);
        }

        foreach (var file in files)
        {
            string extension = Path.GetExtension(file);

            if (extension.Equals(".bin", StringComparison.OrdinalIgnoreCase)==false && extension.Equals(".debug", StringComparison.OrdinalIgnoreCase)==false)
            {
                AppendFileContent(contentBuilder, file, note, empty);
            }
        }

        return contentBuilder.ToString();
    }

    private static string[] SortFiles(string[] files, string sort)
    {
        if (sort == "l-order")
        {
            Array.Sort(files, new lOrder());
        }
        else if(sort == "abc")
        {
            Array.Sort(files);
        }
        return files;   
    }

    private static void AppendFileContent(StringBuilder contentBuilder, string file, bool note, bool empty)
    {
        if (note)
        {
            contentBuilder.AppendLine(file);
        }
        Console.WriteLine(file);
        string fileContent = File.ReadAllText(file);
        if (empty)
        {
            fileContent = string.Join(Environment.NewLine, fileContent.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries));
        }

        contentBuilder.Append(fileContent);
    }

    private static void WriteToFile(DirectoryInfo outputDir, string content)
    {
        string outputFile = Path.Combine(outputDir.FullName, "bundle.txt");
        File.WriteAllText(outputFile, content, Encoding.UTF8);
    }
}


