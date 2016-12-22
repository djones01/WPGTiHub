import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormArray } from '@angular/forms';
import { RunMapService } from "../../../services/map/map-runmap.service";
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

    @Output('primarySourceChanged') primarySourceChanged = new EventEmitter();

    onFileChange(event) {
        const control = <FormGroup>this.fileForm.controls['file'];
        control.setValue((event.srcElement || event.target).files[0]);
    }

    onPrimarySourceChange() {
        let sourceId = (<FormGroup>this.fileForm.controls['sourceId']).value; 
        this.primarySourceChanged.emit({
            value: sourceId
        });
    }

    constructor(private runMapService: RunMapService) {}

    ngOnInit() {
        
    }
}