using System.Collections.Generic;
using FootballApp.Data.Common;

namespace FootballApp.Data.DbModels
{
    public class Competition : BaseModel<int>
    {
        public Competition()
        {
            this.Seasons = new HashSet<Season>();
        }

        public string Name { get; set; }

        public string Country { get; set; }

        public virtual ICollection<Season> Seasons { get; set; }
    }
}
