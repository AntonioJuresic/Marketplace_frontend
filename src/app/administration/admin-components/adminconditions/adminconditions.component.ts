import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Condition } from 'src/app/shared/models/condition.model';
import { ConditionService } from 'src/app/shared/services/condition.service';

@Component({
    selector: 'app-adminconditions',
    templateUrl: './adminconditions.component.html',
    styleUrls: ['./adminconditions.component.css']
})
export class AdminconditionsComponent implements OnInit {

    conditions: Condition[];
    conditionsSubject : BehaviorSubject<Condition[]> = new BehaviorSubject(null);
    subscription : Subscription;

    newConditionName : string;

    edit_id : string;
    editConditionName : string;

    oneCondition : Condition;

    constructor(
        private conditionService : ConditionService
    ) { }

    ngOnInit() : void {
        this.conditionsSubject = this.conditionService.getConditions();
        this.subscription = this.conditionsSubject
            .subscribe(res => {
                this.conditions = res;
            });
    }

    addCondition() {
        this.conditionService.addCondition({ conditionName: this.newConditionName});
        this.newConditionName = "";
    }

    sendToEdit(condition) {
        this.edit_id = condition._id;
        this.editConditionName = condition.conditionName;
    }

    editCondition(condition) {
        this.conditionService.editCondition(condition);
    }

    getCondition(i) {
        let c = this.conditions[i];
        console.log(this.conditionService.getCondition(c._id));
    }

    deleteCondition(i) {
        let c = this.conditions[i];
        this.conditionService.deleteCondition(c._id);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
