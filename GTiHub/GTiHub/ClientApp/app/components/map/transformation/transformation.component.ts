import { Component, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";
import { MapService } from "../../../services/map.service";


@Component({
    selector: "transformation",
    template: require("./transformation.component.html")
})
export class TransformationComponent implements OnInit, OnDestroy {
    @Input('group')
    public transForm: FormGroup;
    private currSeqNum: number = 1;

    // Init new condition
    initCondition() {
        return this._fb.group({
            seqNum: [this.currSeqNum++],
            append: [''],
            prepend: [''],
            custom_format: [''],
            sourceField: [null, Validators.required]
        });
    }


    addCondition() {
        const control = <FormArray>this.transForm.controls['conditions'];
        control.push(this.initCondition());
    }
    removeCondition(i: number) {
        const control = <FormArray>this.transForm.controls['conditions'];
        control.removeAt(i);
    }

    constructor(private _fb: FormBuilder) {}

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }
}