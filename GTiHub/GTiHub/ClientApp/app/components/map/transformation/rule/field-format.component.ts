import { Component, OnInit, OnChanges, Input, Output } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DateFormatComponent } from "./date-format.component";

@Component({
    selector: "field-format",
    template: require("./field-format.component.html")
})
export class FieldFormatComponent implements OnInit {
    @Input()
    fieldDataType: string;

    //Modal Functions
    openCustomFormat(content) {
        this.modalService.open(content, { size: "lg" })
            .result.then((result) => {

                },
                (reason) => {});
    }

    constructor(private modalService: NgbModal) {}

    ngOnInit() {}

}