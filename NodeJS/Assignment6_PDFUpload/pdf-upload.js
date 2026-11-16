const http  = require("http");
const fs = require("fs");
const path = require("path");
const {formidable} = require("formidable"); 

const uploadDir = path.join(__dirname , "uploads");
fs.mkdirSync(uploadDir , {recursive :true});



const formPage = `
<h1>PDF Upload</h1>
<form action="/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="pdf" required />
  <button type="submit">Upload</button>
</form>`


const server = http.createServer((req, res) =>{
  if (req.method === "GET" && req.url === "/"){
    res.writeHead(200 , {"Content-Type" : "text/html"});
    res.end(formPage);
  }else if(req.method === "POST" && req.url === "/upload"){
    const form  =formidable({
      uploadDir : uploadDir ,
      keepExtension : true , 
      maxFileSize : 1024 * 1024 ,
      filter: ({ mimetype }) => mimetype === "application/pdf",


  });
  form.parse(req, (error, fields, files) => {
      res.setHeader("Content-Type", "text/plain");

      if (error) {
        res.statusCode = error.httpCode || 400;
        res.end("Upload failed: " + error.message);
        return;
      }

      const file = files.pdf && files.pdf[0];
      if (!file) {
        res.statusCode = 400;
        res.end("Only PDF files are allowed");
        return;
      }

      console.log("Saved:", file.newFilename, "| original:", file.originalFilename, "|", file.size/1024, "KB");
      res.statusCode = 200;
      res.end(`Upload successful!\nOriginal name: ${file.originalFilename}\nSaved as: ${file.newFilename}\nSize: ${(file.size/1024).toFixed(1)}KB`);
    });

  }else{
    
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page not found");

  }
})


server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});