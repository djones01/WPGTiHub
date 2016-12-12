import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Map } from "./map";
import { MapService } from "../../services/map.service";
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

    editMap: Map;

    initMapForm() {
        this.mapForm = this._fb.group({
            description: [this.editMap.description, Validators.required],
            effective_Date: [this.editMap.effective_Date],
            active: [this.editMap.active],
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

    onSubmit(map: Map) {
        if (this.mapService.editing) {
            this.mapService.update(map);
        }
        else {
            this.mapService.add(map);
        }
        this.newMap();
    }

    newMap() {
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
        this.mapService.initEditMap();
        this.router.navigate(['/proj-overview']);
    }

    constructor(private _fb: FormBuilder, private mapService: MapService) { }

    ngOnInit() {
        // Get the map currently being edited, if any
        this.mapService.editMap.subscribe(editMap => {
            this.editMap = editMap;
            this.initMapForm(); 
            if (this.editMap.transformations.length > 0) {
                for (let i = 0; i < this.editMap.transformations.length; i++){
                    this.addTransform();
                }
            }                  
        });               
    }
}