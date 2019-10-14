export interface addBook{
    ShowExistingContact():any;
    AddInAdressBook(firstName:string,lastName:string,address:string,city:string,state:string,zip:number,phone:number):any;
    edit(index:number):any;
    sortByName():any;
    sortByZip():any;
    deleteContact(index:number):any;
    Save():any;
    printAddBook():any;
}