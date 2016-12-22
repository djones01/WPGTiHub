import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { User } from "./user";
import { UserService } from "../../services/user/user.service";

@Component({
    selector: "user-edit",
    template: require('./user-edit.component.html'),
    providers: [UserService]
})
export class UserEditComponent implements OnInit {
    public userForm: FormGroup;
    public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    user: User;

    onSubmit(user: User) {
        this.userService.submit(user);
        this.reset();
    }

    initUserForm() {
        this.userForm = this._fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            title: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required]
        });
    }

    reset() {
        this.userService.initEditUser();
    }

    constructor(private _fb: FormBuilder, private userService: UserService) {
    }

    ngOnInit(): void {
        this.initUserForm();
        this.userService.editUser.subscribe(user => this.user = user);
    }
}