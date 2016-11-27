import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { IMap } from "./map";
import { MapService } from "../../services/map.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "map-edit",
    template: require("./map-edit.component.html")
})
export class MapEditComponent implements OnInit, OnDestroy {
    public mapForm: FormGroup;

    //Init new transformation
    initTransform() {
        return this._fb.group({
            description: ['', Validators.required],
            rule: this._fb.group({
                rule_Value: ['', Validators.required],
                alt_Value: [''],
                rule_Operation: ['', Validators.required],
                targetField: [null],
                ruleSourceFields: this._fb.array([])
            }),
            conditions: this._fb.array([])
        });
    }

    initRule() {

    }

    addTransform() {
        const control = <FormArray>this.mapForm.controls['transformations'];
        control.push(this.initTransform());
    }
    removeTransform(i: number) {
        const control = <FormArray>this.mapForm.controls['transformations'];
        control.removeAt(i);
    }

    constructor(private _fb: FormBuilder) { }
    ngOnInit() {
        this.mapForm = this._fb.group({
            description: ['', Validators.required],
            effective_Date: [''],
            active: [true],
            transformations: this._fb.array([])
        });
    }
    ngOnDestroy() {

    }
}