import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";

@Component({
    selector: "project-edit",
    template: require("./project-addedit.component.html")
})
export class ProjectAddEditComponent {
    constructor(private _dataService: DataService) {}


}