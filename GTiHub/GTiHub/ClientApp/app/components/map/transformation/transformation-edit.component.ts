import { Component, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";
import { MapService } from "../../../services/map.service";


@Component({
    selector: "transformation-edit",
    template: require("./transformation-edit.component.html")
})
export class TransformationEditComponent implements OnInit, OnDestroy {
    @Input('group')
    transForm: FormGroup;
    public seqNumCount: number = 1;

    // Init new condition
    initCondition() {
        return this._fb.group({
            seqNum: [this.seqNumCount++],
            chain_Operation: ['',Validators.required],
            left_Paren: [''],
            operation: ['', Validators.required],
            cond_Value: ['', Validators.required],
            right_Paren: [''],
            sourceField: [null, Validators.required]
        });
    }


    addCondition() {
        const control = <FormArray>this.transForm.controls['conditions'];
        control.push(this.initCondition());
    }
    removeCondition(i: number) {
        let x = i;
        const control = <FormArray>this.transForm.controls['conditions'];
        // renumber the seqnums of other source fields
        for (x; x < control.length; x++) {
            let group = <FormGroup>control.at(x);
            let newVal = group.controls['seqNum'].value - 1;
            group.controls['seqNum'].setValue(newVal);
        }
        this.seqNumCount--;
        control.removeAt(i);
    }

    constructor(private _fb: FormBuilder) {}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {

    }
}