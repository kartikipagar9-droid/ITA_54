const express = require("express");
const mongoose = require("mongoose");
const Book = require("./Book");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/librarydb")
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("MongoDB connection error:", error));
const PORT = 3000;
app.use(express.json());
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.send("Library Management API is running!");
});
app.post("/api/books", async (req, res) => {
    try {
        const book = new Book({
            bookName: req.body.bookName,
            author: req.body.author,
            quantity: req.body.quantity
        });
        const savedBook = await book.save();
        res.status(201).json({
            message: "Book added successfully!",
            book: savedBook
        });
    } catch (error) {
        res.status(400).json({
            message: "Error adding book",
            error: error.message
        });
    }
});
app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching books",
            error: error.message
        });
    }
});

 // UPDATE a book by ID
app.put("/api/books/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not update book",
            error: error.message
        });
    }
});

// DELETE a book by ID
app.delete("/api/books/:id", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not delete book",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
