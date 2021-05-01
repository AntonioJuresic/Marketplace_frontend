import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private authenticationService: AuthenticationService,
        private title: Title
    ) { }

    ngOnInit() {
        this.title.setTitle("PRODAJ BRZO");
        this.authenticationService.getUser();
    }
}
