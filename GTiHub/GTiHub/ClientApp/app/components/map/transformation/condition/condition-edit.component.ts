import { Component, ViewChild, OnInit, OnDestroy, Input } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SrcFldSelectComponent } from "../../../source/selection/srcfld-select.component";

@Component({
    selector: "condition-edit",
    template: require("./condition-edit.component.html")
})
export class ConditionEditComponent {
    @Input('group')
    conditionForm: FormGroup;

    //Options for operator selection
    private dateNumOpts = [
        { value: "==", display: "equals" },
        { value: "!=", display: "not equal" },
        { value: "<", display: "less than" },
        { value: "<=", display: "less than or equal" },
        { value: ">", display: "greater than" },
        { value: ">=", display: "greater than or equal" },
    ];

    private textOpts = [
        { value: "==", display: "equals" },
        { value: "!=", display: "not equal" }
        //TODO: Contains, doesn't contain, begins with, ends with
    ];

    private boolOpts = [
        { value: "==", display: "equals" },
        { value: "!=", display: "not equal" }
    ];

    constructor() { }

}