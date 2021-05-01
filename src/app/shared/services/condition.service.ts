import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Condition } from '../models/condition.model';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ConditionService {

    conditions : Condition[] = null;
    conditionsSubject : BehaviorSubject<Condition[]> = new BehaviorSubject(null);

    constructor(private dataService : DataService) { this.ngOnInit(); }

    ngOnInit() {
        this.dataService.getConditions()
            .subscribe((res: { status: number, description?: string, conditions: Condition[] }) => {
                console.log(res);
                this.conditions = res.conditions;
                this.conditionsSubject.next(this.conditions);
            });
    }

    getConditions() {
        return this.conditionsSubject;
    }

    addCondition(newCondition) {
        this.dataService.addCondition(newCondition)
            .subscribe((res: { status: number, description?: string, insertedId?: number }) => {
                console.log(res);
                newCondition._id = res.insertedId;
                this.conditions.push(newCondition);
                this.conditionsSubject.next(this.conditions);
            });
    }

    editCondition(editedCondition) {
        this.dataService.editCondition(editedCondition)
            .subscribe(((res: { status: number, description?: string, modifiedCount?: number }) => {
                console.log(res);
                this.conditions[this.conditions.findIndex(c => c._id == editedCondition._id)] = editedCondition;
            }), error => {
                console.log(error);
            });
    }

    getCondition(_id) {
        return this.conditions.find(c => c._id == _id);
    }

    deleteCondition(_id) {
        this.dataService.deleteCondition(_id)
            .subscribe((res: { status: number, description?: string, deletedCount: number }) => {
                console.log(res);
                this.conditions = this.conditions.filter(c => c._id != _id);
                this.conditionsSubject.next(this.conditions);
            });
    }
}
