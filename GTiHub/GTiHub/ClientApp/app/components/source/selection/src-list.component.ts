import { Component, ViewChild, OnInit, Output, OnDestroy } from "@angular/core";
import { Response, Headers } from "@angular/http";
import { Source } from "../source";
import { SFieldSelectService } from "../../../services/source-select.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "source-list",
    template: require('./src-list.component.html')
})
export class SrcListComponent implements OnInit, OnDestroy {
    private sources: Source[] = [];
    private selectedSource: Source;

    selectedSubscription: Subscription;
    sourcesSubscription: Subscription;

    onSelectSource(source: Source) {
        this.selectService.setSelectedSource(source);
    }

    constructor(private selectService: SFieldSelectService) {
    }

    ngOnInit(): void {
        this.selectedSubscription = this.selectService.getSelectedSource()
            .subscribe(selectedSource => { this.selectedSource = selectedSource });
        this.sourcesSubscription = this.selectService.getSources().subscribe(sources => this.sources = sources);
        this.selectService.initSources();
    }

    ngOnDestroy(): void {
        this.selectedSubscription.unsubscribe();
        this.sourcesSubscription.unsubscribe();
    }
}