import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuardService {

    constructor(
        private authenticationServicervice : AuthenticationService,
        private router : Router
    ) { }

    canAcess(){
        if(!this.authenticationServicervice.checkIfAuthenticated()){
            this.router.navigate(['/']);
        } else {
            return true;
        }
    }

    canAccessAdmin(){
        if(!this.authenticationServicervice.checkIfAdmin()){
            this.router.navigate(['/']);
        } else {
            return true;
        }
    }

    canNotAcessWhileLogged() {
        if(this.authenticationServicervice.checkIfAuthenticated()){
            this.router.navigate(['/']);
        } else {
            return true;
        }
    }


}
