(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{695:function(e,t,a){"use strict";a.r(t);var o=a(44),s=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"core-concepts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#core-concepts"}},[e._v("#")]),e._v(" Core Concepts")]),e._v(" "),a("p",[e._v("This section goes into the details on how your data is sent to and stored in Speckle. Whether you're new to Speckle or just need a refresher, this is a great place to start!")]),e._v(" "),a("h3",{attrs:{id:"a-quick-note-on-terminology"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#a-quick-note-on-terminology"}},[e._v("#")]),e._v(" A Quick Note on Terminology")]),e._v(" "),a("p",[e._v("We've tried to keep this guide straightforward, removing technical language unless it's absolutely necessary. It's worth noting that whenever we mention the terms "),a("strong",[e._v("data")]),e._v(", "),a("strong",[e._v("objects")]),e._v(" or "),a("strong",[e._v("elements")]),e._v(", we're really referring to the same thing. Speckle is built to handle all kinds of data, whether CAD geometry, BIM elements (geometry + metadata) or pure data (text, numbers, etc).")]),e._v(" "),a("h3",{attrs:{id:"streams-branches-and-commits"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#streams-branches-and-commits"}},[e._v("#")]),e._v(" Streams, Branches and Commits")]),e._v(" "),a("p",[e._v("Your Speckle data is organised using a robust and sophisticated collaboration approach that's been adopted universally in software development. To keep things simple, we're using the same concepts and terminology, known as "),a("strong",[e._v("Streams")]),e._v(", "),a("strong",[e._v("Branches")]),e._v(" and "),a("strong",[e._v("Commits")]),e._v(".")]),e._v(" "),a("p",[e._v("To use Speckle you only really need to know what a stream is. Branches and commits are slightly more advanced, but will add a lot of flexibility and control to your future collaborative workflows.")]),e._v(" "),a("h2",{attrs:{id:"streams"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#streams"}},[e._v("#")]),e._v(" Streams")]),e._v(" "),a("h3",{attrs:{id:"what-are-streams"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-are-streams"}},[e._v("#")]),e._v(" What are streams")]),e._v(" "),a("p",[e._v("The main data structure in Speckle is the "),a("strong",[e._v("stream")]),e._v(".")]),e._v(" "),a("p",[e._v("A stream is simply a collection of data with some additional information to help you manage and retrieve them. Each stream is assigned a "),a("code",[e._v("streamId")]),e._v(" which uniquely identifies the stream on a server. You can also assign a name and description to help keep track of your streams.")]),e._v(" "),a("p",[e._v("A stream also lets you manage permissions: it has a list of collaborators including an owner and additional reviewers and contributors which the owner has chosen to share the stream with.")]),e._v(" "),a("h3",{attrs:{id:"what-do-streams-contain"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-do-streams-contain"}},[e._v("#")]),e._v(" What do streams contain?")]),e._v(" "),a("p",[e._v("A stream can contain anything from a handful of objects to a whole building model. You are free to add as much or as little data to a single stream and create as many streams as you'd like. Some examples of what might be contained within a stream are:")]),e._v(" "),a("ul",[a("li",[e._v("A layer in a CAD application")]),e._v(" "),a("li",[e._v("A set of calculation results")]),e._v(" "),a("li",[e._v("A workset in Revit")]),e._v(" "),a("li",[e._v("A selection of objects from Grasshopper")]),e._v(" "),a("li",[e._v("A structural model")])]),e._v(" "),a("p",[e._v("A stream also contains further options for managing your data using  "),a("strong",[e._v("branches")]),e._v(" and "),a("strong",[e._v("commits")]),e._v(". Don't worry about these yet - we'll cover them in the following sections.")]),e._v(" "),a("h3",{attrs:{id:"who-can-i-share-streams-with"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#who-can-i-share-streams-with"}},[e._v("#")]),e._v(" Who can I share streams with?")]),e._v(" "),a("p",[e._v("Streams can be either Public or Private:;")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Public")]),e._v(": Anyone with the link or "),a("code",[e._v("streamId")]),e._v(" can view the stream")]),e._v(" "),a("li",[a("strong",[e._v("Private")]),e._v(": People need to be added as "),a("em",[e._v("collaborators")]),e._v(" to the stream to access it")])]),e._v(" "),a("p",[e._v("Anyone invited as a collaborator can have varying levels of access to the stream, depending on which role you assign them:")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Owner")]),e._v(": Full access, including deletion rights and editing user permissions.")]),e._v(" "),a("li",[a("strong",[e._v("Contributor")]),e._v(": Can edit the stream's contents (create new branches and commits) but cannot edit stream details (name and description) or manage permissions.")]),e._v(" "),a("li",[a("strong",[e._v("Reviewer")]),e._v(": View-only access to a stream.")])]),e._v(" "),a("h3",{attrs:{id:"how-do-i-use-streams"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-use-streams"}},[e._v("#")]),e._v(" How do I use streams?")]),e._v(" "),a("p",[e._v("Streams are the main mechanism by which data is shared between people and applications. For example, you could create a stream in Revit and send that data to your server. Then, any of your colleagues with access to that stream could view the data in the browser or receive the data in Grasshopper, Rhino, Revit, etc.")]),e._v(" "),a("p",[e._v("If any of your colleagues have "),a("em",[e._v("collaborator")]),e._v(" access, they are also free to make their own changes and send their changes to the stream. You can then receive those changes from the stream in your original model to see the changes reflected.")]),e._v(" "),a("p",[e._v("To see step-by-step guides on how to send your data between various supported applications, check out our "),a("a",{attrs:{href:"https://speckle.systems/tutorials/",target:"_blank",rel:"noopener noreferrer"}},[e._v("tutorials"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"branches"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#branches"}},[e._v("#")]),e._v(" Branches")]),e._v(" "),a("h3",{attrs:{id:"what-are-branches"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-are-branches"}},[e._v("#")]),e._v(" What are branches?")]),e._v(" "),a("p",[e._v("Branches give you an extra layer of organisation within a stream. Speckle users frequently use branches to carry out parallel studies / design options.")]),e._v(" "),a("p",[e._v("All streams start with a single default branch called "),a("code",[e._v("main")]),e._v('. If you would like to "branch" off from this '),a("code",[e._v("main")]),e._v(" branch and work on multiple different versions of your data in parallel or if you want to segment separate parts of your data from each other, that is where branches come in.")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-images.githubusercontent.com/7717434/107365334-8dd3a180-6ad4-11eb-8d6f-47bc42b80da4.png",alt:""}})]),e._v(" "),a("h3",{attrs:{id:"how-do-i-use-branches"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-use-branches"}},[e._v("#")]),e._v(" How do I use branches?")]),e._v(" "),a("p",[e._v("You can add as many additional branches to your streams as you would like. Some Connectors and the Speckle Web App give you the option of creating new branches and switching between them.")]),e._v(" "),a("p",[e._v("Let's say you have a very large model you want to add to a single stream, but your collaborators from different disciplines don't want to receive the whole model every time. You could split the model up into different branches: "),a("code",[e._v("Structural")]),e._v(", "),a("code",[e._v("MEP")]),e._v(", "),a("code",[e._v("Architecture")]),e._v(".")]),e._v(" "),a("p",[e._v("Or perhaps you have a complex model that encompasses a site with multiple separate buildings. You could still contain the whole model in a single stream, but create a separate branch for each building: "),a("code",[e._v("Building A")]),e._v(", "),a("code",[e._v("Building B")]),e._v(", "),a("code",[e._v("Building C")]),e._v(".")]),e._v(" "),a("p",[e._v("Maybe you're working on a smaller scale and you would like to present a different facade options to the client. The stream could be split into "),a("code",[e._v("Option A")]),e._v(", "),a("code",[e._v("Option B")]),e._v(", and "),a("code",[e._v("Option C")]),e._v(" which you could then easily switch between to explore the different options in your next meeting.")]),e._v(" "),a("p",[e._v("If you happen to be familiar with "),a("code",[e._v("git")]),e._v(", you might be wondering "),a("em",[e._v('"Can I also merge the content of a branch into another one?"')]),e._v(". The answer is yes, but currently that can only happen inside one of the AEC software for which we have connectors. The merged data can then be re-sent to an existing or new branch.")]),e._v(" "),a("h2",{attrs:{id:"commits"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commits"}},[e._v("#")]),e._v(" Commits")]),e._v(" "),a("h3",{attrs:{id:"what-are-commits"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-are-commits"}},[e._v("#")]),e._v(" What are commits?")]),e._v(" "),a("p",[e._v('Commits are essentially a snapshot of your data - a point in time where you have "committed" your changes. They allow you to track the changes in your stream and easily see who changed what and when. The great thing about commits is that they create a timeline of all the changes your stream goes through and give you the possibility of going back in time, resetting your model to any version - whenever you want!')]),e._v(" "),a("p",[e._v("Each time you send data to Speckle, you are automatically creating a new commit which contains all the objects in your stream along with additional information such as the time, date, and author of the commit. You can also add an optional "),a("em",[e._v("commit message")]),e._v(" which is a short description of what you've changed. Like a stream, each commit is assigned a generated "),a("code",[e._v("commitId")]),e._v(" which can be used to identify and retrieve it. You can go back in time and look at the history of your stream through the series of commits.")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-images.githubusercontent.com/7717434/107365302-814f4900-6ad4-11eb-894f-3094863ad7c6.png",alt:""}})]),e._v(" "),a("p",[e._v('Say goodbye to saving your files as "AM_Project_Design-final", "AM_Project_Design-final-final", "AM_Project_Design-final-final-latest"...!')]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("IMPORTANT 🙌")]),e._v(" "),a("p",[e._v("Please Note: Commits aren't editable, you can change their message but not their content. Sent the wrong data? No problem - simply send the correct data and work from that commit instead.")])]),e._v(" "),a("h3",{attrs:{id:"how-do-i-use-commits"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-use-commits"}},[e._v("#")]),e._v(" How do I use commits?")]),e._v(" "),a("p",[e._v("If you have used a connector and you've sent data to a stream, you've already used them! Each time data is sent to a stream, a commit is created. To help you keep track of the changes in your stream, it is a good idea to add a commit message that succinctly describes what the commit contains. Some of the connectors pre-populate a default commit message for you, but you are still free to write your own to add more detail.")]),e._v(" "),a("p",[e._v("When receiving data in a connector, you have the option of either staying synced with the latest commit or receiving a specific commit based on the "),a("code",[e._v("commitId")]),e._v(". If you choose to stay on the latest commit, you'll see a notification when someone else has sent new data to the stream. When you see this, you'll be able to use the receive function to get the new commit and update your file.")]),e._v(" "),a("h2",{attrs:{id:"what-next"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-next"}},[e._v("#")]),e._v(" What Next?")]),e._v(" "),a("p"),e._v(" "),a("p",[e._v("For some users, this is their first time hearing about streams, branches and commits. Your head must be spinning!")]),e._v(" "),a("p",[e._v("However, some users can't get enough of this and are ready to learn all about some of our more advanced topics. For these users, we've got you covered! See our Advanced Concepts page for more.")])])}),[],!1,null,null,null);t.default=s.exports}}]);