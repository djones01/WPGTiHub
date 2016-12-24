import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Rx";
import { DataService } from "../data/data.service";
import { Project } from "../../components/project/project";

@Injectable()
export class ProjectService {
    private _projects: BehaviorSubject<Project[]> = new BehaviorSubject([]);
    projects: Observable<Project[]> = this._projects.asObservable();
    private _editProject: BehaviorSubject<Project> = new BehaviorSubject(null);
    editProject: Observable<Project> = this._editProject.asObservable();
    private editing: boolean = false;

    private dataStore: {
        projects: Project[]
    };

    loadall() {
        this._dataService.GetAll("Projects")
            .subscribe(projects => {
                this.dataStore.projects = projects;
                this._projects.next(this.dataStore.projects);
            }, error => console.log(error), () => { });
    }

    setEditProject(edit: Project) {
        this._editProject.next(edit);
        this.editing = true;
    }

    initEditProject() {
        this._editProject.next(this.newProject());
    }

    newProject() {
        return new Project('', '', '', null);
    }

    submit(project: Project) {
        if (this.editing) {
            this.update(project);
        }
        else {
            this.add(project);
        }
        this.editing = false;
    }

    add(project: Project) {
        this._dataService.Add('Projects', project).subscribe(project => {
            this.dataStore.projects.push(project);
            this._projects.next(this.dataStore.projects);
        }, error => console.log(error));
    }

    update(project: Project) {
        this._dataService.Update('Projects', project.projectId, project).subscribe((project: Project) => {
            this.dataStore.projects.forEach((m, i) => {
                if (m.projectId === project.projectId) { this.dataStore.projects[i] = project; }
            });
            this._projects.next(this.dataStore.projects);
        }, error => console.log(error));
    }

    delete(projectId: number) {
        this._dataService.Delete('Projects', projectId).subscribe(response => {
            this.dataStore.projects.forEach((m, i) => {
                if (m.projectId === projectId) { this.dataStore.projects.splice(i, 1); }
            });
            this._projects.next(this.dataStore.projects);
        }, error => console.log(error));
    }

    constructor(private _dataService: DataService) {
        this.initEditProject();
        this.dataStore = { projects: [] };
        // Get the list of projects
        this.loadall();
    }
}