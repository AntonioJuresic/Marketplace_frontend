import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Advertisement } from '../shared/models/advertisement.model';
import { Category } from '../shared/models/category.model';
import { Condition } from '../shared/models/condition.model';
import { Place } from '../shared/models/place.model';
import { AdvertisementService } from '../shared/services/advertisement.service';
import { CategoryService } from '../shared/services/category.service';
import { ConditionService } from '../shared/services/condition.service';
import { PlaceService } from '../shared/services/place.service';

@Component({
    selector: 'app-advertisement-edit',
    templateUrl: './advertisement-edit.component.html',
    styleUrls: ['./advertisement-edit.component.css']
})
export class AdvertisementEditComponent implements OnInit {

    @Input() advertisement: Advertisement;

    editedAdvertisement = new Advertisement();
    public newAdvertisementForm : FormGroup;

    categories: Category[];
    categoriesSubject: BehaviorSubject<Category[]>;
    categoriesSubscription: Subscription;

    conditions: Condition[];
    conditionsSubject: BehaviorSubject<Condition[]>;
    conditionsSubscription: Subscription;

    places: Place[];
    placesSubject: BehaviorSubject<Place[]>;
    placesSubscription: Subscription;

    constructor(
        private advertisementService: AdvertisementService,

        private categoriesService: CategoryService,
        private conditionsService: ConditionService,
        private placesService: PlaceService,

        private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit(): void {
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
            name: new FormControl(this.advertisement.name, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
            description: new FormControl(this.advertisement.description, Validators.required),
            price: new FormControl(this.advertisement.price, Validators.required),

            conditionFK: new FormControl(this.advertisement.conditionNameFK, Validators.required),
            placeNameFK: new FormControl(this.advertisement.placeNameFK, Validators.required),
            categoryNameFK: new FormControl(this.advertisement.conditionNameFK, Validators.required)
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
        this.editedAdvertisement = new Advertisement();

        this.editedAdvertisement._id = this.advertisement._id;

        this.editedAdvertisement.name = this.newAdvertisementForm.value.name;
        this.editedAdvertisement.description = this.newAdvertisementForm.value.description;
        this.editedAdvertisement.price = this.newAdvertisementForm.value.price;

        this.editedAdvertisement.conditionNameFK = this.newAdvertisementForm.value.conditionFK;
        this.editedAdvertisement.placeNameFK = this.newAdvertisementForm.value.placeNameFK;
        this.editedAdvertisement.categoryNameFK = this.newAdvertisementForm.value.categoryNameFK;

        this.editedAdvertisement.sellerUsernameFK = this.advertisement.sellerUsernameFK;
        this.editedAdvertisement.seller_idFK = this.advertisement.seller_idFK;

        this.advertisementService.editAdvertisement(this.editedAdvertisement);

        console.log(this.editedAdvertisement);
        this.router.navigate(["/"]);
    }

}