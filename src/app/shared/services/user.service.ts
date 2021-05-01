import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = null;
    usersSubject: BehaviorSubject<User[]> = new BehaviorSubject(null);

    constructor(private dataService: DataService) { this.ngOnInit(); }

    ngOnInit() {
        this.dataService.getUsers()
            .subscribe((res: { status: number, description?: string, users: User[] }) => {
                console.log(res);
                this.users = res.users;
                this.usersSubject.next(this.users);
            });
    }

    getUsers() {
        return this.usersSubject;
    }

    addUser(newUser) {
        this.dataService.addUser(newUser)
            .subscribe((res: { status: number, description?: string, insertedId?: number }) => {
                console.log(res);
                newUser._id = res.insertedId;
                this.users.push(newUser);
                this.usersSubject.next(this.users);
            });
    }

    editUser(editedUser) {
        this.dataService.editUser(editedUser)
            .subscribe(((res: { status: number, description?: string, modifiedCount?: number }) => {
                console.log(res);
                this.users[this.users.findIndex(u => u._id == editedUser._id)] = editedUser;
            }), error => {
                console.log(error);
            });
    }

    getUser(_id) {
        return this.users.find(u => u._id == _id);
    }

    deleteUser(_id) {
        this.dataService.deleteUser(_id)
            .subscribe((res: { status: number, description?: string, deletedCount: number }) => {
                console.log(res);
                this.users = this.users.filter(u => u._id != _id);
                this.usersSubject.next(this.users);
            });
    }
}
