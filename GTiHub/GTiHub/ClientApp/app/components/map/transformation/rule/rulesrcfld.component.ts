import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { Response, Headers } from "@angular/http";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SrcFldListComponent } from "../../../source/selection/srcfld-list.component";
import { SrcListComponent } from "../../../source/selection/src-list.component";
import { FieldFormatComponent } from "./field-format.component";
import { SFieldSelectService } from "../../../../services/srcfld-select.service";
import { Subscription } from "rxjs/Subscription";
import { ISourceField } from "../../../source/source";
import { IRuleSourceField } from "../../map";
import { MapService } from "../../../../services/map.service";

@Component({
    selector: "rulesourcefield-addedit",
    template: require("./rulesrcfld.component.html"),
    providers: [DataService, SFieldSelectService]
})
export class RuleSrcFldComponent implements OnInit, OnDestroy {
    //List of rule source fields currently in the component
    ruleSourceFields: IRuleSourceField[];
    hasSelectedSourceField: boolean;
    selectedSourceField: any;
    selectingRuleSourceField: IRuleSourceField;
    seqNum: number;

    //Modal subscriptions
    hasSelectedSubscription: Subscription;
    getSelectedSubscription: Subscription;
    //Map creation subscriptions
    getRuleSourceSubscription: Subscription;


    //Modal Functions
    closeResult: string;

    openSourceSelect(content, ruleSourceField) {
        this.selectingRuleSourceField = ruleSourceField;
        this.modalService.open(content, { size: "lg" })
            .result.then((result) => {
                    //User selected source field in modal
                    if (result == "Select SField") {
                        this.selectingRuleSourceField.sourceField = this.selectedSourceField;
                    }
                },
                (reason) => {});
    }

    addRuleSourceField() {
        //this.MapService.addRuleSourceField();
    }

    removeRuleSourceField(ruleSourceField) {
        //this.MapService.removeRuleSourceField(ruleSourceField);
    }

    constructor(private _dataService: DataService,
        private modalService: NgbModal,
        private selectService: SFieldSelectService,
        private MapService: MapService) {
        this.ruleSourceFields = [];
        this.seqNum = 1;
        this.hasSelectedSourceField = false;
    }

    ngOnInit(): void {
        //Modal subscriptions
        //this.hasSelectedSubscription = this.selectService.hasSelectedSourceField()
            //subscribe(hasSelectedSourceField => this.hasSelectedSourceField = hasSelectedSourceField);
        this.getSelectedSubscription = this.selectService.getSelectedSourceField()
            .subscribe(selectedSourceField => this.selectedSourceField = selectedSourceField);
        //Map creation subscriptions
        //this.getRuleSourceSubscription = this.MapService.getRuleSourceFields()
            //.subscribe(ruleSourceFields => this.ruleSourceFields = ruleSourceFields);
    }

    ngOnDestroy(): void {
        //Modal subscriptions
        this.hasSelectedSubscription.unsubscribe();
        this.getSelectedSubscription.unsubscribe();
        //Map creation subscriptions
        this.getRuleSourceSubscription.unsubscribe();
    }
}