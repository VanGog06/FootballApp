using System.Collections.Generic;
using FootballApp.Data.Common;

namespace FootballApp.Data.DbModels
{
    public class Role : BaseModel<int>
    {
        public Role()
        {
            this.Users = new HashSet<UserRole>();
        }

        public string Name { get; set; }

        public virtual ICollection<UserRole> Users { get; set; }
    }
}
