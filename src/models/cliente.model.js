const sql = require("./db.js");

// constructor
const Cliente = function (cliente) {
    this.idcliente = cliente.idcliente;
    this.nombre = cliente.nombre;
    this.apellido = cliente.apellido;
    this.direccion = cliente.direccion;
    this.ciudad = cliente.ciudad;
};

Cliente.getAll = (result) => {
    let query = "SELECT * FROM clientes";
    sql.query(query, function (err, results, fields) {
        if (err) {
            result(null, err);
            return;
        }        
        result(null, results);
    });
};

Cliente.findById = (id, result) => {
    sql.query(`SELECT * FROM clientes WHERE idcliente = '${id}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // Cliente no encontrado
        result({ kind: "not_found" }, null);
    });
};

Cliente.create = (newCliente, result) => {
    sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        newCliente.idcliente = res.insertId;
        result(null, { ...newCliente });
    });
};

Cliente.updateById = (id, cliente, result) => {
    sql.query(
        "UPDATE clientes SET nombre = ?, apellido = ?, direccion = ?, ciudad = ? WHERE idcliente = ?",
        [cliente.nombre, cliente.apellido, cliente.direccion, cliente.ciudad, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // No se encontro cliente con id
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { idcliente: id, ...cliente });
        }
    );
};

Cliente.remove = (id, result) => {
    sql.query("DELETE FROM clientes WHERE idcliente = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // cliente no encontrado
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Cliente;