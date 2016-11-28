import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SrcFldEditComponent } from "./srcfld-edit.component";
import { DataService } from "../../services/data.service";
import { ISource } from "./source";
import { DatePickerComponent } from 'ng2-bootstrap/components/datepicker';

@Component({
    selector: "src-edit",
    template: require('./src-edit.component.html')
})
export class SrcEditComponent implements OnInit {
    public srcForm: FormGroup;
    private editing: boolean = false;
    private editId: number;

    @ViewChild(SrcFldEditComponent)
    private srcFldEditComponent: SrcFldEditComponent;

    onSubmit(source: ISource) {
        if (this.editing) {
            this._dataService.Update('Sources', this.editId, source).subscribe(() => { this.newSource(); }, error => console.log(error));
        }
        else {
            this._dataService.Add('Sources', source).subscribe(() => { this.newSource(); }, error => console.log(error));
        }
    }

    initSrcForm() {
        this.srcForm = this._fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            effective_Date: [new Date()],
            active: [true],
            sourceFields: this._fb.array([])
        });
    }

    newSource() {
        this.srcFldEditComponent.seqNumCount = 1;
        this.initSrcForm();
    }

    constructor(private _fb: FormBuilder, private _dataService: DataService) { }

    ngOnInit() {
        this.initSrcForm();
    }
}