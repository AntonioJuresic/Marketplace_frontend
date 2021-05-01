import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Advertisement } from '../shared/models/advertisement.model';
import { User } from '../shared/models/user.model';
import { AdvertisementService } from '../shared/services/advertisement.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AuthorizationGuardService } from '../shared/services/authorization-guard.service';

@Component({
    selector: 'app-my-advertisements',
    templateUrl: './my-advertisements.component.html',
    styleUrls: ['./my-advertisements.component.css']
})
export class MyAdvertisementsComponent implements OnInit {

    user : User;

    advertisements : Advertisement[];
    advertisementsSubject : BehaviorSubject<Advertisement[]> = new BehaviorSubject(null);
    subscription : Subscription;

    editMode : boolean = false;
    advertisementForEdit : Advertisement;

    constructor(
        private authorizationGuardService: AuthorizationGuardService,
        private authenticationService : AuthenticationService,
        private advertisementService: AdvertisementService
    ) { }

    ngOnInit(): void {
        this.authorizationGuardService.canAccessAdmin();
        this.user = this.authenticationService.getUser();
        
        this.advertisementsSubject = this.advertisementService.getAdvertisements();
        this.subscription = this.advertisementsSubject
            .subscribe(res => {
                this.advertisements = res;
            });
    }

    deleteAdvertisement(i) {
        let a = this.advertisements[i];
        this.advertisementService.deleteAdvertisement(a._id);
    }

    ngOnDestory() {
        this.subscription.unsubscribe();
    }

    userWantsToEdit(selectedAdvertisement) {
        this.editMode = true;
        this.advertisementForEdit = selectedAdvertisement;
    }

}