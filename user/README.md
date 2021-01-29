# Getting Started

This section will walk you through everything you need to do to get started with Speckle. You'll learn how to start up a local Speckle Server, add an account to the Speckle Manager, install some desktop connectors, and start sending data to your server. Let's go!

## Introduction

Speckle consists of two main components: [Speckle Web](/dev/web) and [Speckle Sharp](/dev/speckle-sharp). Speckle Web contains all the web-based applications including the server backend, the frontend webapp, and the 3D viewer. Speckle Sharp contains all the C# desktop components including the .NET SDK, the Connectors (Rhino, Revit, Grasshopper, & Dynamo), and Objects (our default interoperability kit).

((MAYBE A DIAGRAM HERE))

To put it simply,  Speckle Sharp is what you use to free your data from different models and desktop applications and Speckle Server is where you send all this data and interact with it in the browser. Before you dive in with this, you'll need to download [[Speckle Manager]] - the tool for managing your Speckle accounts and installing different Desktop connectors.

We also have a couple additional tools you might want to check out. Are you more of a pythonista than a .NET ninja? Have a play with [Speckle Py](/dev/speckle-py) - our Python SDK. Ever struggle with janky behaviour in Grasshopper as things start getting complicated? You might really enjoy the [GrasshopperAsyncComponent](https://speckle.systems/blog/async-gh/). Do any dev work in Revit and want a handy tool for viewing and running unit tests? [xUnitRevit](https://speckle.systems/blog/xunitrevit/) might be exactly what you've been looking for.