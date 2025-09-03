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

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id)
    return res.json(user);

})

app.listen(PORT, () => console.log('Server Started'));