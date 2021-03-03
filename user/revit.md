---
typora-copy-images-to: img-revit
---

# Revit

Speckle currently supports Autodesk Revit 2019, 2020 and 2021.

## Getting Started

To install this connector and add your Speckle account proceed by following the instructions in [Speckle Manager](/user/manager).

Once installed you can find the Revit connector under the Addins tab.

![image-20210303191815524](img-revit/image-20210303191815524.png)

## User Interface

This connector uses our shared Desktop UI, head over [its section to see how it works](/user/ui).

### Filters

In Revit, various filters are available to give you more granular control on what elements to send.

![image-20210303192915561](img-revit/image-20210303192915561.png)

#### Category

The category filter lets you select one or more of the currently supported Revit categories. Once the filter is set, every time you click send, all objects of such category will be sent whether they are visible or not, and even if they were added after the creation of the filter.

#### View

The view filter works similarly to the category one, and lets you include all elements visible in one or more selected views.

#### Project Info

The project info filter lets you select non physical elements, such as levels, views, element types (their properties, not geometry) and project information.

#### Parameter

The parameter filter is quite powerful as it will filter all model elements that satisfy the, logical condition being set. For example, the below will select all elements whose Base Offset is greater then 2000mm.

:::tip NOTE

The list of available parameters is based off the elements in the model, if the model is empty no parameter will be available.

:::

![image-20210303201525577](img-revit/image-20210303201525577.png) 

## Supported Elements

We're working hard to support additional elements, the list below will be updated as soon new conversion routines are added.

If you'd like us to add something specific let us know on the [forum](https://discourse.speckle.works/t/speckle-unity-2-0-feedback-wanted/1108)!

| Type                                                  | Speckle > Revit | Revit > Speckle |
| ----------------------------------------------------- | --------------- | --------------- |
| Adaptive Component                                    | x               | x               |
| Beam                                                  | x               | x               |
| Brace                                                 | x               | x               |
| Building Pad                                          |                 | x               |
| Ceiling                                               |                 | x               |
| Curves (Model, Detail, Room Boundary)                 | x               | x               |
| Direct Shape                                          | x               | x               |
| Duct                                                  | x               | x               |
| Face Wall                                             | x               |                 |
| Family Instance                                       | x               | x               |
| Floor                                                 | x               | x               |
| Group                                                 |                 | x               |
| Level                                                 | x               | x               |
| Opening (Wall, Vertical, Shaft)                       | x               | x               |
| Project Information                                   |                 | x               |
| Railing                                               | x               | x               |
| Roof (Extrusion, Footprint)                           | x               | x               |
| Room                                                  |                 | x               |
| Stair                                                 |                 | x               |
| Topography                                            | x               | x               |
| View (FloorPlan, CeilingPlan, Elevation, Section, 3D) |                 | x               |
| Wall                                                  | x               | x               |

### Things to keep in mind

TODO
