require("dotenv").config();
const express = require("express");
const dbConfig = require("./config/db.config");
dbConfig();

const app = express();

app.use(express.json());

const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

app.listen(Number(process.env.PORT), () => {
  console.log("Server up and running at port:", process.env.PORT);
});
