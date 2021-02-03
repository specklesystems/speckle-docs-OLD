# The Base Object

This post was originally part of the Making Speckle 2.0 series of posts on the community forum. Check it out on the forum [here](https://discourse.speckle.works/t/core-2-0-the-base-object/782?u=izzylys)!

## Preamble

The .NET SDK for Speckle is probably one of the most critical pieces of infrastructure in Speckle as it's used by the Revit, Dynamo, Grasshopper, Rhino and GSA connectors - and more to come. It's also the first one being done, and, as such, can be seen as the "canonical" SDK that implementations in other languages can look towards and decide how (and what!) to port over. 

This will be a series of RFC on what's happening in the 2.0 version of the .NET SDK. We start off with a lighter - but quite central - discussion on the base Speckle object.

1.0 was plagued by several problems. In this post, we're addressing some of them:

- base object extension with dynamic properties was... not that ergonomic: everything would be stored in `myObject.properties` and this made queries, etc. quite difficult.
- hashing was inconsistent and inefficient: inconsistent because kit developers could override it (with mixed results... I'm personally guilty here!), or leave it to Core to generate it; inefficient because it implied serialising an object twice - once for generating the hash, and another time for actually piping into the server.

## The Base Object

Small recap: the base object class all other Speckle Kit objects were inheriting from was called `SpeckleObject`. It's one of the smallest, yet most critical parts of the .NET SDK as decisions made here influence the serialisation & deserialisation process, hashing speed & correctness, overall performance, etc. 

In 1.0, the base `SpeckleObject` was just a POCO with some extra properties that Speckle needed, namely a hash and a properties bag where you could store any extra fields that were not strongly typed. This allowed for "endless" extensibility by end-users (through the *create a speckle object* component in Grasshopper, or programatically). 

In 2.0, the base object (actually called `Base`) inherits from a C# dynamic object. This allows us to be strongly typed when needed, but as well fall back elegantly on dynamic properties when we want to, or need to. Imagine a crossover between a JavaScript object and a strongly defined C# class. It's quite cool! Furthermore, this removes the need for a special `properties` bag of `Dictionary<string,object>` and will remove some of the friction in Python and JS implementations. 

```csharp
// Simplified class defintion:
public class Base {
	public string id { get; set; } // this is the hash!
    public string applicationId { get; set; } // a secondary identity mechanism, optional.
	public string speckle_type { get; } // This is the discriminator. It's set for you - and we still have to figure things out here. @davidekoning pointed us in the right direction (see previous post on kits & versioning).
} 
```

### Direct Usage

Here's how you would use a "raw" `Base` object as a custom data structure. It's essentially just a dynamic object at heart. 

```csharp
var myObject = new Base();

// setting properties using dot notatin requires cast to dynamic
((dynamic)myObject).myNewProperty = "foo";

// alternatively, just pretend it's a dictionary!
myObject["myNewProperty2"] = "bar";
```

You can define singular objects like this - like something representing a built element; alternatively you can define your own object collection types based on the source application you're working from. 

```csharp
var myCommit = new Base();
myCommit["RhinoLayer-A"] = new List<Base>() { ... };
myCommit["RhinoLayer-B"] = new List<Point>() { ... };
myCommit["RhinoLayer-A:RhinoLayer-C"] = new List<String>() { ... };
```

### Inherited Usage

Of course, you can define custom classes that inherit from `Base` and define strongly typed properties in there, which can then be accessed as usual; these can easily coexist alongside dynamic ones.

```csharp
public class Point : Base {
  // define a set of strongly typed properties
  public double x { get; set; }
  public double y { get; set; }
  public double z { get; set; }
}

// Strongly typed props behave as you would expect them to:
var myPt = new Point();
myPt.x = 10; 
var whatIsX = myPt.x;

// With a dynamic property, things are a bit more verbose, but still managable: 
((dynamic)myPt).bar = "baz";
var whatIsBar = ((dynamic)myPt).bar as string; // "baz"

// Alternative syntax, if you actually pass the property name at runtime:
var whatIsBar = myPt["bar"] as string; // "baz"

```

Side note: setting a dynamic property that overlaps with a strongly typed one will actually just set the strongly typed one 🙂

All kit object models are inheriting from the `Base` object class for their object definitions. This ensures that Speckle will be able to transport them! 

## Hashing

As you may or may not know, objects in Speckle are immutable. That means that if you change a property of one, it essentially gets a whole new identity; it's a whole new object (as far as the storage layer is concerned). This immutability is enforced through unique hashes that are dependent on the object's properties. 

**In 1.0**, the hashing process was a bit of a mess. If it was explicitly defined by the developer of the kit, then that would take precedence. If no hash was defined, then it would be automatically generated by the SDK by serialising the whole object and hashing its string representation. This was not very efficient as it meant serialising each object twice: once for hashing, second time in the actual serialisation process.

**In 2.0**, as a developer, you don't need to care about all this anymore 🙌The .NET SDK takes care to correctly set the hash of an object, at the correct time: at the end of the serialisation process. There's another purely cosmetic change that we made: the hash is now stored in an field called `id`. Why? Mostly so it's clear that it's the single object identity mechanism that **should** used across all storage layers. 

What about operations that were dependent on hashes? From our analysis of existing programmatic usage, you rarely really need the hash of an object before serialising (and, implicitly, storing it somewhere). When retrieving objects from "somewhere" (more on this in another post), the hash already exists, so you can check against an existing application state and manage updates. 

```csharp
var x = myObject.id; // will be populated only if this object has been previously serialised!
```

If you really need the hash (id!) before serialising it, don't panic! You can still generate it - nevertheless we've put that behind an explicit function call so you, as a developer, are aware of the extra cost that you will be incurring. Here's how the signature of that function looks like:

```csharp
/// <summary>
/// Gets the id (a unique hash) of this object. ⚠️ This method fully serializes the object, which in the case of large objects (with many sub-objects), has a tangible cost.
/// <para><b>Hint:</b> Objects that are retrieved/pulled from a server/local cache do have an id (hash) property pre-populated.</para>
/// <para><b>Note:</b>The hash of a decomposed object differs from the hash of a non-decomposed object.</para>
/// </summary>
/// <param name="decompose">If true, will decompose the object in the process of hashing.</param>
/// <returns></returns>
public string GetId(bool decompose = false) { }
```

Noticed that `decompose` flag? You're sharp - read below for more. 

## Next Up: Decomposing and Recomposing

Here is where things will get actually quite interesting and exciting. Object (de)composition and (de)serialisation is actually a **difficult** problem. In 2.0, we're solving some of the problems we didn't consider in 1.0, namely around how design data is actually structured. As a small recap, 1.0 was built around the assumption that most design data can be stored as a flat list of objects. 

This worked surprisingly well - most authoring software we integrate with works like that, or could be made to work like that. Nevertheless, we were not serving the use-cases around deeply nested built elements in a very efficient manner - this made for some painful workarounds. In 2.0, we've eliminated this problem: **Speckle can handle equally well structured data as well as flat data.**

Hopefully this is enough of a teaser - stay tuned for the next post, where we'll be introducing the `[Detach]` attribute and explain how it works.