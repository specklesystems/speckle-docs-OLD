# Server

## Introduction

The Speckle Server is a node application tested against v12. To start it locally:

First, ensure you have postgres and redis ready and running:

- ensure you have a local instance of postgres running
- create a postgres db called `speckle2_dev`
- ensure you have an instance of redis running

Finally, in the `packages/server` folder: 

- copy the `.env-example` file to `.env`,
- open and edit the `.env` file, filling in the required variables,
- run `npm install`,
- finally `npm run dev`,
- check `localhost:3000/graphql` out!


## Developing

The server consists of several semi-related components, or modules. These can be found in `/modules`. The main points of interest here are:

- an `index.js` file that exposes two functions, `init` and `finalize` (mandatory)
- a `core` folder, which contains the GraphQL `resolvers` and `schemas` in the `graph` subfolder (optional - these will be picked up and merged).

## Server & Apps

### Frontend

- In **development** mode, the Speckle Server will proxy the frontend from `localhost:8080` to `localhost:3000`. If you don't see anything, ensure you've run `npm run dev` in the frontend package.

- In **production** mode, the Speckle Server will statically serve the frontend app from `../packages/frontend/dist`.

### GraphIQL

A GraphIQL app is available for authenticated api exploration at `localhost:3000/explorer`. Note that for the authentication flow to work, you need to have the frontend running first.

### GraphQL Playground

For non-authenticated api exploration, you can use the Graphql Playground which is available by default at `localhost:3000/graphql`.

## Testing

To run all tests, simply run `npm run test`. To run specific tests, use the `mocha --grep @subset` syntax. For example:

- `mocha --grep @auth --watch` to run tests pertaning to the auth module only in watch mode.
- `mocha --grep @core-streams --watch` to run tests pertaining to stream related services.

Getting tests running for the GraphQL subscriptions was a bit of a journey! If you'd like to learn more about how we did it, check out the [blog post](https://speckle.systems/blog/testing-gql-subs).