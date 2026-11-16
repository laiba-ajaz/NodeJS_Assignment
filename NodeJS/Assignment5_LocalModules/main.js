const temprature = require("./temprature");
const a = require("./counter");
const b =require("./counter");
const {student} = require("./Student");

//Task 1
console.log("37C =" , temprature.celsiusToFahrenheit(37),"F") ;
console.log("98.6F =" , temprature.fahrenheitToCelsius(98.6),"C");  

//Task 2
console.log(a.increment(), b.increment(), a.increment());

//Task 3
const std1 = new student("Sara" , "75");
console.log(`${std1.name} (${std1.marks}): ${std1.isPassed() ? "Pass" : "Fail"}`);
const std2 = new student("Bilal" , "35");
console.log(`${std2.name} (${std2.marks}): ${std2.isPassed() ? "Pass" : "Fail"}`);
