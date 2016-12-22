import { Component, Input, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { RunMapService } from "../../../services/map/map-runmap.service";

@Component({
    selector: "map-options",
    template: require("./map-options.component.html")
})
export class MapOptionsComponent {
    @Input('group')
    optForm: FormGroup;

    constructor() { }
}