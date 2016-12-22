import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TgtFldEditComponent } from "./tgtfld-edit.component";
import { TargetService } from "../../services/target/target.service";
import { Target } from "./target";
import { DatePickerComponent } from 'ng2-bootstrap/components/datepicker';

@Component({
    selector: "tgt-edit",
    template: require('./tgt-edit.component.html')
})
export class TgtEditComponent implements OnInit {
    public tgtForm: FormGroup;

    editing: boolean = false;

    @ViewChild(TgtFldEditComponent)
    private tgtFldEditComponent: TgtFldEditComponent;

    onSubmit(target: Target) {
        if (this.editing) {
            this.targetService.update(target);
        }
        else {
            this.targetService.add(target);
        }
    }

    initTgtForm() {
        this.tgtForm = this._fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            effective_Date: [new Date()],
            active: [true],
            targetFields: this._fb.array([])
        });
    }

    newTarget() {
        this.tgtFldEditComponent.seqNumCount = 1;
        this.initTgtForm();
    }

    back() {
        this.targetService.clearEditTarget();
        this.router.navigate(['/proj-overview']);
    }

    constructor(private _fb: FormBuilder, private router: Router, private targetService: TargetService) { }

    ngOnInit() {
        this.initTgtForm();
        this.targetService.editTarget.subscribe(editTarget => {
            if (editTarget) {
                this.editing = true;
                this.tgtForm.patchValue(editTarget);
            }
        });
        
    }
}