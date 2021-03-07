# Introduction

Our .NET SDK is called [Core](https://github.com/specklesystems/speckle-sharp/tree/master/Core), and it's part of our [SpeckleSharp repo](https://github.com/specklesystems/speckle-sharp).

Core is written in .NET Standard 2.0, it's been tested on Windows and MacOS and it's being used by all our .NET based connectors.

## Getting started

Before integrating Core in your next project, [please make sure it's supported by your framework](https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support).

We haven't yet released a NuGet package for Core 2.0, until then you can use it by building it yourself and referencing it directly.

## How to use

We'll soon be adding here plenty of examples on how to use Core, in the meantime the best way to explore its functionalities is to check out the unit and integration tests in the repo.

Here's a quick summary of the main tasks Core helps you with:

- sending and receiving data to and from multiple transports
- serialization and deserialization
- speckle kit management (the interoperability core)

Server specific tasks:
- stream, branch and commit api calls
- update notifications (subscriptions)
- local account management