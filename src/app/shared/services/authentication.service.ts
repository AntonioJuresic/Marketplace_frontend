import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private user : User;

    public authenticationChangeSubject: Subject<boolean> = new Subject<boolean>();
    public authenticationErrorSubject: Subject<string> = new Subject<string>();

    constructor(
        private dataService: DataService,
        private router: Router
    ) { }

    loginUser(username, password) {
        this.dataService
            .authenticateUser(username, password)
            .subscribe((res: { status: number; description?: string; user?: User }) => {
                if (res.status == 200) {
                    this.user = res.user;

                    localStorage.setItem('user', JSON.stringify(this.user));
                    this.authenticationChangeSubject.next(true);

                    this.router.navigate(['/']);
                } else {
                    this.authenticationErrorSubject.next(res.description);
                }
            });
    }

    logoutUser() {
        this.user = null;
        localStorage.removeItem('user');

        this.authenticationChangeSubject.next(false);
        this.router.navigate(['']);
    }

    getUser() {
        if (this.user) {
            return this.user;
        } else {
            this.user = JSON.parse(localStorage.getItem('user'));
            return this.user;
        }
    }

    checkIfAuthenticated() {
        if (this.user) {
            return true;
        } else {
            return false;
        }
    }

    checkIfAdmin() {
        if (this.checkIfAuthenticated()) {
            if (this.user.admin) {
                return true;
            } else if (this.user.admin) {
                return false;
            }
        } else {
            return false;
        }
    }
}
