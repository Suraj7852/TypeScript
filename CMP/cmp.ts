/**
 * 
 * @author   : Suraj Kumar Nag
 * Date      : 3/09/2019
 * Purpose   : Clinic Managment Program in which following feture should be there
 *             To add Patient
 *             To search doctor by name,id,Specility
 *             To Search Patient by name, id, age, phone No.
 *             To take Appointment with Doctor
 **/
import {cmpIntface} from './cmpInterface';
import * as util from '../utility';


// Creating the doctor class to assign different doctor
class Doctor{
    private Dname: string;
    private Did: string;
    private special: string;
    private avalible: string;
    private count: number;

    constructor(Dname,Did,special,avalible)
    {
        this.Dname = Dname;
        this.Did = Did;
        this.special = special;
        this.avalible = avalible;
        this.count=0;
    }
}

// Creating the patient class to assign different patient
class Patient{
    private Pname: string;
    private Pid: string;
    private ph: string;
    private age: number;

    constructor(Pname,Pid,ph,age)
    {
        this.Pname = Pname;
        this.Pid =  Pid;
        this.ph = ph;
        this.age = age;
    }
}

// Creating the Apoint class to assign different doctor and patient
class Apoint{
    private Dname: string;
    private Did: number;
    private special: string;
    private avalible: string;
    private Pname: string;
    private Pid: number;
    private ph: number;
    private age: number;

    constructor(Dname,Did,special,avalible,Pname,Pid,ph,age)
    {
        this.Dname = Dname;
        this.Did = Did;
        this.special = special;
        this.avalible = avalible;
        this.Pname = Pname;
        this.Pid = Pid;
        this.ph = ph;
        this.age = age;
    }
}

//All the logic are implemented here
class DocPat implements cmpIntface{
    private AssDoc = new Array();
    private AssPat = new Array();
    private Appoint = new Array();

    // TO put existing details of Doctor
    Doc()
    {
        try {
            const doctor = util.ReadFile('./Doctor.json');
            for(let i=0;i<doctor.length;i++)
            {
                let Dname = doctor[i]["Dname"];
                let Did = doctor[i]["Did"];
                let special = doctor[i]["Specialization"];
                let avalible = doctor[i]["Availability"];
                let doct = new Doctor(Dname,Did,special,avalible);
                this.AssDoc.push(doct);
            }
        } catch (error) {
            console.log(error);
        }
       
    }

    // TO put existing details of Patient
    Pat()
    {
        try {
            const patient = util.ReadFile('./Patient.json');
            for(let i=0;i<patient.length;i++)
            {
                let Pname = patient[i]["Pname"];
                let Pid = patient[i]["Pid"];
                let ph = patient[i]["ph"];
                let age = patient[i]["age"];
                let pati = new Patient(Pname,Pid,ph,age);
                this.AssPat.push(pati);
            }    
        } catch (error) {
            console.log(error);       
        }
    }

    App()
    {
        try {
            const app = util.ReadFile('./appointment.json');
            const patient = util.ReadFile('./Patient.json');
            const doctor = util.ReadFile('./Doctor.json');
            for(let i=0;i<app.length;i++)
            {
                let Pname = app[i]["Pname"];
                let Pid = patient[i]["Pid"];
                let ph = patient[i]["ph"];
                let age = patient[i]["age"];
                let Dname = doctor[i]["Dname"];
                let Did = doctor[i]["Did"];
                let special = doctor[i]["Specialization"];
                let avalible = doctor[i]["Availability"];
                let appoi = new Apoint(Pname,Pid,special,avalible,Dname,Did,ph,age)
                this.Appoint.push(appoi);
            }   
        } catch (error) {
            console.log(error);
        }
    }

    // To add new Patient
    AddPat(Pname,Pid,ph,age)
    {
        try {
            if(Pname == undefined || Pname == null)
                throw new Error( "It should be string");
            if(Pid == undefined || Pid == null)
                throw new Error( "It should be number");
            let phoneregex: RegExp = /^[7-9]{1}[0-9]{9}$/;
            if (!phoneregex.test(ph)) {
                throw new Error('phone number must start with 7,8 or 9 and must be 10 digit long');
            }
            if(age == undefined || age == null)
                throw new Error( "It should be number");
            let pati = new Patient(Pname,Pid,ph,age);
            this.AssPat.push(pati);
            this.SavePatFile();   
            return "sucessful";
        } catch (error) {
            return error;
        }
    }

    //To Search Doctor by name,id,Specialization
    searchDoc()
    {
        try {
            console.log("Search Doctor By\n1 => name\n2 => ID\n3 => Specialization\nEnter choice: ");
            let search = util.intInput();
            let count = 0;
            if(search == 1)
            {
                console.log("Enter name: ");
                let nam = util.stringInput();
                for(let i=0;i<this.AssDoc.length;i++)
                {
                    if(nam == this.AssDoc[i].Dname)
                    {
                        count++;
                        console.log("Here is your Doctor Details: ");
                        console.log("---------------------DOCTORS LIST----------------------")
                        console.log("name    id    Specialization   Availability");
                        console.log("-------------------------------------------------------");
                        console.log(`${this.AssDoc[i].Dname}   ${this.AssDoc[i].Did}    ${this.AssDoc[i].special}        ${this.AssDoc[i].avalible}\n`);
                    }
                }
                if(count==0)
                    console.log("No such Doctor found: \n");
            }
            else if(search == 2)
            {
                console.log("Enter ID: ");
                let nam = util.intInput();
                for(let i=0;i<this.AssDoc.length;i++)
                {
                    if(nam == this.AssDoc[i].Did)
                    {
                        count++;
                        console.log("Here is your Doctor Details: ");
                        console.log("---------------------DOCTORS LIST----------------------")
                        console.log("name    id    Specialization   Availability");
                        console.log("-------------------------------------------------------");
                        console.log(`${this.AssDoc[i].Dname}   ${this.AssDoc[i].Did}    ${this.AssDoc[i].special}        ${this.AssDoc[i].avalible}\n`);
                    }
                }
                if(count==0)
                    console.log("No such Doctor found: \n");
            }
            else if(search == 3)
            {
                console.log("Enter Specialization: ");
                
                let nam = util.stringInput();
                for(let i=0;i<this.AssDoc.length;i++)
                {
                    if(nam == this.AssDoc[i].special)
                    {
                        count++;
                        console.log("Here is your Doctor Details: ");
                        console.log("---------------------DOCTORS LIST----------------------")
                        console.log("name    id    Specialization   Availability");
                        console.log("-------------------------------------------------------");
                        console.log(`${this.AssDoc[i].Dname}   ${this.AssDoc[i].Did}    ${this.AssDoc[i].special}        ${this.AssDoc[i].avalible}\n`);
                    }
                }
                if(count==0)
                    console.log("No such Doctor found: \n");
            }    
        } catch (error) {
            console.log(error);
        }
        
    }

    //TO search Patient by name,id,mobile number,age
    searchPat()
    {
        try {
            console.log("Search Patient By:\n1 => name\n2 => ID\n3 => Mobile No.\n4 => age\nEnter choice: ");
            let search = util.intInput();
            let count = 0;
            if(search == 1)
            {
                console.log("Enter name: ");
                let nam = util.stringInput();
                for(let i=0;i<this.AssPat.length;i++)
                {
                    if(nam == this.AssPat[i].Pname)
                    {
                        count++;
                        console.log("Here is your Patient Details: ");
                        console.log("-----------------PATIENTS LIST--------------------------")
                        console.log("name    id    Mobile No.     age");
                        console.log("-------------------------------------------------------");
                        console.log(`${this.AssPat[i].Pname}   ${this.AssPat[i].Pid}    ${this.AssPat[i].ph}        ${this.AssPat[i].age}\n`);
                    }
                }
                if(count==0)
                    console.log("No such Patient found: \n");
            }
            else if(search == 2)
            {
                console.log("Enter ID: ");
                let nam = util.intInput();
                for(let i=0;i<this.AssPat.length;i++)
                {
                    if(nam == this.AssPat[i].Pid)
                    {
                        count++;
                        console.log("Here is your Patient Details: ");
                        console.log("-----------------PATIENTS LIST--------------------------")
                        console.log("name    id    Mobile No.     age");
                        console.log("-------------------------------------------------------");
                        console.log(`${this.AssPat[i].Pname}   ${this.AssPat[i].Pid}    ${this.AssPat[i].ph}        ${this.AssPat[i].age}\n`);
                    }
                }
                if(count==0)
                    console.log("No such Patient found: \n");
            }
            else if(search == 3)
            {
                console.log("Enter phone No. ");
                let nam = util.intInput();
                for(let i=0;i<this.AssPat.length;i++)
                {
                    if(nam == this.AssPat[i].ph)
                    {
                        count++;
                        console.log("Here is your Patient Details: ");
                        console.log("-----------------PATIENTS LIST--------------------------")
                        console.log("name    id    Mobile No.     age");
                        console.log("-------------------------------------------------------");
                        console.log(`${this.AssPat[i].Pname}   ${this.AssPat[i].Pid}    ${this.AssPat[i].ph}        ${this.AssPat[i].age}\n`);
                    }
                }
                if(count==0)
                    console.log("No such Patient found: \n");
            }
            else if(search == 4)
            {
                console.log("Enter age: ");
                let nam = util.intInput();
                for(let i=0;i<this.AssPat.length;i++)
                {
                    if(nam == this.AssPat[i].age)
                    {
                        count++;
                        console.log("Here is your Patient Details: ");
                        console.log("-----------------PATIENTS LIST--------------------------")
                        console.log("name    id    Mobile No.     age");
                        console.log("-------------------------------------------------------");
                        console.log(`${this.AssPat[i].Pname}   ${this.AssPat[i].Pid}    ${this.AssPat[i].ph}        ${this.AssPat[i].age}\n`);
                    }
                }
                if(count==0)
                    console.log("No such Patient found: \n");
            }    
        } catch (error) {
            console.log(error);
        }
        
    }

    //TO appoint doctor to patient
    AppointMent()
    {
        try {
            this.PrintPat();
            console.log("Here is the list of patient Select sl.No. to choose for  Appointment: ");
            let ch:number = util.intInput();
            let Pname = this.AssPat[ch].Pname;
            let Pid = this.AssPat[ch].Pid;
            let ph = this.AssPat[ch].ph;
            let age = this.AssPat[ch].age;
            this.PrintDoc();
            console.log("Here is the list of Doctor Select sl.No. to choose for  Appointment: ");
            let cho:number = util.intInput();
            if(this.AssDoc[cho].count<5)
            {
                let Dname = this.AssDoc[cho].Dname;
                let Did = this.AssDoc[cho].Did;
                let special = this.AssDoc[cho].special;
                let avalible = this.AssDoc[cho].avalible;
                this.AssDoc[cho].count++;
                let Ap = new Apoint(Dname,Did,special,avalible,Pname,Pid,ph,age);
                this.Appoint.push(Ap);
                this.SaveAppFile();
            }
            else
                console.log("Doctors Appointment is full");   
        } catch (error) {
            console.log(error);
        }
    }

    //To print existing file of Doctor
    PrintDoc()
    {
        try {
            console.log("---------------------DOCTORS LIST----------------------")
            console.log("Sl.No.    name    id    Specialization   Availability");
            console.log("-------------------------------------------------------");
            for(let i=0;i<this.AssDoc.length;i++)
            {
                console.log(`${i}         ${this.AssDoc[i].Dname}   ${this.AssDoc[i].Did}    ${this.AssDoc[i].special}        ${this.AssDoc[i].avalible}`);
            }
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n");    
        } catch (error) {
            console.log(error);
        }
    }

    //To print existing file of Patient
    PrintPat()
    {
        try {
            console.log("-----------------PATIENTS LIST--------------------------")
            console.log("Sl.No.    name    id    Mobile No.     age");
            console.log("-------------------------------------------------------");
            for(let i=0;i<this.AssPat.length;i++)
            {
                console.log(`${i}         ${this.AssPat[i].Pname}   ${this.AssPat[i].Pid}    ${this.AssPat[i].ph}    ${this.AssPat[i].age}`);
            }
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n");
    
        } catch (error) {
            console.log(error);            
        }
    }

    //To print the appointment Details
    PrintApp()
    {
        try {
            console.log("--------------------------Appointnment LIST----------------------------------------------------------")
            console.log("Sl.No.  Availability      Doctor name    id    Specialization    Patient Name    id    Mob No.   age");
            console.log("-----------------------------------------------------------------------------------------------------");
            for(let i=0;i<this.Appoint.length;i++)
            {
                console.log(`${i}         ${this.Appoint[i].avalible}          ${this.Appoint[i].Dname}        ${this.Appoint[i].Did}    ${this.Appoint[i].special}         ${this.Appoint[i].Pname}      ${this.Appoint[i].Pid}  ${this.Appoint[i].ph}  ${this.Appoint[i].age}`);
            }
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n");    
        } catch (error) {
            console.log(error);  
        }
        
    }

    //To save details of Patient 
    SavePatFile()
    {
        try {
            util.WriteJsonFile('./op.json',this.AddPat);   
        } catch (error) {
            console.log(error);
        }
    }


    //To save details of Patient 
    SaveDocFile()
    {
        try {
            util.WriteJsonFile('./op.json',this.AssDoc);    
        } catch (error) {
            console.log(error)
        }
    }

    // TO save appintment
    SaveAppFile()
    {
        try {
            util.WriteJsonFile('./appointment.json',this.Appoint);   
        } catch (error) {
            console.log(error);
        }
    }
}
var change = new DocPat();
change.Doc();
change.Pat();
change.App();
export = change;