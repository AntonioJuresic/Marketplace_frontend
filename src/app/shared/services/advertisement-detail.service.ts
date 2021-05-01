import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Advertisement } from '../models/advertisement.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AdvertisementDetailService {
    
    advertisement : Advertisement = new Advertisement;
    advertisementSubject : BehaviorSubject<Advertisement> = new BehaviorSubject(null);
    
    constructor( private dataService : DataService ) { }

    getAdvertisement(_id) {
        this.dataService.getAdvertisement(_id)
        .subscribe((res: { status: number, description?: string, advertisement: Advertisement }) => {
            console.log(res);
            this.advertisement = res.advertisement;
            this.advertisementSubject.next(this.advertisement);
        });

        return this.advertisementSubject;
    }
}
