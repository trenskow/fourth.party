'use strict';

const express = require('express'),
	stylus = require('stylus'),
	serve = require('express-static');

const app = express();

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

app.use(serve(__dirname + '/public'));

app.listen(process.env.PORT || 3001);
