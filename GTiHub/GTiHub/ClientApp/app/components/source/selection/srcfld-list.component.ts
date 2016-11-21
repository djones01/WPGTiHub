import { Component, ViewChild, OnInit, Input, OnDestroy } from "@angular/core";
import { Response, Headers } from "@angular/http";
import { SourceField, Source } from "../source";
import { Subscription } from "rxjs/Subscription";
import { SFieldSelectService } from "../../../services/source-select.service";

@Component({
    selector: "sourcefield-list",
    template: require('./srcfld-list.component.html')
})
export class SrcFldListComponent implements OnInit, OnDestroy {
    private sourceFields: SourceField[] = [];
    private selectedSourceField: SourceField;

    filterSubscription: Subscription;
    selectedSubscription: Subscription;

    onSelectSourceField(sourceField: SourceField): void {
        this.selectService.setSelectedSourceField(sourceField);
    }

    constructor(private selectService: SFieldSelectService) { }

    ngOnInit(): void {
        this.filterSubscription = this.selectService.getFilteredSourceFields()
            .subscribe((sourceFields: SourceField[]) => this.sourceFields = sourceFields);
        this.selectedSubscription = this.selectService.getSelectedSourceField()
            .subscribe(sourceField => this.selectedSourceField = sourceField);
    }

    ngOnDestroy(): void {
        this.filterSubscription.unsubscribe();
        this.selectedSubscription.unsubscribe();
    }
}