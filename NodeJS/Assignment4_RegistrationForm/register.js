const http = require("http");
const queryString = require("querystring");



function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}


const form = `
<h1>Student Form </h1>
<form action="/register"  method="post">
<input id="name" name="name" placeholder="Enter your name">
<input id="email" name="email" placeholder="Enter your email">
<input id="course" name="course" placeholder = "Enter your course">
<button type="submit">Register</button>
</form>
`

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(form)
    }
    else if (req.method === "POST" && req.url === "/register") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const formData = queryString.parse(body);

            if (!formData.name || !formData.email || !formData.course) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                return res.end("All fields are required");
            }
            console.log(queryString.stringify(formData));
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<h1><b>Registered!</b></h1> <h4>Name: ${escapeHtml(formData.name)}, Email: ${escapeHtml(formData.email)}, Course: ${escapeHtml(formData.course)}</h4>`);
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
})




server.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
})