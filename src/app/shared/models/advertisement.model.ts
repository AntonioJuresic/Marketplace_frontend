export class Advertisement {
    _id?: string;

    name: string;
    description: string;
    price: string;

    conditionNameFK: string;
    categoryNameFK: string;
    placeNameFK: string;

    sellerUsernameFK: string;
    seller_idFK: string;
}