# Objects

The default Speckle 2.0 object model: geometry and element base classes. It uses .NET Standard 2.0 and has been tested on Windows and MacOS.

**NOTE:** this is the default object model we ship with Speckle. You can develop your own or fork this and extend it too!

More info on Objects and Kits 2.0 can be found in [this community forum thread](https://discourse.speckle.works/t/introducing-kits-2-0/710/34).


## Building

Just restore all the NuGet packages and hit Build!

## Developing

Objects is just a set of Data Transfer Objects, it's quite straightforward to understand how they work!

### Host application support

In order to better support interop between the various AEC host applications and Speckle, Objects also contains classes that help to deal with native object types and their properties.

For example, you'll see a `\Revit` folder. That contains a series of classes that extend the basic ones with a series of default Revit properties. This is the approach we'll follow with other host applications as well.

