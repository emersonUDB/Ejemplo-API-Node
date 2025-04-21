const LibroModel = require("../models/libro.model");

// Crear y guardar un nuevo libro
exports.create = (req, res) => {
    // Se valida la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede ser vacío!",
        });
    }

    // Crear un libro
    const libro = new LibroModel({
        isbn: req.body.isbn,
        autor: req.body.autor,
        titulo: req.body.titulo,
        precio: req.body.precio,
    });

    // Guarda el libro en la base de datos
    LibroModel.create(libro, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error mietras se intentaba crear el Libro.",
            });
        else res.send(data);
    });
};

// Obtiene todos los libros de la base de datos
exports.findAll = (req, res) => {
    LibroModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error mientras se intentaba obtener los libros.",
            });
        else res.send(data);
    });
};

// Busca un solo libro con un isbn
exports.findOne = (req, res) => {    
    LibroModel.findByISBN(req.params.isbn, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontro libro con isbn ${req.params.isbn}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error al obtener el libro con isbn " + req.params.isbn,
                });
            }
        } else res.send(data);
    });
};

// Actualiza un libro identificado por el isbn en la solicitud
exports.update = (req, res) => {
    // Se valida la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede ser vacío!",
        });
    }

    LibroModel.updateByISBN(req.params.isbn, new LibroModel(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró libro con isbn ${req.params.isbn}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error mientras se actualizaba libro con isbn" + req.params.isbn,
                });
            }
        } else res.send(data);
    });
};

// Se elimina un libro con el isbn especificado en la solicitud
exports.delete = (req, res) => {
    LibroModel.remove(req.params.isbn, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró libro con isbn ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar libro con isbn " + req.params.id,
                });
            }
        } else res.send({ message: `El libro fué eliminado exitosamente!` });
    });
};