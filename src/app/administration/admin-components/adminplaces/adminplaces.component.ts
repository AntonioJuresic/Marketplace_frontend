import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Place } from 'src/app/shared/models/place.model';
import { PlaceService } from 'src/app/shared/services/place.service';

@Component({
    selector: 'app-adminplaces',
    templateUrl: './adminplaces.component.html',
    styleUrls: ['./adminplaces.component.css']
})
export class AdminplacesComponent implements OnInit {

    places : Place[];
    placesSubject : BehaviorSubject<Place[]> = new BehaviorSubject(null);
    subscription : Subscription;

    newPlaceName : string;

    edit_id : string;
    editPlaceName : string;

    onePlace : Place;

    constructor(
        private placeService : PlaceService
    ) { }

    ngOnInit() : void {
        this.placesSubject = this.placeService.getPlaces();
        this.subscription = this.placesSubject
            .subscribe(res => {
                this.places = res;
            });
    }

    addPlace() {
        this.placeService.addPlace({ placeName : this.newPlaceName});
        this.newPlaceName = "";
    }

    sendToEdit(place) {
        this.edit_id = place._id;
        this.editPlaceName = place.placeName;
    }

    editPlace(place) {
        this.placeService.editPlace(place);
    }

    getPlace(i) {
        let p = this.places[i];
        console.log(this.placeService.getPlace(p._id));
    }

    deletePlace(i) {
        let p = this.places[i];
        this.placeService.deletePlace(p._id);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
