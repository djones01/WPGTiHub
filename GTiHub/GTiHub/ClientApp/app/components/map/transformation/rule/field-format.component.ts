import { Component, OnInit, OnChanges, Input, Output } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DateFormatComponent } from "./date-format.component";

@Component({
    selector: "field-format",
    template: require("./field-format.component.html")
})
export class FieldFormatComponent implements OnInit {
    private display: boolean = false;
    @Input()
    fieldDataType: string;

    showDialog() {
        this.display = !this.display;
    }
    selectFormat() {
        this.showDialog();
    }

    constructor(private modalService: NgbModal) {}

    ngOnInit() {}

}