import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from 'rxjs';
import { Advertisement } from '../shared/models/advertisement.model';
import { User } from '../shared/models/user.model';
import { AdvertisementDetailService } from '../shared/services/advertisement-detail.service';
import { AdvertisementService } from '../shared/services/advertisement.service';
import { DataService } from '../shared/services/data.service';
import { UserDetailService } from '../shared/services/user-detail.service';

@Component({
    selector: 'app-advertisement-detail',
    templateUrl: './advertisement-detail.component.html',
    styleUrls: ['./advertisement-detail.component.css']
})
export class AdvertisementDetailComponent implements OnInit {

    _id = null;
    private routeSubscription : Subscription;

    advertisement : Advertisement = new Advertisement;
    advertisementSubject : BehaviorSubject<Advertisement> = new BehaviorSubject(null);
    advertisementSubscription : Subscription;

    constructor(
        private route : ActivatedRoute,
        private advertisementDetailService : AdvertisementDetailService
    ) { }

    ngOnInit() : void {
        this.routeSubscription = this.route.params.subscribe(params => {
            this._id = params['id']
        });

        this.advertisementSubject = this.advertisementDetailService.getAdvertisement(this._id);
        this.advertisementSubscription = this.advertisementSubject
            .subscribe(res => {
                this.advertisement = res;
            });
    }

}
