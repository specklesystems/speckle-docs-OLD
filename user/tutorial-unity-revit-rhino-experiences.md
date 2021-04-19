---
typora-copy-images-to: img
---

# Create interactive real time experiences with Unity, Revit and Rhino

>**Level:** advanced
>
>**Author:** Matteo
>
>**Software used:** Unity, Revit 2021, Rhino 6-7

In this tutorial we will create an interactive Unity app that renders Revit data in real time. We'll see how the Unity connector works and how to write custom code that pulls data from Speckle that was generated in Revit and Rhino. We'll also see how to work with streams and branches to organize data.

<div style="position: relative;padding-bottom: 56.25%;"><iframe width="100%" height="100%" style="position: absolute;" src="https://www.youtube.com/embed/VEipv8XzPdI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

The Unity Connector is evolving fast, to follow this tutorial it is recommended that you pull the version at the start commit as future versions might be different.

- [start commit]() - use this if you want to follow along.
- [end commit]() - the finished version, if you just want to skip to it!

## Preparing the models

The Unity app we are writing will let users receive (download) into their scene any model they have available in their Speckle account.

### In Revit

Assuming you don't have any model, let's first set one up. We'll be using the most boring model ever, the Revit Basic Sample - you can of course use a different project!

You can also just [download a copy of the model](https://drive.google.com/file/d/18UK-aJFzjFEn-Gys_qGFfp9X4HwToNUr/view?usp=sharing) with the required edits already applied.

![image-20210417180122622](img/image-20210417180122622.png)

::: tip

If using a Revit model, you'll need to **edit the door families so that they are open**, this will let you walk through the model instead of just slamming into it.

:::

We'll use this model for a walkthrough, but we'll want to let the users dynamically replace some of its components. In this case, I decided **the big fireplace in the living room** is a good candidate.

- select it
- open the Revit Connector
- create a new stream and then a new branch named 'fireplace'
- click on _0 objects_ and then _Set selection_
- now click _send_

![tutorial-unity-sending](img/tutorial-unity-sending.gif)

Now let's **delete the fireplace and send the entire model**:

- delete the fireplace
- select the entire model
- select the _main_ branch
- set the selection again and click send

### In Rhino

We'll use Rhino to create some alternative "furniture" to use instead of the fireplace, here you can get creative!

It's important that this new geometries are located exactly where the fireplace is, so first receive that by using the Grasshopper or Rhino connectors and use it as a base to align the other objects you are creating.

You can download the two geometries I'm using [from this Rhino 7 file](https://drive.google.com/file/d/1dvG_CBB4l7Zc14lCA1UGBr6ruNWSZP0G/view?usp=sharing).

::: tip

Remember to set your desired materials on the objects before sending them.

:::

Now we can **send both the bunny and the statue to the same stream we created in Revit, but each in its own branch**.

![tutorial-unity-rhino](img/tutorial-unity-rhino.gif)

### In the 3d viewer

If you've followed all the steps correctly, this is what you should have when viewing the stream online.

![tutorial-unity-viewer](img/tutorial-unity-viewer-1618681212999.gif)

## Writing the Unity app

### Preparing the scene

Back in Unity, we can start to work off the _SpecklePlayground_ scene already existing.

We'll need to add a first person controller, I downloaded [this simple one from the asset store](https://assetstore.unity.com/packages/tools/input-management/mini-first-person-controller-174710).

We can then disable or delete some other game object not needed for this tutorial:

![image-20210417192529071](img/image-20210417192529071.png)

I've also enabled Global Illumination to make everything look nicer.

### Adding custom logic

Now, since most the logic to receive streams and to create UI components already exists in the scene, we just need to add a small script.

Create a `Tutorial.cs` file with the following content:

```csharp
using UnityEngine;

public class Tutorial : MonoBehaviour
{
  private bool _uiMode = false;
  public GameObject UI;
  public GameObject Controller;
  private CanvasGroup _canvas;
  private MonoBehaviour _cameraScript;

  void Start()
  {
    _canvas = UI.GetComponent<CanvasGroup>();
    _canvas.alpha = 0.5f;

    _cameraScript = Controller.GetComponentInChildren<FirstPersonLook>();
  }

  void Update()
  {
    if (Input.GetKeyDown(KeyCode.E))
    {
      _uiMode = !_uiMode;
      _cameraScript.enabled = !_uiMode;
      _canvas.alpha = _uiMode ? 1 : 0.5f;
      Cursor.lockState = _uiMode ? CursorLockMode.None : CursorLockMode.Locked;
    }
  }
}

```

This enables and disable the _edit mode_ when pressing the `E` key.

Create a new game object and attach the script above to it, that's it! Your app is now complete :)

::: tip

Note that, when adding a receiver if you leave "Auto Receive" ticked, the geometry will be automatically updated as soon as a new commit is pushed to that stream/branch.

:::

### Further developments

Now, this apps is of course an over simplification of what a proper interactive real time app would look like, but it's a great starting point!

The UI and logic can be completely customized, a good starting point for this would be looking into the `SpeckleExamples.cs` class or the prefabs used for the UI components.

For instance, you could perform different actions when the data is received or consume the Revit metadata attached to the objects with a script, and instead of having the stream cards custom for a UI, custom buttons could be added to pull a specific commit and model.
