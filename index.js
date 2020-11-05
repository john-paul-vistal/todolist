const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql')
const port = 8001

urlEncodedParser = bodyParser.urlencoded({ extended: false });
const app = express();
app.use(bodyParser.json());


app.set('view engine', 'ejs');


let todoList = []


app.get('/', async(req, res) => {
    res.render('mainpage', { todo: todoList });
});

app.post('/add', urlEncodedParser, (req, res) => {
    let date = new Date()
    let dateCreated = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    let activity = { "title": req.body.title, "content": req.body.content, "dateCreated": dateCreated }
    todoList.push(activity);
    res.redirect('/')
});

app.get('/remove/:index', urlEncodedParser, (req, res) => {
    todoList.splice(req.params.index, 1)
    res.redirect('/')
})






app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});