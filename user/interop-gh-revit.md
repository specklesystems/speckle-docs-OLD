# Grasshopper ➡ Revit

You can stream _Grasshopper_ native geometry to Revit using Speckle! In this tutorial, we will send different types of geometry to Revit to understand how Speckle converts them into native Revit elements. We will also create some `BuiltElements` using the `SchemaBuilder` node, which allows for the generation of native Revit elements such as walls, floors, topography, etc...

## Getting started

Before getting started, check that you have a supported version of Rhino and Revit and the Speckle 2.0 connectors installed for Grasshopper and Revit. Then download the Rhino and Grasshopper files or this tutorial [here](https://link)

> Our Rhino and Grasshopper connectors are independent of each other, unlike in Speckle 1.0. This means you can choose which one is appropriate for you, or install both! 😁

## Sending `Rhino/Grasshopper` geometry objects

The _Grasshopper Connector_ supports sending any type of geometry or data. This geometric data may not be fully supported in Revit as such, so the Revit converter will determine what type of Revit element each geometry get's converted to.

### Default conversions

Let's send some geometry objects from Grasshopper to Revit. We'll start with the GH part:

1. Open the Rhino file. The model is organized into a `Structure` layer for columns and an `Architecture` layer for floors and walls.
2. Open the Grasshopper file. You'll notice several grouped nodes. Focus on the topmost one, called "Default Conversions".
3. Here, we've already selected different types of geometry from our Revit model.
   - A line
   - A curve
   - A BREP
   - A Mesh
4. Create a new `Sender` node in the Grasshopper canvas.
5. Create a new `Stream` by adding an `Accounts` and a `Create Stream` node; and connect them as shown:
   ![XXX](https://link)
   > You can also use an existing stream for this if you prefer.
6. Push the send button and wait for the sender to _do its thing_.
7. Right click the `Send node` and select `View commit....`. This will open a new browser window taking you to the Stream location in your Speckle server.
   - Streams created in Grasshopper have the name `Random Stream` by default, so feel free to change it to be able to identify it in Revit. You can also identify a stream by it's unique ID.

Now for the Revit side of things:

1. Open a new Revit file, and call up the Revit Desktop UI via the Speckle 2 plugin ribbon.
2. Add the stream you just created by clicking the blue `+` button on the lower right corner.
3. Press the `Receive` button in the stream card and wait for it to finish.
4. Once done, you should see the different geometry elements converted to Revit:
   1. All curves would have been converted to `ModelCurves`
   2. All BREP/Mesh elements would be converted to `DirectShape`'s with the 'Generic Model' category.

If you want to have more control over how these geometries get converted in Revit, keep going to the next section 👇

### About sending `BREPs`

Rhino BREP support still has some limitations we are working on improving, but other's are strictly imposed by the Revit API. In order to ensure unsupported geometric objects still get represented when importing to Revit, we provide a `fallback` value for every `BREP` in the form of a `Mesh`.

So, whenever a BREP conversion fails in Revit, the resulting object will still be generated in the model, only as a tesselated representation of the smooth BREP.

## Sending custom `Base` objects

With Speckle, you can create you own custom objects to represent and organize data in anyway. Let's create a custom object for the geometry we sent in the previous step.

- Bring a new `Create Speckle Object` node onto the canvas.
- Zoom-in to the node and add some properties inputs to it.
  - You can rename inputs by right-clicking the input name.
  - You can also specify if the input is of `item` or `list` type. Similar to how the scripting nodes operate in Grasshopper.
- Connect the geometries we sent earlier to each of the input types. If done correctly, the result should be just **one** `Base` object.
- Connect that object to the `Data` input on the `Send` node.
- Press send and wait until it finishes.

Now let's switch to Revit:

If you already had the file open from the previous step, you should have an update notification on the `stream` we added earlier. Press the receive button and wait for the process to complete.

As you may notice, even though the geometry was sent inside a `Base` object, all entities will still appear in the Revit model. This is because the conversion process will look for any objects it can convert to Revit native elements, independently of the data structure they are sent in.

## Sending `SchemaBuilder` objects

In order to create other _native_ Revit elements, we'd need to use the `Schema Builder` node.

> When first create the node, a pop-up window will appear allowing you to select the object type you want to create. These are organized into two main categories:
>
> - Built elements: These are Speckle elements created to support common built elements (beam, wall, slab, level...) accross the entire Speckle ecosystem.
> - Revit elements: These are specifically designed to support Revit specific entities and workflows.

## Automatic floor creation

The Revit connector will always attempt to assign objects to existing floors when available. If the object lies at a height where no `level` exists, a new level will be automatically generated with the name `Generated Level XXXX`, where `XXXX` will be the height at that level.

This is specially true when sending `BuiltElements`. Notice the lack of `level` in the `Floor` node as opposed to the `RevitFloor`. If sending a `Floor`, a level will be generated at the height of the floor outline.

## Updating parameter values

The `Schema Builder` node also contains a `Parameter` type, created specifically to pass parameter values along with the Revit model elements being sent.

> When sending Revit elements with custom parameters, you must ensure the parameters exist for the type/family you are targetting or the value will not be set.

## Receiving updates

- How does speckle deal with updated/repeated data
- i.e. dimensions created in revit from walls coming from Speckle

## Using Speckle in the Family Editor

This section is currently being built 🚧, please check again later!

## Known issues

This section is currently being built 🚧, please check again later!
