import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPrice'
})
export class FilterPricePipe implements PipeTransform {

    transform(ulaz: any[], field: string, prices: number[],): any {

        let minimalPrice = prices[0];
        let maximalPrice = prices[1];

        let filtered = [];

        if (minimalPrice != undefined && maximalPrice != undefined){
            filtered = ulaz.filter(a => a.price >= minimalPrice);
            filtered = filtered.filter(a => a.price <= maximalPrice);
        } else if (minimalPrice != undefined) {
            filtered = ulaz.filter(a => a.price >= minimalPrice);
        } else if (maximalPrice != undefined) {
            filtered = ulaz.filter(a => a.price <= maximalPrice);
        } else {
            return ulaz;
        };

        return filtered;
    }

}
