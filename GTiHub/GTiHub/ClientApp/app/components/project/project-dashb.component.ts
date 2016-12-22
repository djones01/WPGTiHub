import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../services/project/project.service";

@Component({
    selector: "project-dashb",
    template: require("./project-dashb.component.html")
})
export class ProjectDashboardComponent implements OnInit {
    projects: Object[] = [];

    constructor(private projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.projectService.projects.subscribe(projects => this.projects = projects);
    }
}