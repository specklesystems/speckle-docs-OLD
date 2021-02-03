# Kits

This post was originally part of the Making Speckle 2.0 series of posts on the community forum. Check it out on the forum [here](https://discourse.speckle.works/t/introducing-kits-2-0/710?u=izzylys)!

With this post we want to explain how we are planning to restructure **Speckle Kits** for 2.0. The main goal of these changes is improving stability and ease of use.

> If you're not familiar with Kits and what they do, here's a quick overview below. For a longer overview, Dimitrie previously [wrote an article about it here](https://speckle.systems/blog/schemas-revisited). More specific information can be found in the [developer documentation here](https://speckle.systems/docs/developers/object-models/).

## Overview: What is a Kit?

![what is a kit?|690x195](https://discourse.speckle.works/uploads/default/optimized/1X/f7ce9276c37b105133e7eccf0e376ae3093a991d_2_690x195.png) 

Kits are at the heart of how Speckle *manages* interoperability. They are, in a nutshell, a package consisting of:

- **an object model** that defines the structure of data
- **implementations** for various AEC authoring applications (ie, conversion routines that make the translations happen)

Whenever a connector is "sending to Speckle", it needs to convert data (lines, points, beams, doors, etc.) into this intermediate object model. Upon receiving, the opposite conversion happens.

Kits are not tied into the core of Speckle, they are pluggable. Anyone **can add/remove them as they wish or develop their own**. We've seen various h4cK3r$ writing their own kits - if you're one of them, we'd love to hear your feedback and understand how you've been using kits so far! 

## Kits 1.0

In the current iteration of Speckle we've created and have been distributing by default a few kits:

- [CoreGeometry](https://github.com/speckleworks/SpeckleCoregeometry) - mostly geometrical objects, and some others.
- [Elements](https://github.com/speckleworks/Speckleelements) - general purpose BIM elements (currently *very* Revit centric)
- [Structural](https://github.com/speckleworks/SpeckleStructural) - structural specific (curated by Arup)

![How Kits worked in 1.0|690x299](https://discourse.speckle.works/uploads/default/optimized/1X/014484c61a706c1e1bf3b1c3280be5218dbdfc43_2_690x299.png) 

Whenever a connector (ie. the Rhino connector) wants to send something, let's say a Rhino line (again, it also applies to the 'receive' part), it will call a method in Core that will:

- using reflection, it will go through each kit it can find on the users's machine and get all methods capable of converting a Rhino line to Speckle
- pick the first one and try convert the line
- if the conversion fails, it'll move onto the second match; etc.

This approach worked great so far. It nevertheless has a few limitations in the way it's currently implemented in 1.0:

- it's an heuristic approach because **the connector** doesn't really know or can't really choose what Kit to use,
- there is a high chance of conflicts if, for instance, someone introduces a new kit with the same methods of another kit, the connector could be picking the wrong method,
- because of the large amount of reflection being used, it's hard to debug and it's difficult to report warnings and errors to the end user when something goes wrong.

Most importantly, the conversion operation - handled by Core - was not deterministic. You were not guaranteed to get the right conversion, and, as a developer, the only control mechanism you had was to exclude some kits. 

## Kits 2.0

Going forward, in 2.0, each Kit will be assumed to be able to handle all element types passing through Speckle. Additionally, when a connector needs to convert an object, it will explicitly pick what Kit to use, if more than one is available.

![The problem with using multiple Kits simultaneously](https://discourse.speckle.works/uploads/default/optimized/1X/f9890eead0fb8aa7bbe141a6cf7dd16453b0d176_2_690x449.png) 

As a direct consequence, the previously existing kits (Geometry and Elements) will be merged into a single kit - currently named **"Objects"**. The Objects Kit will consist of:

- A project containing the schemas (class definitions) *(separate nuget)*
- A set of projects containing the conversion routines for host software:
    - ConverterRevit *(separate nuget)*
    - ConverterDynamo *(separate nuget)*
    - ConverterRhinoGrasshopper *(separate nuget)*

The conversion flow in 2.0 is greatly simplified: 

- convert the object using the provided `ISpeckleConverter` class.
- if the conversion fails, send an error back.

# Discussion Time!

This new approach solves most of the issues of 1.0, but it does introduce a few new challenges, which we hope to discuss with you. The list below is by no means exhaustive, so feel free to add  your voice. 

## Versioning

How will we manage versioning and backwards compatibility? 

### (A) The simple solution

**Never remove, modify or change an existing property from a class.** To keep things tidy, there's several preliminary thoughts:

- mark old, no longer used properties, as `[Deprecated]`
- make sure that they have "sane" default values

### (B) The complicated solution

- If **non-additive changes** happen in the object model (ie, a property is changed, renamed or removed), the **kit's minor version number should be bumped** (ie, from 2.0.0 → 2.1.0).
- On the end-users's machine, we always install (and keep) the new minor version alongside all the old minor versions of the same kit (e.g, `~/SpeckleKits/MyKit/[2.0.0], [2.1.0], [2.n.x]`).
- Each object, when converted, will contain the version number of the kit, so that Core can pick up the correct one.

Both have advantages and disadvantages. We're inclined towards (B) though, as it would provide a more rigorous framework with less room for errors.

## Extending An Existing Kit & Swapping Kits

This one packs a few more questions. 

Because of the potential for conflicts & confusion (code-wise) in conversions, etc. we'll go for a single-kit approach: you will be able to use different kits, but they'll need to function independently.

One of the reasons for the change is also that, while we've seen quite a few custom kits being developed by our community, we've rarely seen people needing to swap between kits (or sets of kits). The logic here is that, if company Rando develops a RandoKit, they will be using their kit and won't need the official SpeckleKit active at the same time.

**Swapping: Should end-users be able to swap kits from the connectors UI, or should it be an system admin setting?** 

To start with it will be only be a general/system setting, mainly due to time and dev constraints on our end. We will add an option to swap kits in the connector uis in the beta stage. 

**Extending: How do I extend an existing kit?** 

Simple, just fork it and add your extensions/changes. If you feel they're useful, send a PR and we'll look into merging upstream. 

**Kits from scratch?** 

Totally doable. We'll provide instructions on how to create a Speckle 2.0 compatible kit. 

## Licensing

**Should we license the core speckle kit under a copyleft license?** 

This question comes from the fact that we want to share the burden of interoperability and be able to deliver the best & most seamless conversions we can. A copyleft license would encourage that others that extend the existing Objects Kit will share their contributions back - and thus potentially make their way upstream and not get locked into proprietary code bases. 

**On the other hand, there's a perceived fear around copyleft licenses and we would definitively like to hear from you what implication that would have on your potential to contribute and collaborate.** 

### Extras: Naming Changes

The image below show ho we are planning to rename the various VS projects.

![Renaming kits in 2.0|690x336](https://discourse.speckle.works/uploads/default/optimized/1X/3f9e854db48b5f818b3adb743a0e020cdd5968f2_2_690x336.png) 

### Conclusion

Like with all changes, some people are going to like them and others won't, we know it and understand it! Therefore we'd love to hear your thoughts on this, we'll be following up soon with code samples and alpha versions!