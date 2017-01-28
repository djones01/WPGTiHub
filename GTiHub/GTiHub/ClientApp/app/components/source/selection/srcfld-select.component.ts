import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { SFieldSelectService } from "../../../services/source/srcfld-select.service";
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
    private display: boolean = false;
    propagateChange: any = () => { };
    validateFn: any = () => { };
    @Input('selectedSourceField') _selectedSourceField: any;
    private sources = [];
    private filteredSourceFields = [];
    private selectedSource: any;

    showDialog() {
        this.display = !this.display;
    }

    selectSourceField() {
        this.showDialog();
    }

    cancelSelect() {
        this.selectedSourceField = null;
        this.showDialog();
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
    onRowSelect() {
        this.selectService.filterSrcFlds(this.selectedSource.sourceId);
        this.selectedSourceField = null;
    }
    onRowUnselect() {
        this.filteredSourceFields = [];
    }

    constructor(private selectService: SFieldSelectService) { }

    ngOnInit() {
        this.selectService.sources.subscribe(sources => this.sources = sources);
        this.selectService.filteredSrcFlds.subscribe(filteredSourceFields => this.filteredSourceFields = filteredSourceFields);
    }
}