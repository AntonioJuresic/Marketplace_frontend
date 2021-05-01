import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';
import { UserDetailService } from '../shared/services/user-detail.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    @Input() _id: string;

    user : User = new User;
    userSubject : BehaviorSubject<User> = new BehaviorSubject(null);
    userSubscription : Subscription;

    constructor(
        private userDetailService : UserDetailService
    ) { }

    ngOnInit(): void {
        this.userSubject = this.userDetailService.getUser(this._id);
        this.userSubscription = this.userSubject
            .subscribe(res => {
                this.user = res;
            });
    }

}
