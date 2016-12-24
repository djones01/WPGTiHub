import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "./user";
import { UserService } from "../../services/user/user.service";
import { Subscription } from "rxjs/Subscription";
import { ConfirmationService, SelectItem } from "primeng/primeng";

@Component({
    selector: "user-list",
    template: require('./user-list.component.html')
})
export class UserListComponent implements OnInit {
    private showDialog = false;
    private canDelete = false;
    private canEdit = false;
    private users: User[];
    private selectedUsers: User[] = [];

    private columnOptions: SelectItem[];
    private cols = [
        { field: 'firstName', header: 'First Name' },
        { field: 'lastName', header: 'Last Name' },
        { field: 'title', header: 'Title' },
        { field: 'phone', header: 'Phone' },
        { field: 'email', header: 'Email' },
        { field: 'created_By', header: 'Created By' },
        { field: 'creation_Date', header: 'Creation Date' },
        { field: 'modified_By', header: 'Modified By' },
        { field: 'date_Modified', header: 'Date Modified' }
    ];

    showEditingDialog() {
        this.showDialog = true;
    }

    editUser() {
        this.userService.setEditUser(this.selectedUsers[0]);
        this.showEditingDialog();
    }

    deleteUsers() {
        this.confirmationService.confirm({
            message: "Are you sure that you wish to delete the selected user(s)?",
            accept: () => {
                this.selectedUsers.forEach((c, i) => {
                    this.userService.delete(c.userId);
                });
                this.selectedUsers = [];
            }
        });
        this.canDelete = false;
        this.canEdit = false;
    }

    //Update the state of the delete and edit buttons based on row selection
    onRowSelect(event) {
        if (this.selectedUsers.length > 1) {
            this.canEdit = false;
        }
        else {
            this.canDelete = true;
            this.canEdit = true;
        }
    }
    onRowUnselect(event) {
        if (this.selectedUsers.length == 1) {
            this.canEdit = true;
        }
        if (this.selectedUsers.length == 0) {
            this.canDelete = false;
            this.canEdit = false;
        }
    }

    constructor(private confirmationService: ConfirmationService, private userService: UserService) { }
    ngOnInit() {
        this.userService.users.subscribe(users => this.users = users);

        this.columnOptions = [];
        for (let i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
    }
}