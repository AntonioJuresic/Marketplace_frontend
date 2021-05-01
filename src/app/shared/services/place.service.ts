import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Place } from '../models/place.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class PlaceService {

    places : Place[] = null;
    placesSubject : BehaviorSubject<Place[]> = new BehaviorSubject(null);

    constructor(private dataService: DataService) { this.ngOnInit(); }

    ngOnInit() {
        this.dataService.getPlaces()
            .subscribe((res: { status: number, description?: string, places: Place[] }) => {
                console.log(res);
                this.places = res.places;
                this.placesSubject.next(this.places);
            });
    }

    getPlaces() {
        return this.placesSubject;
    }

    addPlace(newPlace) {
        this.dataService.addPlace(newPlace)
            .subscribe((res: { status: number, description?: string, insertedId?: number }) => {
                console.log(res);
                newPlace._id = res.insertedId;
                this.places.push(newPlace);
                this.placesSubject.next(this.places);
            });
    }

    editPlace(editedPlace) {
        this.dataService.editPlace(editedPlace)
            .subscribe(((res: { status: number, description?: string, modifiedCount?: number }) => {
                console.log(res);
                this.places[this.places.findIndex(c => c._id == editedPlace._id)] = editedPlace;
            }), error => {
                console.log(error);
            });
    }

    getPlace(_id) {
        return this.places.find(p => p._id == _id);
    }

    deletePlace(_id) {
        this.dataService.deletePlace(_id)
            .subscribe((res: { status: number, description?: string, deletedCount: number }) => {
                console.log(res);
                this.places = this.places.filter(c => c._id != _id);
                this.placesSubject.next(this.places);
            });
    }
}
