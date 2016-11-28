import { Component, forwardRef, Input, OnInit, OnDestroy } from "@angular/core";
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
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TgtFldSelectComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => TgtFldSelectComponent), multi: true },
        TFieldSelectService
    ]
})
export class TgtFldSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
    propagateChange: any = () => { };
    validateFn: any = () => { };
    @Input('selectedTargetField') _selectedTargetField: any;
    tgtFldSub: Subscription;

    // Modal Functions
    openTargetSelect(content) {
        this.modalService.open(content, { size: "lg" })
            .result.then((result) => {
                //User selected target field in modal
                if (result != "Select TField") {
                    this.selectedTargetField = null;
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

    constructor(private modalService: NgbModal, private selectService: TFieldSelectService) {
    }

    ngOnInit() {
        this.tgtFldSub = this.selectService.getSelectedTargetField().subscribe(targetField => this.selectedTargetField = targetField);
    }
    ngOnDestroy() {
        this.tgtFldSub.unsubscribe();
    }
}