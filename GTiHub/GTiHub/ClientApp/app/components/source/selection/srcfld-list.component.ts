import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ISourceField } from "../source";
import { SFieldSelectService } from "../../../services/source/srcfld-select.service";

@Component({
    selector: "sourcefield-list",
    template: require('./srcfld-list.component.html')
})
export class SrcFldListComponent {
    @Input('filteredSourceFields')
    sourceFields: ISourceField[];
    private selectedSourceField: ISourceField = null;

    @Output('onFieldSelect') onFieldSelect = new EventEmitter<ISourceField>();

    onSelectSourceField(sourceField: ISourceField): void {
        this.selectedSourceField = sourceField;
        this.onFieldSelect.emit(this.selectedSourceField);
    }

    constructor(private selectService: SFieldSelectService) { }
}