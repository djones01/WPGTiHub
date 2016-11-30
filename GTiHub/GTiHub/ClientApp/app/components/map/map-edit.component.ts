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

    initMapForm() {
        this.mapForm = this._fb.group({
            description: ['', Validators.required],
            effective_Date: [new Date()],
            active: [true],
            transformations: this._fb.array([])
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

    onSubmit(map: IMap) {
        if (this.editMap != null) {
            this.mapService.add(map);
        }
        else {
            this.mapService.update(map);
        }
        this.newMap();
    }

    newMap() {
        this.transformationEditComponent.seqNumCount = 1;
        this.ruleEditComponent.seqNumCount = 1;
        this.initMapForm();
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
        this.router.navigate(['/proj-overview']);
    }

    constructor(private _fb: FormBuilder, private router: Router, private mapService: MapService) { }

    ngOnInit() {
        this.initMapForm();
        // Get the map currently being edited
        this.editMap = this.mapService.editMap;
        if (this.editMap != null) {
            const control = <FormArray>this.mapForm.controls['transformations'];
            this.editMap.transformations.forEach((tf, i) => {
                this.addTransform();
                //Add rule source fields
                tf.rule.ruleSourceFields.forEach((rsf, i) => {
                    this.ruleEditComponent.addRuleSrcFld();
                });
                //Add conditions
                tf.conditions.forEach((cond, i) => {
                    this.transformationEditComponent.addCondition();
                });
            });           
        }
    }
}