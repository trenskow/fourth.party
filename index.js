'use strict';

const express = require('express'),
	stylus = require('stylus'),
	serve = require('express-static'),
	enforce = require('express-sslify');

const app = express();

if (process.env.NODE_ENV === 'production') {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(require('morgan')('combined'));

app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: (str, path) => {
		return stylus(str)
			.set('filename', path);
	}
}));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/terms/', (req, res) => {
	res.render('terms');
});

app.use(serve(__dirname + '/public'));

app.listen(process.env.PORT || 3001);
