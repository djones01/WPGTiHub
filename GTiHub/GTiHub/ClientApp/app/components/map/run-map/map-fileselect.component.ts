import { Component, OnInit, Input } from "@angular/core";
import { Validators, FormGroup, FormArray } from '@angular/forms';
import { RunMapService } from "../../../services/map-runmap.service";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { IMap } from "../map";
import { IFilePackage } from "./filepackage";

@Component({
    selector: "map-fileselect",
    template: require("./map-fileselect.component.html"),
    styles: [require("./map-fileselect.component.css")]
})
export class MapFileSelectComponent implements OnInit {
    @Input('group') fileForm: FormGroup;
    @Input('filePackageCount') filePackageCount: number;
    @Input('sourceName') sourceName: string;
    @Input('sourceDescription') sourceDescription: string;
    @Input('uploader') uploader: FileUploader;
    

    onFileChange(event) {
        const control = <FormGroup>this.fileForm.controls['file'];
        control.setValue((event.srcElement || event.target).files[0]);
    }

    ////Set all other filepackages to be non primary - WORKAROUND
    //primaryChanged(filePackage: FilePackage) {
    //    filePackage.isPrimarySource = true;
    //    const others = this.filePackages.filter(el => (el != filePackage));
    //    others.forEach(function(fp) {
    //        fp.isPrimarySource = false;
    //    });
    //}

    //fileChangeEvent(sourceId: number, i: number) {
    //    let sId = sourceId.toString();
    //    //Remove items from the queue which have duplicate source IDs as the one being added
    //    this.uploader.queue.forEach(fi => {
    //        if (fi.alias === sId) {
    //            this.uploader.removeFromQueue(fi);
    //            i--;
    //        }
    //    });
    //    this.uploader.queue[i].alias = sourceId.toString();
    //}

    constructor(private runMapService: RunMapService) {}

    ngOnInit() {
        
    }
}