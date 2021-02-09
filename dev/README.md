# Getting Started
Welcome to the developer docs! We hope to see the great things you'll do with our SDKs and APIs. This section will walk you through everything you need to do to get started with Speckle. You'll learn how to start up a local Speckle Server, add an account to the Speckle Manager, install some desktop connectors, and start sending data to your server. We'll also discuss how you can get started building stuff on top of Speckle. Let's go!

P.S. Please make sure to read out [contribution guidelines](contributing) if you're planning on submitting feature requests or fixing bugs.

## What is Speckle?
Speckle is the Open Source Data Platform for AEC. Speckle allows you to say goodbye to files: we give you object-level control of what you share, infinite versioning history & changelogs. Read more on [our website](https://speckle.systems).

Speckle consists of two main components: [Speckle Web](/dev/web) and [Speckle Sharp](/dev/speckle-sharp). Speckle Web contains all the web-based applications including the server backend, the frontend webapp, and the 3D viewer. 

![diagram of the speckle-web repo structure](https://user-images.githubusercontent.com/7717434/107392209-5a534000-6af1-11eb-865d-9ead30d9b3ed.png)

Speckle Sharp contains all the C# desktop components including the .NET SDK, the Connectors (Rhino, Revit, Grasshopper, & Dynamo), and Objects (our default interoperability kit).

![diagram of the speckle-sharp repo structure](https://user-images.githubusercontent.com/7717434/107392452-99819100-6af1-11eb-901e-14c29858931a.png)

To put it simply,  Speckle Sharp is what you use to free your data from different models and desktop applications and Speckle Server is where you send all this data and interact with it in the browser. Before you dive in with this, you'll need to download [Speckle Manager](https://speckle-releases.ams3.digitaloceanspaces.com/manager/SpeckleManager%20Setup.exe) - the tool for managing your Speckle accounts and installing different Desktop connectors.

We also have a couple additional tools you might want to check out. Are you more of a pythonista than a .NET ninja? Have a play with [Speckle Py](/dev/speckle-py) - our Python SDK. Ever struggle with janky behaviour in Grasshopper as things start getting complicated? You might really enjoy the [GrasshopperAsyncComponent](https://speckle.systems/blog/async-gh/). Do any dev work in Revit and want a handy tool for viewing and running unit tests? [xUnitRevit](https://speckle.systems/blog/xunitrevit/) might be exactly what you've been looking for.


## GitHub repos
The code for anything Speckle 2.0 onwards is hosted in our [GitHub specklesystems organization](https://github.com/specklesystems).
Please make sure to give our repos a star ⭐️ if you like what you see!

Explore our repo-specific documentation from the sidebar.
