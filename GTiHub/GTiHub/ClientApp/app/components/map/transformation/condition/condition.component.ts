import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { Response, Headers } from "@angular/http";
import { ICondition } from "../../map";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SrcFldListComponent } from "../../../source/selection/srcfld-list.component";
import { SrcListComponent } from "../../../source/selection/src-list.component";
import { SFieldSelectService } from "../../../../services/srcfld-select.service";
import { Subscription } from "rxjs/Subscription";
import { MapService } from "../../../../services/map.service";
import { ISourceField } from "../../../source/source";

@Component({
    selector: "condition-addedit",
    template: require("./condition.component.html"),
    providers: [DataService, SFieldSelectService]
})
export class ConditionComponent implements OnInit, OnDestroy {
    active = true;
    selectingCondition: ICondition;
    hasSelectedSourceField = false;
    selectedSourceField: ISourceField;
    //List of Conditions currently in the add/edit list
    conditions: ICondition[] = [];

    //Options for operator selection
    private dateNumOpts = [
        { value: "==", display: "equals" },
        { value: "!=", display: "not equal" },
        { value: "<", display: "less than" },
        { value: "<=", display: "less than or equal" },
        { value: ">", display: "greater than" },
        { value: ">=", display: "greater than or equal" },
    ];

    private textOpts = [
        { value: "==", display: "equals" },
        { value: "!=", display: "not equal" }
        //TODO: Contains, doesn't contain, begins with, ends with
    ];

    private boolOpts = [
        { value: "==", display: "equals" },
        { value: "!=", display: "not equal" }
    ];


    constructor() { }

    ngOnInit() {

    }
    ngOnDestroy() {

    }

}