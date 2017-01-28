import { Component, Input, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray } from '@angular/forms';
import { TgtFldSelectComponent } from "../../../target/selection/tgtfld-select.component";
import { Map } from "../../map";
import { MapService } from "../../../../services/map/map.service";
import { MapBuilderService } from "../../../../services/map/map-builder.service";

@Component({
    selector: "rule-edit",
    template: require("./rule-edit.component.html")
})
export class RuleEditComponent implements OnInit {
    @Input('group')
    ruleForm: FormGroup
    @Input('i')
    i: number;

    rule_Operations = [
        { value: "sfield", display: "Source Field(s)" },
        { value: "text", display: "Text" }
    ];

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
        control.push(this.mapBuilderService.buildRuleSrcFld());
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
        this.mapBuilderService.ruleSrcFldSeqNum--;
        control.removeAt(i);
    }

    constructor(private mapService: MapService, private mapBuilderService: MapBuilderService) { }

    ngOnInit() {
        this.subscribeRuleOpChange();
    }
}