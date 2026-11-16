const express = require("express");
const app = express();


const courses = [
    { id: 1, title: "HTML Basics", level: "beginner", hours: 10 },
    { id: 2, title: "JavaScript Essentials", level: "beginner", hours: 20 },
    { id: 3, title: "Node.js Server", level: "intermediate", hours: 24 },
    { id: 4, title: "Advanced MongoDB", level: "advanced", hours: 30 },
];



// ----- route 1 -----
app.get("/", (req, res) => {
    res.send("Course API");
})


// ----- route 2 -----
app.get("/about", (req, res) => {
    res.type("text/plain").send("Course API V1 build with Express");
})


// ----- route 3 -----
app.get("/api/courses", (req, res) => {
    res.json(courses);
})


// ----- route 4 -----
app.get("/api/courses", (req, res) => {
    const q = req.query.level.toLowerCase();
    if (q) {
        const filteredCourses = courses.filter((c) => c.level === q);
        return res.send(filteredCourses);
    }
     res.send(courses);
})


// ----- route 5 -----
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === Number(req.params.id));
    if (!course) {
       return res.status(404).json({ error: "Course not found!" });
    }
    res.json(course);
})


// ----- route 6 -----
app.get("/api/greet/:name", (req, res) => {
    const city = req.query.city || "Pakistan";
    res.type("json").send(`Hello ${req.params.name} from ${city}`);
})


// ----- route 7 -----
app.get("/api/add/:a/:b", (req, res) => {
    const valueA = Number(req.params.a);
    const valueB = Number(req.params.b);

    if (Number.isNaN(valueA) || Number.isNaN(valueB)) {
       return res.status(400).json({ "error": "a and b must be numbers" });
    } else {
        const total = valueA + valueB;
        res.json({a: valueA ,  b: valueB, sum: total});

       
    }
})


// ----- route 8 -----
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});









app.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
})