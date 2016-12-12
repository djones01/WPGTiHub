import { Component, Input, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TgtFldSelectComponent } from "../../../target/selection/tgtfld-select.component";
import { Map } from "../../map";
import { MapService } from "../../../../services/map.service";

@Component({
    selector: "rule-edit",
    template: require("./rule-edit.component.html")
})
export class RuleEditComponent implements OnInit {
    @Input('group')
    ruleForm: FormGroup
    @Input('i')
    i: number;

    public seqNumCount: number = 1;

    editMap: Map;

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

    //Add and remove validation based on selection
    subscribeRuleOpChange() {
        const control = <FormGroup>this.ruleForm.controls["rule_Operation"];
        const changes = control.valueChanges;
        changes.subscribe(rule_Operation => {
            switch (rule_Operation) {
                case "sfield":
                    this.addRuleSrcFldValidators();
                    this.removeAssignValidators();
                    this.removeTextValidators();
                    break;
                case "assign":
                    //Add validators back to the assign fields
                    this.addAssignValidators();
                    this.removeRuleSrcFldValidators();
                    this.removeTextValidators();
                    break;
                case "text":
                    //Add validators back to the text fields
                    this.addTextValidators();
                    this.removeRuleSrcFldValidators();
                    this.removeAssignValidators();
                    break;
            }
        });     
    }

    // Methods for adding and removing validators
    addRuleSrcFldValidators() {
        // Add validators back to the rulesourcefields
        const rsfsControl = <FormArray>this.ruleForm.controls["ruleSourceFields"];
        for (let i = 0; i < rsfsControl.length; i++) {
            const rsfControl = <FormGroup>rsfsControl.at(i);
            const sfControl = <FormGroup>rsfControl.controls["sourceField"];
            sfControl.setValidators(Validators.required);
            sfControl.updateValueAndValidity();
        }
    }

    removeRuleSrcFldValidators() {
        // Remove validators from the rulesourcefields
        const rsfsControl = <FormArray>this.ruleForm.controls["ruleSourceFields"];
        for (let i = 0; i < rsfsControl.length; i++) {
            const rsfControl = <FormGroup>rsfsControl.at(i);
            const sfControl = <FormGroup>rsfControl.controls["sourceField"];
            sfControl.setValidators(null);
            sfControl.updateValueAndValidity();
        }
    }

    addAssignValidators() {
        
    }

    removeAssignValidators() {
        
    }

    addTextValidators() {
        const ruleValueControl = <FormArray>this.ruleForm.controls["rule_Value"];
        ruleValueControl.setValidators(Validators.required);
        ruleValueControl.updateValueAndValidity();
    }

    removeTextValidators() {
        const ruleValueControl = <FormArray>this.ruleForm.controls["rule_Value"];
        ruleValueControl.setValidators(null);
        ruleValueControl.updateValueAndValidity();
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

    constructor(private _fb: FormBuilder, private mapService: MapService) { }

    ngOnInit() {
        this.subscribeRuleOpChange();
        this.mapService.editMap.subscribe(editMap => {
            this.editMap = editMap;
            if (this.mapService.editing) {
                if (this.editMap.transformations[this.i].rule.ruleSourceFields != null) {
                    this.editMap.transformations[this.i].rule.ruleSourceFields.forEach(rsf => {
                        this.addRuleSrcFld();
                    });
                }
            }          
        });
    }
}