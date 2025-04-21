
using System.Collections;


namespace pro
{
    internal class lOrder : IComparer
    {

        public int Compare(object x, object y)
        {
            if (x == null || y == null)
            {
                throw new ArgumentNullException("Arguments cannot be null");
            }

            string xString = x.ToString();
            string yString = y.ToString();

            int xIndex = xString.IndexOf('*');
            int yIndex = yString.IndexOf('*');

            if (xIndex == -1 || yIndex == -1)
            {
                throw new ArgumentException("Strings must contain '*' character");
            }

            return xString[xIndex + 1].CompareTo(yString[yIndex + 1]);
        }
    }
}
