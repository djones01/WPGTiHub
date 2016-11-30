import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ITarget } from "../target";
import { TFieldSelectService } from "../../../services/tgtfld-select.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "target-list",
    template: require('./tgt-list.component.html')
})
export class TgtListComponent {
    @Input('targets')
    targets: ITarget[];
    private selectedTarget: ITarget = null;

    @Output('onSelectTarget') onSelectTarget = new EventEmitter();

    selectTarget(target: ITarget) {
        this.selectedTarget = target;
        this.onSelectTarget.emit();
        this.selectService.filterTgtFlds(target.targetId);
    }

    constructor(private selectService: TFieldSelectService) { }
}