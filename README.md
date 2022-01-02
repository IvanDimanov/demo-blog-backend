# Demo Blog BackEnd framework
This project is made as a template for scalable and flexible API endpoints serving complex data structures.

## [Live Demo](https://demo-blog-backend.herokuapp.com/swagger)
## [![App](https://raw.githubusercontent.com/IvanDimanov/demo-blog-backend/main/image.png)](https://demo-blog-backend.herokuapp.com/swagger)

<br />

## Tech stack
- fastify: [https://www.fastify.io](https://www.fastify.io)
- mongoose: [https://mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)
- Swagger: [https://github.com/fastify/fastify-swagger](https://github.com/fastify/fastify-swagger)
- TypeScript: [https://www.typescriptlang.org](https://www.typescriptlang.org)

<br />

## Run locally
App can be run locally using docker compose and [this repo](https://github.com/IvanDimanov/demo-blog-local-env).<br />
Executing the script below will start the app on your local machine using locally installed DB:
```
git clone git@github.com:IvanDimanov/demo-blog-backend.git
cd ./demo-blog-backend
npm ci
cp .env.example .env
npm start
```

Open [http://localhost:8000/swagger](http://localhost:8000/swagger)

<br />

## Database
Database schema can be found [here](https://lucid.app/lucidchart/fcaf2f01-eb38-42ad-b58d-9dd257fc1f84/view).<br />
DB Migrations are made with [this repo](https://github.com/IvanDimanov/demo-blog-db-migrations).
