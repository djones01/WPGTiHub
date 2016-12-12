import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";
import { UploadService } from "./file-upload.service";
import { IFilePackage } from "../components/map/run-map/filepackage";
import { IMap } from "../components/map/map";

@Injectable()
export class RunMapService {
    // Array of FilePackages which will be appended to formdata
    private _filePackages = new BehaviorSubject<IFilePackage[]>([]);
    filePackages: Observable<IFilePackage[]> = this._filePackages.asObservable();
    
    private _selectedMapId = new BehaviorSubject<number>(null);
    selectedMapId: Observable<number> = this._selectedMapId.asObservable(); 

    // On changing selected mapping
    initFilePackages(mapId: number) {
        var filepackages = new Array<IFilePackage>();
        this._dataService.Get("Maps/MapSources", mapId)
            .subscribe(sources => {
                sources.forEach(function(source) {
                    filepackages.push({
                        isPrimarySource: false,
                        sourceId: source["sourceId"],
                        sourceName: source["name"],
                        sourceDescription: source["description"],
                        firstRowHeader: true,
                        altHeadRow: 1,
                        delimiter: "",
                        file: null
                    });
                });
                if (filepackages.length == 1) {
                    filepackages[0].isPrimarySource = true;
                }
                this._filePackages.next(filepackages);
                this._selectedMapId.next(mapId);
            });
    }

    uploadAll(formValues: any) {
        let formData = new FormData();
        let options = formValues["options"];
        let filePackages = formValues['filePackages'] as IFilePackage[];
        filePackages.forEach((fp, i) => {
            formData.append("primary-" + fp.sourceId, fp.isPrimarySource);
            formData.append("firstRowIsHeader-" + fp.sourceId, fp.firstRowHeader);
            formData.append("altHeadRow-" + fp.sourceId, fp.altHeadRow);
            formData.append("delimiter-" + fp.sourceId, fp.delimiter);
            formData.append(fp.sourceId, fp.file, fp.file.name);
        });
        formData.append("mapId", this._selectedMapId.getValue());
        formData.append("evalConditions", options["evalConditions"]);
        formData.append("outputDelimiter", (options["outputDelimiter"] == "" ? "," : options["outputDelimiter"]));

        return this.uploadService.makeFileRequestFd("File/RunMapping", formData)
            .map(res => new Blob([res], { type: this.getMimeType(options["fileExt"]) }));

        //var xhr = new XMLHttpRequest();

        ////Need to use self in callback to have access to "this"
        //var self = this;
        ////MIME type of the returned file
        //let mimetype = "";
        //let fileName = "";

        //xhr.onreadystatechange = function(e) {
        //    if (xhr.readyState == 4) {
        //        self.setProcessing(false);
        //        //Check the user set value of the file extension and set type 
        //        switch (self.fileExt) {
        //        case "csv":
        //            mimetype = "text/csv";
        //            break;
        //        case "txt":
        //            mimetype = "text/plain";
        //            break;
        //        case "dat":
        //            mimetype = "application/octet-stream";
        //            break;
        //        default:
        //            mimetype = "text/plain";
        //            break;
        //        }

        //        // Create a new Blob object using the response data of the onload object
        //        const blob = new Blob([this.response], { type: mimetype });
        //        const a = document.createElement("a");
        //        a.style.display = "none";
        //        document.body.appendChild(a);
        //        //Create a DOMString representing the blob and point the link element towards it
        //        const url = window.URL.createObjectURL(blob);
        //        a.href = url;

        //        //Set the name of the returned file
        //        if (self.fileName != "") {
        //            if (self.fileExt != "") {
        //                fileName = self.fileName + "." + self.fileExt;
        //            } else {
        //                fileName = self.fileName + ".txt";
        //            }
        //        } else {
        //            fileName = "output.txt";
        //        }
        //        a.setAttribute("download", fileName);
        //        //programatically click the link to trigger the download
        //        a.click();
        //        //release the reference to the file by revoking the Object URL
        //        window.URL.revokeObjectURL(url);
        //        document.body.removeChild(a);
        //    } else {
        //        //deal with error state here
        //    }
        //};

        //xhr.open("POST", "api/File/RunMapping", true);
        //xhr.send(formData);
        //this.setProcessing(true);
    }

    getMimeType(fileExt: string) {
        switch (fileExt) {
            case "csv":
                return "text/csv";
            case "txt":
                return "text/plain";
            case "dat":
                return "application/octet-stream";
            default:
                return "text/plain";
        }
    }

    constructor(private _dataService: DataService, private uploadService: UploadService) {}
}