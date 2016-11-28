import { Component, forwardRef, Input, OnInit, OnDestroy } from "@angular/core";
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { SrcFldListComponent } from "./srcfld-list.component";
import { SrcListComponent } from "./src-list.component";
import { SFieldSelectService } from "../../../services/srcfld-select.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "srcfld-select",
    template: require("./srcfld-select.component.html"),
    styles: [require("./srcfld-select.component.css")],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SrcFldSelectComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => SrcFldSelectComponent), multi: true },
        SFieldSelectService
    ]
})
export class SrcFldSelectComponent implements ControlValueAccessor, OnInit, OnDestroy {
    propagateChange: any = () => { };
    validateFn: any = () => { };
    @Input('selectedSourceField') _selectedSourceField: any;
    srcFldSub: Subscription;

    // Modal Functions
    openSourceSelect(content) {
        this.modalService.open(content, { size: "lg" })
            .result.then((result) => {
                //User selected source field in modal
                if (result != "Select SField") {
                    this.selectedSourceField = null;
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
            this.selectedSourceField = value;
        }
    }

    validate(c: FormControl) {
        return this.validateFn(c);
    }

    get selectedSourceField() {
        return this._selectedSourceField;
    }

    set selectedSourceField(val) {
        this._selectedSourceField = val;
        this.propagateChange(val);
    }

    constructor(private modalService: NgbModal, private selectService: SFieldSelectService) {
    }

    ngOnInit() {
        this.srcFldSub = this.selectService.getSelectedSourceField().subscribe(sourceField => this.selectedSourceField = sourceField);
    }
    ngOnDestroy() {
        this.srcFldSub.unsubscribe();
    }
}