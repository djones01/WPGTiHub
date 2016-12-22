import { Injectable } from "@angular/core";
import { Map, IMap } from "../../components/map/map";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Injectable()
export class MapBuilderService {
    mapForm: FormGroup;
    ruleSrcFldSeqNum = 1;
    condSeqNum = 1;

    buildMap() {
        return this._fb.group({
            description: ['', Validators.required],
            effective_Date: [new Date()],
            active: [true],
            transformations: this._fb.array([])
        });
    }

    buildTransform() {
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

    buildRuleSrcFld() {
        return this._fb.group({
            seqNum: [this.ruleSrcFldSeqNum++],
            append: [''],
            prepend: [''],
            custom_Format: [''],
            sourceField: [null, Validators.required]
        });
    }

    // Init new condition
    buildCondition() {
        return this._fb.group({
            seqNum: [this.condSeqNum++],
            chain_Operation: [''],
            left_Paren: [''],
            operation: ['', Validators.required],
            cond_Value: ['', Validators.required],
            right_Paren: [''],
            sourceField: [null, Validators.required]
        });
    }

    buildEditMapForm(editMap: Map) {
        if (editMap != null) {
            this.mapForm = this.buildMap();
            if (editMap.transformations.length > 0) {
                let transformsControl = <FormArray>this.mapForm.controls['transformations'];
                editMap.transformations.forEach((transform, i) => {
                    let transformControl = this.buildTransform();
                    transformsControl.push(transformControl);
                    if (transform.conditions != undefined && transform.conditions.length > 0) {
                        let condsControl = <FormArray>transformControl.controls['conditions'];
                        transform.conditions.forEach((cond, i) => {                       
                            condsControl.push(this.buildCondition());
                        });        
                    }
                    if (transform.rule.ruleSourceFields != undefined && transform.rule.ruleSourceFields.length > 0) {
                        let ruleSrcFldsControl = <FormArray>(<FormGroup>transformControl.controls['rule']).controls['ruleSourceFields'];
                        transform.rule.ruleSourceFields.forEach((ruleSrcFld, i) => {                           
                            ruleSrcFldsControl.push(this.buildRuleSrcFld());
                        });                  
                    }
                });
            }
            this.mapForm.patchValue(editMap);
        }
        return this.mapForm;
    }

    constructor(private _fb: FormBuilder) { }
}