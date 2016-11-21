import { Component, OnInit, OnDestroy } from "@angular/core";
import { RunMapService } from "../../../services/map-runmap.service";
import { Subscription } from "rxjs/Subscription";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { Map } from "../map";
import { FilePackage } from "./filepackage";

@Component({
    selector: "map-fileselect",
    template: require("./map-fileselect.component.html")
})
export class MapFileSelectComponent implements OnInit, OnDestroy {
    //Array for file packages
    filePackages: FilePackage[];
    uploader: FileUploader;
    selectedMapId: number;
    processingMap = false;
    lastUsedSourceId: number;

    //Model values for generation options
    fileName: string;
    fileExt: string;
    outputDelimiter = ",";
    logFileName: string;
    checkCells: boolean;
    evalConditions: boolean;

    //Subscriptions
    filePackageSubscription: Subscription;
    selectedMapIdSubscription: Subscription;

    //Set all other filepackages to be non primary - WORKAROUND
    primaryChanged(filePackage: FilePackage) {
        filePackage.isPrimarySource = true;
        const others = this.filePackages.filter(el => (el != filePackage));
        others.forEach(function(fp) {
            fp.isPrimarySource = false;
        });
    }

    fileChangeEvent(sourceId: number, i: number) {
        let sId = sourceId.toString();
        //Remove items from the queue which have duplicate source IDs as the one being added
        this.uploader.queue.forEach(fi => {
            if (fi.alias === sId) {
                this.uploader.removeFromQueue(fi);
                i--;
            }
        });
        this.uploader.queue[i].alias = sourceId.toString();
    }

    uploadAll() {
        const formData = new FormData();
        const fileList = this.uploader.queue;
        let filePackage: FilePackage;
        let i: number;
        let j: number;
        for (i = 0; i < fileList.length; i++) {
            const fileItem = fileList[i];
            //Find the corresponding file package
            for (j = 0; j < this.filePackages.length; j++) {
                if (this.filePackages[j].sourceId.toString() == fileItem.alias) {
                    filePackage = this.filePackages[j];
                }
            }
            formData.append(`primary-${filePackage.sourceId}`, filePackage.isPrimarySource);
            formData.append(`firstRowIsHeader-${filePackage.sourceId}`, filePackage.firstRowHeader);
            formData.append(`altHeadRow-${filePackage.sourceId}`, filePackage.altHeadRow);
            formData.append(`delimiter-${filePackage.sourceId}`, filePackage.delimiter);
            formData.append(filePackage.sourceId, fileItem._file, fileItem.file.name);
        }
        formData.append("mapId", this.selectedMapId);
        formData.append("evalConditions", this.evalConditions);
        formData.append("outputDelimiter", (this.outputDelimiter == "" ? "," : this.outputDelimiter));

        var xhr = new XMLHttpRequest();

        //Need to use self in callback to have access to "this"
        var self = this;
        //MIME type of the returned file
        let mimetype = "";
        let fileName = "";

        xhr.onreadystatechange = function(e) {
            if (xhr.readyState == 4) {
                self.setProcessing(false);
                //Check the user set value of the file extension and set type 
                switch (self.fileExt) {
                case "csv":
                    mimetype = "text/csv";
                    break;
                case "txt":
                    mimetype = "text/plain";
                    break;
                case "dat":
                    mimetype = "application/octet-stream";
                    break;
                default:
                    mimetype = "text/plain";
                    break;
                }

                // Create a new Blob object using the response data of the onload object
                const blob = new Blob([this.response], { type: mimetype });
                const a = document.createElement("a");
                a.style.display = "none";
                document.body.appendChild(a);
                //Create a DOMString representing the blob and point the link element towards it
                const url = window.URL.createObjectURL(blob);
                a.href = url;

                //Set the name of the returned file
                if (self.fileName != "") {
                    if (self.fileExt != "") {
                        fileName = self.fileName + "." + self.fileExt;
                    } else {
                        fileName = self.fileName + ".txt";
                    }
                } else {
                    fileName = "output.txt";
                }
                a.setAttribute("download", fileName);
                //programatically click the link to trigger the download
                a.click();
                //release the reference to the file by revoking the Object URL
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                //deal with error state here
            }
        };

        xhr.open("POST", "api/File/RunMapping", true);
        xhr.send(formData);
        this.setProcessing(true);
    }

    setProcessing(processing: boolean) {
        this.processingMap = processing;
    }

    constructor(private runMapService: RunMapService) {
        this.uploader = new FileUploader({ url: "api/File/RunMapping" });
        this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: any) => {
            var res = JSON.parse(response);
        };
    }

    ngOnInit() {
        this.filePackageSubscription = this.runMapService.getFilePackages()
            .subscribe(filePackages => this.filePackages = filePackages);
        this.selectedMapIdSubscription = this.runMapService.getSelectedMapId()
            .subscribe(selectedMapId => this.selectedMapId = selectedMapId);
    }

    ngOnDestroy() {
        this.filePackageSubscription.unsubscribe();
        this.selectedMapIdSubscription.unsubscribe();
    }
}