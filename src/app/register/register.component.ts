import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Place } from '../shared/models/place.model';
import { User } from '../shared/models/user.model';
import { AuthorizationGuardService } from '../shared/services/authorization-guard.service';
import { PlaceService } from '../shared/services/place.service';
import { UserService } from '../shared/services/user.service';
import { confirmedValidator } from './ConfirmedValidator.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    newUser : User;
    public registerForm : FormGroup;

    places: Place[];
    placesSubject: BehaviorSubject<Place[]>;
    placesSubscription: Subscription;

    constructor(
        private authorizationGuardService : AuthorizationGuardService,
        
        private placesService : PlaceService,
        private userService : UserService,

        private formBuilder : FormBuilder,
        private router : Router
    ) { }

    ngOnInit() : void {
        this.authorizationGuardService.canNotAcessWhileLogged();

        this.placesSubject = this.placesService.getPlaces();
        this.placesSubscription = this.placesSubject
            .subscribe(res => {
                this.places = res;
            });

        this.registerForm = this.formBuilder.group({
            username: new FormControl("", [Validators.required, Validators.minLength(4)]),
            email: new FormControl("", [Validators.required, Validators.email]),
            admin: new FormControl(""),

            password1: new FormControl("", Validators.required),
            password2: new FormControl("", Validators.required),

            name: new FormControl("", Validators.required),
            surname: new FormControl("", Validators.required),
            dateOfBirth: new FormControl("", Validators.required),

            streetName: new FormControl("", Validators.required),
            streetNumber: new FormControl("", Validators.required),
            placeNameFK: new FormControl("", Validators.required)
        },
            {
                validator: confirmedValidator('password1', 'password2')
            });
    }

    get username() { return this.registerForm.get("username"); }
    get email() { return this.registerForm.get("email"); }
    get admin() { return this.registerForm.get("admin"); }

    get password1() { return this.registerForm.get("password1"); }
    get password2() { return this.registerForm.get("password2"); }

    get name() { return this.registerForm.get("name"); }
    get surname() { return this.registerForm.get("surname"); }
    get dateOfBirth() { return this.registerForm.get("dateOfBirth"); }

    get streetName() { return this.registerForm.get("streetName"); }
    get streetNumber() { return this.registerForm.get("streetNumber"); }
    get placeNameFK() { return this.registerForm.get("placeNameFK"); }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {

        this.newUser = new User();

        this.newUser.username = this.registerForm.value.username;
        this.newUser.email = this.registerForm.value.email;
        this.newUser.password = this.registerForm.value.password1;

        if (this.registerForm.value.admin) {
            this.newUser.admin = this.registerForm.value.admin;
        } else {
            this.newUser.admin = false;
        }

        this.newUser.name = this.registerForm.value.name;
        this.newUser.surname = this.registerForm.value.surname;
        this.newUser.dateOfBirth = this.registerForm.value.dateOfBirth;

        this.newUser.streetName = this.registerForm.value.streetName;
        this.newUser.streetNumber = this.registerForm.value.streetNumber;
        this.newUser.placeNameFK = this.registerForm.value.placeNameFK;

        console.log(this.newUser);
        this.userService.addUser(this.newUser);

        this.router.navigate(["/prijava"]);
    }

    ngOnDestroy() {
        this.placesSubscription.unsubscribe();
    }


}