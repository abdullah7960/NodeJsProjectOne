const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
    .route("/api/users/:id").get('/api/users/:id', (req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id)
        return res.json(user);

    })
    .put((req, res) => {
        return res.json({ status: "pending" });
    })
    .delete((req, res) => {
        return res.json({ status: "pending" });
    });

app.post('/api/users', (req, res) => {
    console.log('todo create new user');
    return res.json({ status: "pending" });
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