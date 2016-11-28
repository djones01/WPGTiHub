import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TgtFldEditComponent } from "./tgtfld-edit.component";
import { DataService } from "../../services/data.service";
import { ITarget } from "./target";
import { DatePickerComponent } from 'ng2-bootstrap/components/datepicker';

@Component({
    selector: "tgt-edit",
    template: require('./tgt-edit.component.html')
})
export class TgtEditComponent implements OnInit {
    public tgtForm: FormGroup;
    private editing: boolean = false;
    private editId: number;

    @ViewChild(TgtFldEditComponent)
    private tgtFldEditComponent: TgtFldEditComponent;

    onSubmit(target: ITarget) {
        if (this.editing) {
            this._dataService.Update('Targets', this.editId, target).subscribe(() => { this.newTarget(); }, error => console.log(error));
        }
        else {
            this._dataService.Add('Targets', target).subscribe(() => { this.newTarget(); }, error => console.log(error));
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

    constructor(private _fb: FormBuilder, private _dataService: DataService) { }

    ngOnInit() {
        this.initTgtForm();
    }
}