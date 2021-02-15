# Rhino ➡ Revit

Speckle 2.0 gives you the option of streaming objects as base geometry from Rhino to Revit, or directly into Revit families as BuiltElements through the Rhino schema builder commands. 

![Direct Conversion Example]()

## Features

Currently, direct conversions are available for the following types:

| Base Geometry | BuiltElement schemas | Revit type |
| ------------- | -------------------- | ---------- |
| Planar surface | `Wall` `Floor` `Ceiling` `Roof` | |
| Planar polysurface | `Wall` | |
| Planar and nurbs surface | `FaceWall` | x |
| Line | `Column` `Beam` | |
| Brep / extrusion | `DirectShape` | x |
| Mesh | `DirectShape` | x |

## Walkthrough

Stream your Rhino objects directly into Revit as BuiltElements! Rhino to Revit interop uses a custom Speckle Attribute User Text (AUT) string to determine an object's schema before sending streams. AUTs are modified with two commands:
 - `ApplySpeckleSchema` gives you options for adding AUTs to model objects
 - `RemoveSpeckleSchema` removes schema AUTs from model objects
Some schemas have additional parameters that can be manually modified for custom control over parameters like Revit Family or Revit Type.

## Assigning schemas

![ApplySpeckleSchema Example]()

### The automagic method 

The easiest way to assign schemas to your Rhino objects is to let the Speckle schema builder decide for you!

 1. Type `ApplySpeckleSchema` in the command line
 2. Select objects for BuiltElements conversion
 3. By default, `Automatic` is set to `On`. Press **Enter**!
 
 The algorithm for automatic schema application takes into account object and layer naming before it tries to find the best BuiltElements schema to apply. For example, if an object has *Wall* in its name, or in the absence of a name, the object is nested in a layer with a name that includes *Wall*, then the automatic method will try to send the object as a Speckle `Wall` element. If the algorithm can't find a BuiltElements type in either the object or layer name, it will analyze the object geometry and try to find the first schema fit based on the object's properties.
 
 **note** `DirectShape` conversions are not assigned during the automagic method. If an XY planar surface does not have a specific schema in its object or layer name, it will default to `Floor`, instead of `Roof` or `Ceiling`.
 
### The single schema method

You can assign a specific schema to selected objects through the single schema method: this method also includes conversions to `DirectShape` and `FaceWall` schemas.

1. Type `ApplySpeckleSchema` in the command line
2. Set `Automatic` to `Off`
3. Select a `Schema` option
4. By default, `DirectShape` is set to `Off`. To send as a DirectShape instead of a native object, set the toggle to `On`. 
5. Select objects for schema application, and press **Enter**!

### Customizing properties

Revit-specific BuiltElements schemas such as `FaceWall` and `DirectShape` can be manually customized with additional properties. By default, these schemas will have a user string with the following formats:

```
FaceWall([family], [type])
DirectShape(Schema, UniqueName)
```
To assign custom values, select your FaceWall or DirectShape object and navigate to its User Attribute Text panel. Double click on the *SpeckleSchema* entry value and replace the `[]` properties with custom values if you want to assign a specific Revit family or type to your `FaceWall` object. If no changes are made, FaceWalls are assigned to the `Basic Wall` type by default. For DirectShapes, a unique shape name is automatically generated, but can be changed to a custom string if desired.

## Removing schemas

Removing schemas from Rhino objects is super easy:

1. Type `RemoveSpeckleSchema` in the command line
2. Select objects to remove schemas from
3. Press **Enter** - Speckle AUT strings are now deleted from all selected objects!

