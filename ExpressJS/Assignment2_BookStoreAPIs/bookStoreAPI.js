const EventEmitter = require("events");
const emitter = new EventEmitter();
const querystring = require("querystring");
const express = require("express");
const app = express();


const { books } = require("./data/books");
const { customers } = require("./data/customers");
const { orders } = require("./data/orders");



const formPage = `
<h1>Bookstore API</h1>

<h2>Search Books</h2>

<form action="/api/books" method="get">
  <p><input name="name" placeholder="Book name"></p>
  <p><input name="author" placeholder="Author name"></p>
  <p><input name="genre" placeholder="Book genre"></p>

  <button type="submit">Search Books</button>
</form>`;


emitter.on("search", (data) => {
    console.log(`[search]  ${querystring.stringify(data.filters)} -> ${data.count} result(s)`);
});



app.get("/", (req, res) => {
    res.send(formPage);
})

app.get("/health", (req, res) => {
    res.type("text/plain").send("OK");
})

// ------  BOOK API -------
//(1)
app.get("/api/books", (req, res) => {
    res.json(books);
})

// (2) search by book name or author or genre
app.get("/api/books", (req, res) => {
    const name = req.query.name;
    const author = req.query.author;
    const genre = req.query.genre;
    if (name || author || genre) {
        const filteredBooks = books.filter((b) =>
            (!name || b.name.toLowerCase() === name.toLowerCase()) &&
            (!author || b.author.toLowerCase() === author.toLowerCase()) &&
            (!genre || b.genre.toLowerCase() === genre.toLowerCase())
        );



        emitter.emit("search", {
            filters: { name, author, genre },
            count: filteredBooks.length
        });

        if (filteredBooks.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        return res.json(filteredBooks);
    }
    else {
        return res.json(books);
    }
})

//by route parameter
app.get("/api/books/:id", (req, res) => {
    const book = books.find((b) => b.id === Number(req.params.id));
    if (!book) {
        return res.status(404).json({ "error": "Book not found" });
    }
    res.json(book);
})



// ------  CUSTOMERS API -------
app.get("/api/customers", (req, res) => {
    const name = req.query.name;
    const city = req.query.city;

    if (name || city) {
        const filteredCustomers = customers.filter((c) => (!name || c.name.toLowerCase() === name.toLowerCase()) && (!city || c.city.toLowerCase() === city.toLowerCase()));

        emitter.emit("search", {
            filters: { name, city },
            count: filteredCustomers.length
        });

        if (filteredCustomers.length === 0) {
            return res.status(404).json({ error: "No customers found" });
        }

        return res.json(filteredCustomers);
    }
    else {
        return res.json(customers);
    }
})


// ------  ORDERS API -------
app.get("/api/orders", (req, res) => {
    const status = req.query.status;
    const orderDate = req.query.orderDate;

    if (status || orderDate) {
        const filteredOrders = orders.filter((o) => (!status || o.status.toLowerCase() === status.toLowerCase()) && (!orderDate || o.orderDate.toLowerCase() === orderDate.toLowerCase()));

        emitter.emit("search", {
            filters: { status, orderDate },
            count: filteredOrders.length
        });

        if (filteredOrders.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }


        return res.json(filteredOrders);
    }
    else {
        return res.json(orders);
    }
})

//by route parameter
app.get("/api/orders/:id", (req, res) => {
    const order = orders.find((o) => o.id === Number(req.params.id));
    if (!order) {
        return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
})


app.post("/api/orders/:id/send-receipt", (req, res) => {
    const order = orders.find((o) => o.id === Number(req.params.id));
    const email = req.query.to;

    if (!order || !email) {
        return res.type('text/plain').send("Make sure you give both order id and email!");
    }

    let subject = `Receipt for Order# ${order.id}`;
    let text = `Hello , your order status is : ${order.status}`;

    res.json({
        message: "Receipt generate successfully",
        to: email,
        subject: subject,
        text: text

    })
})

// 404 route 
app.use((req, res) => {
    res.status(404).json({ "error": "Route not found" });
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
})

