import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Target } from "./target";
import { TargetService } from "../../services/target/target.service";
import { Subscription } from "rxjs/Subscription";
import { ConfirmationService } from "primeng/primeng";

@Component({
    selector: "tgt-list",
    template: require('./tgt-list.component.html')
})
export class TgtListComponent implements OnInit {
    private showDialog = false;
    private canDelete = false;
    private canEdit = false;
    private targets: Target[];
    private selectedTargets: Target[] = [];

    editTarget() {
        this.targetService.setEditTarget(this.selectedTargets[0]);
        this.router.navigateByUrl('/tgt-edit');
    }

    deleteTargets() {
        this.confirmationService.confirm({
            message: "Are you sure that you wish to delete the selected target(s)?",
            accept: () => {
                this.selectedTargets.forEach((c, i) => {
                    this.targetService.delete(c.targetId);
                });
                this.selectedTargets = [];
            }
        });
        this.canDelete = false;
        this.canEdit = false;
    }

    //Update the state of the delete and edit buttons based on row selection
    onRowSelect(event) {
        if (this.selectedTargets.length > 1) {
            this.canEdit = false;
        }
        else {
            this.canDelete = true;
            this.canEdit = true;
        }
    }
    onRowUnselect(event) {
        if (this.selectedTargets.length == 1) {
            this.canEdit = true;
        }
        if (this.selectedTargets.length == 0) {
            this.canDelete = false;
            this.canEdit = false;
        }
    }

    constructor(private confirmationService: ConfirmationService, private router: Router, private targetService: TargetService) { }
    ngOnInit() {
        this.targetService.targets.subscribe(targets => this.targets = targets);
    }
}