using System;
using System.Diagnostics;

namespace ConsoleApp1
{
    class lab1
    {
        static void Main(string[] args)
        {
            TrashTalker trashTalker;

            if (args.Length == 0)
            {
                Process.Start(System.Reflection.Assembly.GetExecutingAssembly().Location, "glhf");
                Console.WriteLine("<--Welcome to COM3 with Arduino!-->");
                trashTalker = new TrashTalker("COM3", 9600);
                trashTalker.Start();
            }

            Console.WriteLine("Press any key to continue...");
            Console.ReadKey();
        }
    }
}
