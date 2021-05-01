import { Component, OnInit } from '@angular/core';
import { AuthorizationGuardService } from '../shared/services/authorization-guard.service';

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

    constructor(
        private authorizationGuardService: AuthorizationGuardService
    ) { }

    ngOnInit(): void {
        this.authorizationGuardService.canAccessAdmin();
    }

}
