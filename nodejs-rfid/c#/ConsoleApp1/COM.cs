using System;
using System.IO.Ports;
using System.Text;
using System.Threading;

namespace ConsoleApp1
{
    class COM
    {
        private SerialPort port;
        private String name;
        private int speed;
        private String message;
        private bool readableFlag;

        public COM(String name, int speed)
        {
            this.name = name;
            this.speed = speed;
            readableFlag = false;
        }

        ~COM()
        {
            port.Close();
        }

        public void Init()
        {
            port = new SerialPort(name, speed, Parity.None, 8, StopBits.One);
            port.Open();

            port.ErrorReceived += new SerialErrorReceivedEventHandler(this.ErrorReceived);
            port.DataReceived += new SerialDataReceivedEventHandler(this.DataReceived);
        }

        void DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            byte[] data = new byte[port.BytesToRead];
            port.Read(data, 0, data.Length);

            if (readableFlag)
            {
                readableFlag = false;
                message += "\n" + Encoding.ASCII.GetString(data);
            }
            else
            {
                message = Encoding.ASCII.GetString(data);
            }
            readableFlag = true;

        }

        void ErrorReceived(object sender, SerialErrorReceivedEventArgs e)
        {
            Console.WriteLine("ErrorReceived :c");
        }

        public bool IsReadable()
        {
            return (readableFlag == true && port.BytesToRead == 0) ? true : false;
        }

        public String GetMessage()
        {
            readableFlag = false;
            return message;
        }

        /*public void SendMessage(byte[] data)
        {
            port.RtsEnable = true;
            port.Write(data, 0, data.Length);
            while (port.BytesToWrite != 0)
            {
                Thread.Sleep(10);
            }
            port.RtsEnable = false;
        }
        */

    }
}
