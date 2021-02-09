# Frontend

## Notes

- In **development** mode, the Speckle Server will proxy the frontend from `localhost:8080` to `localhost:3000`. If you don't see anything, ensure you've run `npm run dev` in the frontend package.

- In **production** mode, the Speckle Server will statically serve the frontend app from `/dist`. You will need to run `npm run build` to populate this folder.

## Project setup

The frontend now includes the viewer. Until we get to publish it as a separate module, there's a few extra steps:

First, make sure you build the [Speckle Viewer](../viewer). Afterwards, run

```
lerna bootstrap
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
