# AutoCAD & Civil 3D

Speckle currently supports Autodesk AutoCAD 2021 and Civil 3D 2021.

⚠ _This connector is currently in alpha with limited functionality._

## Getting Started

To install this connector and add your Speckle account, follow the instructions in [Speckle Manager](/user/manager).
Once installed, you can find this connector in the `Add-ins` tab under `Speckle 2`. Click the plugin button to call the Speckle Desktop UI for sending and receiving streams.

![](/user/img-acad/setup-plugin.gif)

## User Interface

::: tip IMPORTANT 🙌

This connector uses our shared Desktop UI. Read up on general guidelines for usage in the [Desktop UI section](/user/ui).

:::

### Sending data

The AutoCAD Civil3D connector supports selection filtering by layer.

### Receiving data

Geometry from streams will be added to AutoCAD / Civil3D layers starting with a prefix with the following format:

```
stream[ branch @ commit id ]
```

Any layer information from the incoming stream will be appended to the prefix with the standard AutoCAD delimiter `$`. When recieving from applications (like Rhino) with nested layers, the incoming full layer path will replace any default delimiters with `$`.

![](/user/img-acad/receiving-layers.png)

## Supported elements

**AUTOCAD**
| Geometry       | Send | Receive | Status        |
| -------------- | ---- | ------- | ------------- |
| Point          | x    | x       | `Complete`    |
| Line           | x    | x       | `Complete`    |
| Arc            | x    | x       | `Complete`    |
| Circle         | x    | x       | `Complete`    |
| Ellipse        | x    | x       | `Complete`    |
| Polyline       | x    | x       | `Complete`    |
| Polycurve      | x    | x       | `Complete`    |
| Spline         | x    | x       | `Complete`    |
| Plane Surface  | x    |         | `In Progress` |
| Nurb Surface   | x    |         | `In Progress` |
| PolyFace Mesh  | x    |         | `In Progress` |
| SubD Mesh      | x    |         | `In Progress` |
| 3D Solid       | as Mesh    |         | `In Progress` |

| Other          | Send | Receive | Status        |
| -------------- | ---- | ------- | ------------- |
| BlockInstance  | x    | x       | `Complete`    |
| BlockDefinition| x    | x       | `Complete`    |

**CIVIL3D**
| Geometry      | Send | Receive | Status         |
| ------------- | ---- | ------- | -------------- |
| Featureline   | x    |         | `In Progress`  |
| Alignment     | x    |         | `In Progress`  |
| Profile       |      |         | `In Progress`  |
| Tin Surface   | as Mesh    |         | `In Progress`  |
| Grid Surface  | as Mesh    |         | `In Progress`  |
| Pipe          | as Mesh    |         | `In Progress`  |
| Structure     | as Mesh    |         | `In Progress`  |

### Unsupported elements

**AUTOCAD**

Hatches, labels, and annotations are not supported, as well as any unlisted element. Dynamic blocks are not supported at this time.

**CIVIL3D**

Subassemblies and Assemblies are not supported.

### Things to keep in mind

The AutoCAD Civil3D connector is very early stages, expect some 🐛s during use! Comments, feedback, and suggestions welcome in our [community Discourse](https://speckle.community/t/new-speckle-2-0-autocad-civil3d-suggestions/1155)!
