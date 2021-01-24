# Rhino

The Speckle Rhino Connector is currently released as ⚠ **ALPHA** ⚠, please use at your own risk!

## Getting Started 🏁

We encourage everyone interested to debug / hack /contribute / give feedback to this project.

### Requirements

- Rhino 6 or above (we're currently testing with 6.30)
- A Speckle Server running (more on this below)
- Speckle Manager (more on this below)

## Local Setup 

Following instructions on how to get started debugging and contributing to this connector.

### Server

In order to test Speckle in all its glory you'll need a server running, you can run a local one by simply following the [Server instructions](/dev/speckle-server).

If you're facing any errors make sure Postgress and Redis are up and running.

### Accounts

The connector itself doesn't have features to manage your Speckle accounts, this functionality has been delegated to the Speckle Manager desktop app.

You can install an alpha version of it from: [https://speckle-releases.ams3.digitaloceanspaces.com/manager/SpeckleManager%20Setup.exe](https://speckle-releases.ams3.digitaloceanspaces.com/manager/SpeckleManager%20Setup.exe)

After installing it, you can use it to add/create an account on the Server.

## Debugging

After setting up dependencies, server and accounts you're good to go - almost there! After the first build, make sure to:

- Open the bin folder (e.g., `C:\Users\Admin\Code\sharp\ConnectorRhino\bin\Debug`),
- Drag and drop the `ConnectorRhino.rhp` inside an already running instance of Rhino,
- Open the Speckle plugin by typing `Speckle` in the Rhino command line.

You can now close Rhino, and start a Visual Studio's debug session. This will launch Rhino for you, and the Speckle plugin should load!