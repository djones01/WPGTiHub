import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Source } from "./source";
import { SourceService } from "../../services/source/source.service";

@Component({
    selector: "src-list",
    template: require("./src-list.component.html")
})
export class SrcListComponent implements OnInit {
    sources: Source[];

    edit(source: Source): void {
        this.sourceService.setEditSource(source);
        this.router.navigate(['/src-edit']);
    }

    delete(sourceId: number): void {
        this.sourceService.delete(sourceId);
    }

    constructor(private sourceService: SourceService, private router: Router) {
    }

    ngOnInit(): void {
        this.sourceService.sources.subscribe(sources => this.sources = sources);
    }
}