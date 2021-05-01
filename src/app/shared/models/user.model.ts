export class User {
    _id?: string;

    username : string;
    password : string;
    email : string;
    admin : boolean;

    name : string;
    surname : string;
    dateOfBirth : string;

    streetName : string;
    streetNumber : string;
    placeNameFK : string;
}