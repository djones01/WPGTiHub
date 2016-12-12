import { Component, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MapService } from "../../../services/map.service";
import { Map } from "../map";


@Component({
    selector: "transformation-edit",
    template: require("./transformation-edit.component.html")
})
export class TransformationEditComponent implements OnInit {
    @Input('group')
    transForm: FormGroup;
    @Input('i')
    i: number;

    editMap: Map;

    public seqNumCount: number = 1;

    // Init new condition
    initCondition() {
        return this._fb.group({
            seqNum: [this.seqNumCount++],
            chain_Operation: [''],
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

    constructor(private _fb: FormBuilder, private mapService: MapService) {}

    ngOnInit(): void {
        this.mapService.editMap.subscribe(editMap => {
            this.editMap = editMap;
            if (this.mapService.editing) {
                if (this.editMap.transformations[this.i].conditions != null) {
                    this.editMap.transformations[this.i].conditions.forEach((condition) => {
                        this.addCondition();
                    });
                }
            }        
        });

    }
}