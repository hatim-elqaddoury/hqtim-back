const dotenv = require("dotenv").config().parsed;
const appRouter = require("./router/app.router");
const express = require("express");
const helmet = require("helmet");
const cors = require('cors');
const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT || 3000;

class Server {

  constructor() {
    this.config();
    this.run();
  }

  config() {

    app.use(helmet());

    app.use(express.json());

    app.use(express.urlencoded({
      extended: true
    }));

    app.disable('x-powered-by');
    app.use(cors({
      origin: ['http://192.168.1.29:4200', 'http://localhost:4200']
    }));

    app.use((err, req, res, next) => {
      console.log(err);
      if (err.status === 400)
        return res.status(err.status).json({
          message: 'Body JSON Format is incorrect'
        });
      return next(err);
    });

    app.use(appRouter);

  }

  run() {
    if (host)
      app.listen(port, host, () => {
        console.log("server up and running on http://" + host + ":" + port);
      });
    else
      app.listen(port, () => {
        console.log("server up and running " + port);
      });
  }

}

new Server();