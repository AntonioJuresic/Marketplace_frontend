import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class UserDetailService {

    user : User = new User;
    userSubject : BehaviorSubject<User> = new BehaviorSubject(null);

    constructor( private dataService : DataService ) { }

    getUser(_id) {
        this.dataService.getUser(_id)
            .subscribe((res: { status: number, description?: string, user: User }) => {
                console.log(res);
                this.user = res.user;
                this.userSubject.next(this.user);
            });
    
            return this.userSubject;
    }
}
