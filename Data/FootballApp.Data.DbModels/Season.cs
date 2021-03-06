﻿using System;
using FootballApp.Data.Common;

namespace FootballApp.Data.DbModels
{
    public class Season : BaseModel<int>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int? CurrentMatchday { get; set; }

        public int? WinnerId { get; set; }

        public virtual Team Winner { get; set; }

        public int? CompetitionId { get; set; }

        public virtual Competition Competition { get; set; }
    }
}
