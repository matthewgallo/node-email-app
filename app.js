const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// setup view
app.engine('.hbs', handlebars({
	defaultLayout: 'layout',
	extname: '.hbs',
	layoutsDir: `${__dirname}/views/layouts/`
}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public/js/client.js'));

// Body parser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Nodemailer demo app',
		msg: ''
	});
});

app.post('/send', (req, res) => {
	console.log(req.body);
	console.log(process.env.EMAIL_ADDRESS);
	const output = `
		<h2>Yay, we sent an email from our web app!</h2>
		<h3>Message</h3>
		<p>${req.body.emailMessageValue}</p>
	`;

	// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 25,
		secure: false,
		requireTLS: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	
	let mailOptions = {
		from: '"Nodemail test" <mdgallo07@gmail.com>',
        to: 'mdgallo07@gmail.com',
        subject: 'Hello ✔',
        html: output
	}

	transporter.sendMail(mailOptions, (error, response) => {
		console.log(response);
		if (error) {
			console.log(error);
		}
		if (response) {
			console.log('*********************** SUCCESSSSSSSSSS! ***********************');
			res.render('index', {msg: 'Email has been sent.'});
		}
	});
});

app.listen(3000, () => {
	console.log('Server started.');
})