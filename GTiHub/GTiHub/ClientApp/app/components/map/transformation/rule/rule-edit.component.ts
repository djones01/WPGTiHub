import { Component, ViewChild, OnInit, OnDestroy, Input } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: "rule-edit",
    template: require("./rule-edit.component.html"),
    providers: []
})
export class RuleEditComponent implements OnInit, OnDestroy {
    @Input('group')
    ruleForm: FormGroup

    rule_Operations = [
        { value: "sfield", display: "Source Field(s)" },
        { value: "assign", display: "Automatic / System Generated" },
        { value: "text", display: "Text" }
    ];

    constructor() {}

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}