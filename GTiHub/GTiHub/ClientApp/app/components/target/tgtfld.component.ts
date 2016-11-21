import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Target, TargetField } from "./target";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { TargetService } from "../../services/target.service";
import { Response, Headers } from "@angular/http";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "targetfield-addedit",
    template: require("./tgtfld.component.html")
})
export class TgtFldComponent implements OnInit, OnDestroy {
    targetFields: TargetField[] = [];

    //Subscriptions
    targetFieldSubscription: Subscription;

    private options = [
        { value: "url", display: "URL" },
        { value: "text", display: "Text" },
        { value: "date", display: "Date" },
        { value: "bool", display: "Boolean" },
        { value: "num", display: "Number" },
        { value: "currency", display: "Currency" },
        { value: "email", display: "Email" }
    ];

    removeTargetField(targetField, i) {
        this.targetService.removeTargetField(targetField, i);
    }

    constructor(private targetService: TargetService) {
    }

    ngOnInit(): void {
        this.targetFieldSubscription = this.targetService.getTargetFields()
            .subscribe(targetFields => this.targetFields = targetFields);
    }

    ngOnDestroy(): void {
        this.targetFieldSubscription.unsubscribe();
    }
}