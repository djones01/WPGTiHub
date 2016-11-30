import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { IMap } from "./map";
import { MapService } from "../../services/map.service";
import { Router } from "@angular/router";
import { TransformationEditComponent } from "./transformation/transformation-edit.component";
import { RuleEditComponent } from "./transformation/rule/rule-edit.component";

@Component({
    selector: "map-edit",
    template: require("./map-edit.component.html")
})
export class MapEditComponent implements OnInit {
    @ViewChild(TransformationEditComponent)
    private transformationEditComponent: TransformationEditComponent;
    @ViewChild(RuleEditComponent)
    private ruleEditComponent: RuleEditComponent;

    public mapForm: FormGroup;

    editMap: IMap;

    initMap() {
        this.mapForm = this._fb.group({
            description: [this.editMap.description, Validators.required],
            effective_Date: [this.editMap.effective_Date],
            active: [this.editMap.active],
            transformations: this._fb.array(this.editMap.transformations)
        });
    }

    initTransform() {
        return this._fb.group({
            description: ['', Validators.required],
            rule: this._fb.group({
                rule_Value: ['', Validators.required],
                alt_Value: [''],
                rule_Operation: ['', Validators.required],
                targetField: [null, Validators.required],
                ruleSourceFields: this._fb.array([])
            }),
            conditions: this._fb.array([])
        });
    }

    patchEditValues(editMap: IMap) {
        if (editMap != null) {
            this.mapForm.patchValue(editMap);
        }
    }

    onSubmit(map: IMap) {
        this.mapService.add(map);
        this.newMap();
    }

    newMap() {
        this.transformationEditComponent.seqNumCount = 1;
        this.ruleEditComponent.seqNumCount = 1;
        this.initMap();
    }

    addTransform() {
        const control = <FormArray>this.mapForm.controls['transformations'];
        control.push(this.initTransform());
    }
    removeTransform(i: number) {
        const control = <FormArray>this.mapForm.controls['transformations'];
        control.removeAt(i);
    }

    back() {
        this.mapService.clearEditMap();
        this.router.navigate(['/map']);
    }

    constructor(private _fb: FormBuilder, private router: Router, private mapService: MapService) { }

    ngOnInit() {
        this.mapService.editMap.subscribe(editMap => this.editMap = editMap);
        this.initMap();
    }
}