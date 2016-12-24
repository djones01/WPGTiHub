import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Project } from "./project";
import { ProjectService } from "../../services/project/project.service";

@Component({
    selector: "project-edit",
    template: require('./project-edit.component.html')
})
export class ProjectEditComponent implements OnInit {
    projectForm: FormGroup;
    project: Project;

    public project_Types = [
        { value: 'upgrade', display: 'Upgrade' },
        { value: 'maintenance', display: 'Maintenance' },
        { value: 'new', display: 'New Installation' },
        { value: 'retrofit', display: 'Retrofit' }
    ];

    onSubmit(project: Project) {
        Object.assign(this.project, project);
        this.projectService.submit(this.project);
        this.reset();
    }

    initProjectForm() {
        this.projectForm = this._fb.group({
            description: ['', Validators.required],
            name: ['', Validators.required],
            project_Type: ['', Validators.required],
            client: [null, Validators.required],
            projectMaps: [[]],
            projectSources: [[]],
            projectTargets: [[]],
            userProjectSecs: [[]]
        });
    }

    reset() {
        this.projectForm.reset();
    }

    constructor(private _fb: FormBuilder, private projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.projectService.editProject.subscribe(project => {
            this.project = project
            this.initProjectForm();
        });
    }
}