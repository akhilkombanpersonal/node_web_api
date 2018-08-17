const express = require("express");
const hbs = require("hbs");
const fs  = require("fs");
const port= process.env.PORT || 3000;
var app =express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currenYear', () =>{
	return new Date().getFullYear();
});
hbs.registerHelper('upperCase', (text) =>{
	return text.toUpperCase();
});

app.set("view engine", "hbs");

//Middlewares
app.use(express.static(__dirname+'/public'));
app.use((req, res, next) =>{
	var currentDate = new Date().toString();
	var log = `${currentDate} ${req.method} ${req.url} \n`;
	fs.appendFileSync('Server.log', log);
	next();
});
// app.use((req, res, next) =>{
// 	res.render('maintenance.hbs');
// });

app.get('/',(req, res) => {
	// res.send('Hii');
	// res.send({
	// 	name:"Abb",
	// 	age:"23"
	// });

	res.render('home.hbs',{
		title : "Home",
		heading: "Heading",
		content: "welcome people"
	});
});

app.get('/about', (req, res) =>{
	res.render('about.hbs', {
		title : "about",
		heading: "About",
		// currenYear: new Date().getFullYear()		
	})	
})
app.get('/bad',(req, res) =>{
	res.send({
		errormessage: "Unable to handle request"
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);	
	
});