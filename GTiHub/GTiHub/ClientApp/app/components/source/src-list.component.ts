import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ISource } from "./source";
import { SourceService } from "../../services/source.service";

@Component({
    selector: "src-list",
    template: require("./src-list.component.html")
})
export class SrcListComponent implements OnInit {
    sources: ISource[];

    editSource(source: ISource): void {
        this.sourceService.setEditSource(source);
        this.router.navigate(['/src-edit']);
    }

    deleteSource(sourceId: number): void {
        this.sourceService.deleteSource(sourceId);
    }

    constructor(private sourceService: SourceService, private router: Router) {
    }

    ngOnInit(): void {
        this.sourceService.sources.subscribe(sources => this.sources = sources);
    }
}