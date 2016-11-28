import { Component, ViewChild, OnInit, Output, OnDestroy } from "@angular/core";
import { ITarget } from "../target";
import { TFieldSelectService } from "../../../services/tgtfld-select.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "target-list",
    template: require('./tgt-list.component.html')
})
export class TgtListComponent implements OnInit, OnDestroy {
    private targets: ITarget[] = [];
    private selectedTarget: ITarget;
    targetsSubscription: Subscription;

    onSelectTarget(target: ITarget) {
        this.selectedTarget = target;
        this.selectService.filterTargetFields(target.targetId);
    }

    constructor(private selectService: TFieldSelectService) {
    }

    ngOnInit(): void {
        this.targetsSubscription = this.selectService.getTargets().subscribe(targets => this.targets = targets);
        this.selectService.initTargets();
    }

    ngOnDestroy(): void {
        this.targetsSubscription.unsubscribe();
    }
}