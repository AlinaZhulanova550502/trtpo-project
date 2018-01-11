using System;
using System.Text;
using System.Threading;
using System.Text.RegularExpressions;
using System.Data.SqlClient;

namespace ConsoleApp1
{
    class TrashTalker
    {
        private COM com;

        public TrashTalker(string name, int speed)
        {
            com = new COM(name, speed);
            com.Init();
        }

        public void Start()
        {
            while (true)
            {
                if (Read()) return;
                Thread.Sleep(100);
            }
        }

        public bool Read()
        {
            if (com.IsReadable())           //сделать поиск кусков и запись по кускам
            {
                string message = com.GetMessage();
                Console.WriteLine(message);

                Regex regexEnt = new Regex("Open ([0-1])");
                Regex regexTime = new Regex("([0-9]?[0-9]\\.[0-2]?[0-9] [0-9]*-[0-9]*-[0-9]*)");
                Regex regexRfid = new Regex("rfid: ([0-9, A-F]*)");

                string ent=regexEnt.Match(message).Value;
                string time=regexTime.Match(message).Value;
                string rfid=regexRfid.Match(message).Value;

                Console.WriteLine(ent);
                Console.WriteLine(time);
                Console.WriteLine(rfid);

                var con = new SqlConnection("magic-door");          //?????
                con.Open();
                var cmd = new SqlCommand("INSERT INTO MyTable(ent, time, rfid) VALUES(ent, time, rfid)", con);
                con.Close(); //Connection closed here  

                /*
                 // Create a new Order object.
                Order ord = new Order
                {
                    OrderID = 12000,
                    ShipCity = "Seattle",
                    OrderDate = DateTime.Now
                };

                // Add the new object to the Orders collection.
                db.Orders.InsertOnSubmit(ord);

                // Submit the change to the database.
                try
                {
                    db.SubmitChanges();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    db.SubmitChanges();
                }
                 */

                //if (message == "gg") return true;

                //if (message.StartsWith(date)) // запись в базу данных
                //else if ()

            }
            return false;
        }
    }
}
