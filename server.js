const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
//env config
dotenv.config();

//Mongodb connection
connectDb();

//Rest object
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

const PORT = process.env.PORT || 8080;
//Listen
app.listen(PORT, () => {
  console.log(
    `Server running on port:${PORT} in ${process.env.DEV_MODE} mode`.italic
      .underline.cyan
  );
});
