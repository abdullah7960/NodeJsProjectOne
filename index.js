const express = require("express");
const users = require("./MOCK_DATA.json");

const fs = require("fs");

const app = express();
const PORT = 8000;


//midlware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    req.myUserName = "Abdulah.dev";
    fs.appendFile('log.txt', `${Date.now()} : ${req.method} : ${req.path}`, (err, data) => {
        next();
    });
});


app.use((req, res, next) => {
    console.log("Hello from middleware 2", req.myUserName);
    return res.end("hey");
});

//Routes
app.get('/api/users', (req, res) => {
    return res.json(users);
})
//for web 
app.get('/users', (req, res) => {
    /*    
    <ul>
        <li> Abdullah Abbasi </li>
    </ul>
    
    */
    const html = `
   <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
   </ul>
   `;
    res.send(html);
})

app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        return res.json(user);
    })
    .put((req, res) => {
        return res.json({ status: "pending" });
    })
    .delete((req, res) => {
        return res.json({ status: "pending" });
    });


app.post('/api/users', (req, res) => {
    const body = req.body;
    console.log("body", body);
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Success", id: users.length });
    })


})

app.patch('/api/users/:id', (req, res) => {
    console.log('todo create new user');
    return res.json({ status: "pending" });
})


app.delete('/api/users/:id', (req, res) => {
    console.log('todo create new user');
    return res.json({ status: "pending" });
})

app.listen(PORT, () => console.log('Server Started'));