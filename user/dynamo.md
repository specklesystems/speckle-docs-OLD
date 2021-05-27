---
typora-copy-images-to: ./img-dyn
---

# Dynamo

Speckle currently supports Dynamo versions from 2.1 to 2.8 for Autodesk Revit 2019, 2020 and 2021, as well versions of Dynamo Sandbox from 2.1 to 2.8 are supported.

## Getting Started

To install this connector and add your Speckle account proceed by following the instructions in [Speckle Manager](/user/manager).

![Dyn Connector components](./img-dyn/nodes-cat-all.png)

Once installed, the **Dynamo Connector** will appear under the `Speckle 2` and `Speckle 2 Dev Tools` tabs.

The `Speckle 2` tab contains the main nodes necessary to operate with Speckle, including send/receive nodes, streams and accounts.

The `Speckle 2 Dev Tools` tabs contain nodes for more advanced use-cases, as well as some handy tools for Speckle developers/hackers.

## Streams and URLs

In visual programming environments, Speckle Streams are now identified by their URLs (instead of their IDs).
Across our Dynamo and Grasshopper connectors you'll see URLs in 3 different formats:

- `https://speckle.xyz/streams/3073b96e86` points to the `main` branch on Stream `3073b96e86`
- `https://speckle.xyz/streams/3073b96e86/branches/dev` points to a branch named `dev` on Stream `3073b96e86`
- `https://speckle.xyz/streams/3073b96e86/commits/604bea8cc6` points to a specific commit `604bea8cc6` on Stream `3073b96e86`
- `https://speckle.xyz/streams/3073b96e86/objects/df7b8bafccefa791d82939dd36541189` points to a specific object `df7b8bafccefa791d82939dd36541189` on Stream `3073b96e86`

::: tip
Unsure about what _commits_ and _branches_ are? No worries, you don't need to know what they are to use Speckle! But if you're curios, you can read about them in [concepts](/user/concepts).
:::

We'll see how branch and commit URLs are used in the following sections.

## Sending Data

Let's look at how we would send some data in Dynamo. First, start by creating a new `Send` node.

![Send node](./img-dyn/nodes-send.png)

In order to select which stream to send data to, you just need to pass a stream URL to the `stream` port.

![image-20210322170153584](./img-dyn/image-20210322170153584.png)

Alternatively, you can also use one of the following nodes to create / retrieve existing streams:

- [create stream](user/dynamo.md#create-stream)
- [get stream](user/dynamo.md#get-stream)
- [list streams](user/dynamo.md#list-streams)

:::tip NOTE
You cannot send data to a specific commit. Commits represent your stream in a specific point in time and cannot be edited.
:::

### Adding objects

In order to select which objects to send in Dynamo, we just need to connect the desired node to the `data` input in the `Send` node. The sender will convert any supported Dynamo objects into a Speckle compatible format when necessary.

### Adding a commit message

It's good practice to add a "commit message" whenever you send you data, especially if working with others, this message should describe the changes being pushed.
You can add a commit message by passing some text to the `message` port.
The commit message will be visible in Speckle Web where you will also be allowed to edit it.

### Sending

The only thing left to do is to press the **Send button**.

![dyn-send](./img-dyn/dyn-send.gif)

To view the data you just sent from Dynamo online, you can use the `View Online` node. Just plug in the `stream`, `branch` or `commit` URL and click the button.

![View online](./img-dyn/nodes-view-online.png)

::: tip
The View Online node is especially useful as data cannot be easily copy/pasted from dynamo nodes
:::

### Viewing a Stream online

To view the sent stream online you can just right click on the sender node:

![image](https://user-images.githubusercontent.com/2679513/114192190-1b9d0300-9945-11eb-952a-8676a4854397.png)

### Sending to a specific branch

When using a stream URL, by default, the `main` branch is used to send and receive data.

To send to a specific branch, simply use the branch URL, ie: `https://speckle.xyz/streams/3073b96e86/branches/dev`.

## Receiving Data

Receiving data is very simple, you just need a `Receive` node, and a stream URL.

![dyn-receive](./img-dyn/dyn-receive.gif)

When new data is pushed to this stream a notification will appear on the receive node.

### Auto Receiving

By using the toggle on the node, you can enable/disable auto receiving. If enabled, new data pushed to this stream will be pulled automatically as it's available.

### Receiving a specific branch

As mentioned earlier, when using a stream URL, by default, the `main` branch is used to send and receive data.

To receive from a specific branch, simply use the branch URL, ie: `https://speckle.xyz/streams/3073b96e86/branches/dev`.

### Receiving a specific commit

There are circumstances in which you will not want to always receive "new" data, but you'll instead want to only get a specific commit. To do so simply use the commit URL, ie: `https://speckle.xyz/streams/3073b96e86/commits/604bea8cc6`

::: tip NOTE

When receiving from a commit, the node will stop showing notifications about new activity on such stream and the auto receive toggle will be disabled.

:::

![image-20210322172730078](./img-dyn/image-20210322172730078.png)

### Receiving a specific object

Similarly to commits, you can also point the receive node to a specific object, to do so simply use the commit URL, ie: `https://speckle.xyz/streams/3073b96e86/objects/df7b8bafccefa791d82939dd36541189`. Objects are immutable, so the data received using such a URL will always be consistent.
You can find the ID of an object from the Speckle Web interface:

![image-20210322185007725](./img-dyn/image-20210322185007725.png)

### Viewing a Stream online

To view the received stream online you can just right click on the receiver node:

![image](https://user-images.githubusercontent.com/2679513/114192622-9bc36880-9945-11eb-8b49-639f0f34b619.png)

## Creating custom objects

A custom object is a [Base Object](/user/concepts.html#the-base-object) with custom properties assigned to it. It's basically a custom data structure you can create to send data in a specific format that you define.

In Dynamo, we use dictionaries to represent custom objects since they are natively supported, so creating custom objects is as simple as creating a dictionary containing the keys and values you wish to include in the `Base` object.

This dictionary will be automatically converted to a `Base` object during the _Send_ operation.

::: tip
Learn more about the Speckle `Base` object [here](/user/concepts.md#the-base-object) 👈
:::

![Create custom objects](./img-dyn/guide-custom-objects.png)

## Nodes

### Send node

![Send node](./img-dyn/nodes-send.png)

The **Send node** performs sending operations, usually to a Speckle Server, but also supports sending to a different data storage using _transports_. Whenever possible, the _Send_ node wil try to convert any compatible objects into Speckle format.

There is also an switch you can toggle to enable the node to send automatically the data whenever it changes.

#### Input

- _Data_: This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will also perform the conversion to Speckle automatically.
- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _Message_: The message you want to attach to the _commit_ when you send the data. Defaults to `"Dynamo push"`.

#### Output

- _Stream_: The _commit url_ pointing to the objects in the Speckle server.

### Receive node

![Receive node](./img-dyn/nodes-receive.png)

The **Receive node** fetches data from a specified `Stream` or any other valid `Transport`. Whenever possible, the receiver node will try to convert all Speckle objects into compatible objects.

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.

#### Outputs

- _Data_: The data that was received from the stream.

### Local Send node

![Send local node](./img-dyn/nodes-send-local.png)

The **Local Send** node performs sending operations directly to the users's local database.

#### Inputs

- _Data_: The data to be sent locally. This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will also perform the conversion to Speckle automatically.

#### Outputs

- _localDataId_: The unique `id` for the data that was locally sent.

### Local receive node

![Receive local node](./img-dyn/nodes-receive-local.png)

The **Local Receive** node performs receive operations in the same way as the [Receive node](#receive-node), the only difference is that data is received locally from the Speckle's user local database, instead of the server or any other transport.

#### Inputs

- _localDataId_: The unique `id` for the data you want to fetch locally. This would be provided from a [Local Send node](#local-send-node)

#### Outputs

- _Data_: The data thas was received. This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will also perform the conversion to Speckle automatically.

### Accounts node

![Accounts node](./img-dyn/nodes-accounts.png)

The **Accounts** node provides a fast way of selecting different Speckle accounts.

> Accounts must be set-up in your computer using the **Speckle Manager**. If no accounts are shown after setting up the solution

### Create stream

To create a new stream, right-click on the canvas and search for the `Stream Create` node. This node has a custom UI that allows you to select a specific account to use, and a button to confirm the stream creation.

::: tip
You can always, also create streams online form Speckle Web. From there you can also set their name, description and permissions.
:::

Once created, the node will remember that stream. Meaning you will not be able to _change_ the stream you created, or create a new one using the same node (just create a new `Stream Create` node).

Select the appropriate account and press the blue button. If the stream creation was successful, the output of the node should be a _stream url_ pointing to the newly created stream and linked to the specified account.

![Creating a stream](./img-dyn/guide-stream-create.gif)

#### Viewing the Stream online

To view the newly created stream online you can just right click on the node:

![image](https://user-images.githubusercontent.com/2679513/114194176-2193e380-9947-11eb-8b55-8f2f56d07773.png)

#### Inputs

> This node has no inputs, as the account selection is done using it's custom UI.

#### Ouputs

- _stream_: A `Stream` object pointing to the newly created stream.

### Get stream

![Stream get node](./img-dyn/nodes-stream-get.png)

The **Stream Get** node will try to find an existing `Stream`, given it's unique `id` (or its `stream url`) and a specific account to access that stream with.

#### Inputs

- _stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _account_: A Speckle account, provided by the **Accounts node**. If no account is provided, the _default account_ will be used.

#### Outputs

- _stream_: A `Stream` object pointing to existing stream. If the stream doesn't exist, an error will be shown.

### List streams

![Stream list node](./img-dyn/nodes-stream-list.png)

The **List Streams** node returns a specified ammount of streams available in an account. For performance reasons, it has been limited to fetching a maximum of 20 streams.

#### Inputs

- _account_: A Speckle account, provided by the **Accounts node**. If no account is provided, the _default account_ will be used.
- _limit_: The number of streams to fetch from the server.

#### Outputs

- _streams_: List of `Stream` objects available to the specified account.

### Stream details

![Strean details node](./img-dyn/nodes-stream-details.png)

The **Stream Details** node returns all relevant information related to a specific `Stream`.

#### Inputs

- _stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.

#### Output

- _stream_: The unique `id` that identifies the stream.
- _name_: The name of the stream.
- _description_: The description of the stream.
- _createdAt_: The date this stream was created.
- _updatedAt_: The date marking the last time the stream was updated.
- _public_: Boolean value indicating if the stream is public or private.
- _collaborators_: A list of collaborators that have access to this stream, as well as their roles.
- _branches_: A list of available branches for this stream.

### Stream update

![Stream update node](./img-dyn/nodes-stream-update.png)

The **Stream Update** node allows for updating the _name_, _description_ and whether the node is _public_ (which will make your data publicly available to read by anyone with the _stream url_) or _private_ (only invited collaborators can view this stream).

#### Inputs

- _stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _name (optional)_: Text string with the new name for the stream.
- _description (optional)_: Text string with the new description for the stream.
- _isPublic_: Boolean value to activate/deactivate this stream's _link sharing_.

#### Output

- _stream_: A `Stream` url pointing to the updated stream.

### Dev tools

![Conversion Category](./img-dyn/nodes-cat-conversion.png)

These nodes where developed exclusively for testing/development purposes. If you don't know what these are, you most likely won't ever need them.

#### Convert to Speckle node

![Convert to Speckle node](./img-dyn/nodes-convert-tospeckle.png)

The **Convert to Speckle** node will convert any supported objects (such as lines, curves, meshes...) into Speckle ones.

This node was developed for testing/development purposes, as the Send/Receive nodes will already perform this conversion step automatically.

#### Convert to Native node

![Convert to Native node](./img-dyn/nodes-convert-tonative.png)

The **Convert to Native** node will convert any supported Speckle objects into compatible objects.

This node was developed for testing/development purposes.

#### Serialize Speckle objects node

![Serialize objects node](./img-dyn/node-serialize.png)

The **Serialize objects** node will convert any Speckle object into `JSON` formatted text.

#### Deserialize Speckle objects node

![Deserialize objects node](./img-dyn/nodes-deserialize.png)

The **Deserialize objects** node will convert a serialized speckle object in json format into `Base` speckle objects.

#### Server Transport

![Server transport node](./img-dyn/nodes-transports-server.png)

Creates a connection to a specific Speckle Server.

#### SQLite Transport

![SQLite Transport](./img-dyn/nodes-transport-sqlite.png)

Creates a connection to a specific SQLite database.

#### Disk Transport

![Disk tranport](./img-dyn/nodes-transport-disk.png)

Creates a connection to a specific file in the computer's disk, where the data will be saved in JSON format.

#### Memory Transport

![Memory transport](./img-dyn/nodes-transport-memory.png)

Creates a connection to in-memory storage.

## Supported elements

| Geometry       | Send          | Receive       | Status     |
| -------------- | :-----------: | :-----------: | :--------: |
| Point          | ✅             | ✅             | `Complete` |
| Line           | ✅             | ✅             | `Complete` |
| Plane          | ✅             | ✅             | `Complete` |
| Arc            | ✅             | ✅             | `Complete` |
| Circle         | ✅             | ✅             | `Complete` |
| Cuboid         | As Box        | ✅             | `Complete` |
| Ellipse        | ✅             | ✅             | `Complete` |
| Helix          | As Spline     |               | `Complete` |
| Polyline       |               | x<sup>α</sup> | `Complete` |
| Polycurve      | ✅             | ✅             | `Complete` |
| Polygon        | As Polyline   | ✅             | `Complete` |
| Rectangle      | As Polyline   | ✅             | `Complete` |
| Spline         | ✅             | ✅             | `Complete` |
| Brep           | ✅             | ✅             | `Complete` |
| Mesh           | ✅             | ✅             | `Complete` |
| Revit Elements | x<sup>β</sup> |               | `Complete` |

<sup>α</sup>: As Rectangle, Polycurve, or Polygon

<sup>β</sup>: All Revit elements described [here](/user/revit.html#supported-elements) can also be sent from Dynamo

### Unsupported elements

Any geometric element not listed above are not supported.
