import { Component, Input } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TgtFldSelectComponent } from "../../../target/selection/tgtfld-select.component";


@Component({
    selector: "rule-edit",
    template: require("./rule-edit.component.html"),
    providers: []
})
export class RuleEditComponent {
    @Input('group')
    ruleForm: FormGroup
    public seqNumCount: number = 1;

    rule_Operations = [
        { value: "sfield", display: "Source Field(s)" },
        { value: "assign", display: "Automatic / System Generated" },
        { value: "text", display: "Text" }
    ];

    initRuleSrcFld() {
        return this._fb.group({
            seqNum: [this.seqNumCount++],
            append: [''],
            prepend: [''],
            custom_Format: [''],
            sourceField: [null, Validators.required]
        });
    }

    addRuleSrcFld() {
        const control = <FormArray>this.ruleForm.controls['ruleSourceFields'];
        control.push(this.initRuleSrcFld());
    }

    removeRuleSrcFld(i: number) {
        let x = i;
        const control = <FormArray>this.ruleForm.controls['ruleSourceFields'];
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
}