import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config(); //allows us to read variables in dotenv files
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve(); //tells us current directory path

const app = express();

app.use(express.json()); //allows us to accept json data as req body
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is listening on port " + PORT);
});
