const sql = require("./db.js");

// constructor
const Libro = function (libro) {
    this.isbn = libro.isbn;
    this.autor = libro.autor;
    this.titulo = libro.titulo;
    this.precio = libro.precio;
};

Libro.create = (newLibro, result) => {
    sql.query("INSERT INTO libros SET ?", newLibro, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { isbn: res.insertId, ...newLibro });
    });
};

Libro.findByISBN = (isbn, result) => {
    sql.query(`SELECT * FROM libros WHERE isbn = '${isbn}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // Libro no encontrado
        result({ kind: "not_found" }, null);
    });
};

Libro.getAll = (result) => {
    let query = "SELECT * FROM libros order by titulo asc";
    sql.query(query, function (err, results, fields) {
        if (err) {
            result(null, err);
            return;
        }        
        result(null, results);
    });
};

Libro.updateByISBN = (isbn, libro, result) => {
    sql.query(
        "UPDATE libros SET autor = ?, titulo = ?, precio = ? WHERE isbn = ?",
        [libro.autor, libro.titulo, libro.precio, isbn],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // No se encontro libro con isbn
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { isbn: isbn, ...libro });
        }
    );
};

Libro.remove = (isbn, result) => {
    sql.query("DELETE FROM libros WHERE isbn = ?", isbn, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // Libro no encontrado
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Libro;