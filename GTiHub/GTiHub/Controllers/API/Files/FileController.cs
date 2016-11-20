namespace GTiHub.API.File_Handling
{
    #region

    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;

    using GTiHub.Models.EntityModel;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    #endregion

    [Route("api/[controller]")]
    public class FileController : Controller
    {
        private readonly ITransformHelpers _helpers;

        public FileController(ITransformHelpers _helpers)
        {
            this._helpers = _helpers;
        }

        [Route("ExtractHeaders")]
        [HttpPost]
        public async Task<IActionResult> ExtractHeaders(IFormCollection form)
        {
            if (!this.Request.ContentType.Contains("multipart/form-data")) return new UnsupportedMediaTypeResult();

            var file = form.Files[0];
            if (file == null) throw new Exception("File is null");
            if (file.Length == 0) throw new Exception("File is empty");
            if ((file.ContentType != "text/csv") && (file.ContentType != "text/plain")
                && (file.ContentType != "application/octet-stream") && (file.ContentType != "application/vnd.ms-excel")) return new UnsupportedMediaTypeResult();

            var sfields = new List<SourceField>();
            var sfieldSeqCount = 1;

            try
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    var line = await reader.ReadLineAsync();

                    var delimiter = Convert.ToChar(form["delimiter"]);

                    var fields = line.Split(delimiter);
                    foreach (var field in fields) sfields.Add(new SourceField(field, "text", true, sfieldSeqCount++));
                }
            }
            catch (Exception ex)
            {
            }

            return new ObjectResult(sfields);
        }

        [Route("RunMapping")]
        [HttpPost]
        public async Task<FileResult> RunMapping(IFormCollection form)
        {
            var bytes = new byte[0];

            try
            {
                // Get form info
                var mapId = Convert.ToInt32(form["mapId"]);
                var evalConditions = Convert.ToBoolean(form["evalConditions"]);
                var outputDelimiter = form["outputDelimiter"];

                var success = false;

                this._helpers.SetLogFile("test");

                var stopwatch = Stopwatch.StartNew();

                // Get formatted data from the uploaded files
                var sourceTables = await Task.Run(() => this._helpers.GetSourceTables(form));

                // Get list of transformations for map
                var transformations = await Task.Run(() => this._helpers.GetMapTransformations(mapId));

                // Get the id of the primary source
                var primarySourceId = await Task.Run(() => this._helpers.GetPrimarySourceId(ref form));

                // Get field counts for primary table
                var lineCount = sourceTables[primarySourceId].SourceVals.Length;
                var primaryFieldCount = sourceTables[primarySourceId].SourceFields.Count;

                // Get target tables
                var targetTables =
                    await
                        Task.Run(
                            () =>
                                this._helpers.GetTargetTables(
                                    ref transformations,
                                    primarySourceId,
                                    lineCount,
                                    primaryFieldCount));

                var targetId = targetTables.Keys.ToList()[0];

                // Apply transformations 
                success =
                    await
                        Task.Run(
                            () =>
                                this._helpers.TransformMapToFile(
                                    ref sourceTables,
                                    ref targetTables,
                                    ref transformations,
                                    primarySourceId,
                                    lineCount,
                                    primaryFieldCount,
                                    targetId,
                                    evalConditions));

                // Create new memory stream to return
                bytes = this._helpers.GetTargetBytes(ref targetTables, targetId, outputDelimiter);

                stopwatch.Stop();

                // return result;    
            }
            catch (Exception ex)
            {
            }

            return this.File(bytes, "application/octet-stream", "test.csv");
        }
    }
}