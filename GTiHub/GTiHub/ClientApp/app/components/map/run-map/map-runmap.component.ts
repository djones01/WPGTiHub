import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Response } from "@angular/http";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { MapFileSelectComponent } from "./map-fileselect.component";
import { MapOptionsComponent } from "./map-options.component";
import { RunMapService } from "../../../services/map/map-runmap.service";
import { MapService } from "../../../services/map/map.service";
import { IFilePackage } from "./filepackage";
import { IMap } from "../map";

@Component({
    selector: "map-runmap",
    template: require("./map-runmap.component.html"),
    styles: [require("./map-runmap.component.css")],
    providers: [RunMapService]
})
export class RunMapComponent implements OnInit {
    //List of maps for map selection dropdown
    maps: IMap[];
    filePackages: IFilePackage[];

    uploader: FileUploader;

    processingMap: boolean = false;

    //Form for the file selection controls and options
    mapRunForm: FormGroup;
    filePackageCount: number = 0;

    onMapChange(mapId: number) {
        this.runMapService.initFilePackages(mapId);
        this.runMapService.filePackages.subscribe(filePackages => {
            this.initMapRunForm();
            this.populateFilePackages(filePackages);
            this.filePackages = filePackages;
        });
    }

    resetFilePackages() {
        const control = <FormArray>this.mapRunForm.controls['filePackages'];
        control.reset([]);
    }

    populateFilePackages(filePackages: IFilePackage[]) {
        if (filePackages) {
            const control = <FormArray>this.mapRunForm.controls['filePackages'];
            this.resetFilePackages();
            for (let i = 0; i < filePackages.length; i++) {
                this.addFilePackage();
                control.at(i).patchValue(filePackages[i]);
            }
            this.filePackageCount = filePackages.length;
        }
    }

    primarySourceChanged(event) {
        const fileForms = <FormArray>this.mapRunForm.controls['filePackages'];
        for (let i = 0; i < fileForms.length; i++) {
            let fileForm = <FormGroup>fileForms.at(i);
            let fpSid = (<FormGroup>fileForm.controls['sourceId']).value
            if (fpSid != event.value) {
                fileForm.patchValue({
                    "isPrimarySource": false
                });
            }
        }
    }

    initMapRunForm() {
        this.mapRunForm = this._fb.group({
            filePackages: this._fb.array([]),
            options: this._fb.group({               
                evalConditions: [true],
                checkTypes: [true],
                fileName: ['', Validators.required],
                fileExt: ['', Validators.required],
                outputDelimiter: [',']
            })
        });
    }

    initFilePackageGroup() {
        return this._fb.group({
            sourceId: [null],
            isPrimarySource: [false, Validators.required],
            firstRowHeader: [true],
            altHeadRow: [''],
            delimiter: ['', Validators.required],
            file: [null, Validators.required]
        });
    }

    addFilePackage() {
        const control = <FormArray>this.mapRunForm.controls['filePackages'];
        control.push(this.initFilePackageGroup());
    }

    onSubmit(mapRunForm: any) {
        let formData = new FormData();
        let options = mapRunForm["options"];
        let filePackages = mapRunForm['filePackages'] as IFilePackage[];
        filePackages.forEach((fp, i) => {
            formData.append("primary-" + fp.sourceId, fp.isPrimarySource);
            formData.append("firstRowIsHeader-" + fp.sourceId, fp.firstRowHeader);
            formData.append("altHeadRow-" + fp.sourceId, fp.altHeadRow);
            formData.append("delimiter-" + fp.sourceId, fp.delimiter);
            formData.append(fp.sourceId, fp.file, fp.file.name);
        });
        let selectedMapId = -1;
        this.runMapService.selectedMapId.subscribe(selectedId => selectedMapId = selectedId);
        formData.append("mapId", selectedMapId);
        formData.append("evalConditions", options["evalConditions"]);
        formData.append("outputDelimiter", (options["outputDelimiter"] == "" ? "," : options["outputDelimiter"]));

        var xhr = new XMLHttpRequest();

        //MIME type of the returned file
        let mimetype = this.runMapService.getMimeType(options['fileExt']);
        let fileName = options["fileName"] + '.' + options['fileExt'];

        var self = this;
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4) {
                // Create a new Blob object using the response data of the onload object
                const blob = new Blob([this.response], { type: mimetype });
                const a = document.createElement("a");
                a.style.display = "none";
                document.body.appendChild(a);
                //Create a DOMString representing the blob and point the link element towards it
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.setAttribute("download", fileName);
                //programatically click the link to trigger the download
                a.click();
                //release the reference to the file by revoking the Object URL
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                self.processingMap = false;
            } else {
                //deal with error state here
            }
        };

        xhr.open("POST", "api/File/RunMapping", true);
        xhr.send(formData);
        this.processingMap = true;
    } 

    constructor(private _fb: FormBuilder, private runMapService: RunMapService, private mapService: MapService) {
        this.uploader = new FileUploader({ url: "api/File/RunMapping" });
    }

    ngOnInit() {
        this.initMapRunForm();
        this.mapService.maps.subscribe(maps => this.maps = maps);
    }
}