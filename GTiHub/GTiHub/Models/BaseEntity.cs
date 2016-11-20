namespace GTiHub.Models.EntityModel
{
    #region

    using System;

    #endregion

    public class BaseEntity
    {
        public string Created_By { get; set; }

        public DateTime? Creation_Date { get; set; }

        public DateTime? Date_Modified { get; set; }

        public string Modified_By { get; set; }
    }
}