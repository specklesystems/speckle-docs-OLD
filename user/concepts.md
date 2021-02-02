# Your Data

This section goes into the details on how your data is sent to and stored in Speckle. If you're new to Speckle or need a refresher on the concepts we've introduced in v2.0, this is a great place to start!

## The Base Object

### What is it?


### What does it contain?

### How do I use it?

## Streams

### What are they?

The main data structure in Speckle is the stream. A stream is simply a collection of objects with some helpful additional information to manage and retrieve them. Each stream is assigned a generated `streamId` which uniquely identifies the stream on a server. You can give a stream a name and description to help organise your streams. A stream also has a list of collaborators including an owner and additional reviewers and contributors which the owner has chosen to share the stream with.

### What do they contain?

A stream can contain anything from a handful of objects to a whole building model - it is entirely up to you! You are free to add as much or as little data to a single stream and create as many streams as you'd like. Some examples of what might be contained within a stream are 

- a layer in a GIS db
- a layer in a CAD application
- a set of calculation results
- a workset in Revit
- a selection of objects from Grasshopper
- a structural model

A stream also contains further options for managing your data by way of *branches* and *commits*. We will learn more about these in the following sections.

### Who can I share them with?

There are two stream-level visibility options: Public and Private.

- **Public**: Anyone with the link or `streamId` can view the stream
- **Private**: People need to be invited to the stream to access it

In addition to this, you can share the stream with specific people and assign them a specific role. There are three default roles:

- **Owner**: full dictatorial access including deletion rights and permissions control
- **Contributor**: can create new branches and commits (edit the stream's contents) but cannot edit stream details (name and description) or manage collaborators
- **Reviewer**: can only view (read) the data from a stream

### How do I use them?

Streams are the main mechanism by which data is shared between people and applications. For example, you could create a stream in Revit and send that data to your server. Then, any of your colleagues with access to that stream could view the data in the browser or receive the data in Grasshopper, Rhino, Revit, etc. If any of your colleagues have *collaborator* access, they are also free to make their own changes and send their changes to the stream. You can then receive those changes from the stream in your original model to see the changes reflected.

To see step-by-step guides on how to get from AEC Software A to AEC Software B, check out our [Interoperability Guides](/user/interoperability).

## Branches

### What are they?

Branches give you an extra layer of organisation within a stream. All streams start with a single default branch called `main`. If you would like to "branch" off from this `main` branch and work on multiple different versions of your data in parallel or if you want to segment separate parts of your data from each other, that is where branches come in. 

### How do I use them?

You can add as many additional branches to your streams as you would like. All the connectors give you the option of creating new branches and switching between them. 

Let's say you have a very large model you want to add to a single stream, but your collaborators from different disciplines don't want to receive the whole model every time. You could split the model up into different branches: `structural`, `mep`, `archi`. 

Perhaps you have a complex model that encompasses a site with multiple separate buildings. You could still contain the whole model in a single stream, but create a separate branch for each building: `building A`, `building B`, `building C`. 

Maybe you're working on a smaller scale and your stream focusses on a single facade. However, you would like to present a couple different options to the client. The stream could be split into `option A`, `option B`, and `option C` which you could then easily switch between to explore the different options in your next meeting.

## Commits

### What are they?

Commits are a bit like a "save" of the most current version of your data. They allow you to track the changes in your stream and easily see who changed what and when.

Each time you send data, you are creating a commit which contains all the objects in your stream along with additional information such as the time, date, and author of the commit. The author of a commit can optionally add a *commit message* which is a short description of what they've done and what has changed. Like a stream, each commit is assigned a generated `commitId` which can be used to identify and retrieve it. You can go back in time and look at the history of your stream through the series of commits.

### How do I use them?

If you have used a connector and you've sent data to a stream, you've already used them! Each time data is sent to a stream, a commit is created. To help you keep track of the changes in your stream, it is a good idea to add a commit message that succinctly describes what the commit contains. Some of the connectors pre-populate a default commit message for you, but you are still free to write your own to add more detail.

When receiving data in a connector, you have the option of either staying synced with the latest commit or receiving a specific commit based on the `commitId`. If you choose to stay on the latest commit, you'll see a notification when someone else has sent new data to the stream. When you see this, you'll be able to use the receive function to get the new commit and update your file.
