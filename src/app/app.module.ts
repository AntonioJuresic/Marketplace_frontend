import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewAdvertisementComponent } from './new-advertisement/new-advertisement.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterPricePipe } from './pipes/filter-price.pipe';
import { AdvertisementDetailComponent } from './advertisement-detail/advertisement-detail.component';
import { AdmincategoriesComponent } from './administration/admin-components/admincategories/admincategories.component';
import { AdministrationComponent } from './administration/administration.component';
import { AdminconditionsComponent } from './administration/admin-components/adminconditions/adminconditions.component';
import { AdminplacesComponent } from './administration/admin-components/adminplaces/adminplaces.component';
import { AdminadvertisementsComponent } from './administration/admin-components/adminadvertisements/adminadvertisements.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyAdvertisementsComponent } from './my-advertisements/my-advertisements.component';
import { AdminusersComponent } from './administration/admin-components/adminusers/adminusers.component';
import { AdvertisementEditComponent } from './advertisement-edit/advertisement-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        MainPageComponent,
        NavigationComponent,
        NewAdvertisementComponent,
        FilterPipe,
        FilterPricePipe,
        AdvertisementDetailComponent,
        AdmincategoriesComponent,
        AdministrationComponent,
        AdminconditionsComponent,
        AdminplacesComponent,
        AdminadvertisementsComponent,
        UserDetailComponent,
        MyProfileComponent,
        MyAdvertisementsComponent,
        AdminusersComponent,
        AdvertisementEditComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
