---
typora-copy-images-to: ./img-gh
---

# Grasshopper

## Getting Started

Speckle currently supports Grasshopper for McNeel Rhino 6 and 7.
To install this Connector and connect your Speckle account, make sure to follow the instructions in [Speckle Manager](/user/manager).

![GH Connector components](./img-gh/speckle-gh-main-tab.png)

Once installed, the **Grasshopper Connector** will appear under the `Speckle 2` tab, or if you use _tab icons_ you'll see our new Speckle logo instead.

The following component categories are intended for all users:
- Send/Receive nodes
- Account category, holding all account related nodes.
- Stream category, holding all stream related nodes.

We've also built a few components designed for advanced users and developers:

- Dev/Conversion: Conversion + serialization nodes.
- Dev/Transports: Not sure what transports are? Check [this](/dev/transports.md) out!

## Streams and URLs

In visual programming environments, Speckle Streams are now identified by their URLs (instead of their IDs).
Across our Dynamo and Grasshopper connectors you'll see URLs in 3 different formats:

- `https://speckle.xyz/streams/3073b96e86` points to the `main` branch on Stream `3073b96e86`
- `https://speckle.xyz/streams/3073b96e86/branches/dev` points to a branch named `dev` on Stream `3073b96e86`
- `https://speckle.xyz/streams/3073b96e86/commits/604bea8cc6` points to a specific commit `604bea8cc6` on Stream `3073b96e86`

::: tip
Unsure what _commits_ and _branches_ are? 🤔

No worries, you don't need to know what they are to use Speckle! But if you're curious, you can read about them in [concepts](/user/concepts).
:::

We'll see how branch and commit URLs are used in the following sections.

## Sending Data

Let's look at how we would send some data in grasshopper. First, start by creating a new `Send` node.

![image-20210322180706379](./img-gh/image-20210322180706379.png)

To select the stream you want send data to,just pass in its URL to the stream port.

![image-20210322181425413](./img-gh/image-20210322181425413.png)

Alternatively, you can also use one of the following nodes to create / retrieve existing streams:

- [Create Stream](user/grasshopper.md#create-stream)
- [Get Stream](user/grasshopper.md#get-stream)
- [List Streams](user/grasshopper.md#list-streams)

:::tip NOTE
While you can send data to streams and branches, you cannot send data to a specific commit. This is because commits represent your stream in a specific point in time. Therefore, everything that gets sent to Speckle is already a commit.

Want to edit an old commit? Just re-send the data and use the new commit instead.
:::

#### Adding objects

In order to select which objects to send in grasshopper, we just need to connect the desired nodes to the `Data` input in the `Send` node. The sender supports any type of data, in any structure (item, list, datatree), and will convert any supported Rhino objects into a Speckle compatible format when necessary.

#### Adding a commit message

It's good practice to add a "commit message" whenever you send you data, especially if working with others, this message should describe the changes being pushed.
You can add a commit message by passing some text to the `message` port.
The commit message will be visible in Speckle Web where you will also be allowed to edit it.

#### Sending

The only thing left to do is to press the **Send button**.

![gh-send](./img-gh/gh-send.gif)

::: tip
To view the data you just sent in Grasshopper, just right-click the `Send` node and select the `View commit ...` option. This should open a new browser window loading the _stream url_. You can share that url with any collaborators so they can receive the data.

![image-20210322182801307](./img-gh/image-20210322182801307.png)

:::

### Sending to a specific branch

When using a stream URL, by default, the `main` branch is used to send and receive data.

To send to a specific branch, simply use the branch URL, ie: `https://speckle.xyz/streams/3073b96e86/branches/dev`.

## Receiving Data

Receiving data is very simple. You just need a `Receive` node, and a stream URL.

![gh-receive](./img-gh/gh-receive.gif)

When new data is pushed to this stream a notification will appear on the receive node.

### Auto Receiving

By right clicking on the node, you can enable/disable auto receiving. If enabled, new data pushed to this stream will be pulled automatically as it's available.

![image-20210322183400126](./img-gh/image-20210322183400126.png)

### Receiving a specific branch

As mentioned earlier, when using a stream URL, by default, the `main` branch is used to send and receive data.

To receive from a specific branch, simply use the branch URL, ie: `https://speckle.xyz/streams/3073b96e86/branches/dev`.

### Receiving a specific commit

There are circumstances in which you will not want to always receive "new" data, but you'll instead want to only get a specific commit. To do so simply use the commit URL, ie: `https://speckle.xyz/streams/3073b96e86/commits/604bea8cc6`

::: tip NOTE

When receiving from a commit, the node will stop showing notifications about new activity on such stream and the auto receive toggle will be disabled.

:::

### Receiving a specific object

Similarly to commits, you can also point the receive node to a specific object, to do so simply use the commit URL, ie: `https://speckle.xyz/streams/3073b96e86/objects/df7b8bafccefa791d82939dd36541189`. Objects are immutable, so the data received using such a URL will always be consistent.
You can find the ID of an object from the Speckle Web interface:

![image-20210322185007725](./img-dyn/image-20210322185007725.png)

## Creating custom objects

A custom object is a [Base Object](/user/concepts.html#the-base-object) with custom properties assigned to it. It's basically a custom data structure you can create to send data in a specific format that you define.

There's several different ways to create custom speckle objects using the Grasshopper. One of them is using the `Create Speckle Object` node.

![Create speckle object node.](./img-gh/nodes-create-object.png)

This node is a _variable parameter_ type, meaning if you zoom into the _inputs_ section, you should see a `+/-` sign that will allow you to add/remove properties from the object. Each input you define will represent a new property on the object. You can also modify the name of these properties, as well as their _access type_.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Modifying the access type

Access type operates in the same way as the `Python` and `C#` script components. In this case, you can specify if you want a specific property in the object to be a _list_ or a single _item_.

![Access type menu](./img-gh/menu-listAccess.gif)

::: warning
Choosing the wrong access type for your data may result in duplicated data being generated.
:::

#### Detach/Do not detach

Every property can also be specified as _detached/non-detached_. When a property is _detached_, it means that the objects it contains will be saved as independent entities in the Speckle database. All properties are detached by default for performance reasons, but you can choose not to by specifying `Do not detach` on the right-click menu.

![Detach/Do not detach](./img-gh/menu-DoNotDetach.gif)

#### Optional

Every property can also be flagged as _optional_. This will allow you to create new objects with _incomplete_ data.

There is a limitation on this behaviour: at least one of the node's inputs must be _non-optional_.

![Optional menu](./img-gh/menu-Optional.gif)

::: tip

When you activate any of the previous options, the corresponding icon will be shown in the parameter, very much like the `Graft/Flatten/Simplify` options.

![State tags](./img-gh/menu-stateTags.png)

:::

::: details Supported elements

Grasshopper supports the same geometry as the Rhino connector:

| Geometry       | Send    | Receive | Status        |
| -------------- | :-----: | :-----: | :-----------: |
| Point          | ✅       | ✅       | `Complete`    |
| Line           | ✅       | ✅       | `Complete`    |
| Plane          | ✅       | ✅       | `Complete`    |
| Arc            | ✅       | ✅       | `Complete`    |
| Circle         | ✅       | ✅       | `Complete`    |
| Ellipse        | ✅       | ✅       | `Complete`    |
| Polyline       | ✅       | ✅       | `Complete`    |
| Polycurve      | ✅       | ✅       | `Complete`    |
| Spline         | ✅       | ✅       | `Complete`    |
| Nurb Surface   | As Brep | ✅       | `Complete`    |
| Brep           | ✅       | ✅       | `Complete`    |
| Extrusion      | ✅       | As Brep | `Complete`    |
| Mesh           | ✅       | ✅       | `Complete`    |

| Other          | Send    | Receive | Status        |
| -------------- | :-----: | :-----: | :-----------: |
| RenderMaterial | ✅       |         | `In Progress` |

The **Schema Builder** node also provides additional support for the following built elements:

| BuiltElement                                          | Send    | Receive | Status        |
| ----------------------------------------------------- | :-----: | :-----: | :-----------: |
| Adaptive Component                                    | ✅       |         | `Complete`    |
| Beam                                                  | ✅       |         | `Complete`    |
| Brace                                                 | ✅       |         | `Complete`    |
| Ceiling                                               | ✅       |         | `Complete`    |
| Column                                                | ✅       |         | `Complete`    |
| Curves (Model, Detail, Room Boundary)                 | ✅       |         | `Complete`    |
| Direct Shape                                          | ✅       |         | `Complete`    |
| Freeform Element                                      | ✅       |         | `Complete`    |
| Duct                                                  | ✅       |         | `Complete`    |
| Face Wall                                             | ✅       |         | `Complete`    |
| Family Instance                                       | ✅       |         | `Complete`    |
| Floor                                                 | ✅       |         | `Complete`    |
| GridLine                                              | ✅       |         | `Complete`    |
| Level                                                 | ✅       |         | `Complete`    |
| Opening (Wall, Vertical, Shaft)                       | ✅       |         | `Complete`    |
| Parameter                                             | ✅       |         | `Complete`    |
| Railing                                               | ✅       |         | `Complete`    |
| Roof (Extrusion, Footprint)                           | ✅       |         | `Complete`    |
| Topography                                            | ✅       |         | `Complete`    |
| View                                                  |          |         | `In Progress` |
| Wall                                                  | ✅       |         | `Complete`    |

Refer to the section below for additional information on the **Schema Builder** node.

:::

### Unsupported elements

Non-geometric elements and any geometric element not listed above, such as text tags, hatches, etc... are not supported.

## Schema Builder

![Schema Builder node](./img-gh/nodes-schema-builder.png)

The **Schema Builder** node is a very powerful one. It works similarly to the node above as it allows to create custom objects, but it does so by following pre-existing schemas. To learn more about [schemas and kits](/dev/kits) check out or dev section.

By default the Schema Builder node comes with a series of types, these include mainly building elements to enhance interoperability between Rhino/Grasshopper and other BIM software solutions like Revit.

When a new **Schema Builder** node is created, a pop-up window will be displayed prompting the user to select a specific object schema. This schema will be used to populate the input/output ports of the node with the appropriate fields.

![Schema builder pop-up](./img-gh/nodes-schema-builder-popup.png)

::: tip
Check out our [tutorial on sending data from Grasshopper to Revit](/user/interop-gh-revit)!
:::

## Object conversion

By default, the Speckle nodes will try to convert any compatible objects (such as meshes, solids, lines and points):

- **On input**: to Speckle compatible format.
- **On output**: to the native Rhino format that Grasshopper will understand.

There are some situations where this behavior may not be ideal, as it may cause unintentional data-loss. This is particularly true when dealing with nested data inside

Speckle can deal with nested speckle objects without any issues but, due to limitations in the Rhino API, you can only attach text to a specific geometry object's custom data, such as a line.

![Creating a Speckle line with custom data attached](./img-gh/speckle-gh-conversion-createNestedLine.png)

Since any valid geometry objects will be automatically converted to their Rhino representation when they're output by a node, this _non-supported_ data will be _"lost"_.

In order to provide a work-around to this problem, all nodes that perform conversions have an "Do not convert" option in the right-click menu, that will prevent conversion from occurring on that specific node.

![Do not convert menu item](./img-gh/speckle-gh-conversion-menuitem.png)

::: details Handling geometry objects with nested data

Following the example above, we package and send the custom Speckle Line.

![Send custom line and normal rhino line](./img-gh/speckle-gh-conversion-send.png)

After receiving the data, when expanding Speckle objects you'll have several options:

1. Default behavior when receiving data: Automatic conversion to Rhino objects
   ![Expand and convert](./img-gh/speckle-gh-conversion-expandAndConvert.png)
2. Behavior when "Do not convert" options is enabled: Output is a Speckle Line
   ![Expand but don't convert](./img-gh/speckle-gh-conversion-expandAndNoConvert.png)

Now you can access the custom data attached to the line:

![Access line custom data](./img-gh/speckle-gh-conversion-accessCustomData.png)

:::

::: tip
Don't worry, we always ensure all objects are converted to Speckle format before preforming a `Send` operation.
:::

## Nodes

### Send node

![Send node](./img-gh/nodes-send.png)

The **Send node** performs sending operations, usually to a Speckle Server, but also supports sending to a different data storage using _transports_. Whenever possible, the _Send_ node wil try to convert any Rhino-compatible objects into Speckle format.

There is also an option to set the node to automatically send every time there is a change in the data. You will find this option in the right-click menu of the node.

| ![Activating auto mode in sender](./img-gh/nodes-send-automode-activate.png) | ![Auto-send mode active in sender](./img-gh/nodes-send-automode-active.png) |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |


<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Input

- _Data_: This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will also perform the conversion to Speckle automatically.
- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _Message_: The message you want to attach to the _commit_ when you send the data. Defaults to `"Grasshopper push"`.

#### Output

- _Stream_: The _commit url_ pointing to the objects in the Speckle server.

### Receive node

![Receive node](./img-gh/nodes-receive.png)

The **Receive node** fetches data from a specified `Stream` or any other valid `Transport`. Whenever possible, the receiver node will try to convert all Speckle objects into Rhino-compatible objects.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.

#### Outputs

- _Data_: The data that was received from the stream.

### Local Send node

![Send local node](./img-gh/nodes-send-local.png)

The **Local Send** node performs sending operations directly to the users's local database.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- _Data_: The data to be sent locally. This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will also perform the conversion to Speckle automatically.

#### Outputs

- _localDataId_: The unique `id` for the data that was locally sent.

### Local receive node

![Receive local node](./img-gh/nodes-receive-local.png)

The **Local Receive** node performs receive operations in the same way as the [Receive node](#receive-node), the only difference is that data is received locally from the Speckle's user local database, instead of the server or any other transport.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- _localDataId_: The unique `id` for the data you want to fetch locally. This would be provided from a [Local Send node](#local-send-node)

#### Outputs

- _Data_: The data thas was received. This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will also perform the conversion to Speckle automatically.

### Create Speckle Object

Please refer to the [Creating custom objects](/user/grasshopper.html#creating-custom-objects) section.

### Create Speckle Object by Key/Value pairs

![Create object by key/value](img/nodes-create-object-keyval.png)

This node will create a new speckle object using a list of `Keys` to be used as the object's properties, and a list of values (or nested list) to assign to each property.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

> When using this component, there is no option to specify a properties `detached` state, so all props will be detached by default.

![Creating an object with keys and values as items](./img-gh/nodes-create-keyval-item.png)

![Creating an object with keys and values as lists](./img-gh/nodes-create-keyval-list.png)

> Notice when creating list items, the data structure must mach. Meaning, the keys and values for each object must start with the same branch index.

### Expand Speckle Object

![Expand Object node](./img-gh/nodes-expand-object.png)

The **Expand Speckle Object** works in the exact oposite way as the [Create Speckle Object](#create-speckle-object). When a `Base` object is plugged into the input, it will automatically create the outputs for each of the `Base` objects properties.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- `Speckle Object`: The speckle object to extract the properties from.

#### Outputs

Outputs are dynamically generated according to the specific Base objects that have to be expanded.
All outputs will appear in alphabetical order regardless on the order they were created/added to the object.

### Extend Speckle Object

![Extend object node](./img-gh/nodes-extend-object.png)

The **Extend Speckle Object** provides a way to add new properties to an already existing `Base` object.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- _Speckle Object_: The Speckle object to be extended.
- _Keys_: The Keys to extend the object with. When an existing key is overriden, a warning will be displayed.
- _Values_: The values to assign to each individual key. Works in the same way as the [Create Object by KeyValue node](#create-speckle-object-by-keyvalue-pairs)

#### Outputs

- _Speckle Object_: The extended/updated Speckle `Base` object.

### Schema Builder

Please refer to the [Using the Schema Builder](/user/grasshopper.html#schema-builder) section.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

Inputs are dynamically generated based on the user selected schema.

#### Outputs

Output is dynamically generated based on the user selected schema.

### Accounts node

![Accounts node](./img-gh/nodes-accounts.png)

The **Accounts** node provides a fast way of selecting different Speckle accounts. Uses the native grasshopper

> Accounts must be set-up in your computer using the **Speckle Manager**. If no accounts are shown after setting up the solution

### Create stream

![alt](./img-gh/nodes-create-stream.png)

The **Create Stream** node allows for the quick creation of a new Stream. This stream will have default name and description, so it may be a good idea to edit that at some point.

Once an account has been provided, the node will generate a new stream and remember it for as long as the node exists in the canvas; meaning, the only way to create another new stream is to create a new `Create Stream` component.

#### Inputs

- _Account_: A Speckle account, provided by the **Accounts node**.

#### Ouputs

- _Stream_: A `Stream` object pointing to the newly created stream.

### Get stream

![Stream get node](./img-gh/nodes-stream-get.png)

The **Stream Get** node will try to find an existing `Stream`, given it's unique `id` (or its `stream url`) and a specific account to access that stream with.

::: tip
You can also use a stream URL copied from your browser instead of using this node
:::

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _Account_: A Speckle account, provided by the **Accounts node**. If no account is provided, the _default account_ will be used.

#### Outputs

- _Stream_: A `Stream` object pointing to existing stream. If the stream doesn't exist, an error will be shown.

### List streams

![Stream list node](./img-gh/nodes-stream-list.png)

The **List Streams** node returns a specified ammount of streams available in an account. For performance reasons, it has been limited to fetching a maximum of 20 streams.

::: tip
You can also use a stream URL copied from your browser instead of using this node
:::

#### Inputs

- _Account_: A Speckle account, provided by the **Accounts node**. If no account is provided, the _default account_ will be used.
- _Limit_: The number of streams to fetch from the server.

#### Outputs

- _Streams_: List of `Stream` objects available to the specified account.

### Stream details

![Strean details node](./img-gh/nodes-stream-details.png)

The **Stream Details** node returns all relevant information related to a specific `Stream`.

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.

#### Output

- _Stream ID_: The unique `id` that identies the stream.
- _Name_: The name of the stream.
- _Description_: The description of the stream.
- _Created at_: The date this stream was created.
- _Updated at_: The date marking the last time the stream was updated.
- _Public_: Boolean value indicating if the stream has _link sharing_ enabled.
- _Collaborators_: A list of collaborators that have access to this stream, as well as their roles.
- _Branches_: A list of available branches for this stream.

### Stream update

![Stream update node](./img-gh/nodes-stream-update.png)

The **Stream Update** node allows for updating the _name_, _description_ and _link sharing_ (which will make your data publicly available to read by anyone with the _stream url_)

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _Name (optional)_: Text string with the new name for the stream.
- _Description (optional)_: Text string with the new description for the stream.
- _Public_: Boolean value to activate/deactivate this stream's _link sharing_.

#### Output

- _Stream ID_: A `Stream` url pointing to the updated stream.

### Dev tools

These nodes where developed exclusively for testing/development purposes. If you don't know what these are, you most likely won't ever need them.

#### Convert to Speckle node

![Convert to Speckle node](./img-gh/nodes-convert-tospeckle.png)

The **Convert to Speckle** node will try to convert any Rhino objects (such as lines, curves, meshes...) into Speckle objects.

This node works **recursively**, meaning that if given any non-convertible `base` object, it will traverse through the properties and try to convert each value, leaving the structure intact.

::: warning

This node was developed for testing/development purposes.

:::

#### Convert to Native node

The **Convert to Native** node will try to convert any Speckle objects into Rhino compatible objects.

This node works **recursively**, meaning that if given any non-convertible `base` object, it will traverse through the properties and try to convert each value, leaving the structure intact.

::: warning

This node was developed for testing/development purposes.

:::

#### Serialize Speckle objects node

![alt](./img-gh/node-serialize.png)

The **Serialize objects** node will convert any Speckle object into `JSON` formatted text.

#### Deserialize Speckle objects node

![alt](./img-gh/nodes-deserialize.png)

The **Deserialize objects** node will convert a serialized speckle object in json format into `Base` speckle objects.

#### Server Transport

![Server transport node](./img-gh/nodes-transports-server.png)

Creates a connection to a specific Speckle Server.

#### SQLite Transport

![SQLite Transport](./img-gh/nodes-transport-sqlite.png)

Creates a connection to a specific SQLite database.

#### Disk Transport

![Disk tranport](./img-gh/nodes-transport-disk.png)

Creates a connection to a specific file in the computer's disk, where the data will be saved in JSON format.

#### Memory Transport

![Memory transport](./img-gh/nodes-transport-memory.png)

Creates a connection to in-memory storage.
