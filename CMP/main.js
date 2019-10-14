"use strict";
exports.__esModule = true;
var cmp = require("./cmp");
var util = require("../utility");
while (true) {
    try {
        console.log("\n1 =>Search Doctor\n2 => Search Patient\n3 => For Appointnment\n4 => To see Doctor List\n5 => To see Patient List\n6 => To see Appointment List\n7 => Add Patient\n8 => Exit\nEnter choice: ");
        var choice = util.intInput();
        switch (choice) {
            case 1:
                cmp.searchDoc();
                break;
            case 2:
                cmp.searchPat();
                break;
            case 3:
                cmp.AppointMent();
                console.log("Sucessfully Appointed...");
                break;
            case 4:
                cmp.PrintDoc();
                break;
            case 5:
                cmp.PrintPat();
                break;
            case 6:
                cmp.PrintApp();
                break;
            case 7:
                console.log("Enter name: ");
                var Pname = util.stringInput();
                console.log("Enter ID: ");
                var Pid = util.intInput();
                console.log("Enter phone No. ");
                var ph = util.intInput();
                console.log("Enter age: ");
                var age = util.intInput();
                cmp.AddPat(Pname, Pid, ph, age);
                console.log("Added to the list...");
                break;
            case 8:
                console.log("Do you want to save the changes:\n1 => yes\n2 => No\nEnter choice: ");
                var ch = util.intInput();
                if (ch == 1) {
                    cmp.SaveAppFile();
                    cmp.SaveDocFile();
                    cmp.SavePatFile();
                    console.log("Sucessfully saved");
                    process.exit();
                }
                else if (ch == 2)
                    process.exit();
            default:
                console.log("Enter Valid Choice: ");
                break;
        }
    }
    catch (error) {
        console.log(error);
    }
}
