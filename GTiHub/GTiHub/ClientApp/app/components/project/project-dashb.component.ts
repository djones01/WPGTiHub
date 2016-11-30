import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";

@Component({
    selector: "project-dashb",
    template: require("./project-dashb.component.html")
})
export class ProjectDashboardComponent implements OnInit {
    projects: Object[] = [];

    constructor(private _dataService: DataService) {
    }

    getProjects(): void {
        this._dataService.GetAll("Projects").subscribe(projects => this.projects = projects);
    }

    ngOnInit(): void {
        this.getProjects();
    }
}