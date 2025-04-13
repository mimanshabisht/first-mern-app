import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

    const router = express.Router(); //creates a new router object from express which is like a mini express app.

    router.get("/", getProducts);
    router.post("/", createProduct);
    router.put("/:id", updateProduct);
    router.delete("/:id", deleteProduct);

export default router;