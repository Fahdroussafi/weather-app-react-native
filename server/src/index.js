const express = require("express");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const connectDB = require("./config/database");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;