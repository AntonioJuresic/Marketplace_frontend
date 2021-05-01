import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AuthorizationGuardService } from '../shared/services/authorization-guard.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

    user : User;

    constructor(
        private authorizationGuardService: AuthorizationGuardService,
        private authenticationService : AuthenticationService
    ) { }

    ngOnInit() : void {
        this.authorizationGuardService.canAccessAdmin();
        this.user = this.authenticationService.getUser()
    }

}
