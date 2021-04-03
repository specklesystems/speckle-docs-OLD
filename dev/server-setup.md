# Deploying a local Server

There are two main ways of running a local Speckle server:
- in docker containers, to easily get the server running without setting up a local development environment
- with local development tools, useful for development and debugging


## Dependencies

The Speckle server needs two services available over the network:
- PostgreSQL (tested with v12 and v13)
- Redis

To get these dependencies up and running locally, the git repo contains 
[a docker-compose file](https://github.com/specklesystems/speckle-server/blob/main/docker-compose-deps.yml)
for running these dependencies locally in docker containers.

::: tip
There are additional ways to set up these dependencies, but they are more advanced and are not included in this guide.
:::

To proceed with the `docker-compose` file, you can simply run:
```bash
docker-compose -f docker-compose-deps.yml up -d
```

This will run the following containers, and will automatically launch them at system startup:
- **PostgreSQL v13**, listening only on `127.0.0.1:5432` with default credentials `speckle`:`speckle` and a database named `speckle`.
- **Redis v6**, listening only on `127.0.0.1:6379`
- **PGAdmin4**, listening only on `127.0.0.1:16543` with default credentials `admin@localhost` : `admin`
- **Redis Insight**, listening only on `127.0.0.1:8001`

All of the above containers listen on the local loopback interface (`127.0.0.1`) and are NOT accessible from the local network (for security, since they use default credentials)

To use PGAdmin, after login you can configure a server connection to the host `postgres` (user `speckle`, password `speckle`, database `speckle`)

To use Redis Insight, you can configure it to connect to the hostname `redis` (port `6379`)

Docker-compose creates named docker volumes for storing data for each of the containers, so data is persisted.
You can view existing docker volumes with `docker volume ls` and delete a volume and existing data with `docker volume rm [volume_name]` 

## Method 1: Run in docker containers

::: tip IMPORTANT
This setup is not recommended for use in production, if you need help deploying a production server, [we can help](https://speckle.systems/getstarted/)!
:::

This is the recommended method for getting the Speckle server to run locally without needing development tools installed.

The git repository contains [a docker-compose file](https://github.com/specklesystems/speckle-server/blob/main/docker-compose-speckle.yml) for running the Speckle server frontend and backend in docker containers.

```bash
docker-compose -f docker-compose-speckle.yml up -d
```
(You can safely ignore the warnings about the *orphan containers*)

This will run the following containers, and will automatically launch them at system startup:
- **speckle-frontend**, an nginx container that serves the Vue app build as static files (does not listen to any port on the host)
- **speckle-server**, the `server` component that listens on `http://localhost:3000/` and is configured to proxy the frontend requests to the `speckle-frontend` container

If you want the speckle server to be accessed from the network, you should modify the docker compose file with the following:
- `CANONICAL_URL`: network url to access the server
- in the `ports` section, replace `"127.0.0.1:3000:3000"` with `"0.0.0.0:3000:3000"`


## Method 2: Run locally

::: tip IMPORTANT
This setup is not recommended for use in production, if you need help deploying a production server, [we can help](https://speckle.systems/getstarted/)!
:::

This is the recommended method for developing or debugging the Speckle Server. You'll need to have Node.js installed.

To run the Speckle Server, you need to run:
- the `frontend` package (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/frontend))
- the `server` package (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/server))

Detailed instructions for running them locally are kept up to date in their respective readme.md files.

::: tip IMPORTANT
Don't forget to set up the variables in the `.env` file according to your deployment. You can get started by copying the `.env-example` file to `.env` and then edit it.
:::

In this deployment type, the frontend Vue app will listen by default on all interfaces (available over the network) on `port 8080`, but will have no knowledge about the `server` component, and thus **should not be accessed directly**.

The server component will listen on all interfaces (available over the network) on `port 3000`, and will proxy the frontend requests to the frontend component (as configured in .env file).

You can access Speckle Web from your browser at [http://localhost:3000/](http://localhost:3000/).

**If you plan to access the server over the network**, you should update the `CANONICAL_URL` variable in the .env file to the URL that is used to access the server.


