import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from '../../../shared/models/category.model';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
    selector: 'app-admincategories',
    templateUrl: './admincategories.component.html',
    styleUrls: ['./admincategories.component.css']
})
export class AdmincategoriesComponent implements OnInit {

    categories : Category[];
    categoriesSubject : BehaviorSubject<Category[]> = new BehaviorSubject(null);
    subscription : Subscription;

    newCategoryName : string;

    edit_id : string;
    editCategoryName : string;

    oneCategory : Category;
  
    constructor(
        private categoryService : CategoryService
    ) { }

    ngOnInit() : void {
        this.categoriesSubject = this.categoryService.getCategories();
        this.subscription = this.categoriesSubject
            .subscribe(res => {
                this.categories = res;
            });
    }

    addCategory() {
        this.categoryService.addCategory({ categoryName : this.newCategoryName});
        this.newCategoryName = "";
    }

    sendToEdit(category) {
        this.edit_id = category._id;
        this.editCategoryName = category.categoryName;
    }

    editCategory(category) {
        this.categoryService.editCategory(category);
    }

    getCategory(i) {
        let c = this.categories[i];
        console.log(this.categoryService.getCategory(c._id));
    }

    deleteCategory(i) {
        let c = this.categories[i];
        this.categoryService.deleteCategory(c._id);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
