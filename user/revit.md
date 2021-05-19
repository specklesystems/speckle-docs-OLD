---
typora-copy-images-to: img-revit
---

# Revit

The Speckle Revit Connector currently supports Autodesk Revit 2019, 2020 and 2021.

## Getting Started

To install the Revit Connector and add your Speckle account, proceed by following the instructions in [Speckle Manager](/user/manager).

Once installed, you can find the Revit connector in the ribbon menu under the **Add-Ins** tab like so:

![image-20210303191815524](./img-revit/image-20210303191815524.png)

## User Interface

::: tip IMPORTANT 🙌

This connector uses our shared Desktop UI. Read up on general guidelines for usage in the [Desktop UI section](/user/ui).

:::

### Selection Filters

To help you select which elements will be to sent to Speckle, we've built various filters into our Revit connector. Once a filter is set, just click **Send** and all objects passing the filter will be sent to your Stream. 

_Please Note: Elements are sent regardless of whether they are visible or if they were created after setting up the filter._

![image-20210303192915561](./img-revit/image-20210303192915561.png)

#### Category Filter

The category filter lets you select one or more of the currently-supported Revit categories.

#### View Filter

The view filter works similarly to the category one, and lets you include all elements visible in one or more views.

#### Project Info Filter

The project info filter lets you add non physical elements, such as levels, views, element types (their properties, not geometry) and project information.

#### Parameter Filter

The parameter filter will filter all model elements that satisfy the logical conditions defined by you. For example, in the image below, Speckle will send all elements whose `Base Offset` value is greater then 2000mm.

:::tip NOTE

The list of available parameters comes from the current elements in the model. If the model is empty, no parameters will be available.

:::

![image-20210303201525577](./img-revit/image-20210303201525577.png)

## Supported Elements

We're working hard to support additional elements. The list below will be updated as soon new conversion routines are added.

If you'd like us to add something specific, let us know on the [Speckle Community Forum](https://speckle.community/t/speckle-unity-2-0-feedback-wanted/1108)!


### Supported Categories

| BuiltElement                                          | Send | Receive | Status        |
| ----------------------------------------------------- | ---- | ------- | ------------- |
| Adaptive Component                                    | x    | x       | `Complete`    |
| Beam                                                  | x    | x       | `Complete`    |
| Brace                                                 | x    | x       | `Complete`    |
| Building Pad                                          | x    |         | `In Progress` |
| Ceiling                                               | x    |         | `In Progress` |
| Curves (Model, Detail, Room Boundary)                 | x    | x       | `Complete`    |
| Direct Shape                                          | x    | x       | `Complete`    |
| Duct                                                  | x    | x       | `Complete`    |
| Face Wall                                             |      | x       | `In Progress` |
| Family Instance                                       | x    | x       | `Complete`    |
| Floor                                                 | x    | x       | `Complete`    |
| Freeform Element                                      |      | x       | `In Progress` |
| Group                                                 | x    |         | `In Progress` |
| Level                                                 | x    | x       | `Complete`    |
| Opening (Wall, Vertical, Shaft)                       | x    | x       | `Complete`    |
| Pipe                                                  | x    | x       | `Complete`    |
| Project Information                                   | x    |         | `In Progress` |
| Railing                                               | x    | x       | `Complete`    |
| Roof (Extrusion, Footprint)                           | x    | x       | `Complete`    |
| Room                                                  | x    |         | `Complete`    |
| Stair                                                 | x    |         | `Complete`    |
| Topography                                            | x    | x       | `Complete`    |
| View (FloorPlan, CeilingPlan, Elevation, Section, 3D) | x    |         | `In Progress` |
| Wall                                                  | x    | x       | `Complete`    |
| Wire                                                  | x    | x       | `Complete`    |

| Other          | Send | Receive | Status        |
| -------------- | ---- | ------- | ------------- |
| RenderMaterial |      |         | `In Progress` |


### Supported Geometries

Generally speaking, Revit doesn't support raw geometry as it deals with families. Nonetheless, we've made it simple to receive some types of geometry directly, without the need of specifying family type, name or any other parameter.

| Geometry     | Send | Receive        | Status        |
| ------------ | ---- | -------------- | ------------- |
| Line & Curve |      | As ModelCurve  | `In Progress` |
| Brep         |      | As DirectShape | `Complete`    |
| Mesh         |      | As DirectShape | `Complete`    |

### Non Supported Elements

Various element and data types do not have a direct conversions in Revit. Therefore sending Numbers, Points, Vectors or other non supported elements will have no effects.

To use such data types in Revit you should check our our [Dynamo Connector](/user/dynamo)

:::tip

If non supported elements are received in this connector, no errors are thrown.

:::

## Updating Elements

The connector takes care of updating received elements automatically where possible (instead of deleting and re-creating them). This is preferred, as dimensions, ElementIds and other annotations are preserved.

Elements are updated under these two circumstances:

- If the element was created in another project/software and had been received previously: for example, BuiltElements that were created in Rhino or Grasshopper
- If the element was created in the same project you're working on: for example, if you send some walls to Speckle, edit them, and receive them again from the same stream

Here are some technical details if you're curious about what's happening behind the scenes:

- BuiltElements have a property called `applicationId`, this is different from the `id/hash` property on them, and represents the id of such element in the host application in which it was first created. If the element was created in Revit it’s the `UniqueId`, if coming from Grasshopper/Rhino an analogous field
- When a stream is received in Revit the `applicationIds` of all BuiltElements created are cached in the receiver
- When receiving a second time from the same stream, if the received elements have the same `applicationId` of something that was previously received (and it still exists in the document), the connector will attempt to modify them instead of creating new ones. If the update fails (or is not permitted by the API), it’ll delete them and create new ones
- If no cached element is found, but there is an element in the document with a matching `applicationId` that is used for the update (this is the case of someone restoring changes previously sent, in the same project)
- If an element being received doesn’t have an `applicationId` no update mechanism will happen (this could be the case of BuiltElements created in Python if no `applicationIds` are generated manually)

## BIM Data

All Revit type and instance parameters are automatically attached to each element when it gets sent to Speckle.

You can inspect them in our [Speckle Web App](/user/web.html) interface and from any other applications that let you explore object metadata (eg Grasshopper, Dynamo, Unity, etc).

![image-20210303224640764](./img-revit/image-20210303224640764.png)
