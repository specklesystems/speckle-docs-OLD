# Desktop Connectors

## Prerequisites

Before you can start sending and receiving data using the Desktop Connectors, you'll need to install the [Speckle Manager](/user/manager). This will allow you to add your Speckle account to your computer and install the different Connectors.

## Grasshopper

[Go to section](./grasshopper/index.md)

## Dynamo

This section is work in progress 🚧 ! Please check back again soon 😃

## Revit & Rhino

Revit and Rhino share the same UI, so this section will apply to both applications. If you have specific questions about either one, head over to the [forum](https://discourse.speckle.works/) to get help from the community!

### A Quick Tour

The home page of the Desktop UI is where you can see all the streams you have in your currently open file. The streams are represented as cards on the home page and can be either _Senders_ or _Receivers_. At the bottom right of the window is a big blue button which is how you add new streams to your current file.

![desktopui home page with labelled buttons](https://user-images.githubusercontent.com/7717434/107382404-badd7f80-6ae7-11eb-9941-2265b1cc5748.png)

Senders and Receivers both have three buttons across the bottom. The leftmost one is the branch switching and creation button and the rightmost one is the Send/Receive button. On a Receiver, the centre button allows you to choose which commit you would like to receive. On a Sender, the centre button lets you add objects from your model to the stream.

![desktopui stream details page with labelled buttons](https://user-images.githubusercontent.com/7717434/107384024-7e128800-6ae9-11eb-8e2d-76dec6f54b03.png)

Clicking on a stream card will take you to the details page. Here you can edit the stream's name or description, manage collaborators, or remove it from the connector.

### Sending Data

#### Creating a Stream

Let's look at how you would create a new stream and send some data. The big blue button on the bottom right is how you get started. Clicking it opens a popup where you can select a recently used stream, search for an existing stream, or create a brand new one. Once your stream has been created, you can click on it to get more details. You can also edit the name and description or add collaborators to your stream.

![desktopui-new-stream](https://user-images.githubusercontent.com/7717434/106741747-08ec1200-6614-11eb-9162-829670899da9.gif)

#### Adding Objects

The simplest way to add objects to a stream is by selecting what you want in the file, clicking the centre selection button, and choosing the "Set Selection" option. However, you can also get more granular control of your object selection by diving into the filter options.

![desktopui-using-filters](https://user-images.githubusercontent.com/7717434/106741137-35ebf500-6613-11eb-84b7-0ceb721a28cb.gif)

#### Sending to Speckle

When you're ready to send your data to your stream, hit that big blue "Send" button. Pro tip: if you want to add a commit message, click the three dots menu next to the send button first.

![desktopui-commit-message](https://user-images.githubusercontent.com/7717434/106741155-3c7a6c80-6613-11eb-8273-ef59e7261ceb.gif)

Here's a recap in the form of a snappy gif:

![desktopui-send-stream](https://user-images.githubusercontent.com/7717434/106739196-c248e880-6610-11eb-8cc5-01216cc980b1.gif)

### Receiving Data

Speckle allows you to send and receive from the same stream. To switch a Sender to a Receiver, just click the double arrow button on the top right hand corner of the stream card.

On a Receiver, you get a new button which lets you control which commit you want to receive. You can either choose to stay up to date with the latest commit or stick to a specific commit. Just press the Commit button and select your desired option. If you choose to stay on the "latest" commit, you won't be updated automatically. You'll see a notification that things have changed and you will be prompted to click the "Receive" button to sync up.

![desktopui-switch-cards](https://user-images.githubusercontent.com/7717434/106739209-c5dc6f80-6610-11eb-8625-01b19240c612.gif)

On a Receiver card, receiving is as easy as pressing the blue "Receive" button. If you've never received the data before, the connector will fetch all the objects from your Speckle server. If you have already received some of the objects before, the process will be quicker as the objects will be fetched from your local cache.
