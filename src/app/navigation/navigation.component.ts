import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    userIsLogged: boolean = false;
    userIsAdmin: boolean = false;

    authenticationChangeSubscription: Subscription;
    user: User;

    constructor(
        private authenticationService: AuthenticationService,
    ) { }

    ngOnInit(): void {
        this.userIsLogged = this.authenticationService.checkIfAuthenticated();
        this.userIsAdmin = this.authenticationService.checkIfAdmin();

        this.authenticationChangeSubscription = this.authenticationService.authenticationChangeSubject
            .subscribe((res: boolean) => {
                console.log(res);
                this.userIsLogged = res;

                this.userIsAdmin = this.authenticationService.checkIfAdmin();

                /*if (this.isUserAuthenticated) {
                    this.user = this.authService.getUser();
                }*/
            });
    }

    logout() {
        this.authenticationService.logoutUser();
    }

    ngOnDestroy() {
        this.authenticationChangeSubscription.unsubscribe();
    }

}
