import { Component, OnInit } from "@angular/core";
import { DualListComponent } from "../../ui/dual-listbox.component";
import { SourceService } from "../../../services/source/source.service";

@Component({
    selector: "src-dual-select",
    template: require('./src-dual-select.component.html')
})
export class SrcDualSelectComponent implements OnInit {
    private sources: any[] = [];
    private selectedSources: any[] = [];

    constructor(private sourceService: SourceService) { }
    ngOnInit() {
        this.sourceService.sources.subscribe(sources => this.sources = sources);
    }
}