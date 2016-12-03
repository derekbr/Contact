var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');


app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res, next){
    res.render('index');
});

app.post('/', function(req, res, next){

//for some reason I can't get it to actually send emails. I'm not sure if it is an issue with the server, or with the html submit button.
    var transporter = nodemailer.createTransport("SMTP", {
        service: 'Gmail',
        auth: {
            user: 'derekqb1@gmail.com',
            pass: 'rckioavoymwpvayg',
        }
    });
	
		

    var mailOptions = {
        from: req.body.email,
        to: 'derekqb1@gmail.com',
        subject: req.body.subject,
        message: req.body.message,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

});

app.listen(3000, function(){
  console.log('Server online');
});
          
     