import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ITargetField } from "../target";
import { TFieldSelectService } from "../../../services/tgtfld-select.service";

@Component({
    selector: "targetfield-list",
    template: require('./tgtfld-list.component.html')
})
export class TgtFldListComponent {
    @Input('filteredTargetFields')
    targetFields: ITargetField[];
    private selectedTargetField: ITargetField = null;

    @Output('onFieldSelect') onFieldSelect = new EventEmitter<ITargetField>();

    onSelectTargetField(targetField: ITargetField): void {
        this.selectedTargetField = targetField;
        this.onFieldSelect.emit(this.selectedTargetField);
    }

    constructor(private selectService: TFieldSelectService) { }
}