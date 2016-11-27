import { Component, ViewChild, OnInit, OnDestroy, Input } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SrcFldListComponent } from "../../../source/selection/srcfld-list.component";
import { SrcListComponent } from "../../../source/selection/src-list.component";
import { SFieldSelectService } from "../../../../services/srcfld-select.service";
import { TFieldSelectService } from "../../../../services/target-select.service";
import { Subscription } from "rxjs/Subscription";
import { IRule } from "../../map";
import { TargetField } from "../../../target/target";

@Component({
    selector: "rule",
    template: require("./rule.component.html"),
    providers: []
})
export class RuleComponent implements OnInit, OnDestroy {
    @Input('group')
    ruleForm: FormGroup

    hasSelectedTargetField: boolean;
    selectedTargetField: TargetField;
    rule_Operations = [
        { value: "sfield", display: "Source Field(s)" },
        { value: "assign", display: "Automatic / System Generated" },
        { value: "text", display: "Text" }
    ];
    rule: IRule;

    //Subscriptions
    hasSelectedTargetFieldSubscription: Subscription;
    getSelectedTargetFieldSubscription: Subscription;

    //Modal Functions
    closeResult: string;

    openTargetSelect(content, condition) {
        this.modalService.open(content, { size: "lg" })
            .result.then((result) => {
                    //User selected source field in modal
                    if (result == "Select TField") {
                        this.rule.targetField = this.selectedTargetField;
                    }
                },
                (reason) => {});
    }

    constructor(private modalService: NgbModal, private sourceSelectService: SFieldSelectService, private targetSelectService: TFieldSelectService) {}

    ngOnInit(): void {
        this.hasSelectedTargetFieldSubscription = this.targetSelectService.hasSelectedTargetField()
            .subscribe(hasSelectedTargetField => this.hasSelectedTargetField = hasSelectedTargetField);
        this.getSelectedTargetFieldSubscription = this.targetSelectService.getSelectedTargetField()
            .subscribe(selectedTargetField => this.selectedTargetField = selectedTargetField);
    }

    ngOnDestroy(): void {
        this.hasSelectedTargetFieldSubscription.unsubscribe();
        this.getSelectedTargetFieldSubscription.unsubscribe();
    }
}