// const express = require("express");
// const { request } = require("http");
// const {open} = require(sqlite);
// const sqlite3 = require(sqlite3);
// const path = require("path")
// const app = express();
// app.use(express.json()); //post method
// const db_path = path.join(__dirname, goodreads.db)
// db = null;

// const initilizwDBAndServer = async () => {
//     try {
//         db  = await open({
//             filename: db_path,
//             driver: sqlite3.Database
//         });
//         app.listen(3000, () =>{
//             console.log("Server is running on port 3000");
//         })
//     } catch (error) {
//         console.log("DB Error ${error.message}")
//         process.exit(1);
//     }
// }

// //REQUEST HANDLING   //Get BOOK API
// app.get("/books/:boodid/", async () => (request, response)=>{
//     const {bookid} = request.params; //book id will store in bookid
//     // const book = books.find((book) => book.id === bookid); //it is also one of method to find book
//     const getBookQuary = 'SELECT * FROM book WHERE book_id = ${bookid};';
//     const book = await db.get(getBookQuary);
//     response.send(book);
// })
// // //ADD BOOK METHOD or  Post method
// // app.post("/books/", async (request, response) () => {
// //     const bookDetails = request.body;
// //     const {
// //         title,
// //         author,
// //         publication_year,
// //         book_id
// //         } = bookDetails;
// //         const addBookQuery = `INSERT INTO book (title, author, publication_year, book_id) VALUES (${title}, ${author}, ${publication_year}, ${book_id})`
// //     ;};
// //     const dbresponse = await db.run(addBookQuery);
// //     const bookId = dbresponse.lastID;
// //     response.send({bookId:bookId});
// // });
// app.post("/books/", async (request, response) => {
//     const bookDetails = request.body;
//     const {
//       title,
//       authorId,
//       rating,
//       ratingCount,
//       reviewCount,
//       description,
//       pages,
//       dateOfPublication,
//       editionLanguage,
//       price,
//       onlineStores,
//     } = bookDetails;
//     const addBookQuery = `
//       INSERT INTO
//         book (title,author_id,rating,rating_count,review_count,description,pages,date_of_publication,edition_language,price,online_stores)
//       VALUES
//         (
//           '${title}',
//            ${authorId},
//            ${rating},
//            ${ratingCount},
//            ${reviewCount},
//           '${description}',
//            ${pages},
//           '${dateOfPublication}',
//           '${editionLanguage}',
//            ${price},
//           '${onlineStores}'
//         );`;
  
//     const dbResponse = await db.run(addBookQuery);
//     const bookId = dbResponse.lastID;
//     response.send({ bookId: bookId });
//   });

// //UPDATE BOOK IN API
// app.put("/books/:bookId/", async (request, response) => {
//     const { bookId } = request.params;
//     const bookDetails = request.body;
//     const {
//       title,
//       authorId,
//       rating,
//       ratingCount,
//       reviewCount,
//       description,
//       pages,
//       dateOfPublication,
//       editionLanguage,
//       price,
//       onlineStores,
//     } = bookDetails;
//     const updateBookQuery = `
//       UPDATE
//         book
//       SET
//         title='${title}',
//         author_id=${authorId},
//         rating=${rating},
//         rating_count=${ratingCount},
//         review_count=${reviewCount},
//         description='${description}',
//         pages=${pages},
//         date_of_publication='${dateOfPublication}',
//         edition_language='${editionLanguage}',
//         price=${price},
//         online_stores='${onlineStores}'
//       WHERE
//         book_id = ${bookId};`;
//     await db.run(updateBookQuery);
//     response.send("Book Updated Successfully");
//   });


  
//   //DELETE BOOK API
//   app.delete("/books/:bookId/", async (request, response) => {
//     const { bookId } = request.params;
//     const deleteBookQuery = `
//       DELETE FROM
//         book
//       WHERE
//         book_id = ${bookId};`;
//     await db.run(deleteBookQuery);
//     response.send("Book Deleted Successfully");
//   });
// initilizwDBAndServer()




const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'your_host',
    user: 'your_username',
    password: 'your_password',
    database: 'students_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// API routes
app.get('/students', (req, res) => {
    // Retrieve all students
    db.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/students/:id', (req, res) => {
    // Retrieve a specific student
    const studentId = req.params.id;
    db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.post('/students', (req, res) => {
    // Create a new student
    const studentData = req.body;
    db.query('INSERT INTO students SET ?', studentData, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student created successfully' });
    });
});

app.put('/students/:id', (req, res) => {
    // Update a student
    const studentId = req.params.id;
    const updatedData = req.body;
    db.query('UPDATE students SET ? WHERE id = ?', [updatedData, studentId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student updated successfully' });
    });
});

app.delete('/students/:id', (req, res) => {
    // Delete a student
    const studentId = req.params.id; 

    db.query('DELETE FROM students WHERE id = ?', [studentId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Student deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

















