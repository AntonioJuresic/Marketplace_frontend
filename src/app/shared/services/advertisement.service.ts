import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Advertisement } from '../models/advertisement.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AdvertisementService {

    advertisements : Advertisement[] = null;
    advertisementsSubject : BehaviorSubject<Advertisement[]> = new BehaviorSubject(null);
    
    constructor(private dataService : DataService) { this.ngOnInit(); }

    ngOnInit() {
        this.dataService.getAdvertisements()
            .subscribe((res: { status: number, description?: string, advertisements: Advertisement[] }) => {
                console.log(res);
                this.advertisements = res.advertisements;
                this.advertisementsSubject.next(this.advertisements);
            });
    }

    getAdvertisements() {
        return this.advertisementsSubject;
    }

    addAdvertisement(newAdvertisement) {
        this.dataService.addAdvertisement(newAdvertisement)
            .subscribe((res: { status: number, description?: string, insertedId?: number }) => {
                console.log(res);
                newAdvertisement._id = res.insertedId;
                this.advertisements.push(newAdvertisement);
                this.advertisementsSubject.next(this.advertisements);
            });
    }

    editAdvertisement(editedAdvertisement) {
        this.dataService.editAdvertisement(editedAdvertisement)
            .subscribe(((res: { status: number, description?: string, modifiedCount?: number }) => {
                console.log(res);
                this.advertisements[this.advertisements.findIndex(a => a._id == editedAdvertisement._id)] = editedAdvertisement;
            }), error => {
                console.log(error);
            });
    }

    getAdvertisement(_id) {
        return this.advertisements.find(a => a._id == _id);
    }

    deleteAdvertisement(_id) {
        this.dataService.deleteAdvertisement(_id)
            .subscribe((res: { status: number, description?: string, deletedCount: number }) => {
                console.log(res);
                this.advertisements = this.advertisements.filter(a => a._id != _id);
                this.advertisementsSubject.next(this.advertisements);
            });
    }
}
