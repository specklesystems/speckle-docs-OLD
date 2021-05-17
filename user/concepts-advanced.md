# Advanced Concepts

Congratulations on being an advanced user of Speckle. 
You've breezed through our git-based walkthrough guide and have arrived at the hard stuff. 

A lot of careful thought has gone into planning Speckle v2.0.
Its architects is designed to be modular, swappable and hackable.

## The Base Object

The `Base` object is probably not something you'll have to deal with directly when you're just getting started with Speckle. However, it is a helpful concept to be aware of if you want to get into creating custom Speckle objects, working on your own conversions, or building scripts or apps on top of Speckle.

### What is it?

Sending a collection of Revit elements? Each of those elements is being converted into a Speckle Object equivalent which inherits from the `Base` class. The commit you just created when sending those elements? That is also a `Base` which contains all the Revit elements nested within it.

The `Base` object is the building block of Speckle data. It is a dynamic object that is the "base" of all other Speckle objects. The `Base` and other objects that inherit from it have a combination of pre-defined properties (eg `id`, `speckle_type`, `units`) and dynamic properties which can be added on the fly. Property values can also be other `Base` objects such as a `RevitColumn` containing a `Line` representing its base line.

An key feature of the `Base` object is _decomposition_. This allows you to flag properties as _detachable_ so they exist outside of the parent `Base` object and can be stored and retrieved separately. As a simplistic example, say you have several `Beam` and `Wall` elements that all want to reference the same `Level`. Instead of creating multiple copies of this `Level` and storing it within each of the `Beam` and `Wall` objects, you would instead make the `Level` detachable in the `Beam`s and `Wall`s. This allows all the objects to reference the same `Level` which is stored once individually.

### How do I use it?

When using the connectors to send existing data, you won't really need to think about the `Base` object as all this is taken care of for you behind the scenes. The objects in your model are converted to Speckle `Base` objects and then are nested within a parent `Base` object to create the commit - all when you press the "Send" button.

If you are getting into creating your own `Base` objects, our [The Base Object](/dev/base) section and the [Decomposition API](/dev/decomposition) are a great way to get started.

## Transports
For a detailed overview of Transports, see our deep dive post:

## Speckle Kits
For a detailed overview of Speckle Kits, see our deep dive post:
