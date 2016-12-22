import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { SrcFldListComponent } from "./srcfld-list.component";
import { SrcListSelectComponent } from "./src-list-select.component";
import { SFieldSelectService } from "../../../services/source/srcfld-select.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "srcfld-select",
    template: require("./srcfld-select.component.html"),
    styles: [require("./srcfld-select.component.css")],
    providers: [SFieldSelectService,
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SrcFldSelectComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => SrcFldSelectComponent), multi: true }
    ]
})
export class SrcFldSelectComponent implements ControlValueAccessor, OnInit {
    propagateChange: any = () => { };
    validateFn: any = () => { };
    @Input('selectedSourceField') _selectedSourceField: any;
    private sources = [];
    private filteredSourceFields = [];

    // Modal Functions
    openSourceSelect(content) {
        this.modalService.open(content, { size: "lg", backdrop: "static" })
            .result.then((result) => {
                //User selected source field in modal
                if (result != "Select SField") {
                    
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

    //Child component events
    onSelectSource() {
        this.selectedSourceField = null;
    }
    onFieldSelect(sourceField: any) {
        this.selectedSourceField = sourceField;
    }

    constructor(private modalService: NgbModal, private selectService: SFieldSelectService) { }

    ngOnInit() {
        this.selectService.sources.subscribe(sources => this.sources = sources);
        this.selectService.filteredSrcFlds.subscribe(filteredSourceFields => this.filteredSourceFields = filteredSourceFields);
    }
}