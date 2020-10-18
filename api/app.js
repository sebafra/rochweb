import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import routes from './routes'
import http from 'http'
import multipart from 'connect-multiparty'

import settings from './config/settings';

const https = require('https')
const fs = require('fs');


const app = express()
const server = http.Server(app)

const cert = fs.readFileSync('./certificate.crt');
const ca = fs.readFileSync('./ca_bundle.crt');
const key = fs.readFileSync('./private.key');

let options = {
   cert: cert,
   ca: ca,
   key: key
};

https.createServer(options, app).listen(settings.portHttps);


app.use(function (req, res, next) {
	if (process.env.NODE_ENV && process.env.NODE_ENV == 'test') {
		req.settings = require('./test/config/settings')
	} else {
		req.settings = require('./config/settings')
	}
	return next()
})


// cache control error 304
app.disable('etag');

// CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept, x-access-token, x-accepted-format')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	next()
})

app.use(multipart({
	uploadDir: '/tmp/'
}))

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({
	parameterLimit: 100000,
	limit: '50mb',
	extended: true
}));

app.use(cookieParser())


/*
 * @static content
 * app.use('/speechToText', express.static(path.join(__dirname, './static/speechToText.html')));
 * app.use('/files', express.static(path.join(__dirname, './static/files/')));
 */
app.use('/api', routes)

//app.use('/', express.static(path.join(__dirname, '../adm/dist/')))
app.use('/', express.static(path.join(__dirname, '../web/dist/')))
app.use('/web', express.static(path.join(__dirname, '../web/dist/')))
app.use('/adm', express.static(path.join(__dirname, '../adm/dist/')))
app.use('/files', express.static(path.join(__dirname, '../adm/files/')))


app.get('/*',  function(req, res) {
	res.sendFile('index.html', { root: '../web/dist/' })
})

export {app, server}
