require("./config/config");
const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/index');

app.set("port", process.env.PORT);

mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log("db conectada");
  }
);
mongoose.set('useFindAndModify', false);

app.use(morgan(process.env.NODE_ENV));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(router);

app.listen(app.get("port"), () => {
  console.log(`escuchando en puerto ${app.get("port")}`);
});
