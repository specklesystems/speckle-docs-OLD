# Zero to Speckle ASAP

Pressed for time? Too impatient to read through a lot of docs? Already familiar with what Speckle is about and want to get started as fast as humanly possible? Here's a lightning fast intro to getting started!



## Onboarding

Before you can use Speckle, you'll need an account! Register by using the URL provided by your company or use our [free official server](https://speckle.systems/getstarted/).

As you register you'll be guided through a quick onboarding process.

::: tip Psss!

Did you skip the onboarding? No problem, just head over `https://your-server-address/onboarding`

:::

This will guide you thorough:

- downloading [Speckle Manager](https://speckle-releases.ams3.digitaloceanspaces.com/manager/SpeckleManager%20Setup.exe) - the one stop solution for account and connector management
- adding your account
- creating your first stream

See additional ways to add your account in [Speckle Manager](/user/manager.md#adding-account)



## Web

The [web frontend](/user/web) is your gateway to the server. From here, you can browse server activity, view and manage streams, share your streams with others, visualise your data in the 3D viewer, and more!

### Exploring the Frontend

Once you've authorised the Manager, you are ready to use the desktop [Connectors](/user/connectors)! However, there is still lots to explore on the [web frontend](/user/web). Beyond basic stream creation and browsing, you can create new branches (and soon - commits!), add or remove collaborators, view and edit your profile, manage your authorised apps, and create personal access tokens to use in your own scripts and apps. If you're interested in experimenting with the API, check out our [dev sections](/dev/server-api.).

![image-20210322192558215](img/quickstart/image-20210322192558215.png)

## Connectors

The Desktop Connectors are what connect your AEC software to Speckle. They allow you to select, send, and receive data to and from a Speckle server. Currently, we have a growing list of official Speckle Connectors including [Rhino](/user/rhino), [Revit](/user/revit), [Grasshopper](/user/grasshopper), [Dynamo](/user/dynamo), [AutoCAD](/user/autocadcivil), [Civil3D](/user/autocadcivil), [Unity](/user/unity), Blender and more.

### Installation

The official connectors can be installed through the "Connectors" page of the Speckle Manager. Simply select which one you'd like to install from the list, and the Manager will do the work for you.

![manager-connectors](https://user-images.githubusercontent.com/7717434/106609134-2b6f2400-655d-11eb-8d2a-1730115e3bc7.gif)

### Grasshopper and Dynamo

The connectors for [Grasshopper](/user/grasshopper) and [Dynamo](/user/dynamo) are fairly aligned. The most important components are `Send` and `Receive` which do what they say on the tin. They use the default account you've set in Speckle Manager, though there is also an `Account` component to switch accounts.

You also get components to `Create`, `Get`, `Update`, and `Delete` streams as well as get a `List` of your streams or more `Details` for a stream. Streams can be retrieved by either using the `List` component or the url to the stream or a specific commit.

Finally, there are more advanced components for creating and expanding custom objects, serialisation, and local sending / receiving.

![Create commit](./img-dyn/guide-send-create-commit.gif)

### Revit, Rhino, AutoCAD, Civil3D

Applications like Revit and Rhino share the same Desktop UI. The main page displays all the streams that exist in the current file as cards. A card can be either a Sender or Receiver - click the double arrow button on the top right corner of a card to switch between them.

![desktopui home page with labelled buttons](https://user-images.githubusercontent.com/7717434/107382404-badd7f80-6ae7-11eb-9941-2265b1cc5748.png)

The big blue button in the bottom right corner will let you add an existing stream or create a new one. Once you've added a stream, you'll see a new Sender card on the home screen. You can click the centre "0 objects" button to add objects to the stream using selection or filters. Once you've added objects, you can send by clicking the big blue Send button. If you want to add a commit message, just click the three dots menu to the right of the Send button.

![desktopui-new-stream](https://user-images.githubusercontent.com/7717434/106741747-08ec1200-6614-11eb-9162-829670899da9.gif)

Clicking on a stream card will let you edit it's name and description, add collaborators, or remove the stream from the file.

A Receiver has a commit selection button in the centre instead of an objects selection button. This button opens a menu that lets you choose if you want to receive a specific commit or just the latest commit.

![desktopui-switch-cards](https://user-images.githubusercontent.com/7717434/106739209-c5dc6f80-6610-11eb-8625-01b19240c612.gif)

#### Further Reading

For information on using specific connectors, check out the [Desktop Connectors](/user/connectors) section of the User Guide.

If you'd like more detailed step-by-step guides for sending data from AEC Software A to AEC Software B, check out our [tutorials](/user/interop-gh-revit)

## Conclusion

That's all, folks! You are now successfully set up and have the tools to send and receive your data using Speckle. If you need further guidance on anything we covered here, head over to the more detailed sections below. If you want to learn more about the code side of things, the [Dev Docs](/dev/) should be your next stop. If you're looking for more in-depth reading on how Speckle does its Speckling, have a browse through the additional sections below.

If you're enjoying Speckle, have any questions, or would like to share any feedback or suggestions, please drop by our [Community Forum](https://speckle.community/) and join the conversation.
