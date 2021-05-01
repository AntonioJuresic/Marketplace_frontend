import { Component, OnInit } from '@angular/core';
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
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    QueryCategory = '';
    QueryName = '';

    QueryMinimalPrice = null;
    QueryMaximalPrice = null;

    QueryCondition = '';
    QueryPlace = '';

    advertisements : Advertisement[];
    advertisementsSubject : BehaviorSubject<Advertisement[]>;
    advertisementsSubscription : Subscription;

    categories : Category[];
    categoriesSubject : BehaviorSubject<Category[]> ;
    categoriesSubscription : Subscription;

    conditions : Condition[];
    conditionsSubject : BehaviorSubject<Condition[]>;
    conditionsSubscription : Subscription;

    places : Place[];
    placesSubject : BehaviorSubject<Place[]>;
    placesSubscription : Subscription;


    constructor(
        private advertisementsService : AdvertisementService,
        private categoriesService : CategoryService,
        private conditionsService : ConditionService,
        private placesService : PlaceService
    ) { }

    ngOnInit() : void {
        this.advertisementsSubject = this.advertisementsService.getAdvertisements();
        this.advertisementsSubscription = this.advertisementsSubject
            .subscribe(res => {
                this.advertisements = res;
            });

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
    }

}
