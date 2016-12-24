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
        Object.assign(this.user, user);
        this.userService.submit(user);
        this.reset();
    }

    initUserForm() {
        this.userForm = this._fb.group({
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            title: [this.user.title],
            phone: [this.user.phone],
            email: [this.user.email, Validators.required]
        });
    }

    reset() {
        this.userForm.reset();
    }

    constructor(private _fb: FormBuilder, private userService: UserService) {
    }

    ngOnInit(): void {        
        this.userService.editUser.subscribe(user => {
            this.user = user;  
            this.initUserForm();
        });     
    }
}