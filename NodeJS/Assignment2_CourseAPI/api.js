const http = require("http");



const courses = [
  { id: 1, title: "HTML Basics", level: "beginner", hours: 10 },
  { id: 2, title: "JavaScript Essentials", level: "beginner", hours: 20 },
  { id: 3, title: "Node.js Server", level: "intermediate", hours: 24 },
  { id: 4, title: "Advanced MongoDB", level: "advanced", hours: 30 },
];


function sendJson(res, status, data) {
    res.writeHead(status, {"Content-Type": "application/json"});
    res.end(JSON.stringify(data));
}

function sum(a , b){
  return a + b ;
}

const server = http.createServer((req , res) =>{
      const url = new URL(req.url, "http://localhost:3000");
      console.log(req.method, url.pathname, url.search);
       
      // ----- route 1 -----
      if(url.pathname === "/"){
        res.writeHead(200 , {"Content-type": "text/html"});
        res.end(`<h1>Course API</h1>
        <p>Available endpoints: /about, /api/courses, /api/greet, /api/add</p>
    `)
      }
      // ----- route 2 -----
      else if(url.pathname === "/about"){
        res.writeHead(200 , {"content-type" : "text/plain"});
        res.end("Course API v1 - built with Node.js");
      }

      // ----- route 3 and 4 -----
      else if(url.pathname === "/api/courses"){

        if(url.searchParams.get("level")){
           const level = url.searchParams.get("level");
          const i = courses.filter(courses =>courses.level === level);
          sendJson(res , 200 , i)

        }else{
          sendJson(res, 200 , courses)
        }
      } 
      // ----- route 5 -----
      else if(url.pathname === "/api/greet"){
           const name = url.searchParams.get("name");
           const city = url.searchParams.get("city") || "Pakistan";
           if(!name){
            sendJson(res , 400 , {"error":"name is required"});
           }else{ 
            sendJson(res , 200 , {"message": `Hello ${name} from ${city}`});
           }
      }
      // ----- route 6 -----
      else if(url.pathname === "/api/add"){
        let a =url.searchParams.get("a");
        let b = url.searchParams.get("b");

        if(a === null || b === null ){
          sendJson(res , 400 , {"error" :"a and b must be number"});
        }
        else{
          a = Number(a); 
          b = Number(b);
        }

        if(Number.isNaN(a) || Number.isNaN(b)){
          sendJson(res , 400 , {"error" :"Numbers are incorrect"});
        }
        else{
          sendJson(res , 200 , {"a": `${a}` , "b" : `${b}` , "sum": sum(a , b)});
        }
      }
       // ----- route 7 -----
      else{
        sendJson(res , 404 , {"error" :"Route not found"});
      }
   

})





server.listen(3000 , ()=>{
    console.log("Server runnning at the http://localhost:3000");
})