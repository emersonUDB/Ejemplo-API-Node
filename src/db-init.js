const mysql = require('mysql2/promise');
const dbConfig = require('./config/db.config');

const SQL_CREATE_DATABASE = 'CREATE DATABASE IF NOT EXISTS libros CHARACTER SET utf8 COLLATE utf8_general_ci';
const SQL_CREATE_TABLE_CLIENTES = `CREATE TABLE clientes (idcliente int(10) unsigned NOT NULL auto_increment, nombre varchar(25) NOT NULL, apellido varchar(25) NOT NULL, direccion varchar(50) NOT NULL, ciudad varchar(25) NOT NULL, PRIMARY KEY  (idcliente)) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=23;`
const SQL_CREATE_TABLE_DETALLE_PEDIDO = `CREATE TABLE detallepedido (idorden int(10) unsigned NOT NULL, isbn char(18) NOT NULL, cantidad tinyint(3) unsigned default NULL, PRIMARY KEY  (idorden,isbn), KEY isbn (isbn)) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
const SQL_CREATE_TABLE_LIBROS = `CREATE TABLE libros (isbn char(18) NOT NULL, autor char(50) default NULL, titulo char(60) default NULL, precio float(4,2) default NULL, PRIMARY KEY  (isbn)) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
const SQL_CREATE_TABLE_ORDENES = `CREATE TABLE ordenes (idorden int(10) unsigned NOT NULL auto_increment, idcliente int(10) unsigned NOT NULL, costo float(6,2) default NULL, fecha date NOT NULL, PRIMARY KEY  (idorden), KEY idcliente (idcliente)) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;`
const SQL_CREATE_TABLE_RESUMEN_LIBRO = `CREATE TABLE resumenlibro (isbn char(18) NOT NULL, resumen text, PRIMARY KEY  (isbn)) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

const SQL_RESTORE_CLIENTES_DATA = `INSERT INTO clientes (idcliente, nombre, apellido, direccion, ciudad) VALUES (2, 'Hugo Adiel', 'Guerrero Peraza', 'Colonia La Cima 2', 'San Salvador') ,(3, 'Alvaro Alcides', 'Guandique', 'Colonia Chaparrastique', 'San Miguel') ,(4, 'Edgard Oswaldo', 'Rodas Grande', 'Colonia La Gloria', 'San Salvador') ,(5, 'Mauricio Otmar', 'Vásquez', 'San Jacinto', 'San Salvador') ,(7, 'Rigoberto Antonio', 'Leiva González', 'Urbanización Las Ceibas', 'San Salvador') ,(8, 'Carlos Mauricio', 'Bolaños Guerrero', 'Col. Santa Marta', 'San Salvador') ,(9, 'Ana Silvia', 'Durán Hernández', 'Col. Ciudad Victoria', 'San Jacinto') ,(10, 'Evelyn Lissette', 'Hernández Rivera', 'Col. Bosques del Río', 'Soyapango') ,(11, 'Delmy Jeannette', 'Fuentes', 'Col. Los Santos', 'Soyapango') ,(12, 'Julio Adalberto', 'Rivera', 'Col. Santa Marta', 'San Salvador') ,(13, 'Ricardo Ernesto', 'Elías Guandique', 'Reparto Morazán', 'Soyapango') ,(14, 'Salvador Ernesto', 'Cabrera Rodríguez', 'Col. Las Colinas', 'Santa Tecla') ,(15, 'Yesenia Xiomara', 'Martínez Oviedo', 'Residencial Los Conacastes', 'Soyapango') ,(16, 'Edgardo Alberto', 'Romero Masis', 'Col. Vista al Lago Pje. 3', 'Ilopango') ,(17, 'Blanca Iris', 'Cañas Abarca', '21ª calle poniente', 'San Salvador') ,(18, 'Claudia Verónica', 'Portillo Abrego', 'Col. San José', 'Soyapango') ,(19, 'Maura Verónica', 'Arévalo Mulato', 'Col. Las Magnolias', 'San Salvador') ,(20, 'Silvia Marina', 'Cisneros Murcia', 'Col. Vista Hermosa', 'San Salvador') ,(21, 'José Alexander', 'Aguirre Peña', 'Colonia La Pirámide', 'Ciudad Delgado') ,(22, 'Gloria Amar', 'Montoya', 'Colonia Jardines de Guadalupe', 'Nueva San Salvador');`
const SQL_RESTORE_DETALLE_PEDIDO_DATA = `INSERT INTO detallepedido (idorden, isbn, cantidad) VALUES (5, '978-84-205-3392-6', 2), (5, '978-84-415-1569-7', 2), (6, '978-84-205-3392-6', 2), (6, '978-84-415-2121-6', 5), (8, '978-84-481-3268-2', 1);`
const SQL_RESTORE_LIBROS_DATA = `INSERT INTO libros (isbn, autor, titulo, precio) VALUES ('978-607-7686-15-6', 'Ralph G. Schulz', 'Diseño web con CSS', 24.80) ,('978-84-111-9999-0', 'Fernando M. Guardado', 'Creación de páginas web con DHTML', 31.35) ,('978-84-205-3392-6', 'Paul McFedries', 'JavaScript Edición especial', 64.35)  ,('978-84-205-3477-0', 'Joseph Mayo', 'C# Al descubierto', 45.20)  ,('978-84-205-3618-2', 'Paul DuBois', 'Programación con MySQL', 99.99) ,('978-84-415-1569-7', 'Luke Welling', 'Desarrollo web con PHP y MySQL', 61.50)  ,('978-84-415-1770-7', 'Francisco Charte Ojeda', 'PHP 5', 62.30) ,('978-84-415-1845-2', 'John Coggeshall', 'La Biblia de PHP 5', 93.05) ,('978-84-415-2121-6', 'James Foxall', 'El libro de Visual C# 2005', 50.25) ,('978-84-415-2137-7', 'Andy Budd', 'CSS Manual avanzado', 52.45) ,('978-84-415-2200-8', 'Lee Babin', 'Introducción a AJAX con PHP', 36.70) ,('978-84-415-2217-6', 'Jason Cranford Teague', 'Programación CSS, DHTML y AJAX', 72.50) ,('978-84-415-2311--1', 'Ellie Quigley', 'PHP y MySQL Práctico para programadores y diseñadores web', 52.30) ,('978-84-415-2388-3', 'Danny Goodman', 'JavaScript y DHTML', 54.25) ,('978-84-415-2389-0', 'Michele E. Davis', 'PHP y MySQL', 37.60) ,('978-84-415-2514-6', 'Phil Ballard', 'Ajax, JavaScript y PHP', 49.25) ,('978-84-415-2578-8', 'Rod Stephens', 'Fundamentos de diseño de bases de datos', 48.90) ,('978-84-415-2595-3', 'Abraham Gutiérrez', 'PHP 5 a través de ejemplos', 35.15) ,('978-84-415-2689-1', 'Matt Doyle', 'Fundamentos PHP práctico', 65.00) ,('978-84-481-3172-2', 'Thomas Powell', 'HTML 4 Manual de referencia', 75.45) ,('978-84-481-3173-9', 'Herbert Schildt', 'Java 2 Manual de referencia', 73.40) ,('978-84-481-3268-2', 'Thomas Powell', 'JavaScript Manual de referencia', 72.75) ,('978-84-481-3931-5', 'P. S. Woods', 'Programación de Macromedia Flash MX', 45.25) ,('978-84-481-9814-5', 'F. Javier Gil Rubio', 'Creación de sitios web con PHP 5', 36.90) ,('978-84-832-2372-7', 'Tom Negrino', 'JavaScript & AJAX para diseño web', 27.50) ,('978-84-832-2414-4', 'José Rafael García', 'JAVA SE6 & Swing', 26.95) ,('978-97-015-1328-6', 'Maximilian Firtman', 'AJAX Web 2.0 para desarrolladores', 41.25) ,('978-97-017-0343-4', 'Menachen Bazian', 'Visual FoxPro 6', 44.25);`;
const SQL_RESTORE_ORDENES_DATA = `INSERT INTO ordenes (idorden, idcliente, costo, fecha) VALUES (1, 9, 72.50, '2007-12-16') ,(2, 4, 61.50, '2007-11-14') ,(3, 8, 31.30, '2007-10-07') ,(4, 12, 35.85, '2008-01-04') ,(5, 7, 22.50, '2008-04-11') ,(6, 2, 61.30, '2007-10-18') ,(7, 16, 75.45, '2007-10-16') ,(8, 14, 72.75, '2008-01-20') ,(9, 2, 75.45, '2008-01-14') ,(10, 5, 72.50, '2008-01-09') ,(11, 9, 45.20, '2007-11-28') ,(12, 9, 61.50, '2008-01-25') ,(13, 3, 72.75, '2007-12-27') ,(14, 10, 73.40, '2008-01-22') ,(15, 17, 29.75, '2007-10-30');`;

const SQL_ADD_DETALLE_PEDIDO_CONSTRAINT = `ALTER TABLE detallepedido ADD CONSTRAINT detallepedido_ibfk_3 FOREIGN KEY (idorden) REFERENCES ordenes (idorden) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT detallepedido_ibfk_4 FOREIGN KEY (isbn) REFERENCES libros (isbn) ON DELETE CASCADE ON UPDATE CASCADE;`;
const SQL_ADD_ORDENES_CONSTRAINT = `ALTER TABLE ordenes ADD CONSTRAINT ordenes_ibfk_1 FOREIGN KEY (idcliente) REFERENCES clientes (idcliente) ON DELETE CASCADE;`;
const SQL_ADD_RESUMEN_LIBRO_CONSTRAINT = `ALTER TABLE resumenlibro ADD CONSTRAINT resumenlibro_ibfk_1 FOREIGN KEY (isbn) REFERENCES libros (isbn) ON DELETE CASCADE ON UPDATE CASCADE;`;

async function restoreDatabase() {
    let connection, connectionDB;
    try {        
        connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            port: dbConfig.PORT,
        });
        
        await connection.query(SQL_CREATE_DATABASE);
        console.log('Se ha creado la base de datos "libros"');

        connectionDB = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB,
            port: dbConfig.PORT,
        });

        await connectionDB.query(SQL_CREATE_TABLE_CLIENTES);
        console.log('Se han creado la tabla "clientes"');

        await connectionDB.query(SQL_CREATE_TABLE_DETALLE_PEDIDO);
        console.log('Se han creado la tabla "detallepedido"');

        await connectionDB.query(SQL_CREATE_TABLE_LIBROS);
        console.log('Se han creado la tabla "libros"');

        await connectionDB.query(SQL_CREATE_TABLE_ORDENES);
        console.log('Se han creado la tabla "ordenes"');

        await connectionDB.query(SQL_CREATE_TABLE_RESUMEN_LIBRO);
        console.log('Se han creado la tabla "resumenlibro"');

        await connectionDB.query(SQL_RESTORE_CLIENTES_DATA);
        console.log('Se han restaurado los datos de la tabla "clientes"');

        await connectionDB.query(SQL_RESTORE_DETALLE_PEDIDO_DATA);
        console.log('Se han restaurado los datos de la tabla "detallepedido"');

        await connectionDB.query(SQL_RESTORE_LIBROS_DATA);
        console.log('Se han restaurado los datos de la tabla "libros"');
        
        await connectionDB.query(SQL_RESTORE_ORDENES_DATA);
        console.log('Se han restaurado los datos de la tabla "ordenes"');
        
        await connectionDB.query(SQL_ADD_DETALLE_PEDIDO_CONSTRAINT);
        console.log('Se han restaurado filtros para la tabla "detallepedido"');
        
        await connectionDB.query(SQL_ADD_ORDENES_CONSTRAINT);
        console.log('Se han restaurado filtros para la tabla "ordenes"');
        
        await connectionDB.query(SQL_ADD_RESUMEN_LIBRO_CONSTRAINT);
        console.log('Se han restaurado filtros para la tabla "resumenlibro"');

        console.log('Restauración de la base de datos completada exitosamente');
    } catch (error) {
        console.error('Error durante la restauración de la base de datos:', error);    
    } finally {
        if (connection) {
            connection.end(); // Close the connection
        }
        if (connectionDB) {
            connectionDB.end(); // Close the connection
        }
    }
}

restoreDatabase();