import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-adminusers',
    templateUrl: './adminusers.component.html',
    styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {

    users: User[];
    usersSubject: BehaviorSubject<User[]> = new BehaviorSubject(null);
    subscription : Subscription;

    oneUser : User;

    constructor(
        private userService : UserService
    ) { }

    ngOnInit(): void {
        this.usersSubject = this.userService.getUsers();
        this.subscription = this.usersSubject
            .subscribe(res => {
                this.users = res;
            });
    }

    getUser(i) {
        let u = this.users[i];
        console.log(this.userService.getUser(u._id));
    }
    
    deleteUser(i) {
        let u = this.users[i];
        this.userService.deleteUser(u._id);
    }

    ngOnDestory() {
        this.subscription.unsubscribe();
    }

}
