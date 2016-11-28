import { Component, ViewChild, OnInit, Output, OnDestroy } from "@angular/core";
import { ISource } from "../source";
import { SFieldSelectService } from "../../../services/srcfld-select.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "source-list",
    template: require('./src-list.component.html')
})
export class SrcListComponent implements OnInit, OnDestroy {
    private sources: ISource[] = [];
    private selectedSource: ISource;
    sourcesSubscription: Subscription;

    onSelectSource(source: ISource) {
        this.selectedSource = source;
        this.selectService.filterSourceFields(source.sourceId);
    }

    constructor(private selectService: SFieldSelectService) {
    }

    ngOnInit(): void {
        this.sourcesSubscription = this.selectService.getSources().subscribe(sources => this.sources = sources);
        this.selectService.initSources();
    }

    ngOnDestroy(): void {
        this.sourcesSubscription.unsubscribe();
    }
}