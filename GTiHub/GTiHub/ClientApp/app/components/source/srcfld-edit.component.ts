﻿import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { UploadService } from "../../services/data/file-upload.service";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { SourceService } from "../../services/source/source.service";

@Component({
    selector: "srcfld-edit",
    template: require('./srcfld-edit.component.html')
})
export class SrcFldEditComponent implements OnInit {
    //Control the template / manual header boxes
    sopt = true;
    seqNumCount: number = 1;
    private delimiter: string = "";
    private fieldRow: number = 1;
    uploader: FileUploader;

    @Input('group')
    srcFldsForm: FormGroup;

    addSrcFld() {
        const control = <FormArray>this.srcFldsForm.controls['sourceFields'];
        control.push(this.initSrcFld());
    }

    resetSrcFlds() {
        this.srcFldsForm.setControl('sourceFields', new FormArray([]));
    }

    removeSrcFld(i: number) {
        let x = i;
        const control = <FormArray>this.srcFldsForm.controls['sourceFields'];
        // renumber the seqnums of other source fields
        for (x; x < control.length; x++) {
            let group = <FormGroup>control.at(x);
            let newVal = group.controls['seqNum'].value - 1;
            group.controls['seqNum'].setValue(newVal);
        }
        this.seqNumCount--;
        control.removeAt(i);
    }

    initSrcFld() {
        return this._fb.group({
            seqNum: [this.seqNumCount++],
            name: ['', Validators.required],
            datatype: ['', Validators.required],
            active: [true]
        });
    }

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
        this.uploadService.makeFileRequest("File/ExtractHeaders", ["delimiter", "fieldRow"], [this.delimiter, this.fieldRow.toString()], [this.uploader.queue[0]._file])
            .subscribe((sourceFields: Object[]) => {
                if (sourceFields) {
                    this.setSourceFields(sourceFields);
                }
            });
    }

    setSourceFields(sourceFields: Object[]) {
        this.resetSrcFlds();
        const control = <FormArray>this.srcFldsForm.controls['sourceFields'];
        for (let i = 0; i < sourceFields.length; i++) {
            this.addSrcFld();
            control.at(i).patchValue(sourceFields[i]);
        }
    }

    constructor(private _fb: FormBuilder, private uploadService: UploadService, private sourceService: SourceService) {
        this.uploader = new FileUploader({});
    }

    ngOnInit() {
        this.sourceService.editSource.subscribe(editSource => {
            if (editSource && editSource.sourceFields) {
                this.setSourceFields(editSource.sourceFields);
            }
        });
    }
}