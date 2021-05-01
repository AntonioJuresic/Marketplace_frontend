import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisementDetailComponent } from './advertisement-detail/advertisement-detail.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewAdvertisementComponent } from './new-advertisement/new-advertisement.component';
import { RegisterComponent } from './register/register.component';
import { AdministrationComponent } from './administration/administration.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyAdvertisementsComponent } from './my-advertisements/my-advertisements.component';

const routes: Routes = [
    { path: "", component: MainPageComponent },
    { path: "prijava", component: LoginComponent },
    { path: "registracija", component: RegisterComponent },
    { path: "novioglas", component: NewAdvertisementComponent },
    { path: "mojioglasi", component: MyAdvertisementsComponent },
    { path: "mojiprofil", component: MyProfileComponent },
    { path: "oglas/:id", component: AdvertisementDetailComponent },
    { path: "korisnik/:id", component: UserDetailComponent },
    { path: "administracija", component: AdministrationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
