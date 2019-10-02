import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import flash from "connect-flash";
import * as helmet from "helmet";
import * as cors from "cors";
import * as socketio from "socket.io";


const app: express.Application = express();
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');

createConnection()
    .then(async connection => {
      // Create a new express application instance


      // Call midlewares
      app.use(helmet.xssFilter());
      app.use(helmet.frameguard());
      app.use(bodyParser.json());

      //Set all routes from routes folder
      app.use("/", webRouter);

      app.listen(3000, () => {
        console.log("Server started on port 3000!");
      });
    })
    .catch(error => console.log(error));

// Create a new express application instance




/*


const routes 		= require('./app/routes');
const session 	= require('./app/session');
const passport    = require('./app/auth');
const ioServer 	= require('./app/socket')(app);
const logger 		= require('./app/logger');
*/



app.set('view', path.join(__dirname, "src/views"));
app.set('view engine', "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
/*

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
*/

app.use(flash());



app.use('/', webRouter);
app.use('/api', apiRouter);

app.listen(3020, function () {
  console.log('Example app listening on port 3000!');
});
