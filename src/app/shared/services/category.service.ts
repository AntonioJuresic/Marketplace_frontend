import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    categories: Category[] = null;
    categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject(null);

    constructor(private dataService: DataService) { this.ngOnInit(); }

    ngOnInit() {
        this.dataService.getCategories()
            .subscribe((res: { status: number, description?: string, categories: Category[] }) => {
                console.log(res);
                this.categories = res.categories;
                this.categoriesSubject.next(this.categories);
            });
    }

    getCategories() {
        return this.categoriesSubject;
    }

    addCategory(newCategory) {
        this.dataService.addCategory(newCategory)
            .subscribe((res: { status: number, description?: string, insertedId?: number }) => {
                console.log(res);
                newCategory._id = res.insertedId;
                this.categories.push(newCategory);
                this.categoriesSubject.next(this.categories);
            });
    }

    editCategory(editedCategory) {
        this.dataService.editCategory(editedCategory)
            .subscribe(((res: { status: number, description?: string, modifiedCount?: number }) => {
                console.log(res);
                this.categories[this.categories.findIndex(c => c._id == editedCategory._id)] = editedCategory;
            }), error => {
                console.log(error);
            });
    }

    getCategory(_id) {
        /*this.dataService.getCategory(_id)
            .subscribe((res: {status : number, description? : string, category : Category}) => {
                console.log(res.category);
            });*/

        return this.categories.find(c => c._id == _id);
    }

    deleteCategory(_id) {
        this.dataService.deleteCategory(_id)
            .subscribe((res: { status: number, description?: string, deletedCount: number }) => {
                console.log(res);
                this.categories = this.categories.filter(c => c._id != _id);
                this.categoriesSubject.next(this.categories);
            });
    }
}
