import express from "express";
import bodyParser from "body-parser";

import todoRoutes from "./routes/todos.js"

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use("/todos", todoRoutes)


app.listen(3011, () => {
  console.log("Server is running on port http://localhost:3011");
});