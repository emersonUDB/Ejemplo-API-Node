const ClienteModel = require("../models/cliente.model");

// Obtiene todos los libros de la base de datos
exports.findAll = (req, res) => {
    ClienteModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error mientras se intentaba obtener los clientes.",
            });
        else res.send(data);
    });
};

// Busca un cliente por su id
exports.findOne = (req, res) => {    
    ClienteModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontro cliente con id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error al obtener el cliente con id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// Crear y guardar un nuevo cliente
exports.create = (req, res) => {
    // Se valida la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede ser vacío!",
        });
    }

    // Crear un cliente
    const cliente = new ClienteModel({
        idcliente: 0,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
    });

    // Guarda el cliente en la base de datos
    ClienteModel.create(cliente, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error mietras se intentaba crear el cliente.",
            });
        else res.send(data);
    });
};

// Actualiza un ciente identificado por el id en la solicitud
exports.update = (req, res) => {
    // Se valida la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "Contenido no puede ser vacío!",
        });
    }

    ClienteModel.updateById(req.params.id, new ClienteModel(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró cliente con id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error mientras se actualizaba cliente con id" + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// Se elimina un cliente con el id especificado en la solicitud
exports.delete = (req, res) => {
    ClienteModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No se encontró cliente con id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar cliente con id " + req.params.id,
                });
            }
        } else res.send({ message: `El cliente fué eliminado exitosamente!` });
    });
};