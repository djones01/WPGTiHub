namespace GTiHub.API
{
    #region

    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    using GTiHub.API.File_Handling;
    using GTiHub.Models.EntityModel;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;

    using NCalc;

    using Serilog;

    #endregion

    /// <summary>
    /// Interface for TransformHelpers
    /// </summary>
    public interface ITransformHelpers
    {
        void ApplyFallbacks(
            ref Dictionary<int, SourceInfo> sourceTables,
            ref Dictionary<int, TargetInfo> targetTables,
            ref List<Transformation> transformations,
            int primarySourceId,
            int lineCount,
            int primaryFieldCount,
            int targetId);

        void ApplyTransformations(
            ref Dictionary<int, SourceInfo> sourceTables,
            ref Dictionary<int, TargetInfo> targetTables,
            ref List<Transformation> transformations,
            int primarySourceId,
            int lineCount,
            int primaryFieldCount,
            int targetId,
            bool applyConditions);

        bool ComparePrimSourceTarget(int primarySourceId, int targetId);

        List<Transformation> GetMapTransformations(int mapId);

        int GetPrimarySourceId(ref IFormCollection form);

        Dictionary<int, SourceInfo> GetSourceTables(IFormCollection form);

        byte[] GetTargetBytes(ref Dictionary<int, TargetInfo> targetTables, int targetId, string outputDelimiter);

        Dictionary<int, TargetInfo> GetTargetTables(
            ref List<Transformation> transformations,
            int primarySourceId,
            int lineCount,
            int primaryFieldCount);

        Task<string[]> ReadAllLinesAsync(StreamReader reader, Encoding encoding);

        // Logging methods
        void SetLogFile(string fileName);

        // Transformation methods
        bool TransformMapToFile(
            ref Dictionary<int, SourceInfo> sourceTables,
            ref Dictionary<int, TargetInfo> targetTables,
            ref List<Transformation> transformations,
            int primarySourceId,
            int lineCount,
            int primaryFieldCount,
            int targetId,
            bool applyConditions);
    }

    /// <summary>
    /// Implement ITransformHelpers
    /// </summary>
    public class TransformHelpers : ITransformHelpers
    {
        private readonly GTiHubContext _dbContext;

        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly ILogger<TransformHelpers> _logger;

        public TransformHelpers(
            GTiHubContext _dbContext,
            ILogger<TransformHelpers> _logger,
            IHostingEnvironment _hostingEnvironment)
        {
            this._dbContext = _dbContext;
            this._logger = _logger;
            this._hostingEnvironment = _hostingEnvironment;
        }

        public void ApplyFallbacks(
            ref Dictionary<int, SourceInfo> sourceTables,
            ref Dictionary<int, TargetInfo> targetTables,
            ref List<Transformation> transformations,
            int primarySourceId,
            int lineCount,
            int primaryFieldCount,
            int targetId)
        {
            Log.Information(
                "Begin searching for fallbacks in Primary Source: {PrimarySourceId} for unpopulated Target fields in Target: {TargetId}",
                primarySourceId,
                targetId);

            try
            {
                var fieldList = new List<string>(targetTables[targetId].TargetFields.Keys);
                var targetFieldIndex = -1;
                var sourceFieldIndex = -1;

                // Check all target fields in the target table to see if they are populated or not
                foreach (var field in fieldList)
                    if (!targetTables[targetId].TargetFields[field].Populated)
                        if (sourceTables[primarySourceId].SourceFields.ContainsKey(field)
                            || sourceTables[primarySourceId].SourceFields.ContainsKey(field.ToUpper())
                            || sourceTables[primarySourceId].SourceFields.ContainsKey(field.ToLower()))
                        {
                            targetFieldIndex = targetTables[targetId].TargetFields[field].FieldIndex;
                            sourceFieldIndex = sourceTables[primarySourceId].SourceFields[field];

                            // Loop through all lines in the array corresponding to the rule field's sourcefield and prepend, append, and format as needed, then add to output table
                            for (var i = 0; i < lineCount; i++)
                                targetTables[targetId].TargetVals[i][targetFieldIndex] =
                                    sourceTables[primarySourceId].SourceVals[i][sourceFieldIndex];
                        }
                        else
                        {
                            Log.Warning("Unable to find field in Primary Source matching {Field}", field);
                        }
            }
            catch (Exception ex)
            {
                Log.Error(
                    ex,
                    "Error encountered while applying fallbacks with Primary Source: {PrimarySourceId} and Target: {TargetId}",
                    primarySourceId,
                    targetId);
            }
        }

        /// <summary>
        /// Applies a set of transformations to the given source tables and copies columns to targets
        /// </summary>
        /// <param name="sourceTables">Collection of source tables and their associated header data</param>
        /// <param name="output">Reference to output arrays</param>
        /// <param name="transformations">Collection of transformations which correspond to a map</param>
        /// <param name="primarySourceId">Id of the primary source</param>
        /// <param name="lineCount">Number of lines in the primary source</param>
        /// <param name="primaryFieldCount">Number of Fields in the primary source</param>
        public void ApplyTransformations(
            ref Dictionary<int, SourceInfo> sourceTables,
            ref Dictionary<int, TargetInfo> targetTables,
            ref List<Transformation> transformations,
            int primarySourceId,
            int lineCount,
            int primaryFieldCount,
            int targetId,
            bool applyConditions)
        {
            Log.Information(
                "Begin applying Transformations with Primary Source: {PrimarySourceId} and Target: {TargetId}",
                primarySourceId,
                targetId);

            try
            {
                var sourceFieldName = string.Empty;
                var targetFieldName = string.Empty;
                var sourceFieldIndex = -1;
                var targetFieldIndex = -1;
                var resultString = string.Empty;
                int sourceFieldSourceId;

                // Local vars for condition evals
                var expr = string.Empty;
                var parameters = new List<Parameter>();
                Expression expression = null;
                var conditionPass = false;

                // Operate on the output for each transformation
                foreach (var transform in transformations)
                {
                    // If the user has set "Apply Conditions" to true, init tokens
                    if (applyConditions)
                    {
                        expr = CondEvalHelpers.ExprFromConditions(
                            transform.Conditions.OrderBy(x => x.SeqNum).ToList(),
                            ref parameters);
                        expression = new Expression(expr);
                    }

                    var ruleSourceFields = transform.Rule.RuleSourceFields.ToList();
                    targetFieldName = transform.Rule.TargetField.Name;
                    targetFieldIndex = targetTables[targetId].TargetFields[targetFieldName].FieldIndex;

                    switch (transform.Rule.Rule_Operation)
                    {
                        case "sfield":

                            // Loop through all available rule fields and copy to intermediate vals
                            foreach (var ruleSourceField in ruleSourceFields)
                            {
                                sourceFieldName = ruleSourceField.SourceField.Name;
                                sourceFieldSourceId = ruleSourceField.SourceField.SourceId;

                                if (sourceTables[sourceFieldSourceId].SourceFields.ContainsKey(sourceFieldName))
                                {
                                    sourceFieldIndex = sourceTables[sourceFieldSourceId].SourceFields[sourceFieldName];

                                    // Loop through all lines in the source array corresponding to the rule field's sourcefield and prepend, append, and format as needed, then add to output table
                                    for (var i = 0; i < lineCount; i++)
                                        if (applyConditions)
                                        {
                                            // Get parameters from all of the source tables
                                            expression = CondEvalHelpers.GetExpressionParams(
                                                parameters,
                                                ref sourceTables,
                                                expression,
                                                i);
                                            if (expression.HasErrors()) conditionPass = false;
                                            else conditionPass = Convert.ToBoolean(expression.Evaluate());

                                            if (conditionPass)
                                            {
                                                // Transform
                                                resultString = ruleSourceField.Prepend
                                                               + sourceTables[sourceFieldSourceId].SourceVals[i][
                                                                   sourceFieldIndex] + ruleSourceField.Append;
                                                targetTables[targetId].TargetVals[i][targetFieldIndex] =
                                                    targetTables[targetId].TargetVals[i][targetFieldIndex]
                                                    + resultString;
                                            }
                                            else
                                            {
                                                targetTables[targetId].TargetVals[i][targetFieldIndex] = string.Empty;
                                            }
                                        }
                                        else
                                        {
                                            // Transform without checking condition
                                            resultString = ruleSourceField.Prepend
                                                           + sourceTables[sourceFieldSourceId].SourceVals[i][
                                                               sourceFieldIndex] + ruleSourceField.Append;
                                            targetTables[targetId].TargetVals[i][targetFieldIndex] =
                                                targetTables[targetId].TargetVals[i][targetFieldIndex] + resultString;
                                        }

                                    // Set the column to populated
                                    targetTables[targetId].TargetFields[targetFieldName].Populated = true;
                                }
                                else
                                {
                                    Log.Information(
                                        "Unable to find rule field {SourceFieldName} in source tables, fallback will be applied",
                                        sourceFieldName);
                                }
                            }

                            break;

                        case "assign":

                            break;

                        case "text":

                            // Loop through all lines in the array corresponding to the rule field's sourcefield and set to the text values
                            for (var i = 0; i < lineCount; i++)
                                targetTables[targetId].TargetVals[i][targetFieldIndex] =
                                    targetTables[targetId].TargetVals[i][targetFieldIndex] + transform.Rule.Rule_Value;

                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(
                    ex,
                    "Error encountered while applying Transformations with Primary Source: {PrimarySourceId} and Target: {TargetId}",
                    primarySourceId,
                    targetId);
            }
        }

        /// <summary>
        /// Compares the number of primary source fields to target fields
        /// </summary>
        /// <param name="primarySourceId"></param>
        /// <param name="targetId"></param>
        /// <returns>Whether the number of sourcefields in the primary source is the same as the target</returns>
        public bool ComparePrimSourceTarget(int primarySourceId, int targetId)
        {
            var primaryCount = 0;
            var targetCount = 0;
            try
            {
                // Short way to count without returning all entities
                primaryCount =
                    (from s in this._dbContext.Sources
                     where s.SourceId == primarySourceId
                     from sf in s.SourceFields
                     select sf).Count();
                targetCount =
                    (from t in this._dbContext.Targets where t.TargetId == targetId from tf in t.TargetFields select tf)
                        .Count();
            }
            catch (Exception ex)
            {
                Log.Error(
                    ex,
                    "Error while comparing Primary Source: {PrimarySourceId} to Target: {TargetId}",
                    primarySourceId,
                    targetId);
            }

            return primaryCount == targetCount;
        }

        /// <summary>
        /// Gets the set of transformations for a given mapId
        /// </summary>
        /// <param name="mapId"></param>
        /// <returns>List of Transformations for a given Map</returns>
        public List<Transformation> GetMapTransformations(int mapId)
        {
            return
                this._dbContext.Transformations.Where(x => x.MapId == mapId)
                    .Include(transform => transform.Conditions)
                    .ThenInclude(condition => condition.SourceField)
                    .Include(transform => transform.Rule.TargetField.Target)
                    .Include(transform => transform.Rule.RuleSourceFields)
                    .ThenInclude(ruleSourceField => ruleSourceField.SourceField)
                    .ToList();
        }

        /// <summary>
        /// Get the primary source id from form
        /// </summary>
        /// <param name="form"></param>
        /// <returns>ID of the primary source</returns>
        public int GetPrimarySourceId(ref IFormCollection form)
        {
            // Determine which source has been marked as primary
            var primarySourceId = -1;

            try
            {
                foreach (var file in form.Files) if (Convert.ToBoolean(form["primary-" + file.Name])) primarySourceId = Convert.ToInt32(file.Name);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error encountered while getting the primary source id");
            }

            return primarySourceId;
        }

        /// <summary>
        /// Gets the dictionary of source names with their arrays of values
        /// </summary>
        /// <param name="form">Form collection</param>
        /// <returns>Dictionary of source values indexed by source ID and containing one or multiple SourceInfo objects</returns>
        public Dictionary<int, SourceInfo> GetSourceTables(IFormCollection form)
        {
            Log.Information("Begin getting Source values from files");

            // Stores source values in jagged string array with an associated dictionary of header names and indeces.
            var sourcesVals = new Dictionary<int, SourceInfo>();

            try
            {
                Parallel.ForEach(
                    form.Files,
                    async file =>
                        {
                            var sourceId = Convert.ToInt32(file.Name);
                            var sourceFields = new Dictionary<string, int>();

                            // Get form info pertinent to current file
                            var delimiter = Convert.ToChar(form["delimiter-" + sourceId]);
                            var firstRowIsHeader = Convert.ToBoolean(form["firstRowHeader-" + sourceId]);
                            var altHeadRow = 0;
                            if (!firstRowIsHeader) altHeadRow = Convert.ToInt32(form["altHeadRow-" + sourceId]) - 1;

                            using (var buffer = new BufferedStream(file.OpenReadStream()))
                            {
                                using (var reader = new StreamReader(buffer))
                                {
                                    Log.Information(
                                        "Begin reading lines from file with Source Id: {SourceId}",
                                        sourceId);
                                    var lines = await this.ReadAllLinesAsync(reader, Encoding.UTF8);
                                    Log.Information(
                                        "Finished reading lines from file with Source Id: {SourceId}",
                                        sourceId);

                                    string[] splitline;

                                    // Get the number of header fields
                                    splitline =
                                        lines[altHeadRow++].Trim()
                                            .Replace("\r", string.Empty)
                                            .Replace("\n", string.Empty)
                                            .Split(delimiter);
                                    var headerCount = splitline.Length;
                                    var adjustedLineCount = lines.Length - altHeadRow;

                                    var sourceTable = new string[adjustedLineCount][];

                                    // Initialize inner string array
                                    for (var z = 0; z < adjustedLineCount; z++) sourceTable[z] = new string[headerCount];

                                    for (var z = 0; z < headerCount; z++) sourceFields.Add(splitline[z], z);

                                    // Get the data from the file and put it in string array, start reading at altHeadRow
                                    for (var i = 0; i < adjustedLineCount; i++)
                                    {
                                        splitline =
                                            lines[altHeadRow++].Trim()
                                                .Replace("\r", string.Empty)
                                                .Replace("\n", string.Empty)
                                                .Split(delimiter);
                                        for (var j = 0; j < headerCount; j++) sourceTable[i][j] = splitline[j];
                                    }

                                    sourcesVals.Add(sourceId, new SourceInfo(sourceFields, sourceTable));
                                }
                            }
                        });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error encountered while getting Source tables from files");
            }

            return sourcesVals;
        }

        /// <summary>
        /// Gets an array of bytes from a set of TargetTables
        /// </summary>
        /// <param name="targetTables">Target table(s) that can convert</param>
        /// <param name="targetId">Id of the target table to convert</param>
        /// <param name="outputDelimiter">Delimiter for the file output</param>
        /// <returns>Array of bytes for one target table</returns>
        public byte[] GetTargetBytes(ref Dictionary<int, TargetInfo> targetTables, int targetId, string outputDelimiter)
        {
            Log.Information("Begin getting the byte stream of Target: {TargetId}", targetId);

            byte[] bytes = null;
            try
            {
                var combined = new StringBuilder();
                var targetInfo = targetTables[targetId];

                // Add headers
                var fieldList = new List<string>(targetTables[targetId].TargetFields.Keys).ToArray();
                combined.AppendLine(string.Join(outputDelimiter, fieldList));

                // Add everything else
                for (var i = 0; i < targetInfo.TargetVals.Length; i++) combined.AppendLine(string.Join(outputDelimiter, targetInfo.TargetVals[i]));

                // Get byte array
                bytes = Encoding.UTF8.GetBytes(combined.ToString());
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error encountered while getting bytes for Target: {TargetId}", targetId);
            }

            return bytes;
        }

        /// <summary>
        /// Gets a dictionary of TargetFields and their corresponding indexes for a target
        /// </summary>
        /// <param name="targetId"></param>
        /// <returns>TargetTable for a given target</returns>
        public Dictionary<int, TargetInfo> GetTargetTables(
            ref List<Transformation> transformations,
            int primarySourceId,
            int lineCount,
            int primaryFieldCount)
        {
            Log.Information("Begin creating Target tables(s) for output");

            var targetInfo = new Dictionary<int, TargetInfo>();

            try
            {
                // Check if the target has the same number of fields as the primary source
                // TODO - add support for multiple target files
                var targetId = transformations[0].Rule.TargetField.TargetId;

                // Not the same number of source and target fields
                if (!this.ComparePrimSourceTarget(primarySourceId, targetId)) return null;

                // Create a jagged output array the same size as the primary source jagged array.
                var targetVals = new string[lineCount][];

                // Initialize inner string arrays for output
                for (var i = 0; i < lineCount; i++) targetVals[i] = new string[primaryFieldCount];

                var targetFields =
                    this._dbContext.TargetFields.Where(x => x.TargetId == targetId).OrderBy(x => x.SeqNum).ToList();
                var targetFieldsDict = new Dictionary<string, TargetFieldInfo>();
                for (var i = 0; i < targetFields.Count; i++) targetFieldsDict.Add(targetFields[i].Name, new TargetFieldInfo(i, false));

                targetInfo[targetId] = new TargetInfo(targetFieldsDict, targetVals);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error encountered while getting Target tables");
            }

            return targetInfo;
        }

        /// <summary>
        /// Read lines asynchronously
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="encoding"></param>
        /// <returns>An array containing all lines read from a file</returns>
        public async Task<string[]> ReadAllLinesAsync(StreamReader reader, Encoding encoding)
        {
            var lines = new List<string>();

            try
            {
                using (var rdr = reader)
                {
                    string line;
                    while ((line = await rdr.ReadLineAsync()) != null) lines.Add(line);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error encountered while reading lines from file");
            }

            return lines.ToArray();
        }

        public void SetLogFile(string fileName)
        {
            Log.Logger =
                new LoggerConfiguration().WriteTo.RollingFile(
                        this._hostingEnvironment.ContentRootPath + "/Logs/" + fileName + ".log",
                        outputTemplate:
                        "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} {SourceContext} [{Level}] {Message}{NewLine}{Exception}")
                    .CreateLogger()
                    .ForContext<TransformHelpers>();
        }

        /// <summary>
        /// Transform a given set of source tables which have been read in by using the given transformations
        /// </summary>
        /// <param name="sourceTables">Arrays of source values and their associated Fields</param>
        /// <param name="transformations">Transformations to be applied to sources</param>
        /// <returns>Whether or not we were able to successfully transform the map</returns>
        public bool TransformMapToFile(
            ref Dictionary<int, SourceInfo> sourceTables,
            ref Dictionary<int, TargetInfo> targetTables,
            ref List<Transformation> transformations,
            int primarySourceId,
            int lineCount,
            int primaryFieldCount,
            int targetId,
            bool applyConditions)
        {
            // Apply all transformations
            this.ApplyTransformations(
                ref sourceTables,
                ref targetTables,
                ref transformations,
                primarySourceId,
                lineCount,
                primaryFieldCount,
                targetId,
                applyConditions);

            // Copy over fields from primary source to target which are not covered by rules
            this.ApplyFallbacks(
                ref sourceTables,
                ref targetTables,
                ref transformations,
                primarySourceId,
                lineCount,
                primaryFieldCount,
                targetId);

            return true;
        }
    }

    public class TargetInfo
    {
        public TargetInfo(Dictionary<string, TargetFieldInfo> targetFields, string[][] targetVals)
        {
            this.TargetFields = targetFields;
            this.TargetVals = targetVals;
        }

        public Dictionary<string, TargetFieldInfo> TargetFields { get; set; }

        public string[][] TargetVals { get; set; }
    }

    public class TargetFieldInfo
    {
        public TargetFieldInfo(int fieldIndex, bool populated)
        {
            this.FieldIndex = fieldIndex;
            this.Populated = populated;
        }

        public int FieldIndex { get; set; }

        public bool Populated { get; set; }
    }

    public class SourceInfo
    {
        public SourceInfo(Dictionary<string, int> sourceFields, string[][] sourceVals)
        {
            this.SourceFields = sourceFields;
            this.SourceVals = sourceVals;
        }

        public Dictionary<string, int> SourceFields { get; set; }

        public string[][] SourceVals { get; set; }
    }
}