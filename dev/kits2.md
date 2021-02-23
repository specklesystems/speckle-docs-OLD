# Kits

## What Are Kits?

Kits are the tools Speckle uses to handle interoperability. They allow you to send objects to Speckle from various different AEC applications. They consist of two parts:

- **Types:** the object model that defines the structure of data
- **Converters:** implementations of conversion routines between the object model and various AEC applications

The default Kit that comes with Speckle is [Objects Kit](/dev/objects) which includes our object model and the converters for the software we officially support - at the moment that's Rhino/Grasshopper, Dynamo, and Revit. However, you are of course free to roll your own or fork and modify ours to suit your needs. As of the beta release, easy swapping of kits within the connectors is not fully supported. However, this will be fully supported by the time we officially ship 2.0 🎉

If you want more in-depth info on all things Kits and how this has changed from 1.0, check out the [deep dive](/deep-dives/kits).

## Types

A kit has a collection of supported *types*. These are the objects that have been defined in the kit and can be converted to and from Speckle - ie the object model. 

### Creating Types

There are a few general rules to keep in mind when writing these object classes.

#### 1. Always inherit from the `Base` class

This ensures serialisation and deserialisation happen through Speckle, with the default sane serialisation handling that we know we can support. Most importantly, it will enable type name handling and cross-kit legibility. For more on the `Base` class, head to the [deep dive](../deep-dives/base) on this subject.

#### 2. Reference loops will be ignored

You can always recreate them post deserialisation using a function flagged with the `[OnDeserialized]` attribute like so:

```cs
  [OnDeserialized]
  internal void onDeserialized(StreamingContext context)
  {
    Edges.ForEach(e => e.Brep = this);
    Loops.ForEach(l => l.Brep = this);
    Trims.ForEach(t => t.Brep = this);
    Faces.ForEach(f => f.Brep = this);
  }
```

#### 3. Keep data structures lean

You should prefer typed arrays over lists of non-primitive values. For example, instead of a `List<Point>` for keeping track of mesh vertices, use a `List<double>`

#### 4. Always include a parameterless constructor

This is for Newtonsoft serialisation / deserialisation. At worst, flag one constructor with the `[JsonConstructor]` attribute. Keep in mind this does indirect magic that can potentially trip you up - eg key names must match argument prop names. 

### Example

With these rules in mind, creating your own classes by subclassing `Base` is relatively straight forward. Additionally, there are also a few [interfaces](https://github.com/specklesystems/speckle-sharp/blob/master/Objects/Objects/Interfaces.cs) an object can inherit from including `ICurve`, `IHasArea`, `IHasVolume`, and `IHasBoundingBox`. 

For a simple example, this is what our [box class](https://github.com/specklesystems/speckle-sharp/blob/master/Objects/Objects/Geometry/Box.cs) looks like:

```cs
public class Box : Base, IHasVolume, IHasArea, IHasBoundingBox
{
  public Plane basePlane { get; set; }

  public Interval xSize { get; set; }

  public Interval ySize { get; set; }

  public Interval zSize { get; set; }

  public Box bbox { get; }

  public double area { get; set; }

  public double volume { get; set; }

  public Box() { }

  public Box(Plane basePlane, Interval xSize, Interval ySize, Interval zSize, string units = Units.Meters, string applicationId = null)
  {
    this.basePlane = basePlane;
    this.xSize = xSize;
    this.ySize = ySize;
    this.zSize = zSize;
    this.applicationId = applicationId;
    this.units = units;
  }
}
```

## Converters

Converters are the key to interoperability. They include the conversion routines for objects to and from the Types. You create a new converter for each different application you want to support by inheriting from the [`ISpeckleConverter` interface](https://github.com/specklesystems/speckle-sharp/blob/master/Core/Core/Kits/ISpeckleConverter.cs). All you converters should live together in the same kit alongside your types. You can see how we've implemented converters in our default Objects Kit [here](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Converters).

Converters exist in the `MyKit.Converter` namespace and can either be broken up into smaller partial classes for each supported type (see the Revit Converter) or for each category (eg `ConverterX.Geometry` and `ConverterX.BuiltElements` as in the rest of our converters).

The converters contain two key methods:

- `ConvertToNative`: converts a Speckle object to the native software
- `ConvertToSpeckle`: converts a native software object to Speckle

The specific conversion routines for each supported type are defined separately and called from these key methods. If the type is not supported, an error should be added to the converter's `ConversionErrors` and a null object should be returned. 

For example, here is a shortened version of the [`ConvertToSpeckle`](https://github.com/specklesystems/speckle-sharp/blob/9ba30e125f2bd65d2f746563d00a90a736ade116/Objects/Converters/ConverterRevit/ConverterRevitShared/ConverterRevit.cs#L69-L154) method in `ConverterRevit`:

```cs
public Base ConvertToSpeckle(object @object)
{
  Base returnObject = null;
  switch (@object)
  {
    case DB.DetailCurve o:
      returnObject = DetailCurveToSpeckle(o);
      break;
    case DB.DirectShape o:
      returnObject = DirectShapeToSpeckle(o);
      break;
    case DB.FamilyInstance o:
      returnObject = FamilyInstanceToSpeckle(o);
      break;
    case DB.Floor o:
      returnObject = FloorToSpeckle(o);
      break;
    // etc ...
    default:
      ConversionErrors.Add(new Error("Type not supported", $"Cannot convert {@object.GetType()} to Speckle"));
      returnObject = null;
      break;
  }
  
  return returnObject;
}
```

And here is the Revit [`BeamToSpeckle`](https://github.com/specklesystems/speckle-sharp/blob/9ba30e125f2bd65d2f746563d00a90a736ade116/Objects/Converters/ConverterRevit/ConverterRevitShared/Partial%20Classes/ConvertBeam.cs#L93-L111) method which is called by the `FamilyInstanceToSpeckle` conversion:

```cs
private RevitBeam BeamToSpeckle(DB.FamilyInstance revitBeam)
{
  var baseGeometry = LocationToSpeckle(revitBeam);
  var baseLine = baseGeometry as ICurve;
  if (baseLine == null)
  {
    throw new Exception("Only line based Beams are currently supported.");
  }

  var speckleBeam = new RevitBeam();
  speckleBeam.type = Doc.GetElement(revitBeam.GetTypeId()).Name;
  speckleBeam.baseLine = baseLine;
  speckleBeam.level = ConvertAndCacheLevel(revitBeam, BuiltInParameter.INSTANCE_REFERENCE_LEVEL_PARAM);
  speckleBeam["@displayMesh"] = GetElementMesh(revitBeam);

  GetAllRevitParamsAndIds(speckleBeam, revitBeam);

  return speckleBeam;
}
```

## Kit Interface

Once you've got your object model and your conversion routines, you can officially put together your kit by inheriting from the [`ISpeckleKit` interface](https://github.com/specklesystems/speckle-sharp/blob/master/Core/Core/Kits/ISpeckleKit.cs) and register your `Types` and `Converters`.

```cs
public interface ISpeckleKit
{
  IEnumerable<Type> Types { get; }
  
  IEnumerable<string> Converters { get; }

  string Description { get; }
  string Name { get; }
  string Author { get; }
  string WebsiteOrEmail { get; }

  /// <summary>
  /// Tries to load a converter for a specific app. 
  /// </summary>
  /// <param name="app">Must be one of the Kits.Applications variables.</param>
  /// <returns>The converter for the specific app, or null.</returns>
  public ISpeckleConverter LoadConverter(string app);

}
```

## Kit Manager

The Kit Manager is a handy tool for loading up different kits. By default, it looks for the kits in `AppData/Roaming/Speckle/Kits`. To explore all its features, have a look at the code [here](https://github.com/specklesystems/speckle-sharp/blob/master/Core/Core/Kits/KitManager.cs). 

See below for a simple example of getting a list of available kits, selecting a specific kit, and loading a converter. 

```cs
// Get a list of all available kits
var kits = KitManager.Kits

// Get a specific kit by name or from the assembly full name
var kitByName = KitManager.Kits.FirstOrDefault(kit => kit.Name == "CoreKit");
var kitFromAssembly = KitManager.GetKit(typeof(CoreKit).Assembly.FullName);

// Load the default Objects Kit and the included Revit converter 
var kit = KitManager.GetDefaultKit(); 
var converter = kit.LoadConverter(ConnectorRevitUtils.RevitAppName);
converter.SetContextDocument(CurrentDoc.Document);

```