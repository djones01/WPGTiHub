import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TgtFldListComponent } from "./tgtfld-list.component";
import { TgtListComponent } from "./tgt-list.component";
import { TFieldSelectService } from "../../../services/tgtfld-select.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "tgtfld-select",
    template: require("./tgtfld-select.component.html"),
    styles: [require("./tgtfld-select.component.css")],
    providers: [TFieldSelectService,
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TgtFldSelectComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => TgtFldSelectComponent), multi: true }
    ]
})
export class TgtFldSelectComponent implements ControlValueAccessor, OnInit {
    propagateChange: any = () => { };
    validateFn: any = () => { };
    @Input('selectedTargetField') _selectedTargetField: any;
    private targets = [];
    private filteredTargetFields = [];

    // Modal Functions
    openTargetSelect(content) {
        this.modalService.open(content, { size: "lg" })
            .result.then((result) => {
                //User selected target field in modal
                if (result != "Select TField") {
                    
                }
            },
            (reason) => { });
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }

    writeValue(value: any) {
        if (value) {
            this.selectedTargetField = value;
        }
    }

    validate(c: FormControl) {
        return this.validateFn(c);
    }

    get selectedTargetField() {
        return this._selectedTargetField;
    }

    set selectedTargetField(val) {
        this._selectedTargetField = val;
        this.propagateChange(val);
    }

    //Child component events
    onSelectTarget() {
        this.selectedTargetField = null;
    }
    onFieldSelect(targetField: any) {
        this.selectedTargetField = targetField;
    }

    constructor(private modalService: NgbModal, private selectService: TFieldSelectService) { }

    ngOnInit() {
        this.selectService.targets.subscribe(targets => this.targets = targets);
        this.selectService.filteredTgtFlds.subscribe(filteredTargetFields => this.filteredTargetFields = filteredTargetFields);
    }
}