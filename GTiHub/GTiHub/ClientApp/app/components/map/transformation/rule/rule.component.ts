import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { Response, Headers } from "@angular/http";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SrcFldListComponent } from "../../../source/selection/srcfld-list.component";
import { SrcListComponent } from "../../../source/selection/src-list.component";
import { SFieldSelectService } from "../../../../services/source-select.service";
import { TFieldSelectService } from "../../../../services/target-select.service";
import { Subscription } from "rxjs/Subscription";
import { Rule } from "../../map";
import { TargetField } from "../../../target/target";

@Component({
    selector: "rule-addedit",
    template: require("./rule.component.html"),
    providers: [DataService]
})
export class RuleComponent implements OnInit, OnDestroy {
    hasSelectedTargetField: boolean;
    selectedTargetField: TargetField;
    rule_Operations = [
        { value: "sfield", display: "Source Field(s)" },
        { value: "assign", display: "Automatic / System Generated" },
        { value: "text", display: "Text" }
    ];
    rule: Rule;

    //Subscriptions
    ruleSubscription: Subscription;
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

    constructor(private _dataService: DataService,
        private modalService: NgbModal,
        private sourceSelectService: SFieldSelectService,
        private targetSelectService: TFieldSelectService) {
        this.rule = new Rule("", "", "text", null, null);
    }

    ngOnInit(): void {
        this.hasSelectedTargetFieldSubscription = this.targetSelectService.hasSelectedTargetField()
            .subscribe(hasSelectedTargetField => this.hasSelectedTargetField = hasSelectedTargetField);
        this.getSelectedTargetFieldSubscription = this.targetSelectService.getSelectedTargetField()
            .subscribe(selectedTargetField => this.selectedTargetField = selectedTargetField);
    }

    ngOnDestroy(): void {
        this.hasSelectedTargetFieldSubscription.unsubscribe();
        this.ruleSubscription.unsubscribe();
    }
}