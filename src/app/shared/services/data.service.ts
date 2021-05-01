import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiRoot = environment.apiRoot;

    authenticationRoot = '/authentication'
    advertisementsRoot = '/advertisements';
    categoriesRoot = '/categories';
    conditionsRoot = '/conditions';
    placesRoot = '/places';
    usersRoot = '/users';

    constructor(private http: HttpClient) { }

    authenticateUser(username, password) {
        return this.http.post(this.apiRoot + this.authenticationRoot, {
            username: username,
            password: password,
        });
    }

    getAdvertisements() { return this.http.get(this.apiRoot + this.advertisementsRoot); }
    addAdvertisement(advertisement) { return this.http.post(this.apiRoot + this.advertisementsRoot, advertisement); }
    editAdvertisement(advertisement) { return this.http.put(this.apiRoot + this.advertisementsRoot, advertisement); }
    getAdvertisement(id) { return this.http.get(this.apiRoot + this.advertisementsRoot + `/${id}`); }
    deleteAdvertisement(id) { return this.http.delete(this.apiRoot + this.advertisementsRoot + `/${id}`); }

    getCategories() { return this.http.get(this.apiRoot + this.categoriesRoot); }
    addCategory(category) { return this.http.post(this.apiRoot + this.categoriesRoot, category); }
    editCategory(category) { return this.http.put(this.apiRoot + this.categoriesRoot, category); }
    getCategory(id) { return this.http.get(this.apiRoot + this.categoriesRoot + `/${id}`); }
    deleteCategory(id) { return this.http.delete(this.apiRoot + this.categoriesRoot + `/${id}`); }

    getConditions() { return this.http.get(this.apiRoot + this.conditionsRoot); }
    addCondition(condition) { return this.http.post(this.apiRoot + this.conditionsRoot, condition); }
    editCondition(condition) { return this.http.put(this.apiRoot + this.conditionsRoot, condition); }
    getCondition(id) { return this.http.get(this.apiRoot + this.conditionsRoot + `/${id}`); }
    deleteCondition(id) { return this.http.delete(this.apiRoot + this.conditionsRoot + `/${id}`); }

    getPlaces() { return this.http.get(this.apiRoot + this.placesRoot); }
    addPlace(place) { return this.http.post(this.apiRoot + this.placesRoot, place); }
    editPlace(place) { return this.http.put(this.apiRoot + this.placesRoot, place); }
    getPlace(id) { return this.http.get(this.apiRoot + this.placesRoot + `/${id}`); }
    deletePlace(id) { return this.http.delete(this.apiRoot + this.placesRoot + `/${id}`); }

    getUsers() { return this.http.get(this.apiRoot + this.usersRoot); }
    addUser(user) { return this.http.post(this.apiRoot + this.usersRoot, user); }
    editUser(user) { return this.http.put(this.apiRoot + this.usersRoot, user); }
    getUser(id) { return this.http.get(this.apiRoot + this.usersRoot + `/${id}`); }
    deleteUser(id) { return this.http.delete(this.apiRoot + this.usersRoot + `/${id}`); }
}