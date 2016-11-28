import { Component, ViewChild, OnInit, Input, OnDestroy } from "@angular/core";
import { ITargetField } from "../target";
import { Subscription } from "rxjs/Subscription";
import { TFieldSelectService } from "../../../services/tgtfld-select.service";

@Component({
    selector: "targetfield-list",
    template: require('./tgtfld-list.component.html')
})
export class TgtFldListComponent implements OnInit, OnDestroy {
    private targetFields: ITargetField[] = [];
    private selectedTargetField: ITargetField;

    filterSubscription: Subscription;

    onSelectTargetField(targetField: ITargetField): void {
        this.selectedTargetField = targetField;
        this.selectService.setSelectedTargetField(targetField);
    }

    constructor(private selectService: TFieldSelectService) { }

    ngOnInit(): void {
        this.filterSubscription = this.selectService.getFilteredTargetFields()
            .subscribe((targetFields: ITargetField[]) => this.targetFields = targetFields);
    }

    ngOnDestroy(): void {
        this.filterSubscription.unsubscribe();
    }
}