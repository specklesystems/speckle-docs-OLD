# Introduction

[![Twitter Follow](https://img.shields.io/twitter/follow/SpeckleSystems?style=social)](https://twitter.com/SpeckleSystems) [![Discourse users](https://img.shields.io/discourse/users?server=https%3A%2F%2Fdiscourse.speckle.works&style=flat-square)](https://discourse.speckle.works) [![website](https://img.shields.io/badge/www-speckle.systems-royalblue?style=flat-square)](https://speckle.systems)

**Status**

[![.NET Core](https://circleci.com/gh/specklesystems/speckle-sharp.svg?style=svg)](https://circleci.com/gh/specklesystems/speckle-sharp)


[Speckle Sharp](https://github.com/specklesystems/speckle-sharp) is the home of the Speckle 2.0 .NET SDK, Connectors, and Interoperability Kit.

Specifically, the repo holds:

## Core, the .NET SDK.

[Core](Core) is the canconical .NET SDK for Speckle. It supports multiple [data transports](https://discourse.speckle.works/t/core-2-0-transports/919), and advanced [decomposition API](https://discourse.speckle.works/t/core-2-0-decomposition-api/911) for design data, and offers a [dynamic base](https://discourse.speckle.works/t/core-2-0-the-base-object/782) for object definition.

## Objects, the default Kit

The Objects Kit is our default interoperability [kit](kits). Read more about kits and their role in the Speckle ecosystem [here](https://discourse.speckle.works/t/introducing-kits-2-0/710).

## Connectors

The [Connectors](connectors) are plugins that embed with an application and provide the interface between its API and Speckle. Currently we have:

- [Grasshopper](grasshopper)
- [Dynamo](dynamo)
- [Revit](revit)
- [Rhino](rhino)

## DesktopUI

The DesktopUI project contains the reusable ui for all non-visual programming connectors. If you're embarking on developing a new connector, we recommend starting from here.


