import { Component, ViewChild, Input } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { FileUploader, FileSelectDirective } from "ng2-file-upload";

@Component({
    selector: "srcfld-edit",
    template: require('./srcfld-edit.component.html')
})
export class SrcFldEditComponent {
    //Control the template / manual header boxes
    sopt = true;
    sfieldCount: number = 0;
    private uploader: FileUploader;
    private delimiter: string = "";

    @Input('group')
    srcFldsForm: FormGroup;

    private options = [
        { value: "url", display: "URL" },
        { value: "text", display: "Text" },
        { value: "date", display: "Date" },
        { value: "bool", display: "Boolean" },
        { value: "num", display: "Number" },
        { value: "currency", display: "Currency" },
        { value: "email", display: "Email" }
    ];

    extractFile() {
        this.uploader.onBuildItemForm = (item, form) => {
            form.append("delimiter", this.delimiter);
        };
        this.uploader.uploadAll();
        this.delimiter = "";
        this.uploader.clearQueue();
    }

    constructor() {
        this.uploader = new FileUploader({ url: "api/File/ExtractHeaders" });
        this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: any) => {
            var res = JSON.parse(response);
           // this.sourceAddEditService.setSourceFields(res);
        };
    }
}