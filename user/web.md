# Speckle Web

## Introduction

::: tip IMPORTANT 🙌
This guide assumes you have access to a **Speckle Server**.
If you don't have one provided by your company, you can use our [free Speckle server](https://speckle.systems/getstarted/).
:::

Speckle Web is what you see what you head to Speckle in the browser. It is your one-stop shop for managing and coordinating your data. From Speckle Web, you can create and edit streams, view your data in 3D, manage your account, and share your data with others.

When you first visit, you'll be prompted to log in or register to that _Speckle Server_. A server is just a particular instance of Speckle that holds your company or organisation's data. Servers are independent of each other meaning if you are a part of multiple Speckle Servers, you'll need to create a new account for each one.

## Streams

![image-20210322192558215](./img/web/image-20210322192558215.png)

Once you're logged in, you'll be greeted by the home page which shows your streams and a feed of recent activity on the left.

These streams are the ones you have access to including streams you've created and streams you have been added to as a [collaborator](/user/concepts.html#who-can-i-share-them-with). Each stream card shows you a brief summary of the stream including its name, the number of [branches](/user/concepts.html#branches) & [commits](/user/concepts.html#commits), when it was last updated, and who has access to it. Clicking any of the stream cards will take you to the details of that particular stream. You can also click the big blue button to create a new stream.

### Stream page

On a stream page, you can browse the existing commits and view the data in our lovely 3D viewer. The most recent commit is the one you will initially see in the viewer. If you would like to receive data from this stream in one of the connectors, you can either:

- **Grasshopper & Dynamo:** copy and paste the URL and connect it to the "Stream" input of the receiver component
- **Other Clients:** search for the stream by name or id in the "Add Stream" popup

![image-20210322192409067](./img/web/image-20210322192409067.png)

If you have _contributor_ access, you can also add new branches and commits to the stream. If you have _owner_ access, you will see additional buttons which will let you edit the name / description, configure link sharing, and manage collaborators.

By clicking on any of the latest commits you'll be taken to that commit's page.

::: tip NOTE

The list of recent commits by default refers to the `main` branch. Yu can swap branches by using the dropdown at the top of the page.

![image-20210322192914688](./img/web/image-20210322192914688.png)

:::

## Branches

![image-20210322193000611](./img/web/image-20210322193000611.png)

By clicking on he "branches" button you'll be taken to a page that lists all existing branches for the current stream.

![image-20210322193139643](./img/web/image-20210322193139643.png)

From here you can access each branch's page or create new branches.

### Branch page

From a branch page you can see all the commits that have been pushed to it, and you can edit the branch name and description too.

![image-20210322193547220](./img/web/image-20210322193547220.png)

If you'd like to receive either a specific branch or a specific commit in one of the connectors, you can either:

- **Grasshopper & Dynamo:** copy and paste the branch / commit URL and connect it to the "Stream" input of the receiver component
- **Other Clients:** on a stream card, click on the "branch" or "commit" button to open a dropdown from which you can select a particular branch or commit

## Commit

Clicking on a particular commit will take you to a new page where you can view the commit in the viewer and explore the commit object.

The "Data" section on this page allows you to explore the commit object by expanding it. The top level [_Base_](/user/concepts.html#the-base-object) is the root commit object and each item within it is a property. Properties can either be simple values (like the id, speckle type, and children count), another object, or a list of objects.

![object expander in speckle web](https://user-images.githubusercontent.com/7717434/107505427-955a7f80-6b94-11eb-8624-b6c694a568b4.png)

Clicking on one of these lists will expand it and show you all the objects nested within it. If a nested object is a "Referenced Object", this means it is a separate object that hasn't been loaded yet. You can click it to load the referenced object and get more details. Clicking on the little arrow button next to an object will open that particular object in a new page and display it in the viewer.

![web-commit-objects](https://user-images.githubusercontent.com/7717434/107504494-4b24ce80-6b93-11eb-8a4d-1895d55c32e0.gif)

## 3D Viewer

The Viewer is what lets you visualise your data in 3D. You can view a whole commit or just a specific object in the viewer. Use your left mouse button to rotate the view around and use the right mouse button to pan. Double clicking on an object will bring it into focus and double clicking on the background will bring the whole scene into view.

![3d viewer tour](../.vuepress/public/assets/web-3d-viewer.gif)

The toolbar at the bottom edge of the viewer allows you to (1) focus the whole scene, (2) cut the view with a section plane, (3) bring the viewer into full screen, and (4) open a help menu if you need a reminder of the controls.

## Profile

From your profile, you can edit your personal details and manage your authorised applications in the "Your Apps" section. Your Apps are the apps that you have granted access to your streams and profile. On this page, you can make sure you recognise all the apps and easily revoke access to any apps you no longer want to authorise.

![profile page on speckle web](https://user-images.githubusercontent.com/7717434/107490504-e14ff900-6b81-11eb-9fe5-2ae7297090f9.png)

Further down the page are some more advanced options intended for developers. You can check out the GraphiQL Explorer where you can explore the API and interact with your live data. You can generate Personal Access Tokens which are like passwords you can use to authenticate in your scripts and apps. You can also register your own Apps so other people on the server can use them too.
