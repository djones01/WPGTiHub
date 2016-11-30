import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ISource } from "../source";
import { SFieldSelectService } from "../../../services/srcfld-select.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "src-list-select",
    template: require('./src-list-select.component.html')
})
export class SrcListSelectComponent {
    @Input('sources')
    sources: ISource[];
    private selectedSource: ISource = null;

    @Output('onSelectSource') onSelectSource = new EventEmitter();

    selectSource(source: ISource) {
        this.selectedSource = source;
        this.onSelectSource.emit();
        this.selectService.filterSrcFlds(source.sourceId);
    }

    constructor(private selectService: SFieldSelectService) { }
}