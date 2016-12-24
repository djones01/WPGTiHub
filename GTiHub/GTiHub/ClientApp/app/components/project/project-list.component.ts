import { Component, OnInit, OnDestroy } from "@angular/core";
import { Project } from "./project";
import { ProjectService } from "../../services/project/project.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "project-list",
    template: require('./project-list.component.html')
})
export class ProjectListComponent implements OnInit {
    private showDialog = false;
    private canDelete = false;
    private canEdit = false;
    private projects: Project[];
    private selectedProjects: Project[] = [];

    showEditingDialog() {
        this.showDialog = true;
    }

    editProject() {
        this.projectService.setEditProject(this.selectedProjects[0]);
        this.showEditingDialog();
    }

    delete(project: Project) {
        this.projectService.delete(project.projectId);
    }

    //Update the state of the delete and edit buttons based on row selection
    onRowSelect(event) {
        if (this.selectedProjects.length > 1) {
            this.canEdit = false;
        }
        else {
            this.canDelete = true;
            this.canEdit = true;
        }
    }
    onRowUnselect(event) {
        if (this.selectedProjects.length == 0) {
            this.canDelete = false;
            this.canEdit = false;
        }
    }

    constructor(private projectService: ProjectService) { }
    ngOnInit() {
        this.projectService.projects.subscribe(projects => this.projects = projects);
    }
}