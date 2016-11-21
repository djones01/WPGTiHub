import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { Source, SourceField } from "./source";
import { DataService } from "../../services/data.service";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { SourceService } from "../../services/source.service";
import { Response, Headers } from "@angular/http";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "sourcefield-addedit",
    template: require('./srcfld.component.html'),
    providers: [DataService],
})
export class SrcFldComponent implements OnInit, OnDestroy {
    sourceFields: SourceField[] = [];

    //Subscriptions
    sourceFieldSubscription: Subscription;

    private options = [
        { value: "url", display: "URL" },
        { value: "text", display: "Text" },
        { value: "date", display: "Date" },
        { value: "bool", display: "Boolean" },
        { value: "num", display: "Number" },
        { value: "currency", display: "Currency" },
        { value: "email", display: "Email" }
    ];

    removeSourceField(sourceField, i) {
        this.sourceAddEditService.removeSourceField(sourceField, i);
    }

    constructor(private _dataService: DataService, private sourceAddEditService: SourceService) {
    }

    ngOnInit(): void {
        this.sourceFieldSubscription = this.sourceAddEditService.getSourceFields()
            .subscribe(sourceFields => this.sourceFields = sourceFields);
    }

    ngOnDestroy(): void {
        this.sourceFieldSubscription.unsubscribe();
    }
}