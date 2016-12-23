import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Project } from "./project";
import { ProjectService } from "../../services/project/project.service";

@Component({
    selector: "project-edit",
    template: require("./project-edit.component.html")
})
export class ProjectEditComponent implements OnInit {
    public projForm: FormGroup;

    public project_Types = [
        { value: 'upgrade', display: 'Upgrade' },
        { value: 'maintenance', display: 'Maintenance' },
        { value: 'new', display: 'New Installation' },
        { value: 'retrofit', display: 'Retrofit' }
    ];

    initProjForm() {
        this.projForm = this._fb.group({
            description: ['', Validators.required],
            name: ['', Validators.required],
            project_Type: ['', Validators.required],
            client: ['', Validators.required],
            projectMaps: [[]],
            projectSources: [[]],
            projectTargets: [[]],
            userProjectSecs: [[]]
        });
    }

    constructor(private _fb: FormBuilder, private projectService: ProjectService) { }
    ngOnInit() {
        this.initProjForm();
    }
}