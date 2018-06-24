const express = require('express');
const fs = require('fs');
app = express();
const hbs = require('hbs');
app.set('view engine',hbs);
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname+ '/public'));
app.use((req,res,next)=>{
var now = new Date().toDateString();
var log = `${now} : ${req.method} ${req.url}`; 

fs.appendFile('server.log',log + '\n',(err)=>
{
if(err)
{
    console.log('An error has occured ');
}
});
console.log(log);
next();
});

app.use((req, res, next)=>{
res.render('maintainance.hbs');
});

hbs.registerHelper('getCurrentYear',() => {
return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});
app.get('/',(req,res)=>
{
res.render('home.hbs',{
pageTitle: 'Home Page',
welcomeMessage: 'Hello ,How are you?',
});
});

app.get('/about',(req,res)=>
{
res.render('divi.hbs',{
    pageTitle: 'My New Page'
});
});
var server = app.listen(3000, function () {
    console.log("Sever is working on port : 3000");
 })