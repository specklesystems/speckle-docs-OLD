# Introduction

Hey devs! Welcome to the **Speckle Dev Docs** - a single source of documentation on everything Speckle!
If you're looking for info on how to _use_ Speckle, check our [user guide](/).

> Speckle is the open source data platform for architecture, engineering, and construction. It liberates your data from proprietary file formats and closed source software and puts it back into your hands.

This part of our docs is for any developer planning to extend, integrate or improve Speckle. We'll walk you through the main concepts behind our tech and guide you through fun tasks as [writing your own connector](/dev/connectors-dev) or [writing custom Speckle apps](/dev/apps-dev).

We hope to see the great things you'll do with our SDKs and APIs, let's go!

## Speckle, the platform

Our platfrom is made of many moving parts, the code for anything Speckle 2.0 onwards is hosted in our [GitHub specklesystems organization](https://github.com/specklesystems).
Here's a quick summary of the main repos you'll find there, please make sure to give them a star ⭐️ if you like what you see!

[Speckle Server](https://github.com/specklesystems/speckle-server) contains all the web-based applications including the server backend, the frontend webapp, and the 3D viewer.

<!-- made with https://tree.nathanfriend.io/ -->

```
└── speckle-server
    ├── server
    ├── frontend
    └── viewer
```

<!-- ![diagram of the speckle-web repo structure](https://user-images.githubusercontent.com/7717434/107392209-5a534000-6af1-11eb-865d-9ead30d9b3ed.png) -->

[Speckle Sharp](https://github.com/specklesystems/speckle-sharp) contains all the C# desktop components including the .NET SDK, the Connectors (Rhino, Revit, Grasshopper, & Dynamo...), and Objects (our default interoperability kit).

```
└── speckle-sharp
    ├── core
    ├── connector revit
    ├── connector rhino
    ├── connector dynamo
    ├── connector grasshopper
    ├── connector autocadcivil
    ├── desktopui
    └── objects
        ├── objects
        └── conerters
            ├── revit
            ├── rhinogh
            ├── dynamo
            └── autocadcivil
```

<!--
![diagram of the speckle-sharp repo structure](https://user-images.githubusercontent.com/7717434/107392452-99819100-6af1-11eb-901e-14c29858931a.png) -->

To put it simply, Speckle Sharp is what you use to free your data from different models and desktop applications and Speckle Server is where you send all this data and interact with it in the browser.

[Speckle Py](https://github.com/specklesystems/speckle-py) is our Python SDK. Are you more of a pythonista than a .NET ninja? Have a play with it!

[Speckle Unity](https://github.com/specklesystems/speckle-unity) is our Unity Connector, it might make it inside Speckle Sharp in the future.

## Additional tools

Inside our GitHub organization you'll also find a few additional tools you might want to check out, for example the two below.

Ever struggle with janky behaviour in Grasshopper as things start getting complicated? You might really enjoy the [GrasshopperAsyncComponent](https://speckle.systems/blog/async-gh/).
Do any dev work in Revit and want a handy tool for viewing and running unit tests? [xUnitRevit](https://speckle.systems/blog/xunitrevit/) might be exactly what you've been looking for.
