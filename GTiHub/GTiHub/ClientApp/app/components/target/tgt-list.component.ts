import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ITarget } from "./target";
import { TargetService } from "../../services/target.service";

@Component({
    selector: "tgt-list",
    template: require("./tgt-list.component.html")
})
export class TgtListComponent implements OnInit {
    targets: ITarget[];

    editTarget(target: ITarget): void {
        this.targetService.setEditTarget(target);
        this.router.navigate(['/tgt-edit']);
    }

    deleteTarget(targetId: number): void {
        this.targetService.deleteTarget(targetId);
    }

    constructor(private targetService: TargetService, private router: Router) {
    }

    ngOnInit(): void {
        this.targetService.targets.subscribe(targets => this.targets = targets);
    }
}