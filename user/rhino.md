# Rhino

## Quick Start Video

Prefer watching to reading? Who doesn't!

<div style="position: relative;padding-bottom: 56.25%;"><iframe width="100%" height="100%" style="position: absolute;" src="https://www.youtube.com/embed/v56nxXBbtfI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Getting Started

To install this Connector and add your Speckle account, follow the instructions in the [Speckle Manager](/user/manager) section.
Speckle currently supports both Rhino 6 and Rhino 7.

Once installed, you can find the connector by running the `Speckle` command in Rhino. This should open a new pop-up window with the [Desktop UI](/user/ui.md) (the old version of Speckle used the `SpecklePanel` command for this).

![Speckle command](./img-rhino/rhino-speckle-command.png)


## User Interface

> This connector uses our shared Desktop UI. Read up on general guidelines for usage in the [Desktop UI section](/user/ui).

Once the Desktop UI panel is open, go ahead and create a new stream (or add an existing one) to the current file. Once the Rhino `.3dm` file is saved, the streams associated with that file will be saved too.

### Sending

To send objects to Speckle, you'll first need to specify which objects are to be sent.
This can be done in two ways:

* The simpler way involves manually selecting elements in Rhino. 
* The more powerful way is to use filtering logic to select elements.

In the example below, we'll use the simpler method of manually selecting the elements to be sent. First, ensure the stream you want to send data to is in _Sender_ mode.

![Stream in send mode](./img-rhino/rhino-stream-send-mode.png)

Next, select the objects you want to send, and left-click the button that says `0 objects` in the Speckle Panel. A drop-down will appear; choose `Set Selection`.

![Stream selection dropdown](./img-rhino/rhino-selection-dropdown.png)

The same button should now display the total count of objects that were selected.

![Stream selection set](./img-rhino/rhino-selection-set.png)

You're ready to send! Press the `Send` button. You should see a progress bar and, once completed, a success message.

![Stream send operation](./img-rhino/rhino-stream-send.gif)

For the detail-lovers out there, you'll notice that your Rhino layer structure is replicated as `Base` object properties, which can be recreated on the receiving end.

### Receiving

In order to receive data from a Speckle stream, you'll first need to add that stream to your Speckle streams panel. If the stream already exists on the server it will automatically be added in _Receiver_ mode.

![Stream in receiver mode](./img-rhino/rhino-stream-receive-mode.png)

Once the stream has been added, go ahead and hit the `Receive` button. This will display a progress bar (just like the sending operation) and, if successfull, will add the received objects to the current document.

![Stream receive operation](./img-rhino/rhino-stream-receive.gif)

In order to prevent overriding existing layers/objects in the file, all received objects will be placed in a nested layer structure. This structure will contain all the layers. that the sent objects were placed to, with a parent layer with a name in the format `<STREAM_NAME>: <BRANCH_NAME> @ <COMMIT>`.

![Commit layers](./img-rhino/rhino-stream-receive-nested-layers.png)

In the screenshot above, you can see the difference between:

1. The original layers of the sent objects
2. The layers created by Speckle when receiving the data back

You may also notice the overlapping received objects(gray) with the original objects (blue and red).

![Received layers pattern](./img-rhino/rhino-stream-receive-layers.png)

## Supported elements

Almost all geometric elements are supported by the Rhino connector. This includes:

| Geometry     | Send    | Receive | Status     |
| ------------ | :-----: | :-----: | :--------: |
| Point        | ✅       | ✅       | `Complete` |
| Line         | ✅       | ✅       | `Complete` |
| Plane        | ✅       | ✅       | `Complete` |
| Arc          | ✅       | ✅       | `Complete` |
| Circle       | ✅       | ✅       | `Complete` |
| Ellipse      | ✅       | ✅       | `Complete` |
| Polyline     | ✅       | ✅       | `Complete` |
| Polycurve    | ✅       | ✅       | `Complete` |
| Spline       | ✅       | ✅       | `Complete` |
| Nurb Surface | As Brep | ✅       | `Complete` |
| Brep         | ✅       | ✅       | `Complete` |
| Extrusion    | ✅       | As Brep | `Complete` |
| Mesh         | ✅       | ✅       | `Complete` |

| BuiltElement | Send | Receive  | Status     |
| ------------ | :--: | :------: | :--------: |
| View         | ✅    | ✅        | `Complete` |
| ModelCurve   |      | As Curve | `Complete` |
| DirectShape  |      | As Mesh  | `Complete` |

| Other           | Send | Receive | Status        |
| --------------- | :--: | :-----: | :-----------: |
| RenderMaterial  | ✅    |         | `In Progress` |
| BlockInstance   | ✅    | ✅       | `Complete`    |
| BlockDefinition | ✅    | ✅       | `Complete`    |

> Speckle supports sending BREPs from Rhino <-> Rhino, and Rhino <-> Revit, with some limitations imposed by Revit's API.

### Unsupported elements

Many non-geometric elements and any geometric element not listed above, such as text tags, hatches, etc are not supported.

## Schema Builder

Speckle 2.0 gives you the option of streaming objects as `base` geometry from Rhino to Revit, or directly into native Revit elements  using the Rhino schema builder commands.

![example](./img-rhino/rhino-revit-example.gif)

### Features

Currently, direct conversions are available for the following types:

| Base Geometry            | BuiltElement schemas            | Revit type |
| ------------------------ | ------------------------------- | :--------: |
| Planar surface           | `Wall` `Floor` `Ceiling` `Roof` |            |
| Planar polysurface       | `Wall`                          |            |
| Planar and nurbs surface | `FaceWall`                      | ✅          |
| Line                     | `Column` `Beam`                 |            |
| Brep / extrusion         | `DirectShape`                   | ✅          |
| Mesh                     | `DirectShape`                   | ✅          |

### Walkthrough

Stream your Rhino objects directly into Revit as BuiltElements! Rhino to Revit interop uses a custom Speckle `Attribute User Text (AUT)` string to determine an object's schema before sending streams. AUTs are modified with two commands:

- `ApplySpeckleSchema` gives you options for adding AUTs to model objects
- `RemoveSpeckleSchema` removes schema AUTs from model objects

Some schemas have additional parameters that can be manually modified for custom control over parameters like Revit Family or Revit Type.

### Assigning schemas

![command](./img-rhino/rhino-schemaGen-command.gif)

#### The automagic method

The easiest way to assign schemas to your Rhino objects is to let the Speckle schema builder decide for you!

1. Type `ApplySpeckleSchema` in the command line
2. Select objects for BuiltElements conversion
3. By default, `Automatic` is set to `On`. Press **Enter**!

The algorithm for automatic schema application takes into account object and layer naming before it tries to find the best BuiltElements schema to apply. For example, if an object has _Wall_ in its name, or in the absence of a name, the object is nested in a layer with a name that includes _Wall_, then the automatic method will try to send the object as a Speckle `Wall` element. If the algorithm can't find a BuiltElements type in either the object or layer name, it will analyze the object geometry and try to find the first schema fit based on the object's properties.

**note** `DirectShape` conversions are not assigned during the automagic method. If an XY planar surface does not have a specific schema in its object or layer name, it will default to `Floor`, instead of `Roof` or `Ceiling`.

#### The single schema method

You can assign a specific schema to selected objects through the single schema method: this method also includes conversions to `DirectShape` and `FaceWall` schemas.

1. Type `ApplySpeckleSchema` in the command line
2. Set `Automatic` to `Off`
3. Select a `Schema` option
4. By default, `DirectShape` is set to `Off`. To send as a DirectShape instead of a native object, set the toggle to `On`.
5. Select objects for schema application, and press **Enter**!

#### Customizing properties

Revit-specific BuiltElements schemas such as `FaceWall` and `DirectShape` can be manually customized with additional properties. By default, these schemas will have a user string with the following formats:

```
FaceWall([family], [type])
DirectShape(Schema, UniqueName)
```

To assign custom values, select your FaceWall or DirectShape object and navigate to its User Attribute Text panel. Double click on the _SpeckleSchema_ entry value and replace the `[]` properties with custom values if you want to assign a specific Revit family or type to your `FaceWall` object. If no changes are made, FaceWalls are assigned to the `Basic Wall` type by default. For DirectShapes, a unique shape name is automatically generated, but can be changed to a custom string if desired.

### Removing schemas

Removing schemas from Rhino objects is super easy:

1. Type `RemoveSpeckleSchema` in the command line
2. Select objects to remove schemas from
3. Press **Enter** - Speckle AUT strings are now deleted from all selected objects!

## Things to keep in mind

This section is work in progress 🚧 ! Please check back again soon 😃
