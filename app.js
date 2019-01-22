const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const contactsRouter = require("./routes/contacts");

const { errorMessage } = require("./controllers/messagesController");

const app = express();

/**
 * Connect to DB
 */
mongoose.connect(
  "mongodb://localhost:27017/contacts-api",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

// eslint-disable-next-line no-console
mongoose.connection.on("error", console.error);

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/contacts", contactsRouter);

// Catch any unrecognized route and send an error message
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;

  next(error);
});

app.use(errorMessage);

module.exports = app;
