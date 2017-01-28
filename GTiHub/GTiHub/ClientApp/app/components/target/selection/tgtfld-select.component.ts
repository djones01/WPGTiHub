import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TFieldSelectService } from "../../../services/target/tgtfld-select.service";
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
    private display: boolean = false;
    propagateChange: any = () => { };
    validateFn: any = () => { };
    @Input('selectedTargetField') _selectedTargetField: any;
    private targets = [];
    private filteredTargetFields = [];
    private selectedTarget: any;

    showDialog() {
        this.display = !this.display;
    }

    selectTargetField() {
        this.showDialog();
    }

    cancelSelect() {
        this.selectedTargetField = null;
        this.showDialog();
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
    onRowSelect() {
        this.selectService.filterTgtFlds(this.selectedTarget.targetId);
        this.selectedTargetField = null;
    }
    onRowUnselect() {
        this.filteredTargetFields = [];
    }

    constructor(private selectService: TFieldSelectService) { }

    ngOnInit() {
        this.selectService.targets.subscribe(targets => this.targets = targets);
        this.selectService.filteredTgtFlds.subscribe(filteredTargetFields => this.filteredTargetFields = filteredTargetFields);
    }
}