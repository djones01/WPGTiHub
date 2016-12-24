import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Rx";
import { DataService } from "../data/data.service";
import { User } from "../../components/user/user";

@Injectable()
export class UserService {
    private _users: BehaviorSubject<User[]> = new BehaviorSubject([]);
    users: Observable<User[]> = this._users.asObservable();
    private _editUser: BehaviorSubject<User> = new BehaviorSubject(null);
    editUser: Observable<User> = this._editUser.asObservable();
    private editing: boolean = false;

    private dataStore: {
        users: User[]
    };

    loadall() {
        this._dataService.GetAll("Users")
            .subscribe(users => {
                this.dataStore.users = users;
                this._users.next(this.dataStore.users);
            }, error => console.log(error), () => { });
    }

    setEditUser(edit: User) {
        this._editUser.next(edit);
        this.editing = true;
    }

    initEditUser() {
        this._editUser.next(this.newUser());
    }

    newUser() {
        return new User('', '', '', '', '');
    }

    submit(user: User) {
        if (this.editing) {
            this.update(user);
        }
        else {
            this.add(user);
        }
        this.editing = false;
    }

    add(user: User) {
        this._dataService.Add('Users', user).subscribe(user => {
            this.dataStore.users.push(user);
            this._users.next(this.dataStore.users);
        }, error => console.log(error));
    }

    update(user: User) {
        this._dataService.Update('Users', user.userId, user).subscribe((user: User) => {
            this.dataStore.users.forEach((m, i) => {
                if (m.userId === user.userId) { this.dataStore.users[i] = user; }
            });
            this._users.next(this.dataStore.users);
        }, error => console.log(error));
    }

    delete(userId: number) {
        this._dataService.Delete('Users', userId).subscribe(response => {
            this.dataStore.users.forEach((m, i) => {
                if (m.userId === userId) { this.dataStore.users.splice(i, 1); }
            });
            this._users.next(this.dataStore.users);
        }, error => console.log(error));
    }

    constructor(private _dataService: DataService) {
        this.initEditUser();
        this.dataStore = { users: [] };
        // Get the list of users
        this.loadall();
    }
}