import { Component, ViewChild, OnInit, Input, OnDestroy } from "@angular/core";
import { ISourceField } from "../source";
import { Subscription } from "rxjs/Subscription";
import { SFieldSelectService } from "../../../services/srcfld-select.service";

@Component({
    selector: "sourcefield-list",
    template: require('./srcfld-list.component.html')
})
export class SrcFldListComponent implements OnInit, OnDestroy {
    private sourceFields: ISourceField[] = [];
    private selectedSourceField: ISourceField;

    filterSubscription: Subscription;

    onSelectSourceField(sourceField: ISourceField): void {
        this.selectedSourceField = sourceField;
        this.selectService.setSelectedSourceField(sourceField);
    }

    constructor(private selectService: SFieldSelectService) { }

    ngOnInit(): void {
        this.filterSubscription = this.selectService.getFilteredSourceFields()
            .subscribe((sourceFields: ISourceField[]) => this.sourceFields = sourceFields);
    }

    ngOnDestroy(): void {
        this.filterSubscription.unsubscribe();
    }
}