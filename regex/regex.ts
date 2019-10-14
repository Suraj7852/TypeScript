import * as util from '../utility';

console.log("Enter your full name: ");
let name = util.stringInput();
let today = new Date();
let date = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
console.log("Enter your mobile No.");
let mobNo = util.intInput();
let mobNoReg = /^[6-9]\d{9}$/;
if(mobNoReg.test(mobNo))
{
    var nameSp = name.split(" ");
    console.log(`Hello ${nameSp[0]}, We have your full name as ${name} in our system.\nYour contact number is +91-${mobNo}.\nPlease,let us know in case of any clarification Thank you BridgeLabz ${date}.`);
}
else
{
    console.log("Invalid user name Or Mobile Number");
}