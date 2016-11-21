import { Component, ViewChild, OnInit, Output, OnDestroy } from "@angular/core";
import { Response, Headers } from "@angular/http";
import { Target } from "../target";
import { TFieldSelectService } from "../../../services/target-select.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "target-list",
    template: require("./tgt-list.component.html")
})
export class TgtListComponent implements OnInit, OnDestroy {
    private targets: Target[] = [];
    private selectedTarget: Target;

    selectedSubscription: Subscription;
    targetsSubscription: Subscription;

    onSelectTarget(target: Target) {
        this.selectService.setSelectedTarget(target);
    }

    constructor(private selectService: TFieldSelectService) {
    }

    ngOnInit(): void {
        this.selectedSubscription = this.selectService.getSelectedTarget()
            .subscribe(selectedTarget => { this.selectedTarget = selectedTarget });
        this.targetsSubscription = this.selectService.getTargets().subscribe(targets => this.targets = targets);
        this.selectService.initTargets();
    }

    ngOnDestroy(): void {
        this.selectedSubscription.unsubscribe();
        this.targetsSubscription.unsubscribe();
    }
}