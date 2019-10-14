import * as cdp from './commercial';
import * as util from '../utility';

while(true)
{
    try {
        console.log(`Enter choice\n1 => BUY\n2 => SELL\n3 => STOCK DETAILS\n4 => PERSON DETAILS\n5 => TRANSECTION DETAILS\n6 => EXIT`);
        let choice = util.intInput();
        switch (choice) {
            case 1:
                console.log("Enter person id: ");
                let personID = util.intInput(); 
    
                console.log("Enter stock id to purches: ");
                let stockid = util.intInput();
    
                console.log("enter no of shares u want: ");
                let shares: number = util.intInput();
                let id:any = cdp.buy(personID,stockid,shares);
                if(id instanceof Error)
                {
                        throw id.message;
                }
                break;
        
            case 2: 
                console.log("Enter your person id: ");
                let person = util.intInput(); 
    
                console.log("Enter person id to purches: ");
                let personid = util.intInput();
    
                console.log("enter no of shares u want: ");
                let share:number = util.intInput();
                let ids:any = cdp.sell(person,personid,share);
                if(id instanceof Error)
                {
                        throw ids.message;
                }
                break;
            
            case 3:
                cdp.showStock();
                break;
        
            case 4:
                cdp.showPerson();
                break;
            
            case 5:
                cdp.showTransection();
                break;
        
            case 6:
                process.exit();
        
            default:
                console.log("Envalid choice!!!!!");
                break;
        }
    } catch (error) {
        console.log(error);
    }

}
