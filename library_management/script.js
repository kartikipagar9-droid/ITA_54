const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
bookForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const bookName = document.getElementById("bookName").value.trim();
    const author = document.getElementById("author").value.trim();
    const quantity = Number(document.getElementById("quantity").value);
    if (!bookName || !author || !Number.isInteger(quantity) || quantity < 1) {
        alert("Please enter valid book details.");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bookName: bookName,
                author: author,
                quantity: quantity
            })
        });
        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.error || data.message || "Failed to add book");
        }
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
    nameCell.textContent = bookName;
    const authorCell = document.createElement("td")
    authorCell.textContent = author;
    const quantityCell = document.createElement("td")
    quantityCell.textContent = quantity;
    row.append(nameCell, authorCell, quantityCell);
        bookList.appendChild(row);
        bookForm.reset();
        alert("Book added successfully!")
    } catch (error) {
        console.error("Error adding book:", error);
        alert("Could not add book. Check that the backend and MongoDB are running.");
    }
});

async function loadBooks() {
    try {
        const response = await fetch("http://localhost:3000/api/books");
        const books = await response.json();
        document.getElementById("bookCount").textContent =
    "Total Books: " + books.length;

        if (!response.ok) {
            throw new Error("Failed to load books");
        }

        bookList.innerHTML = "";

        books.forEach(function (book) {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = book.bookName;

            const authorCell = document.createElement("td");
            authorCell.textContent = book.author;

            const quantityCell = document.createElement("td");
            quantityCell.textContent = book.quantity;

            
const actionsCell = document.createElement("td");

const editButton = document.createElement("button");
editButton.textContent = "Edit";

editButton.onclick = function () {
    document.getElementById("editBookId").value = book._id;
    document.getElementById("editBookName").value = book.bookName;
    document.getElementById("editAuthor").value = book.author;
    document.getElementById("editQuantity").value = book.quantity;

    document.getElementById("editBookForm").style.display = "block";
};

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.onclick = function () {
    deleteBook(book._id);
};

actionsCell.append(editButton, deleteButton);
row.append(nameCell, authorCell, quantityCell, actionsCell);

            bookList.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading books:", error);
    }
}

loadBooks();

async function updateBook(id, bookData) {
    if (
        !bookData.bookName ||
        !bookData.author ||
        !Number.isInteger(bookData.quantity) ||
        bookData.quantity < 1
    ) {
        alert("Please enter valid book details.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update book");
        }

        alert("Book updated successfully!");
        await loadBooks();
    } catch (error) {
        console.error("Error updating book:", error);
        alert("Could not update book.");
    }
}

async function deleteBook(id) {
    if (!confirm("Are you sure you want to delete this book?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete book");
        }

        alert("Book deleted successfully!");
        await loadBooks();
    } catch (error) {
        console.error("Error deleting book:", error);
        alert("Could not delete book.");
    }
}

const updateBookForm = document.getElementById("updateBookForm");

updateBookForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("editBookId").value;

    const bookData = {
        bookName: document.getElementById("editBookName").value.trim(),
        author: document.getElementById("editAuthor").value.trim(),
        quantity: Number(document.getElementById("editQuantity").value)
    };

    await updateBook(id, bookData);

    document.getElementById("editBookForm").style.display = "none";
});

document.getElementById("cancelEdit").addEventListener("click", function () {
    document.getElementById("editBookForm").style.display = "none";
});

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const showAllButton = document.getElementById("showAllButton");

// Search books by name or author
searchButton.addEventListener("click", function () {
    const searchText = searchInput.value.trim().toLowerCase();
    const rows = bookList.querySelectorAll("tr");

    
let found = false;

rows.forEach(function (row) {
    const bookName = row.cells[0].textContent.toLowerCase();
    const author = row.cells[1].textContent.toLowerCase();

    if (
        bookName.includes(searchText) ||
        author.includes(searchText)
    ) {
        row.style.display = "";
        found = true;
    } else {
        row.style.display = "none";
    }
});

if (!found) {
    alert("No books found!");
}

});

// Show all books again
showAllButton.addEventListener("click", function () {
    searchInput.value = "";

    const rows = bookList.querySelectorAll("tr");

    rows.forEach(function (row) {
        row.style.display = "";
    });
});

const clearSearchButton = document.getElementById("clearSearchButton");

clearSearchButton.addEventListener("click", function () {
    searchInput.value = "";

    const rows = bookList.querySelectorAll("tr");

    rows.forEach(function (row) {
        row.style.display = "";
    });
});
