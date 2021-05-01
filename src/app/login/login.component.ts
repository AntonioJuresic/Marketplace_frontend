import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AuthorizationGuardService } from '../shared/services/authorization-guard.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public registerForm : FormGroup;
    errorMessage : string = null;

    constructor(
        private authorizationGuardService : AuthorizationGuardService,
        private formBuilder : FormBuilder,
        private authenticationService : AuthenticationService
    ) { }

    ngOnInit() : void {
        this.authorizationGuardService.canNotAcessWhileLogged();

        this.registerForm = this.formBuilder.group({
            username: new FormControl("", [Validators.required, Validators.minLength(4)]),
            password: new FormControl("", Validators.required)
        });

        this.authenticationService.authenticationErrorSubject
            .subscribe((error : string) => {
                this.errorMessage = error;
                console.log(this.errorMessage);
              });
    }

    get username() { return this.registerForm.get("username"); }
    get password() { return this.registerForm.get("password"); }

    onSubmit(): void {
        this.authenticationService.loginUser(this.registerForm.value.username, this.registerForm.value.password);
      
    }

}