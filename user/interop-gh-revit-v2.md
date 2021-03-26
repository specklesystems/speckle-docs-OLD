# Grasshopper ➡ Revit

You can stream _Grasshopper_ native geometry to Revit using Speckle! In this guide, we will send different types of geometry and built elements to Revit to understand how Speckle converts them into native Revit geometries. We will also create some `BuiltElements` using the `SchemaBuilder` node, which allows for the generation of native Revit elements such as walls, floors, topography, etc...

## Getting started

Before getting started, check that you have a supported version of Rhino (6 or 7) and Revit (2019-21) and the Speckle 2.0 connectors installed for **Grasshopper** and **Revit**. Then download the Rhino and Grasshopper files or this tutorial [here](https://drive.google.com/drive/folders/1TYX8aL_CZ7fVLaE1pWz4h4qYZYYAaA0o?usp=sharing)

::: tip
Our Rhino and Grasshopper connectors are independent of each other, unlike in Speckle 1.0. This means you can choose which one is appropriate for you, or install both! 😁
:::

We're also going to assume that you already have access to a Speckle 2.0 server, and you have correctly set up your account for that server in the _Speckle Manager_.

## Sharing Revit project data

Let's start with the easy part: In order to create Revit elements using Speckle, we should ideally have some knowledge of the current information available in our Revit project.

Let's create a new project using the default `Architectural Template`. You can use your prefered units. A project will be created with 2 default levels (_level 0_ and _level 1_). It should also have some default families loaded in the project.

Now, go to the **Add-ins** tab, and press the `Speckle for Revit` icon. The Speckle _Desktop UI_ should appear.

- Press the blue `+` button on the lower-right corner to add a stream to the file.
- Create a new stream by writing a name and clicking on the blue arrow icon. You should see the `Stream` card appear on the _DesktopUI_ window.
  ::: tip
  In our case, we'll call our stream **Interop - GH/Revit - Project Data**
  :::
- Press the blue button at the center that reads `0 object` and select the option `Set/Edit Objects Filter`.
- Go to the `Project Info` filter type, select the _Project Info_, _Levels_ and _Families and Types_ options and press `Set Filter`.
- Press the `Send` button in the _Project Data_ stream.

That's it! We've effectively pushed our project information, including all existing levels and loaded families/types to Speckle. We'll use this information to correctly set family/type names for Revit elements.

This concludes our setup. We'll now switch to Grasshopper to receive it and use it to generate new Revit elements.

## Using Revit project data

Now let's open up our _fake Leadenhall_ building model in Rhino. You'll need to open both Rhino and Grasshopper files, as there are some grasshopper nodes that reference geometries from the Rhino file.

Go to a blank area of your Grasshopper canvas:

1. Create a `Panel` and a `Receive` node.
2. Paste the _steram url_ we copied in the previous step into the panel.
3. Connect the panel to the `Receive` node input and press the _Receive_ button.
4. Create an `Expand Speckle Object` node, and connect the receied data to it.

Once done, it should look like this:

![Receiving revit project data](./img-interop/v2/ghRvt-receiveRvtData.png)

Most of the outputs will also be `Base` objects, meaning you'll have to expand them to inspect their properties.

## Sending geometry to Revit

We'll start by sending in the surrounding buildings of our model, as well as the plot street lines and the plot terrain. For this, we'll first create a `Speckle Object` to organize our data.

We'll also need to create a new _stream_ in our server, called `Interop - GH/Revit - Plot`, and copy it's `url`.

::: tip
Remember you must correctly specify the `Access Type` for each input to generate the right amount of `Base` objects.

Inputs set with `List Access` will be shown with an `L` icon beside them.
:::

Then, we can just plug in the geometries directly into their respective inputs. Connect it to a `Send` node pointing to the stream we just created and press `Send`.

![Plot data speckle object](./img-interop/v2/ghRvt-plot-geometry.png)

### Controlling the DirectShape conversion

As you may have noticed, our surrounding buildings have been created in Revit as `Generic Models`. This is the default conversion behaviour when sending geometry elements that are not directly supported by Revit (such as meshes or breps).

In order to control this behaviour, we can use the `Schema Builder` node.

::: tip SchemaBuilder node pop-up

When first create the node, a pop-up window will appear allowing you to select the object type you want to create. These are organized into two main categories:

- Built elements: These are Speckle elements created to support common built elements (beam, wall, slab, level...) accross the entire Speckle ecosystem.
- Revit elements: These are specifically designed to support Revit specific entities and workflows.
  ![Schema builder pop-up](./img-interop/rvt-schemaBuilder-popup.gif)

:::

- Drag a `Create Schema Object` node to your canvas.
- From the pop-up, select `DirectShape` and press ok. A new node and a dropdown should appear.
- Select `Mass` from the dropdown list.
- Connect the surrounding building geometries to the `baseGeometries` input. _Graft_ the input to generate one direct shape per geometry.
- You'll also need to connect a panel with a desired name for each `DirectShape`.

Let's also send the `terrain` as a native `RevitTopography` object.

- Drag a `Create Schema Object` node to your canvas and select the `RevitTopography` type.
- Connect the terrain mesh to the revit topography `displayMesh` input.

It should end up looking like this:

![Sending direct shape with category](./img-interop/v2/ghRvt-plot-revitObjects.png)

Now swap those direct shapes for the original geometries and send them.

In Revit, once you get the notification that data was changed, press the receive button. You should now see the surrounding buildings appear as `Massing` objects.

::: tip
If you don't see the surrounding buildings, ensure you have the Massing objects visibility active in the _Massing / Site_ tab in Revit.
:::

![Sending/Receiving the plot data as categorized DirectShapes](https://link)

## Generating Floors and Levels

Now that we have our plot and surrounding buildings set-up, let's proceed with the creation of the levels and floor slabs for each level.

### Creating the levels

- Drag a `Create Schema Object` node to your canvas and select the `RevitLevel` type.
- A revit level requires a _name_, _elevation_, and an indication to create a view for that level.
- Connect the `lower floor names` and `lower floor heights` to their respective inputs in the `RevitLevel` node.

![Level creation](./img-interop/v2/ghRvt-createLevels.png)

### Creating the floors

Now we'll create some native Revit floors, using the levels we previously created and the curves available on the `Upper/Lower Floor Outlines` nodes. We'll also need to select a floor type from one of the `available floor types` we received from Revit.

::: tip
To select a specific floor type, first select an individual type with a `list item` node, and then use the `Expand Speckle Object` node to inspect it's properties.
![Inspecting floor types](https://link)
:::

1. Create two `SchemaBuilder` nodes with `RevitFloor` type.
2. Connect the selected family name and type.
3. Connect the respective levels and outlines (upper/lower) to each `RevitFloor` node.

![Grasshopper, creating Revit floors](./img-interop/v2/ghRvt-createFloors.png)

## Creating beams

In this case, since we do not have much information about the structural beams, as they are modelled as simple lines. This is the perfect scenario to use Speckle's `BuiltElements`.

These are simple representations of common BIM elements, that require a minimum amount of input. These elements will be appropriately converted to native elements on each target platform when possible.

In the case of a `BuiltElements.Beam`, the input required is only the axis line of that beam.

1. Drag a `Create Schema Object` node to your canvas and select the `Beam` type (not `RevitBeam`).
2. Connect all truss lines to the `baseLine` input. Since we don't really care about the data structure they're organized by, we can flatten the input.

![Create Beams](https://link)

## Creating the core walls

Just like with floors, we can create walls using the `Create Schema Object` node. There are several ways to create a wall, but for the `Core Walls`, we're going to create them with the `Wall by Face` type. This takes a surface as a reference to create a wall in revit with the same shape.

1. Drag a `Create Schema Object` node to your canvas and select the `Wall by Face` type.
2. Locate the node called `Core Walls` and connect it to the `surface` input.
3. Select a category from the _available wall types_ we received from Revit and connect it's family name and type.
4. The last thing we need is a level, but in this case, we already know there is a level called `Level 0` on our project, which is at ground level. We can reference it using the `Level by name` schema.
5. Drag a `Create Schema Object` node to your canvas and select the `Level by name`.
6. Connect a panel with the text "Level 0" to it's only input, and connect the resulting level into the `Wall by Face` node.

![Create walls by face](./img-interop/v2/ghRvt-createRevitWallsByFace.png)

## Categorizing generic geometric objects

For anything that cannot be directly translated into Revit elements, you can still send them directly, as we saw in the first step. Just as we did with the _surrounding buildings_, we can categorize the _Ground Floor Objects_, _Foundation_ and _Ramps_ as `DirectShape` objects with their appropriate categories.

![Create categorized direct shape objects](./img-interop/v2/ghRvt-genericObj-directShape.png)

## Organize the building structure

Until this moment, we've been creating several Revit elements we want to send. Before doing so, let's organize that data into a single `Speckle Object` to keep everything tidy.

1. Drag a new `Create Speckle Object` node.
2. Create inputs for each of the object types we just created.
3. Connect everything appropriately.

::: tip
Always remember to set the access type of your inputs appropriately.
:::

![Structure object](./img-interop/v2/ghRvt-structureData.png)

## Sending the building structure

On the server's website, create a new stream to send the structure data to. Copy it's `url` and

## Adding more detail

### Create interior walls

### Create AdaptiveFamiliy instances

## Use Speckle in the family editor
