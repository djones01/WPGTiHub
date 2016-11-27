import { Component, forwardRef, Input } from "@angular/core";
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { SrcFldListComponent } from "./srcfld-list.component";
import { SrcListComponent } from "./src-list.component";
import { SFieldSelectService } from "../../../services/srcfld-select.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "srcfld-select",
    template: require("./srcfld-select.component.html"),
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SrcFldSelectComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => SrcFldSelectComponent), multi: true },
        SFieldSelectService
    ]
})
export class SrcFldSelectComponent implements ControlValueAccessor {
    propagateChange: any = () => { };
    @Input('selectedSourceField') _selectedSourceField:any;

    // Modal Functions
    openSourceSelect(content, condition) {
        this.modalService.open(content, { size: "lg" })
            .result.then((result) => {
                //User selected source field in modal
                if (result == "Select SField") {
                    this.selectService.getSelectedSourceField().subscribe(sourceField => this.selectedSourceField = sourceField);
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

    get selectedSourceField() {
        return this._selectedSourceField;
    }

    set selectedSourceField(val) {
        this._selectedSourceField = val;
        this.propagateChange(val);
    }

    constructor(private modalService: NgbModal, private selectService: SFieldSelectService) {
    }
}