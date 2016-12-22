import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Map } from "./map";
import { MapService } from "../../services/map/map.service";
import { MapBuilderService } from "../../services/map/map-builder.service";
import { Router } from "@angular/router";
import { TransformationEditComponent } from "./transformation/transformation-edit.component";
import { RuleEditComponent } from "./transformation/rule/rule-edit.component";

@Component({
    selector: "map-edit",
    template: require("./map-edit.component.html"),
    providers: [MapBuilderService]
})
export class MapEditComponent implements OnInit {
    @ViewChild(TransformationEditComponent)
    private transformationEditComponent: TransformationEditComponent;
    @ViewChild(RuleEditComponent)
    private ruleEditComponent: RuleEditComponent;

    public mapForm: FormGroup;

    initMapForm() {
        this.mapForm = this.mapBuilderService.buildMap();
    }

    onSubmit(map: Map) {
        if (this.mapService.editing) {
            this.mapService.update(map);
        }
        else {
            this.mapService.add(map);
        }
        this.initMapForm();
    }

    addTransform() {
        const control = <FormArray>this.mapForm.controls['transformations'];
        control.push(this.mapBuilderService.buildTransform());
    }
    removeTransform(i: number) {
        const control = <FormArray>this.mapForm.controls['transformations'];
        control.removeAt(i);
    }

    back() {
        this.mapService.initEditMap();
        this.router.navigate(['/proj-overview']);
    }

    constructor(private _fb: FormBuilder, private router: Router, private mapService: MapService, private mapBuilderService: MapBuilderService) { }

    ngOnInit() {
        this.mapService.editMap.subscribe(editMap => {
            if (this.mapService.editing) {
                this.mapForm = this.mapBuilderService.buildEditMapForm(editMap);    
            }
            else {
                this.initMapForm();
            }
        });  
    }
}