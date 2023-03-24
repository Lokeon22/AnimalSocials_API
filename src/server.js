require("express-async-errors");
const express = require("express");
const routes = require("./routes");

const AppError = require("./utils/AppError");

const app = express();

app.use(express.json());

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

app.use(routes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
