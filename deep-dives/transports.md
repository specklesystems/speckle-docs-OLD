# Transports

This post was originally part of the Making Speckle 2.0 series of posts on the community forum. Check it out on the forum [here](https://discourse.speckle.works/t/core-2-0-transports/919?u=izzylys)!

## Preamble

Transports are the last important concept of the 2.0 SDK that needs to be introduced. As a quick reminder, previously we've covered:
- [Object Models & Kits](/deep-dives/kits), which is Speckle's take on interoperability,
- [The Base Object](/deep-dives/base), which controls how data is represented, and allows for both dynamic and strongly typed properties, and
- [The Decomposition API](/deep-dives/decomposition), which controls how data is structured, and resolves the tree vs. blob dichotomy.

Next up is how Speckle transports design data to and from a storage layer - a Speckle Server, a local database, or even a drive.

## Introduction

One of the most common use-cases we've encountered throughout the past 5 years of interacting with developers from the AEC space is "writing data to a database", and, obviously, getting it back out again. These databases vary - sometimes they're text files on a network drive, sometimes they're Azure SQL provisions, sometimes it's MongoDB, sometimes it's an Excel file, sometimes it's [core rope memory](https://en.wikipedia.org/wiki/Core_rope_memory) (joking, I've never seen that one - yet!). 

An important part of our mission at Speckle is to empower developers across AEC. We want to give you a leg up so you can "automate all the things" and build powerful applications that leverage modern tech. 

**By introducing the concept of **Transports** in Speckle 2.0, we're giving developers in the AEC space full control over where and how this data is stored.** By contrast, in 1.0, you could only write to one place, a given Speckle Server (also to a local cache, if pedantic). 

In 2.0, **Transports allow Speckle to switch, choose and mix various storage layers**. This allows us to write better, more memory efficient and predictable connectors. It also allows you, as a developer, to use Speckle as a springboard in your development work in a much more flexible way. 

## Definitions

Before we dive in and see how they work, let's get some definitions out of the way: 

### Transports

In Speckle 2.0, transports take Speckle Objects from memory and persist it to a specific storage layer. Of course, they're also responsible for taking those objects out of the storage layer and back into memory. 

### Storage Layers

The storage layer that a transport writes to can be, ultimately, anything you want it to be. The Core 2.0 SDK will implement a couple of them, specifically: 

- an SQLite Transport
- an In-Memory Transport
- a Speckle Server 2.0 Transport
- a Disk Transport

Other possible targets for transports can be MongoDB databases, S3 storage, a network drive, etc. You can also write a transport that writes to more than one place, but we advise against it - the 2.0 .NET API provides a better way to achieve the same thing.

Moreover, in the case of disk based transports (ie, disk, sqlite, etc.) you can also **control the location** of where this data is stored. 

## Sending Data: Serialisation and Writing

Serialisation is a potentially quite wasteful operation depending on the size of the data. One of our goals in 2.0 is to be able to support arbitrarily large models without adding too much overhead. 

[details="Extra Boring Details"]
Why can serialisation be wasteful, especially in terms of memory usage? Imagine you have a model with 100k building objects (geometry & data) open in an application. To send that model to Speckle, we would need to (1) convert those objects into Speckle objects, using a given converter, then (2) serialise them to whatever format we'd be ingesting down the line (e.g., a JSON string), and, finally, (3) transport them to Speckle. Over the course of these steps, your computer's memory holds ***three*** representations of the same object - Native, Speckle, and String. Not that cool! 

To reduce memory overhead, Speckle now integrates serialisation with writing objects to one or more persistence layers via transports. Whenever an object finishes serialisation, it's sent to a transport for storage, and ultimately, its string representation gets "garbage collected". Just like this, we've knocked off some memory usage.
[/details]

The 2.0 API exposes two lower level methods for sending (serialising and writing) and receiving (reading and deserialising) data. In this section, we'll look at only at the send one - the section below will provide more detail on receiving data. 

First off, let's start with the simplest, default, use case: 

```csharp
// First, let's create a simple base object to store our building data in. 
var myData = new Base(); 
myData["@columns"] = new List<Columns>() { ... the columns }; 
myData["@rooms"] = new List<Rooms>() { ... the rooms}; 

// Let's now send the data:
var myDataId = await Operations.Send( myData ); 
```

Looks quite simple! In this scenario, the `Send` method serialised and saved the `myData` object, together with all its detachable `columns` and `rooms` to the default Speckle local transport (an SQLite db stored in `~/AppData/Speckle`), and returned the id (hash) of the `myData` object, which you can use to receive it back again. 

Let's look at a more advanced example:

```csharp
var myRevisionId = await Operations.Send(
	myData,
	transports: new ITransport[] {
	  new ServerTransport( args ), // imagine this one server...
	  new ServerTransport( args ), // ... and this is a different one! you're basically pushing to multiple remotes!
	  new MyCustomTransport( args ) // ... and, why not another transport? 
  }
); 
```

What's happening here is that we're passing in multiple transports to the Send method. Speckle will persist the given object, with all its detachable sub-children, to all these transports, and, when done, return the object's id (hash!). 

## Receiving Data: Reading and Deserialisation

Again, let's start with the simplest use-case possible:

```csharp
// To set the stage, in the previous code sample, we've done:
var myDataId = await Operations.Send( myData ); 

// Now, we want to get it back out. It's as simple as:
var myData = await Operations.Receive( myDataId ); 
```

This just retrieves the object back using the default SQLite Transport. No accounts, no extra HTTP requests, no hassle. Of course, this is enough only for "local" operations that are bound to a single computer only. 

If you want this to work across a local network, you can always create a SQLite Transport (or your own custom transport for that matter) that stores data on a network accessible drive. For large collaborative environments, you can, of course, receive your data from a Speckle Server. 

While you can Send data to multiple places at the same time, you can't really receive data from more places at the same time. Hence, `Receive` can only accept one transport as the source:

```csharp
var myData = await Operations.Receive(
	myDataId, 
	remoteTransport: new ServerTransport( ... ) // where you want to receive things from! 	
); 
```

Done! `myData` is now your data - a nicely deserialised Base object. 

## Advanced Transports

The Send and Receive functions in the examples above assume **a shared global cache** located in `~/User/.config/Speckle`. In the case of Send, this means that objects will be written to a SQLite Transport that is used by Speckle always; in the case of Receive, the same SQLite Transport will be used to buffer to/from the remote transport. 

Nevertheless, there are some use cases where you don't want to, or cannot, use the shared global cache. For example, you would want to go full on classic version control, and store your  history right next to your project's file: 

```
`-- MyProject_A            # root folder
    |-- .speckle           # the ".git" folder
    |   |-- references.db  # commits, branches, tags, etc. storage
    |   `-- objects.db     # object storage
    `-- MyProject_A.rvt    # source file  
```

How would you actually implement such a system? 

First, you can always customise the location of your transport. For example, in the case of the SQLite Transport, you can specify a folder where to actually create it. Let's assume we want to send our data to only two transports, a local SQLite one that's sitting in the `.speckle` folder just next to our Revit file, and a Speckle Server.

```csharp
var customLocalTransport = new SQLiteTransport( basePath: @"{localFolderPath}/.speckle" ); 
var serverTransport = new ServerTransport(...); 
```

The `Send` method can take an optional `useDefaultCache: false` argument to bypass the global cache, and send exclusively to the provided transports: 

```csharp
var myDataId = await Operations.Send( 
  myData, 
  transports: new ITransport[] { customLocalTransport, serverTransport }, 
  useDefaultCache: false // will bypass the global cache! 
); 
```

When receiving data, if you want to use your custom local transport, the method would look like this: 

```csharp
var myData = await Operations.Receive( 
  objectId: myDataId, 
  remoteTransport: serverTransport,
  localTransport: customLocalTransport // will use this one instead of the global cache!
); 
```

Another use case is in constrained environments, where you don't have a persistent storage layer handy, such as a serverless function, or docker container. That's where you would probably want to use a `MemoryTransport`  - it's obviously much faster and it doesn't need to touch the disk. 

## Summary

Transports give you, as a developer, a lot of flexibility in how you can use Speckle, so hopefully "automating all the things" will become a bit easier and nicer. They make it easy to customise your workflows and where and how you store data - from the Speckle Server, to one or more databases, local or remote. 

Our next steps are to wrap up some little TODOs and publish an alpha release, specifically geared towards developers (it won't contain any connectors!) with the 2.0 Core, Server and Kits. **In the meantime, we are really excited about what Transports bring to Speckle and we'd love to hear what you (@Speckle_Insider & wider public) think - what does this inspire you to do? How could this be better?**