using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GTiHub.Controllers.API.Files
{
    public class FieldCheckHelpers
    {
        public static bool CheckTypeAndFormat(string value, string type)
        {
            switch (type)
            {
                case "url":
                    return CheckValidURL(value);
                case "date":
                    return CheckValidDate(value);
                case "email":
                    return CheckValidEmail(value);
                case "bool":
                    return CheckValidBool(value);
                case "num":
                    return CheckValidNum(value);
                case "currency":
                    return CheckValidCurrency(value);
                default:
                    return false;
            }
        }

        public static bool CheckValidURL(string value)
        {
            return false;
        }
        public static bool CheckValidDate(string value)
        {
            return false;
        }
        public static bool CheckValidEmail(string value)
        {
            return false;
        }
        public static bool CheckValidBool(string value)
        {
            return false;
        }
        public static bool CheckValidNum(string value)
        {
            return false;
        }
        public static bool CheckValidCurrency(string value)
        {
            return false;
        }
    }
}
