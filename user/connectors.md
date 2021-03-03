# Introduction

The Desktop Connectors are plugins for some of the most popular AEC software including Rhino, Revit, Grasshopper, Dynamo, AutoCAD, Civil3D, Unity, Blender and more. They take care of exporting and importing (or better, sending and receiving) data to Speckle Web - without the need of using files!

Want to see a connector for an application we don't support yet? [Let us know in the forum!](https://speckle.community)

## Installation

All our connectors (with a few exceptions) are distributed via [Speckle Manager](/user/manager).
Head over to that section to see how to install them and how to add an account!

## Units

The connectors take care of unit conversions for geometric objects so you don't have to worry about that. For example, if you're sending a 1 foot long line from Rhino to an AutoCAD document in mm it will measure exactly 304.8mm.

Unit conversion also automatically happens on BIM metadata, so if you're sending a Wall [using the Schema Builder](/user/grasshopper.html#schema-builder) node from Grasshopper to Revit the connectors will take care of converting the height for you.

::: tip IMPORTANT
Custom metadata and non-linear units are not currently being converted.
:::
