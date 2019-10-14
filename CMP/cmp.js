"use strict";
var util = require("../utility");
// Creating the doctor class to assign different doctor
var Doctor = /** @class */ (function () {
    function Doctor(Dname, Did, special, avalible) {
        this.Dname = Dname;
        this.Did = Did;
        this.special = special;
        this.avalible = avalible;
        this.count = 0;
    }
    return Doctor;
}());
// Creating the patient class to assign different patient
var Patient = /** @class */ (function () {
    function Patient(Pname, Pid, ph, age) {
        this.Pname = Pname;
        this.Pid = Pid;
        this.ph = ph;
        this.age = age;
    }
    return Patient;
}());
// Creating the Apoint class to assign different doctor and patient
var Apoint = /** @class */ (function () {
    function Apoint(Dname, Did, special, avalible, Pname, Pid, ph, age) {
        this.Dname = Dname;
        this.Did = Did;
        this.special = special;
        this.avalible = avalible;
        this.Pname = Pname;
        this.Pid = Pid;
        this.ph = ph;
        this.age = age;
    }
    return Apoint;
}());
//All the logic are implemented here
var DocPat = /** @class */ (function () {
    function DocPat() {
        this.AssDoc = new Array();
        this.AssPat = new Array();
        this.Appoint = new Array();
    }
    // TO put existing details of Doctor
    DocPat.prototype.Doc = function () {
        try {
            var doctor = util.ReadFile('./Doctor.json');
            for (var i = 0; i < doctor.length; i++) {
                var Dname = doctor[i]["Dname"];
                var Did = doctor[i]["Did"];
                var special = doctor[i]["Specialization"];
                var avalible = doctor[i]["Availability"];
                var doct = new Doctor(Dname, Did, special, avalible);
                this.AssDoc.push(doct);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    // TO put existing details of Patient
    DocPat.prototype.Pat = function () {
        try {
            var patient = util.ReadFile('./Patient.json');
            for (var i = 0; i < patient.length; i++) {
                var Pname = patient[i]["Pname"];
                var Pid = patient[i]["Pid"];
                var ph = patient[i]["ph"];
                var age = patient[i]["age"];
                var pati = new Patient(Pname, Pid, ph, age);
                this.AssPat.push(pati);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    DocPat.prototype.App = function () {
        try {
            var app = util.ReadFile('./appointment.json');
            var patient = util.ReadFile('./Patient.json');
            var doctor = util.ReadFile('./Doctor.json');
            for (var i = 0; i < app.length; i++) {
                var Pname = app[i]["Pname"];
                var Pid = patient[i]["Pid"];
                var ph = patient[i]["ph"];
                var age = patient[i]["age"];
                var Dname = doctor[i]["Dname"];
                var Did = doctor[i]["Did"];
                var special = doctor[i]["Specialization"];
                var avalible = doctor[i]["Availability"];
                var appoi = new Apoint(Pname, Pid, special, avalible, Dname, Did, ph, age);
                this.Appoint.push(appoi);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    // To add new Patient
    DocPat.prototype.AddPat = function (Pname, Pid, ph, age) {
        try {
            if (Pname == undefined || Pname == null)
                throw new Error("It should be string");
            if (Pid == undefined || Pid == null)
                throw new Error("It should be number");
            var phoneregex = /^[7-9]{1}[0-9]{9}$/;
            if (!phoneregex.test(ph)) {
                throw new Error('phone number must start with 7,8 or 9 and must be 10 digit long');
            }
            if (age == undefined || age == null)
                throw new Error("It should be number");
            var pati = new Patient(Pname, Pid, ph, age);
            this.AssPat.push(pati);
            this.SavePatFile();
            return "sucessful";
        }
        catch (error) {
            return error;
        }
    };
    //To Search Doctor by name,id,Specialization
    DocPat.prototype.searchDoc = function () {
        try {
            console.log("Search Doctor By\n1 => name\n2 => ID\n3 => Specialization\nEnter choice: ");
            var search = util.intInput();
            var count = 0;
            if (search == 1) {
                console.log("Enter name: ");
                var nam = util.stringInput();
                for (var i = 0; i < this.AssDoc.length; i++) {
                    if (nam == this.AssDoc[i].Dname) {
                        count++;
                        console.log("Here is your Doctor Details: ");
                        console.log("---------------------DOCTORS LIST----------------------");
                        console.log("name    id    Specialization   Availability");
                        console.log("-------------------------------------------------------");
                        console.log(this.AssDoc[i].Dname + "   " + this.AssDoc[i].Did + "    " + this.AssDoc[i].special + "        " + this.AssDoc[i].avalible + "\n");
                    }
                }
                if (count == 0)
                    console.log("No such Doctor found: \n");
            }
            else if (search == 2) {
                console.log("Enter ID: ");
                var nam = util.intInput();
                for (var i = 0; i < this.AssDoc.length; i++) {
                    if (nam == this.AssDoc[i].Did) {
                        count++;
                        console.log("Here is your Doctor Details: ");
                        console.log("---------------------DOCTORS LIST----------------------");
                        console.log("name    id    Specialization   Availability");
                        console.log("-------------------------------------------------------");
                        console.log(this.AssDoc[i].Dname + "   " + this.AssDoc[i].Did + "    " + this.AssDoc[i].special + "        " + this.AssDoc[i].avalible + "\n");
                    }
                }
                if (count == 0)
                    console.log("No such Doctor found: \n");
            }
            else if (search == 3) {
                console.log("Enter Specialization: ");
                var nam = util.stringInput();
                for (var i = 0; i < this.AssDoc.length; i++) {
                    if (nam == this.AssDoc[i].special) {
                        count++;
                        console.log("Here is your Doctor Details: ");
                        console.log("---------------------DOCTORS LIST----------------------");
                        console.log("name    id    Specialization   Availability");
                        console.log("-------------------------------------------------------");
                        console.log(this.AssDoc[i].Dname + "   " + this.AssDoc[i].Did + "    " + this.AssDoc[i].special + "        " + this.AssDoc[i].avalible + "\n");
                    }
                }
                if (count == 0)
                    console.log("No such Doctor found: \n");
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    //TO search Patient by name,id,mobile number,age
    DocPat.prototype.searchPat = function () {
        try {
            console.log("Search Patient By:\n1 => name\n2 => ID\n3 => Mobile No.\n4 => age\nEnter choice: ");
            var search = util.intInput();
            var count = 0;
            if (search == 1) {
                console.log("Enter name: ");
                var nam = util.stringInput();
                for (var i = 0; i < this.AssPat.length; i++) {
                    if (nam == this.AssPat[i].Pname) {
                        count++;
                        console.log("Here is your Patient Details: ");
                        console.log("-----------------PATIENTS LIST--------------------------");
                        console.log("name    id    Mobile No.     age");
                        console.log("-------------------------------------------------------");
                        console.log(this.AssPat[i].Pname + "   " + this.AssPat[i].Pid + "    " + this.AssPat[i].ph + "        " + this.AssPat[i].age + "\n");
                    }
                }
                if (count == 0)
                    console.log("No such Patient found: \n");
            }
            else if (search == 2) {
                console.log("Enter ID: ");
                var nam = util.intInput();
                for (var i = 0; i < this.AssPat.length; i++) {
                    if (nam == this.AssPat[i].Pid) {
                        count++;
                        console.log("Here is your Patient Details: ");
                        console.log("-----------------PATIENTS LIST--------------------------");
                        console.log("name    id    Mobile No.     age");
                        console.log("-------------------------------------------------------");
                        console.log(this.AssPat[i].Pname + "   " + this.AssPat[i].Pid + "    " + this.AssPat[i].ph + "        " + this.AssPat[i].age + "\n");
                    }
                }
                if (count == 0)
                    console.log("No such Patient found: \n");
            }
            else if (search == 3) {
                console.log("Enter phone No. ");
                var nam = util.intInput();
                for (var i = 0; i < this.AssPat.length; i++) {
                    if (nam == this.AssPat[i].ph) {
                        count++;
                        console.log("Here is your Patient Details: ");
                        console.log("-----------------PATIENTS LIST--------------------------");
                        console.log("name    id    Mobile No.     age");
                        console.log("-------------------------------------------------------");
                        console.log(this.AssPat[i].Pname + "   " + this.AssPat[i].Pid + "    " + this.AssPat[i].ph + "        " + this.AssPat[i].age + "\n");
                    }
                }
                if (count == 0)
                    console.log("No such Patient found: \n");
            }
            else if (search == 4) {
                console.log("Enter age: ");
                var nam = util.intInput();
                for (var i = 0; i < this.AssPat.length; i++) {
                    if (nam == this.AssPat[i].age) {
                        count++;
                        console.log("Here is your Patient Details: ");
                        console.log("-----------------PATIENTS LIST--------------------------");
                        console.log("name    id    Mobile No.     age");
                        console.log("-------------------------------------------------------");
                        console.log(this.AssPat[i].Pname + "   " + this.AssPat[i].Pid + "    " + this.AssPat[i].ph + "        " + this.AssPat[i].age + "\n");
                    }
                }
                if (count == 0)
                    console.log("No such Patient found: \n");
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    //TO appoint doctor to patient
    DocPat.prototype.AppointMent = function () {
        try {
            this.PrintPat();
            console.log("Here is the list of patient Select sl.No. to choose for  Appointment: ");
            var ch = util.intInput();
            var Pname = this.AssPat[ch].Pname;
            var Pid = this.AssPat[ch].Pid;
            var ph = this.AssPat[ch].ph;
            var age = this.AssPat[ch].age;
            this.PrintDoc();
            console.log("Here is the list of Doctor Select sl.No. to choose for  Appointment: ");
            var cho = util.intInput();
            if (this.AssDoc[cho].count < 5) {
                var Dname = this.AssDoc[cho].Dname;
                var Did = this.AssDoc[cho].Did;
                var special = this.AssDoc[cho].special;
                var avalible = this.AssDoc[cho].avalible;
                this.AssDoc[cho].count++;
                var Ap = new Apoint(Dname, Did, special, avalible, Pname, Pid, ph, age);
                this.Appoint.push(Ap);
                this.SaveAppFile();
            }
            else
                console.log("Doctors Appointment is full");
        }
        catch (error) {
            console.log(error);
        }
    };
    //To print existing file of Doctor
    DocPat.prototype.PrintDoc = function () {
        try {
            console.log("---------------------DOCTORS LIST----------------------");
            console.log("Sl.No.    name    id    Specialization   Availability");
            console.log("-------------------------------------------------------");
            for (var i = 0; i < this.AssDoc.length; i++) {
                console.log(i + "         " + this.AssDoc[i].Dname + "   " + this.AssDoc[i].Did + "    " + this.AssDoc[i].special + "        " + this.AssDoc[i].avalible);
            }
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n");
        }
        catch (error) {
            console.log(error);
        }
    };
    //To print existing file of Patient
    DocPat.prototype.PrintPat = function () {
        try {
            console.log("-----------------PATIENTS LIST--------------------------");
            console.log("Sl.No.    name    id    Mobile No.     age");
            console.log("-------------------------------------------------------");
            for (var i = 0; i < this.AssPat.length; i++) {
                console.log(i + "         " + this.AssPat[i].Pname + "   " + this.AssPat[i].Pid + "    " + this.AssPat[i].ph + "    " + this.AssPat[i].age);
            }
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n");
        }
        catch (error) {
            console.log(error);
        }
    };
    //To print the appointment Details
    DocPat.prototype.PrintApp = function () {
        try {
            console.log("--------------------------Appointnment LIST----------------------------------------------------------");
            console.log("Sl.No.  Availability      Doctor name    id    Specialization    Patient Name    id    Mob No.   age");
            console.log("-----------------------------------------------------------------------------------------------------");
            for (var i = 0; i < this.Appoint.length; i++) {
                console.log(i + "         " + this.Appoint[i].avalible + "          " + this.Appoint[i].Dname + "        " + this.Appoint[i].Did + "    " + this.Appoint[i].special + "         " + this.Appoint[i].Pname + "      " + this.Appoint[i].Pid + "  " + this.Appoint[i].ph + "  " + this.Appoint[i].age);
            }
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n");
        }
        catch (error) {
            console.log(error);
        }
    };
    //To save details of Patient 
    DocPat.prototype.SavePatFile = function () {
        try {
            util.WriteJsonFile('./op.json', this.AddPat);
        }
        catch (error) {
            console.log(error);
        }
    };
    //To save details of Patient 
    DocPat.prototype.SaveDocFile = function () {
        try {
            util.WriteJsonFile('./op.json', this.AssDoc);
        }
        catch (error) {
            console.log(error);
        }
    };
    // TO save appintment
    DocPat.prototype.SaveAppFile = function () {
        try {
            util.WriteJsonFile('./appointment.json', this.Appoint);
        }
        catch (error) {
            console.log(error);
        }
    };
    return DocPat;
}());
var change = new DocPat();
change.Doc();
change.Pat();
change.App();
module.exports = change;
