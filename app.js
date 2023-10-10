const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swager.json");
const { authRouter, usersRouter, categoriesRouter } = require("./routes/api");

const app = express();

const loggerFormat = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(loggerFormat));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoriesRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found - invalid request" });
});

app.use((err, req, res, next) => {
  const { message = "Server error", status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = app;
