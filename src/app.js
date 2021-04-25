require("dotenv").config({ path: '.env' });

const appRouter = require("./router/app.router");

const express = require("express");
const helmet = require("helmet");
var cors = require('cors');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ['http://192.168.1.29:4200', 'http://localhost:4200']
}));

app.use((err, req, res, next) => {
  console.log(err);
  if(err.status === 400)
    return res.status(err.status).json({
      message : 'Body JSON Format is incorrect'
    });
  return next(err);
});

app.use(appRouter);
app.disable('x-powered-by');

const host = process.env.APP_HOST;
const port = process.env.APP_PORT || 3000;



/****************************************************
 * MAIN Function
 */
if(host)
  app.listen(port, "192.168.1.29", () => {
    console.log("server up and running on http://"+host+":"+port);
  });
else
  app.listen(port, () => {
    console.log("server up and running "+port);
  });
/*****************************************************/