import * as book from './addressbook';
import * as util from '../utility';

book.ShowExistingContact();
while(true)
{
    console.log(`Enter\n1 => Add in Contact:\n2 => Edit:\n3 => Delete\n4 => Display\n5 => Sort by Name\n6 => Sort by Zip\n7 => Exit\nEnter Choice: `);
    
    let choice = util.intInput();
    try {
        switch (choice) {
                case 1:
                        console.log(`Enter ${this.personArray.length} address`)
                        console.log("Enter first name: ");
                        let firstName = util.stringInput();
                        console.log("Enter Last name: ");
                        let lastName = util.stringInput();
                        console.log("Enter adress : ");
                        let address = util.stringInput();
                        console.log("Enter city name: ");
                        let city = util.stringInput();
                        console.log("Enter state name: ");
                        let state = util.stringInput();
                        console.log("Enter Zip code: ");
                        let zip = util.intInput();
                        console.log("Enter phone number: ");
                        let phone = util.intInput();
                        let id:any = book.AddInAdressBook(firstName,lastName,address,city,state,zip,phone);
                        if(id instanceof Error)
                        {
                                throw id.message;
                        }
                                
                        book.Save();
                        break;
                case 2:
                        console.log("Enter sl.No you want to edit: ");
                        var inp = util.intInput();
                        book.edit(inp);
                        break;
                case 3:
                        console.log("Enter sl.No you delete: ");
                        var inp = util.intInput();
                        book.deleteContact(inp);
                        break;
                case 4:
                        book.printAddBook();
                        break;
                case 5:
                        book.sortByName();
                        book.printAddBook();
                        break;
                case 6:
                        book.sortByZip();
                        book.printAddBook();
                        break;
                case 7:
                        process.exit();
                default:
                        console.log("You made some mistake: ");
                    break;
            }
    } catch (error) {
            console.log(error);
    }
    
}