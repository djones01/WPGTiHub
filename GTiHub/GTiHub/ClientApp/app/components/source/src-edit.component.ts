import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SrcFldEditComponent } from "./srcfld-edit.component";
import { SourceService } from "../../services/source/source.service";
import { Source } from "./source";
import { DatePickerComponent } from 'ng2-bootstrap/components/datepicker';

@Component({
    selector: "src-edit",
    template: require('./src-edit.component.html')
})
export class SrcEditComponent implements OnInit {
    public srcForm: FormGroup;

    editing: boolean = false;

    @ViewChild(SrcFldEditComponent)
    private srcFldEditComponent: SrcFldEditComponent;

    onSubmit(source: Source) {
        if (this.editing) {
            this.sourceService.update(source);
        }
        else {
            this.sourceService.add(source);
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

    back() {
        this.sourceService.clearEditSource();
        this.router.navigate(['/proj-overview']);
    }

    constructor(private _fb: FormBuilder, private router: Router, private sourceService: SourceService) { }

    ngOnInit() {
        this.initSrcForm();
        this.sourceService.editSource.subscribe(edit => {
            if (edit) {
                this.editing = true;
                this.srcForm.patchValue(edit);
            }
        });

    }
}