# API RESTful de Libros

Esta es una API RESTful construida con Node.js, Express y MySQL para gestionar una base de datos de libros. Proporciona endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base de datos de libros.

## Requisitos

Para ejecutar este proyecto en tu máquina local, necesitarás tener instalado lo siguiente:

- Node.js
- MySQL

## Configuración del Proyecto

1. **Clonar el repositorio:**

```bash
git clone https://github.com/emerson-cartagena/SampleRestfullAPI
```



1. **Instalar las dependencias:**

```bash
cd SampleRestfullAPI
npm install
```


1. **Configurar la base de datos:**

- Crea una base de datos MySQL y un usuario con acceso a esa base de datos.
- Cree el archivo `.env`, copié el contenido del archivo `.env.example` a `.env` y modifica las variables de entorno con la información de tu base de datos.

4. **Inicializar la base de datos:**

```bash
npm run db:init
```

Este comando creará la tabla de libros y la poblara con algunos datos de ejemplo.

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm start
```

La API estará disponible en `http://localhost:3000`.

### Endpoints Disponibles

- `GET /api/libros`: Obtener todos los libros.
- `GET /api/libros/:isbn`: Obtener un libro por su isbn.
- `POST /api/libros`: Crear un nuevo libro.
- `PUT /api/libros/:isbn`: Actualizar un libro existente.
- `DELETE /api/libros/:isbn`: Eliminar un libro por su isbn.

- `GET /api/clientes`: Obtener todos los clientes.
- `GET /api/clientes/:id`: Obtener un cliente por su id.
- `POST /api/clientes`: Crear un nuevo cliente.
- `PUT /api/clientes/:id`: Actualizar un cliente existente.
- `DELETE /api/clientes/:id`: Eliminar un cliente por su id.
  
Consulta la documentación de la API para obtener más detalles sobre cómo utilizar cada endpoint.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o deseas mejorar este proyecto, siéntete libre de abrir un issue o enviar un pull request.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).