# Objects Kit

## Introduction

Objects Kit is the default [Speckle 2.0 Kit](/dev/kits). It includes geometry and element base classes as well as conversions routines for the AEC applications that we support. Objects uses .NET Standard 2.0 and has been tested on Windows and MacOS.

While Objects Kit is the default, you are free to develop your own Kit or fork this one to customise it yourself. As of the beta release, easy swapping of kits is not fully supported. However, this will be fully supported by the time we officially ship 2.0 🎉

More info on Objects and Kits 2.0 can be found in our [deep dive into kits](/deep-dives/kits).

## Developing

Objects Kit is just a set of simple Data Transfer Objects that are fairly straightforward to understand. The object model is split into two main parts: 

- `Geometry`: the basic building blocks suck as points, lines, meshes, surfaces, etc
- `BuiltElements`: higher level elements such as rooms, beams, ducts, openings, topography, etc

### Specific Host Application Support

The basic objects are intended to be as general as possible 

In order to better support interop between the various AEC host applications and Speckle, Objects also contains classes that help to deal with native object types and their properties. These inherit from a more generic Speckle object but add additional properties that are important for specific applications, but are too specific to include in the generic object.

For example, `Objects.Revit` contains a series of classes that extend the basic ones with a series of default Revit properties. This is the approach we'll follow with other host applications as well.

