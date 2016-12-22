import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Target } from "./target";
import { TargetService } from "../../services/target/target.service";

@Component({
    selector: "tgt-list",
    template: require("./tgt-list.component.html")
})
export class TgtListComponent implements OnInit {
    targets: Target[];

    editTarget(target: Target): void {
        this.targetService.setEditTarget(target);
        this.router.navigate(['/tgt-edit']);
    }

    delete(targetId: number): void {
        this.targetService.delete(targetId);
    }

    constructor(private targetService: TargetService, private router: Router) {
    }

    ngOnInit(): void {
        this.targetService.targets.subscribe(targets => this.targets = targets);
    }
}