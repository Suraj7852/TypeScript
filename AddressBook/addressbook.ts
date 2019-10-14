
import * as util from '../utility'
import * as input from 'readline-sync';
import {addBook} from './addressBookInterface';

// This class is for adding person in addressbook
class Person {
    private firstName: string;
    private lastName: string;
    private address : string;
    private city: string;
    private state: string;
    private zip: number;
    private phone: number;

    constructor(firstName:string,lastName:string,address:string,city:string,state:string,zip:number,phone:number){
        this.firstName = firstName,
        this.lastName = lastName,
        this.address = address,
        this.city = city,
        this.state = state,
        this.zip = zip,
        this.phone = phone
        //let person = new Person(firstName,lastName,address,city,state,zip,phone);

    }
}

// all the logic are implemented here.
class AddressBook implements addBook {
    private personArray=new Array();
    
    // to show the existing contact details
    ShowExistingContact()
    {
        try {
            var hold = util.ReadFile('./AddressBook.json');
            for(let i=0;i<hold.length;i++)
            {
                let firstName = hold[i]['firstName'];
                let lastName = hold[i]['lastName'];
                let address = hold[i]['address'];
                let city = hold[i]['city'];
                let state = hold[i]['state'];
                let zip = hold[i]['zip'];
                let phone = hold[i]['phone'];
                let person = new Person(firstName,lastName,address,city,state,zip,phone);
                this.personArray.push(person);
            }    
        } catch (error) {
            console.log(error);
            
        }
        
    }
    // to add new person in addresssbook
    AddInAdressBook(firstName,lastName,address,city,state,zip,phone)
    {
        try {
            if(firstName == undefined || firstName == null)
                throw new Error( "It should be string");
            if(lastName == undefined || lastName == null)
                throw new Error( "It should be string");
            if(address == undefined || address == null)
                throw new Error( "It should be string");
            if(city == undefined || city == null)
                throw new Error( "It should be string");
            if(state == undefined || state == null)
                throw new Error( "It should be string");
            let zipregex: RegExp = /^[0-9]{6}$/;
            if (!zipregex.test(zip)) {
                throw new Error('zip must be 6 digit long');
            }
            let phoneregex: RegExp = /^[7-9]{1}[0-9]{9}$/;
            if (!phoneregex.test(phone)) {
                throw new Error('phone number must start with 7,8 or 9 and must be 10 digit long');
            }
            let newadd = new Person(firstName,lastName,address,city,state,zip,phone);
            this.personArray.push(newadd);
            this.Save();
            return "sucessful";
        } catch (error) {
            return error;
        }
        
    }

    //to edit the existing contact..
    edit(index)
    {
        try {
            console.log("You cant change first name nad lastname:");
            var update = input.questionInt("Enter 0 to change adress\n1 to change city name\n2 to change state\n3 to change zip code\n4 to change ph.No.");
            if(update == 0)
            {
                console.log("Enter address: ");
                var up = util.stringInput();
                this.personArray[index].adress = add;
            }
            else if(update == 1)
            {
                console.log("Enter city: ");
                var up = util.stringInput();
                this.personArray[index].city = up;
            }
            else if(update == 2)
            {
                console.log("Enter state: ");
                var up = util.stringInput();
                this.personArray[index].state = up;
            }
            else if(update == 3)
            {
                console.log("Enter zip: ");
                var up = util.stringInput();
                this.personArray[index].zip = up;
            }
            else if(update == 4)
            {
                console.log("Enter mob.No.: ");
                var up = util.stringInput();
                var mobNoReg = /^[6-9]\d{9}$/;
                if(mobNoReg.test(up))
                {
                    this.personArray[index].phone = up;
                }
                else
                {
                    console.log("Invalid Mobile Number\n");
                }
            }
            else
            {
                console.log("Enter valid input:");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // sorting by name in existing contact
    sortByName()
    {
        try {
            var temp;
            for(let i=0;i<this.personArray.length;i++)
            {
                for(let j=i+1;j<this.personArray.length;j++)
                {
                    if(this.personArray[i].firstName>this.personArray[j].firstName)
                    {
                        temp = this.personArray[i];
                        this.personArray[i] = this.personArray[j];
                        this.personArray[j] = temp; 
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    //Sortng by the ZIp code
    sortByZip()
    {
        try {
            var temp;
            for(let i=0;i<this.personArray.length;i++)
            {
                for(let j=i+1;j<this.personArray.length;j++)
                {
                    if(this.personArray[i].zip>this.personArray[j].zip)
                    {
                        temp = this.personArray[i];
                        this.personArray[i] = this.personArray[j];
                        this.personArray[j] = temp; 
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    // Delete the existing contact
    deleteContact(index)
    {
        try {
            this.personArray = util.removeInArray(this.personArray,index);
        } catch (error) {
            console.log(error)
        }
    }

    // to write the contact in file
    Save()
    {
        try {
            util.WriteJsonFile('./AddressBook.json',this.personArray);
        } catch (error) {
            console.log(error);
        }
        
    }

    // to show the existing contact in console
    printAddBook()
    {
        try {
            console.log("Sl.N0.  firstName   lastName   adress       city         state          zip           ph_No");
            console.log("---------------------------------------------------------------------------------------------");
            for(let i=0;i<this.personArray.length;i++)
            {
                console.log(`${i}        ${this.personArray[i].firstName}      ${this.personArray[i].lastName}       ${this.personArray[i].address}     ${this.personArray[i].city}     ${this.personArray[i].state}      ${this.personArray[i].zip}     ${this.personArray[i].phone}`);
            }
            console.log("---------------------------------------------------------------------------------------------");
        } catch (error) {
            console.log(error);
        }
       
    }
}

let add = new AddressBook();
export = add;
