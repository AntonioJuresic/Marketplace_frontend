import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Advertisement } from 'src/app/shared/models/advertisement.model';
import { AdvertisementService } from 'src/app/shared/services/advertisement.service';

@Component({
    selector: 'app-adminadvertisements',
    templateUrl: './adminadvertisements.component.html',
    styleUrls: ['./adminadvertisements.component.css']
})
export class AdminadvertisementsComponent implements OnInit {

    advertisements : Advertisement[];
    advertisementsSubject : BehaviorSubject<Advertisement[]> = new BehaviorSubject(null);
    subscription : Subscription;

    oneAdvertisement : Advertisement;

    constructor(
        private advertisementService : AdvertisementService
    ) { }

    ngOnInit() : void {
        this.advertisementsSubject = this.advertisementService.getAdvertisements();
        this.subscription = this.advertisementsSubject
            .subscribe(res => {
                this.advertisements = res;
            });
    }

    getAdvertisement(i) {
        let a = this.advertisements[i];
        console.log(this.advertisementService.getAdvertisement(a._id));
    }

    deleteAdvertisement(i) {
        let a = this.advertisements[i];
        this.advertisementService.deleteAdvertisement(a._id);
    }

    ngOnDestory() {
        this.subscription.unsubscribe();
    }

}
