# NestJS Architecture

## Run project:

Ensure you have the following tools installed in your PC:

- NodeJS (along with npm)
- NestJS
- Postgres

After clone run the following command to install all dependencies:

```sh
npm install
```

Create a .env file from the provided .env.example file.

```sh
cp .env.example .env
```

To run migrations, use the following command:

```sh
npm run migrations:run
```

To run the development environment, use the following command:

```sh
npm run start:dev
```

After starting the server, you can access the application at: http://localhost:PORT_FROM_ENV/swagger-ui/

## Run project with docker:

Create a .env file from the provided .env.example file.

```sh
cp .env.example .env
```

Build a Docker image for project using the Dockerfile located in the "docker" directory.

```sh
docker build . -f docker/Dockerfile
```

Run a Docker container using the image created in the previous step.

```sh
docker run --entrypoint /code/docker/entrypoint.sh -it IMAGE_ID_FROM_PREVIOUS_STEP /code/docker/start_node.sh
```

## Run project with docker compose:

Create a .env file from the provided .env.example file.

```sh
cp .env.example .env
```

Build Docker images for a multi-container application defined in a Docker Compose file.

```sh
docker compose up --build
```

Run Docker containers based on the images created in the previous step.

```sh
docker compose up
```
