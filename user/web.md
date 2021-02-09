# Speckle Web

This section is work in progress 🚧 ! Please check back again soon 😃

## Frontend

The frontend is what you see what you head to Speckle in the browser.


### Streams

The *Streams* page shows you a list of all the streams you have access to including streams you've created and streams you have been added as a contributor to. Clicking any of the stream cards will take you to the details of that particular stream. You can also click the big blue button to create a new stream. 

![streams page in the frontend](https://user-images.githubusercontent.com/7717434/107404929-a8227500-6afe-11eb-93dd-66d643761cd2.png)

On a stream page, you can browse the existing commits and view the data in our lovely 3D viewer. The most recent commit is the one you will initially see in the viewer. If you would like to receive data from this stream in one of the connectors, you can either:

- **Grasshopper & Dynamo:** copy and paste the URL and connect it to the "Stream" input of the receiver component
- **Other Clients:** search for the stream by name or id in the "Add Stream" popup

![stream page in the frontend](https://user-images.githubusercontent.com/7717434/107401184-8921e400-6afa-11eb-8e86-1825c298980a.png)

If you have *contributor* access, you can also add new branches and commits to the stream. If you have *owner* access, you will see additional buttons which will let you edit the name / description, configure link sharing, and manage collaborators. 

![branches and commits in the frontend](https://user-images.githubusercontent.com/7717434/107402684-2d585a80-6afc-11eb-9970-161005a00860.png)

Scrolling down the page, you'll see the *Branches* and *Latest activity* cards. Clicking on any of the branches will take you to the branch page where you will find a list of commits on that branch. Clicking on any commit in the *Latest activity* card will take you to that commit page and show you the data in the 3D viewer.