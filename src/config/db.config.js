require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

let dbConfig;

if (process.env.NODE_ENV == 'production') {
    dbConfig = {
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DB: process.env.DB_NAME,
        PORT: process.env.DB_PORT,
    };
} else {
    dbConfig = {
        HOST: process.env.DB_HOST || "localhost",
        USER: process.env.DB_USER || "root",
        PASSWORD: process.env.DB_PASSWORD || "",
        DB: process.env.DB_NAME || "libros",
        PORT: process.env.DB_PORT || 3306,
    };
}

module.exports = dbConfig;