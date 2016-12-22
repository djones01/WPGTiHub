import { Component, Input, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MapService } from "../../../services/map/map.service";
import { MapBuilderService } from "../../../services/map/map-builder.service";
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

    addCondition() {
        const control = <FormArray>this.transForm.controls['conditions'];
        control.push(this.mapBuilderService.buildCondition());
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
        this.mapBuilderService.condSeqNum--;
        control.removeAt(i);
    }

    constructor(private mapService: MapService, private mapBuilderService: MapBuilderService) {}

    ngOnInit(): void {
    }
}