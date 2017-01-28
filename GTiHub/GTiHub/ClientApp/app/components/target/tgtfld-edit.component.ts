import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { UploadService } from "../../services/data/file-upload.service";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { TargetService } from "../../services/target/target.service";

@Component({
    selector: "tgtfld-edit",
    template: require('./tgtfld-edit.component.html')
})
export class TgtFldEditComponent implements OnInit{
    //Control the template / manual header boxes
    sopt = true;
    seqNumCount: number = 1;
    private delimiter: string = "";
    uploader: FileUploader;

    @Input('group')
    tgtFldsForm: FormGroup;

    addTgtFld() {
        const control = <FormArray>this.tgtFldsForm.controls['targetFields'];
        control.push(this.initTgtFld());
    }

    resetTgtFlds() {
        this.tgtFldsForm.setControl('targetFields', new FormArray([]));
    }

    removeTgtFld(i: number) {
        let x = i;
        const control = <FormArray>this.tgtFldsForm.controls['targetFields'];
        // renumber the seqnums of other target fields
        for (x; x < control.length; x++) {
            let group = <FormGroup>control.at(x);
            let newVal = group.controls['seqNum'].value - 1;
            group.controls['seqNum'].setValue(newVal);
        }
        this.seqNumCount--;
        control.removeAt(i);
    }

    initTgtFld() {
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
        this.uploadService.makeFileRequest("File/ExtractHeaders", ["delimiter"], [this.delimiter], [this.uploader.queue[0]._file])
            .subscribe((targetFields: Object[]) => {
                if (targetFields) {
                    this.setTargetFields(targetFields);
                }
            });
    }

    setTargetFields(targetFields: Object[]) {   
        this.resetTgtFlds();
        const control = <FormArray>this.tgtFldsForm.controls['targetFields'];
        for (let i = 0; i < targetFields.length; i++) {
            this.addTgtFld();
            control.at(i).patchValue(targetFields[i]);
        }
    }

    constructor(private _fb: FormBuilder, private uploadService: UploadService, private targetService: TargetService) {
        this.uploader = new FileUploader({});
    }

    ngOnInit() {
        this.targetService.editTarget.subscribe(editTarget => {
            if (editTarget && editTarget.targetFields) {
                this.setTargetFields(editTarget.targetFields);
            }
        });    
    }
}