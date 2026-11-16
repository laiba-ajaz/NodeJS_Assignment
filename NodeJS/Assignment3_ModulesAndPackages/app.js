const _ = require("lodash");
const path = require("path");

console.log(_.uniq([1 ,2 , 2, 3 , 3 , 3]))

console.log(_.max([5 ,  8 , 1]))

console.log(_.upperCase("hello world"))


console.log("File Name:" , path.basename("report.final.pdf"));
console.log("Extension Name:" , path.extname("report.final.pdf"));
