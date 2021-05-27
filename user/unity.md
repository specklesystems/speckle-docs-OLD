# Unity

Our Unity connector differs form the other connectors described in our User Guide as it's meant to be used by developers.
It doesn't have an elaborated UI but it offers convenience methods to send and receive data.

Complementary to the information below, you should check out the [.NET SDK section](/dev/dotnet) too!

::: tip
Check out our [Unity tutorial](/user/tutorial-unity-revit-rhino-experiences)!
:::

![unity example](https://user-images.githubusercontent.com/2679513/108543628-3a83ff00-72dd-11eb-8792-3d43ce54e6af.gif)

## Getting Started

To use this connector you should first install and add a Speckle account by following the instructions in [Speckle Manager](/user/manager).
Then you can proceed to clone the [Speckle Unity repository on GitHub](https://github.com/specklesystems/speckle-unity).

The repo contains a sample scene named `SpecklePlayground` that shows how to send and receive data from your default account.

## Editor time Sending and Receiving

Coming soon!

## Game time Sending and Receiving

Sending and receiving supports either flat and nested structures (such as Grasshopper tress and Dynamo nested lists).

### Receiving

To receive data please refer to the [`Receiver.cs`](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Receiver.cs) class in `Assets\Speckle Connector`. This is just a wrapper around methods in [Core](/dev/dotnet), an example usage follows:

```csharp
var receiver = myGameObject.AddComponent<Receiver>();
receiver.Init(streamId);
receiver.Receive();
```

The `Init()` method accepts additional optional arguments to use different accounts, automatically receive updates, delete the old objects, report progress and errors etc. Please check the [source code](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Receiver.cs) for a complete list.

### Sending

To send data please refer to the [`Sender.cs`](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Sender.cs) class in `Assets\Speckle Connector`. This is just a wrapper around methods in [Core](/dev/dotnet), an example usage follows:

```csharp
var sender = myGameObject.AddComponent<Sender>();
sender.Send(streamId, objs);
```

The `Send()` method accepts additional optional arguments to use different accounts, report progress and errors etc. Please check the [source code](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Sender.cs) for a complete list.

### Supported elements

We've only started supporting Unity elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Type                 | Speckle > Unity | Unity > Speckle |
| -------------------- | :-------------: | :-------------: |
| Point                | ✅               | ✅               |
| Line                 | ✅               |                 |
| Polyline             | ✅               |                 |
| Curve                | ✅               |                 |
| Mesh                 | ✅               | ✅               |
| BuiltElements 3DView | ✅               |                 |

### Metadata

Geometry alone is not much fun, that's why we've made it easy to also transfer BIM and custom data with your objects.
When receiving, a `SpeckleProperties` component is attached to each object, inside it there is a `Dictionary<string,object>` called `Data` that contains all the metadata coming from Speckle. Likewise, when sending if the objects have a `SpeckleProperties` component attached to them, it will be used.

### Materials

We have included basic material support in Speckle and in some of our connectors.

When receiving, the Unity connectors first checks if a shader exists in the scene that matches the incoming object's material by name. If none is found it tries to creates a basic material with the same color and transparency. If no material is set on an incoming objet a default material is applied.
