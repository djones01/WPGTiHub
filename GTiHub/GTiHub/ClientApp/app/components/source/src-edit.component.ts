import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SrcFldEditComponent } from "./srcfld-edit.component";

@Component({
    selector: "src-edit",
    template: require('./src-edit.component.html'),
    providers: [],
})
export class SrcEditComponent implements OnInit {
    public srcForm: FormGroup;

    onSubmit() {

    }

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
        this.srcForm = this._fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            effective_Date: [''],
            active: [true],
            srcFlds: this._fb.array([])
        });
    }
}