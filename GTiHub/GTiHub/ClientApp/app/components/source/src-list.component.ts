import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Source } from "./source";
import { SourceService } from "../../services/source/source.service";
import { Subscription } from "rxjs/Subscription";
import { ConfirmationService } from "primeng/primeng";

@Component({
    selector: "src-list",
    template: require('./src-list.component.html')
})
export class SrcListComponent implements OnInit {
    private showDialog = false;
    private canDelete = false;
    private canEdit = false;
    private sources: Source[];
    private selectedSources: Source[] = [];

    editSource() {
        this.sourceService.setEditSource(this.selectedSources[0]);
        this.router.navigateByUrl('/src-edit');
    }

    deleteSources() {
        this.confirmationService.confirm({
            message: "Are you sure that you wish to delete the selected source(s)?",
            accept: () => {
                this.selectedSources.forEach((c, i) => {
                    this.sourceService.delete(c.sourceId);
                });
                this.selectedSources = [];
            }
        });
        this.canDelete = false;
        this.canEdit = false;
    }

    //Update the state of the delete and edit buttons based on row selection
    onRowSelect(event) {
        if (this.selectedSources.length > 1) {
            this.canEdit = false;
        }
        else {
            this.canDelete = true;
            this.canEdit = true;
        }
    }
    onRowUnselect(event) {
        if (this.selectedSources.length == 1) {
            this.canEdit = true;
        }
        if (this.selectedSources.length == 0) {
            this.canDelete = false;
            this.canEdit = false;
        }
    }

    constructor(private confirmationService: ConfirmationService, private router: Router, private sourceService: SourceService) { }
    ngOnInit() {
        this.sourceService.sources.subscribe(sources => this.sources = sources);
    }
}