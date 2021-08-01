(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{313:function(e,t,o){e.exports=o.p+"assets/img/rvt-schemaBuilder-popup.05a0e125.gif"},338:function(e,t,o){e.exports=o.p+"assets/img/rvt-geometry-receive.a3a121e5.gif"},511:function(e,t,o){e.exports=o.p+"assets/img/rvt-defaultConversions.4d685d61.png"},512:function(e,t,o){e.exports=o.p+"assets/img/rvt-geometry-send.c6a9a8b7.gif"},513:function(e,t,o){e.exports=o.p+"assets/img/rvt-viewStream.e957d9d6.png"},514:function(e,t,o){e.exports=o.p+"assets/img/rvt-base-send.a1191089.gif"},515:function(e,t,o){e.exports=o.p+"assets/img/rvt-schema-createFloors.1fdc2989.png"},516:function(e,t,o){e.exports=o.p+"assets/img/rvt-schema-editFloorsRevit.861d41e1.gif"},517:function(e,t,o){e.exports=o.p+"assets/img/rvt-schema-floorComparison.de9e46d5.png"},518:function(e,t,o){e.exports=o.p+"assets/img/rvt-schema-createFloorWithParam.4a242dac.png"},519:function(e,t,o){e.exports=o.p+"assets/img/rvt-schema-parameterSet.acec7b54.png"},520:function(e,t,o){e.exports=o.p+"assets/img/rvt-schema-receiveDS.f925f9f5.gif"},700:function(e,t,o){"use strict";o.r(t);var s=o(44),a=Object(s.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"grasshopper-➡-revit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#grasshopper-➡-revit"}},[e._v("#")]),e._v(" Grasshopper ➡ Revit")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("NOTE ❗️")]),e._v(" "),s("p",[e._v("All our tutorials have been migrated to out tutorials portal!\nCheck them out 👉 "),s("a",{attrs:{href:"https://speckle.systems/tutorials/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tutorials"),s("OutboundLink")],1)])]),e._v(" "),s("blockquote",[s("p",[s("strong",[e._v("Level:")]),e._v(" intermediate")]),e._v(" "),s("p",[s("strong",[e._v("Author:")]),e._v(" Alan")]),e._v(" "),s("p",[s("strong",[e._v("Software used:")]),e._v(" Revit 2021, Grasshopper for Rhino 7")])]),e._v(" "),s("p",[e._v("You can stream "),s("em",[e._v("Grasshopper")]),e._v(" native geometry to Revit using Speckle! In this guide, we will send different types of geometry and built elements to Revit to understand how Speckle converts them into native Revit geometries. We will also create some "),s("code",[e._v("BuiltElements")]),e._v(" using the "),s("code",[e._v("SchemaBuilder")]),e._v(" node, which allows for the generation of native Revit elements such as walls, floors, topography, etc...")]),e._v(" "),s("h2",{attrs:{id:"getting-started"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[e._v("#")]),e._v(" Getting started")]),e._v(" "),s("p",[e._v("Before getting started, check that you have a supported version of Rhino (6 or 7) and Revit (2019-21) and the Speckle 2.0 connectors installed for "),s("strong",[e._v("Grasshopper")]),e._v(" and "),s("strong",[e._v("Revit")]),e._v(". Then download the Rhino and Grasshopper files or this tutorial "),s("a",{attrs:{href:"https://drive.google.com/drive/folders/1TYX8aL_CZ7fVLaE1pWz4h4qYZYYAaA0o?usp=sharing",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),s("OutboundLink")],1)]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("Our Rhino and Grasshopper connectors are independent of each other, unlike in Speckle 1.0. This means you can choose which one is appropriate for you, or install both! 😁")])]),e._v(" "),s("h2",{attrs:{id:"sending-rhino-grasshopper-geometry-objects"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sending-rhino-grasshopper-geometry-objects"}},[e._v("#")]),e._v(" Sending "),s("code",[e._v("Rhino/Grasshopper")]),e._v(" geometry objects")]),e._v(" "),s("p",[e._v("The "),s("em",[e._v("Grasshopper Connector")]),e._v(" supports sending any type of geometry or data. This geometric data may not be fully supported in Revit as such, so the Revit converter will determine what type of Revit element each geometry get's converted to.")]),e._v(" "),s("h3",{attrs:{id:"default-conversions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#default-conversions"}},[e._v("#")]),e._v(" Default conversions")]),e._v(" "),s("p",[e._v("Let's send some geometry objects from Grasshopper to Revit. We'll start with the GH part:")]),e._v(" "),s("ol",[s("li",[e._v("Open the Rhino file. The model is organized into a "),s("code",[e._v("Structure")]),e._v(" layer for columns and an "),s("code",[e._v("Architecture")]),e._v(" layer for floors and walls.")]),e._v(" "),s("li",[e._v("Open the Grasshopper file. You'll notice several grouped nodes. Focus on the topmost one, called "),s("strong",[e._v('"Default Conversions"')]),e._v(".\n"),s("img",{attrs:{src:o(511),alt:""}})]),e._v(" "),s("li",[e._v("Here, we've already selected different common geometry types from our Rhino model.\n"),s("ul",[s("li",[e._v("A curve")]),e._v(" "),s("li",[e._v("A BREP")]),e._v(" "),s("li",[e._v("A Mesh")])])]),e._v(" "),s("li",[e._v("Create a new "),s("code",[e._v("Sender")]),e._v(" node in the Grasshopper canvas.")]),e._v(" "),s("li",[e._v("Create a new "),s("code",[e._v("Stream")]),e._v(" by adding an "),s("code",[e._v("Accounts")]),e._v(" and a "),s("code",[e._v("Create Stream")]),e._v(" node; and connect them as shown:\n"),s("blockquote",[s("p",[e._v("You can also use an existing stream for this if you prefer.")])])]),e._v(" "),s("li",[e._v("Push the send button and wait for the sender to "),s("em",[e._v("do its thing")]),e._v(".")])]),e._v(" "),s("p",[s("img",{attrs:{src:o(512),alt:""}})]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("Viewing your stream")]),e._v(" "),s("p",[e._v("Right click the "),s("code",[e._v("Send node")]),e._v(" and select "),s("code",[e._v("View commit....")]),e._v(". This will open a new browser window taking you to the Stream location in your Speckle server.\n"),s("img",{attrs:{src:o(513),alt:""}})]),e._v(" "),s("ul",[s("li",[e._v("Streams created in Grasshopper have the name "),s("code",[e._v("Random Stream")]),e._v(" by default, so feel free to change it to be able to identify it in Revit. You can also identify a stream by it's unique ID.")])])]),e._v(" "),s("p",[e._v("Now for the Revit side of things:")]),e._v(" "),s("ol",[s("li",[e._v("Open a new Revit file, and call up the Revit Desktop UI via the Speckle 2 plugin ribbon.")]),e._v(" "),s("li",[e._v("Add the stream you just created by clicking the blue "),s("code",[e._v("+")]),e._v(" button on the lower right corner.")]),e._v(" "),s("li",[e._v("Press the "),s("code",[e._v("Receive")]),e._v(" button in the stream card and wait for it to finish.")]),e._v(" "),s("li",[e._v("Once done, you should see the different geometry elements converted to Revit:\n"),s("ol",[s("li",[e._v("All curves would have been converted to "),s("code",[e._v("ModelCurves")])]),e._v(" "),s("li",[e._v("All BREP/Mesh elements would be converted to "),s("code",[e._v("DirectShape")]),e._v("'s with the 'Generic Model' category.")])])])]),e._v(" "),s("blockquote",[s("p",[e._v("The stream card will also display any warnings or errors that ocurred during the process.")])]),e._v(" "),s("p",[s("img",{attrs:{src:o(338),alt:""}})]),e._v(" "),s("p",[e._v("If you want to have more control over how these geometries get converted in Revit, keep going to the next section 👇")]),e._v(" "),s("h3",{attrs:{id:"about-sending-breps"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#about-sending-breps"}},[e._v("#")]),e._v(" About sending "),s("code",[e._v("BREPs")])]),e._v(" "),s("p",[e._v("Rhino BREP support still has some limitations we are working on improving, but other's are strictly imposed by the Revit API. In order to ensure unsupported geometric objects still get represented when importing to Revit, we provide a "),s("code",[e._v("fallback")]),e._v(" value for every "),s("code",[e._v("BREP")]),e._v(" in the form of a "),s("code",[e._v("Mesh")]),e._v(".")]),e._v(" "),s("p",[e._v("So, whenever a BREP conversion fails in Revit, the resulting object will still be generated in the model, only as a tesselated representation of the smooth BREP.")]),e._v(" "),s("h2",{attrs:{id:"sending-custom-base-objects"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sending-custom-base-objects"}},[e._v("#")]),e._v(" Sending custom "),s("code",[e._v("Base")]),e._v(" objects")]),e._v(" "),s("p",[e._v("With Speckle, you can create you own custom objects to represent and organize data in anyway. Let's create a custom object for the geometry we sent in the previous step.")]),e._v(" "),s("ul",[s("li",[e._v("Bring a new "),s("code",[e._v("Create Speckle Object")]),e._v(" node onto the canvas.")]),e._v(" "),s("li",[e._v("Zoom-in to the node and add some properties inputs to it.\n"),s("ul",[s("li",[e._v("You can rename inputs by right-clicking the input name.")]),e._v(" "),s("li",[e._v("You can also specify if the input is of "),s("code",[e._v("item")]),e._v(" or "),s("code",[e._v("list")]),e._v(" type. Similar to how the scripting nodes operate in Grasshopper.")])])]),e._v(" "),s("li",[e._v("Connect the geometries we sent earlier to each of the input types. If done correctly, the result should be just "),s("strong",[e._v("one")]),e._v(" "),s("code",[e._v("Base")]),e._v(" object.")]),e._v(" "),s("li",[e._v("Connect that object to the "),s("code",[e._v("Data")]),e._v(" input on the "),s("code",[e._v("Send")]),e._v(" node.")]),e._v(" "),s("li",[e._v("Press send and wait until it finishes.")])]),e._v(" "),s("p",[s("img",{attrs:{src:o(514),alt:""}})]),e._v(" "),s("p",[e._v("Now let's switch to Revit:")]),e._v(" "),s("p",[e._v("If you already had the file open from the previous step, you should have an update notification on the "),s("code",[e._v("stream")]),e._v(" we added earlier. Press the receive button and wait for the process to complete.")]),e._v(" "),s("p",[e._v("As you may notice, even though the geometry was sent inside a "),s("code",[e._v("Base")]),e._v(" object, all entities will still appear in the Revit model. This is because the conversion process will look for any objects it can convert to Revit native elements, independently of the data structure they are sent in.")]),e._v(" "),s("p",[e._v("Meaning, you are free to organize your data as needed for any other application (i.e.: GH->GH data trees) and still receive it in Revit properly.")]),e._v(" "),s("p",[s("img",{attrs:{src:o(338),alt:""}})]),e._v(" "),s("h2",{attrs:{id:"sending-schemabuilder-objects"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sending-schemabuilder-objects"}},[e._v("#")]),e._v(" Sending "),s("code",[e._v("SchemaBuilder")]),e._v(" objects")]),e._v(" "),s("p",[e._v("In order to create other "),s("em",[e._v("native")]),e._v(" Revit elements, we'd need to use the "),s("code",[e._v("Schema Builder")]),e._v(" node in Grasshopper.")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("SchemaBuilder node pop-up")]),e._v(" "),s("p",[e._v("When first create the node, a pop-up window will appear allowing you to select the object type you want to create. These are organized into two main categories:")]),e._v(" "),s("ul",[s("li",[e._v("Built elements: These are Speckle elements created to support common built elements (beam, wall, slab, level...) accross the entire Speckle ecosystem.")]),e._v(" "),s("li",[e._v("Revit elements: These are specifically designed to support Revit specific entities and workflows.\n"),s("img",{attrs:{src:o(313),alt:""}})])])]),e._v(" "),s("h3",{attrs:{id:"creating-levels-and-floors"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#creating-levels-and-floors"}},[e._v("#")]),e._v(" Creating Levels and Floors")]),e._v(" "),s("p",[e._v("Let's start by creating some "),s("code",[e._v("RevitLevels")]),e._v(", which we will later use to assign other objects to it's appropriate building level.")]),e._v(" "),s("ol",[s("li",[e._v("Create a new "),s("code",[e._v("SchemaBuilder")]),e._v(" node and select "),s("code",[e._v("Create Level")]),e._v(" within the Revit category.")]),e._v(" "),s("li",[e._v("Connect to it the "),s("em",[e._v("Level Name")]),e._v(" and "),s("em",[e._v("Level Height")]),e._v(" nodes that already existed in the file.")]),e._v(" "),s("li",[e._v("Create a new "),s("code",[e._v("SchemaBuilder")]),e._v(" node and select "),s("code",[e._v("RevitFloor")]),e._v("within the Revit category.")]),e._v(" "),s("li",[e._v("Wire up the "),s("code",[e._v("RevitFloor")]),e._v(" node\n"),s("ul",[s("li",[s("code",[e._v("family")]),e._v(" and "),s("code",[e._v("type")]),e._v(": connect a panel with the appropriate family and type name. If the family/type does not exist in the document, a "),s("em",[e._v("default")]),e._v(" one will be selected.")]),e._v(" "),s("li",[s("code",[e._v("outline")]),e._v(": connect the "),s("code",[e._v("Floor Outlines")]),e._v(" node. This is just a collection of the perimeter curves for each floor (extracted from the Revit file)")]),e._v(" "),s("li",[s("code",[e._v("level")]),e._v(": Connect the levels we created on step 1-2.")])])]),e._v(" "),s("li",[e._v("Create a sender, wire it up as explained in the previous steps (data + stream) and press send. You can use the same stream as before.")])]),e._v(" "),s("p",[s("img",{attrs:{src:o(515),alt:""}})]),e._v(" "),s("p",[e._v("Go back to the Revit file, you should see a notification in your stream telling you the data was updated.")]),e._v(" "),s("ol",[s("li",[e._v("Press "),s("code",[e._v("Receive")]),e._v(" and wait for the process to finish.")]),e._v(" "),s("li",[e._v("Once done, you should see your newly created floors and levels. Each floor assigned to it's corresponding level.")])]),e._v(" "),s("p",[e._v("Since these are native Revit Elements, you can edit as any other Revit type. Double-click any of the floor to edit their floor lines.")]),e._v(" "),s("p",[s("img",{attrs:{src:o(516),alt:""}})]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("Automatic floor creation")]),e._v(" "),s("p",[e._v("The Revit connector will always attempt to assign objects to existing floors when available. If the object lies at a height where no "),s("code",[e._v("level")]),e._v(" exists, a new level will be automatically generated with the name "),s("code",[e._v("Generated Level XXXX")]),e._v(", where "),s("code",[e._v("XXXX")]),e._v(" will be the height at that level.")]),e._v(" "),s("p",[e._v("This is specially true when sending "),s("code",[e._v("BuiltElements")]),e._v(". Notice the lack of "),s("code",[e._v("level")]),e._v(" in the "),s("code",[e._v("Floor")]),e._v(" node as opposed to the "),s("code",[e._v("RevitFloor")]),e._v(". If sending a "),s("code",[e._v("Floor")]),e._v(", a level will be generated at the height of the floor outline.")]),e._v(" "),s("p",[s("img",{attrs:{src:o(517),alt:""}})])]),e._v(" "),s("h2",{attrs:{id:"assigning-parameter-values"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#assigning-parameter-values"}},[e._v("#")]),e._v(" Assigning parameter values")]),e._v(" "),s("p",[e._v("The "),s("code",[e._v("Schema Builder")]),e._v(" node also contains a "),s("code",[e._v("Parameter")]),e._v(" type, created specifically to pass parameter values along with the Revit model elements being sent.")]),e._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),s("p",[e._v("When sending Revit elements with custom parameters, you must ensure the parameters exist for the type/family you are targetting or the value will not be set.")])]),e._v(" "),s("p",[e._v("Passing parameter values is as easy as connecting the desired parameter to the "),s("code",[e._v("parameter")]),e._v(" input of a "),s("code",[e._v("RevitElement")]),e._v(" node. Let's modify the "),s("code",[e._v("Mark")]),e._v(" parameter value to be the current level elevation.")]),e._v(" "),s("ol",[s("li",[e._v("Focus on the "),s("code",[e._v("RevitFloors")]),e._v(" we created earlier.")]),e._v(" "),s("li",[e._v("Create a new "),s("code",[e._v("Schema Builder")]),e._v(" node and select the type "),s("code",[e._v("Parameter")])]),e._v(" "),s("li",[e._v("Use a "),s("code",[e._v("Expand Speckle Object")]),e._v(" node to extract the information from the levels.")]),e._v(" "),s("li",[e._v("Connect the elevation to a text node (to force it to be a string) and connect it to the "),s("code",[e._v("Parameter")]),e._v(" node as shown")]),e._v(" "),s("li",[e._v("Now, send the floors clicking the "),s("code",[e._v("Send")]),e._v(" button.")])]),e._v(" "),s("p",[s("img",{attrs:{src:o(518),alt:""}})]),e._v(" "),s("p",[e._v("In Revit:")]),e._v(" "),s("ol",[s("li",[e._v("Press the receive button as soon as you get notified of the updated data.")]),e._v(" "),s("li",[e._v("Select any of the floors that were sent and ensure the parameter has been properly set.")])]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("You can do this with any type of parameter in your model (family/shared...)")])]),e._v(" "),s("p",[s("img",{attrs:{src:o(519),alt:""}})]),e._v(" "),s("h2",{attrs:{id:"sending-complex-geometry"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sending-complex-geometry"}},[e._v("#")]),e._v(" Sending complex geometry")]),e._v(" "),s("p",[e._v("In cases of higher complexity, creating native Revit elements may not be an option. When necessary, when can also send any complex geometry (curves, BREPs, meshes) to Revit as a "),s("code",[e._v("DirectShape")]),e._v(". This allows us to assign parameter values and a category type to our element.")]),e._v(" "),s("p",[e._v("Let's try it out with the stairs:")]),e._v(" "),s("ol",[s("li",[e._v("Create a new "),s("code",[e._v("SchemaBuilder")]),e._v(" node and select "),s("code",[e._v("DirectShape")]),e._v(" from the Revit category.")]),e._v(" "),s("li",[e._v("You'll notice the "),s("code",[e._v("DirectShape")]),e._v(" node will also create a "),s("code",[e._v("ValueList")]),e._v(" drowpdown to select the appropriate element type.")]),e._v(" "),s("li",[e._v("Connect the "),s("code",[e._v("Stairs by level")]),e._v(" node to the "),s("code",[e._v("BaseGeometries")]),e._v(" input."),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("The "),s("code",[e._v("BaseGeometries")]),e._v(" input expects a list, so make sure you graft it to create one "),s("code",[e._v("DS")]),e._v(" per stair object.")])])]),e._v(" "),s("li",[e._v("Connect a panel to the "),s("code",[e._v("name")]),e._v(" input, and write a meaningful name (it can be unique for each object).")]),e._v(" "),s("li",[e._v("Connect the "),s("code",[e._v("DirectShape")]),e._v(" output "),s("strong",[e._v("and")]),e._v(" the previously created "),s("code",[e._v("RevitFloors")]),e._v(" to a sender and press "),s("code",[e._v("Send")])])]),e._v(" "),s("p",[e._v("Now in Revit just press "),s("strong",[e._v("Receive")]),e._v(" and wait for the magic to happen.")]),e._v(" "),s("p",[s("img",{attrs:{src:o(520),alt:""}})]),e._v(" "),s("h2",{attrs:{id:"receiving-updates"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#receiving-updates"}},[e._v("#")]),e._v(" Receiving updates")]),e._v(" "),s("p",[e._v("In order to ensure that further work on your model does not get deleted when receiving updated data from Speckle, we only delete/add objects when necessary, and update any other existing objects that have been modified.")]),e._v(" "),s("p",[e._v("Lets test this with a simple wall:")]),e._v(" "),s("ol",[s("li",[e._v("In the Revit model, add some new elements, such as walls, linked to the Floors we received.")]),e._v(" "),s("li",[e._v("In grasshopper, modify the affected level in some way and send the new changes.")]),e._v(" "),s("li",[e._v("Receive the changes in Revit.")])]),e._v(" "),s("p",[e._v("If all went well, your walls should have updated along with the floor changes.")]),e._v(" "),s("h2",{attrs:{id:"using-speckle-in-the-family-editor"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#using-speckle-in-the-family-editor"}},[e._v("#")]),e._v(" Using Speckle in the Family Editor")]),e._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[e._v("Under construction")]),e._v(" "),s("p",[e._v("You can definitelly use Speckle inside the Family editor but this section is currently being built 🚧, please check again later!")])]),e._v(" "),s("h2",{attrs:{id:"known-issues"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#known-issues"}},[e._v("#")]),e._v(" Known issues")]),e._v(" "),s("p",[e._v("Speckle 2.0 is currently under "),s("code",[e._v("beta")]),e._v(". You can find any known issues on our "),s("a",{attrs:{href:"https://github.com/specklesystems/speckle-sharp/issues?q=is%3Aissue+is%3Aopen",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub Repo Issues page"),s("OutboundLink")],1),e._v(".")])])}),[],!1,null,null,null);t.default=a.exports}}]);