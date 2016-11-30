import { Component, Input } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SrcFldSelectComponent } from "../../../source/selection/srcfld-select.component";

@Component({
    selector: "rulesrcfld-edit",
    template: require("./rulesrcfld-edit.component.html")
})
export class RuleSrcFldEditComponent {
    @Input('group')
    ruleSrcFldForm: FormGroup;

    constructor() { }
}