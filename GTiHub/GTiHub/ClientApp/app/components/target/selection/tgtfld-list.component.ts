import { Component, ViewChild, OnInit, Input, OnDestroy } from "@angular/core";
import { Response, Headers } from "@angular/http";
import { TargetField, Target } from "../target";
import { Subscription } from "rxjs/Subscription";
import { TFieldSelectService } from "../../../services/target-select.service";

@Component({
    selector: "targetfield-list",
    template: require("./tgtfld-list.component.html")
})
export class TgtFldListComponent implements OnInit, OnDestroy {
    private targetFields: TargetField[] = [];
    private selectedTargetField: TargetField;

    filterSubscription: Subscription;
    selectedSubscription: Subscription;

    onSelectTargetField(targetField: TargetField): void {
        this.selectService.setSelectedTargetField(targetField);
    }

    constructor(private selectService: TFieldSelectService) {}

    ngOnInit(): void {
        this.filterSubscription = this.selectService.getFilteredTargetFields()
            .subscribe((targetFields: TargetField[]) => this.targetFields = targetFields);
        this.selectedSubscription = this.selectService.getSelectedTargetField()
            .subscribe(targetField => this.selectedTargetField = targetField);
    }

    ngOnDestroy(): void {
        this.filterSubscription.unsubscribe();
        this.selectedSubscription.unsubscribe();
    }
}