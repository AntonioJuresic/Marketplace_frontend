import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Advertisement } from '../shared/models/advertisement.model';
import { Category } from '../shared/models/category.model';
import { Condition } from '../shared/models/condition.model';
import { Place } from '../shared/models/place.model';
import { User } from '../shared/models/user.model';
import { AdvertisementService } from '../shared/services/advertisement.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AuthorizationGuardService } from '../shared/services/authorization-guard.service';
import { CategoryService } from '../shared/services/category.service';
import { ConditionService } from '../shared/services/condition.service';
import { PlaceService } from '../shared/services/place.service';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-new-advertisement',
    templateUrl: './new-advertisement.component.html',
    styleUrls: ['./new-advertisement.component.css']
})
export class NewAdvertisementComponent implements OnInit {

    public newAdvertisement: Advertisement;
    public newAdvertisementForm!: FormGroup;

    user : User;

    categories : Category[];
    categoriesSubject : BehaviorSubject<Category[]>;
    categoriesSubscription : Subscription;

    conditions : Condition[];
    conditionsSubject : BehaviorSubject<Condition[]>;
    conditionsSubscription : Subscription;

    places : Place[];
    placesSubject : BehaviorSubject<Place[]>;
    placesSubscription : Subscription;

    constructor(
        private authenticationService : AuthenticationService,
        private authorizationGuardService: AuthorizationGuardService,

        private advertisementService : AdvertisementService,
        
        private categoriesService : CategoryService,
        private conditionsService : ConditionService,
        private placesService : PlaceService,

        private formBuilder : FormBuilder,
        private router : Router
    ) { }

    ngOnInit() : void {
        this.user = this.authenticationService.getUser();
        this.authorizationGuardService.canAcess();

        this.categoriesSubject = this.categoriesService.getCategories();
        this.categoriesSubscription = this.categoriesSubject
            .subscribe(res => {
                this.categories = res;
            });

        this.conditionsSubject = this.conditionsService.getConditions();
        this.conditionsSubscription = this.conditionsSubject
            .subscribe(res => {
                this.conditions = res;
            });

        this.placesSubject = this.placesService.getPlaces();
        this.placesSubscription = this.placesSubject
            .subscribe(res => {
                this.places = res;
            });

        this.newAdvertisementForm = this.formBuilder.group({
            name: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
            description: new FormControl("", Validators.required),
            price: new FormControl("", Validators.required),

            conditionFK: new FormControl("", Validators.required),
            placeNameFK: new FormControl("", Validators.required),
            categoryNameFK: new FormControl("", Validators.required)
        });
    }

    get name() { return this.newAdvertisementForm.get("name"); }
    get description() { return this.newAdvertisementForm.get("description"); }
    get price() { return this.newAdvertisementForm.get("price"); }

    get conditionFK() { return this.newAdvertisementForm.get("conditionFK"); }
    get placeNameFK() { return this.newAdvertisementForm.get("placeNameFK"); }
    get categoryNameFK() { return this.newAdvertisementForm.get("categoryNameFK"); }

    get f() {
        return this.newAdvertisementForm.controls;
    }

    onSubmit() {
        this.newAdvertisement = new Advertisement();

        this.newAdvertisement.name = this.newAdvertisementForm.value.name;
        this.newAdvertisement.description = this.newAdvertisementForm.value.description;
        this.newAdvertisement.price = this.newAdvertisementForm.value.price;

        this.newAdvertisement.conditionNameFK = this.newAdvertisementForm.value.conditionFK;
        this.newAdvertisement.placeNameFK = this.newAdvertisementForm.value.placeNameFK;
        this.newAdvertisement.categoryNameFK = this.newAdvertisementForm.value.categoryNameFK;

        this.newAdvertisement.sellerUsernameFK = this.user.username;
        this.newAdvertisement.seller_idFK = this.user._id;

        this.advertisementService.addAdvertisement(this.newAdvertisement);

        console.log(this.newAdvertisement);
        this.router.navigate(["/"]);
    }

}
