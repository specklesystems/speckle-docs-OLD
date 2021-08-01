(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{566:function(e,t,o){e.exports=o.p+"assets/img/rhino-revit-intro.c7458c2e.gif"},567:function(e,t,o){e.exports=o.p+"assets/media/rhino-revit-context.a8c149d7.mp4"},568:function(e,t,o){e.exports=o.p+"assets/media/rhino-revit-ground-floor.542228a9.mp4"},569:function(e,t,o){e.exports=o.p+"assets/media/rhino-revit-core.c0b766b7.mp4"},570:function(e,t,o){e.exports=o.p+"assets/media/rhino-revit-floors-and-truss.d374cf6b.mp4"},704:function(e,t,o){"use strict";o.r(t);var a=o(44),s=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"rhino-➡-revit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rhino-➡-revit"}},[e._v("#")]),e._v(" Rhino ➡ Revit")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("NOTE ❗️")]),e._v(" "),a("p",[e._v("All our tutorials have been migrated to out tutorials portal!\nCheck them out 👉 "),a("a",{attrs:{href:"https://speckle.systems/tutorials/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tutorials"),a("OutboundLink")],1)])]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("Level:")]),e._v(" beginner")]),e._v(" "),a("p",[a("strong",[e._v("Author:")]),e._v(" Claire")]),e._v(" "),a("p",[a("strong",[e._v("Software used:")]),e._v(" Revit 2021, Rhino 7")])]),e._v(" "),a("p",[a("strong",[e._v("Stream Rhino geometry directly into Revit with Speckle!")])]),e._v(" "),a("p",[e._v("In this tutorial, we'll send a sample building from Rhino into default "),a("code",[e._v("Floor")]),e._v(", "),a("code",[e._v("Wall")]),e._v(", "),a("code",[e._v("Facewall")]),e._v(", and "),a("code",[e._v("Column")]),e._v(" and "),a("code",[e._v("Beam")]),e._v(" families in Revit with the "),a("strong",[e._v("ApplySpeckleSchema")]),e._v(" command.")]),e._v(" "),a("p",[a("img",{attrs:{src:o(566),alt:""}})]),e._v(" "),a("h2",{attrs:{id:"tutorial"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tutorial"}},[e._v("#")]),e._v(" Tutorial")]),e._v(" "),a("p",[e._v("Before getting started, make sure you have "),a("a",{attrs:{href:"./manager"}},[e._v("Speckle Manager")]),e._v(" installed and an active account set up on a server. This tutorial uses Rhino 7 and any supported version of Revit - check that you have the Speckle 2.0 connectors installed for these applications. Then, download the Rhino 7 file for this tutorial "),a("a",{attrs:{href:"https://drive.google.com/file/d/1FhMNXpmd3VR8OK_4riCvnAdMImXVmFAl/view?usp=sharing",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("ol",[a("li",[e._v("Open the Rhino file. The model is organized into layers for each section of the model we will be sending.")]),e._v(" "),a("li",[e._v("Pull up the Rhino Desktop UI by typing "),a("code",[e._v("Speckle")]),e._v(" in the command line.")]),e._v(" "),a("li",[e._v("Open a new Revit file, and open our Revit connector, which can be found in the Add-ins ribbon .")])]),e._v(" "),a("h3",{attrs:{id:"send-context-geometry-as-breps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#send-context-geometry-as-breps"}},[e._v("#")]),e._v(" Send Context Geometry as Breps")]),e._v(" "),a("p",[e._v("Let's send our first stream! Since we won't be sending the context geometry as families, the next steps are just a warm up (with some fun layer filtering action):")]),e._v(" "),a("ol",[a("li",[e._v("Create a new stream, name it "),a("code",[e._v("Context")]),e._v(" and check that it is on "),a("strong",[e._v("Sender")]),e._v(" mode. If not, click the arrows on the top right corner to toggle between the two modes.")]),e._v(" "),a("li",[e._v("Click the blue "),a("strong",[e._v("Objects")]),e._v(" button and select "),a("em",[e._v("Set/Edit Objects Filter")]),e._v(" from the dropdown.")]),e._v(" "),a("li",[e._v("From the "),a("code",[e._v("Layer")]),e._v(" filter tab, select "),a("em",[e._v("Context::Buildings")]),e._v(" and "),a("em",[e._v("Leadenhallish:Substructure")]),e._v(" and click "),a("strong",[e._v("Set Filter")]),e._v(".")]),e._v(" "),a("li",[e._v("Click "),a("strong",[e._v("Send")]),e._v(" on the "),a("code",[e._v("Context")]),e._v(" stream card.")]),e._v(" "),a("li",[e._v("In Revit Desktop UI, click the blue "),a("strong",[e._v("Add a stream")]),e._v(" button on the bottom. Add the "),a("code",[e._v("Context")]),e._v(" stream by clicking the arrow next to the stream in the popup window.")]),e._v(" "),a("li",[e._v("Click "),a("strong",[e._v("Receive")]),e._v(" on the stream, and watch the geometry come in as generic models.")])]),e._v(" "),a("p",[e._v("Overall, not a bad start - now let's do some serious sending!")]),e._v(" "),a("p",[a("video",{attrs:{controls:"",preload:"metadata"}},[a("source",{attrs:{type:"video/mp4",src:o(567)}}),e._v("\nYour browser does not support playing HTML5 video. You can "),a("a",{attrs:{href:"./img-interop/rhino-revit-context.mp4",download:""}},[e._v("download a copy of the video file")]),e._v(" instead.\n")])]),e._v(" "),a("h3",{attrs:{id:"send-ground-floor-geometry-with-walls-floors-and-a-facewall"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#send-ground-floor-geometry-with-walls-floors-and-a-facewall"}},[e._v("#")]),e._v(" Send Ground Floor Geometry with Walls, Floors, and a Facewall")]),e._v(" "),a("p",[e._v("For the ground level of our building, we're going to send geometry as a mix of walls, floors, facewalls, and generic models for elements (like ramp surfaces) that are not currently supported.")]),e._v(" "),a("p",[e._v("Let's try using the "),a("strong",[e._v("Automagic")]),e._v(" ⚡ method, which automatically decides which schemas to apply to your selected geoemtry based on object and layer names as well as geometry type. Let's test this out and see which geometries were successfully assigned a schema:")]),e._v(" "),a("ol",[a("li",[e._v("Lock the context layers you sent from the previous section, and hide all layers except for "),a("em",[e._v("Leadenhallish::Ground Floor")]),e._v(" for ease of selection.")]),e._v(" "),a("li",[e._v("Type "),a("strong",[e._v("ApplySpeckleSchema")]),e._v(" in the command line - notice that the "),a("em",[e._v("Automatic")]),e._v(" command option toggle is by default set to "),a("em",[e._v("On")]),e._v(".")]),e._v(" "),a("li",[e._v("Select all objects in "),a("em",[e._v("Leadenhallish::Ground Floor")]),e._v(" and hit "),a("strong",[e._v("Enter")]),e._v(" to finish the command.")]),e._v(" "),a("li",[e._v("Now click through the geometry and check which pieces have been assigned a Speckle schema by navigating to the "),a("em",[e._v("Object > Properties > Attribute User Text")]),e._v(" panel.")])]),e._v(" "),a("p",[e._v("You should see a "),a("strong",[e._v("<SpeckleSchema,Floor>")]),e._v(" keyvalue pair in the attribute user text panel of any planar horizontal surfaces on the ground floor. However, the planar vertical surfaces were not assigned a schema, even though they should be walls: this is because the automagic method picked up the word "),a("em",[e._v("Floor")]),e._v(" in the layer name and only tried to assign the "),a("code",[e._v("Floor")]),e._v(" schema to all the selected objects! Let's manually set a wall schema for our vertical surfaces:")]),e._v(" "),a("ol",[a("li",[e._v("Select the vertical surfaces on the "),a("em",[e._v("Leadenhallish::Ground Floor")]),e._v(" layer.")]),e._v(" "),a("li",[e._v("Type "),a("strong",[e._v("ApplySpeckleSchema")]),e._v(" in the command line and set the "),a("em",[e._v("Automatic")]),e._v(" command option toggle to "),a("em",[e._v("Off")]),e._v(". Hit "),a("strong",[e._v("Enter")]),e._v(".")]),e._v(" "),a("li",[e._v("The command now shows two options. Make sure "),a("em",[e._v("DirectShape")]),e._v(" is set to "),a("em",[e._v("Off")]),e._v(", and click on the "),a("em",[e._v("Schema")]),e._v(" option toggle to change the schema to "),a("em",[e._v("Wall")]),e._v(". Hit "),a("strong",[e._v("Enter")]),e._v(".")]),e._v(" "),a("li",[e._v("Check the "),a("em",[e._v("Attribute User Text")]),e._v(" panel and you should see a "),a("strong",[e._v("<SpeckleSchema,Wall>")]),e._v(" entry now!")]),e._v(" "),a("li",[e._v("Repeat steps 1-4 for the curving surface on the ground floor, this time selecting the "),a("em",[e._v("Schema=Facewall")]),e._v(" option instead.")])]),e._v(" "),a("p",[e._v("Create a new stream, name it "),a("code",[e._v("Ground Floor")]),e._v(" and send all geometry from the "),a("em",[e._v("Leadenhallish::Ground Floor")]),e._v(" layer. In Revit, receive this stream and any objects that were assigned a schema will be converted as default Revit families.")]),e._v(" "),a("p",[a("video",{attrs:{controls:"",preload:"metadata"}},[a("source",{attrs:{type:"video/mp4",src:o(568)}}),e._v("\nYour browser does not support playing HTML5 video. You can "),a("a",{attrs:{href:"./img-interop/rhino-revit-ground-floor.mp4",download:""}},[e._v("download a copy of the video file")]),e._v(" instead.\n")])]),e._v(" "),a("h3",{attrs:{id:"send-the-core-brep-as-walls-and-floors"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#send-the-core-brep-as-walls-and-floors"}},[e._v("#")]),e._v(" Send the Core Brep as Walls and Floors")]),e._v(" "),a("p",[e._v("Next, we'll send try to send the core geometry as "),a("code",[e._v("Wall")]),e._v(" and "),a("code",[e._v("Floor")]),e._v(" surfaces.")]),e._v(" "),a("ol",[a("li",[e._v("Lock the previous layer and unhide the "),a("em",[e._v("Leadenhallish::Core")]),e._v(" layer.")]),e._v(" "),a("li",[e._v("Select all geometry - notice that the core is modelled as a single brep.")]),e._v(" "),a("li",[e._v("Try to apply schemas automatically with the "),a("strong",[e._v("ApplySpeckleSchema")]),e._v(" command.")]),e._v(" "),a("li",[e._v("No schemas were assigned to the brep! We need to explode it first into surfaces: select the brep and type "),a("strong",[e._v("Explode")]),e._v(" in the command line.")]),e._v(" "),a("li",[e._v("Now try applying schemas again. Voila, floors and walls were assigned!")]),e._v(" "),a("li",[e._v("Create a "),a("code",[e._v("Core")]),e._v(" stream and send the geometry to Revit")])]),e._v(" "),a("p",[a("video",{attrs:{controls:"",preload:"metadata"}},[a("source",{attrs:{type:"video/mp4",src:o(569)}}),e._v("\nYour browser does not support playing HTML5 video. You can "),a("a",{attrs:{href:"./img-interop/rhino-revit-core.mp4",download:""}},[e._v("download a copy of the video file")]),e._v(" instead.\n")])]),e._v(" "),a("h3",{attrs:{id:"send-the-floor-slabs-and-truss-to-complete-the-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#send-the-floor-slabs-and-truss-to-complete-the-model"}},[e._v("#")]),e._v(" Send the Floor, Slabs and Truss to Complete the Model")]),e._v(" "),a("p",[e._v("To finish off our model, let's send the floor slabs and truss with the automagic method. We don't need to worry about missing schemas in the "),a("em",[e._v("Leadenhallish::Floor Slabs")]),e._v(" layer since it only has horizontal surfaces, and the truss curves in "),a("em",[e._v("Leadenhallish::Structure")]),e._v(" sublayers will be intelligently picked up as either "),a("code",[e._v("Column")]),e._v(" or "),a("code",[e._v("Beam")]),e._v(" objects!")]),e._v(" "),a("ol",[a("li",[e._v("Lock the previous layer and unhide "),a("em",[e._v("Leadenhallish::Structure")]),e._v(" and select "),a("em",[e._v("Leadenhallish::Floor Slabs")]),e._v(". Select all containing geometry.")]),e._v(" "),a("li",[e._v("Apply schemas automatically with the "),a("strong",[e._v("ApplySpeckleSchema")]),e._v(" command.")]),e._v(" "),a("li",[e._v("Cycle through some of the truss members to look at their assigned schema. Lines with < 45 degree deviation from vertical are assigned as columns, while all others are assigned as beams.")]),e._v(" "),a("li",[e._v("Create a new "),a("code",[e._v("Floors and Truss")]),e._v(" stream and send to Revit. Go to Revit and receive it - our Leadenhall lookalike building is now complete!")])]),e._v(" "),a("p",[a("video",{attrs:{controls:"",preload:"metadata"}},[a("source",{attrs:{type:"video/mp4",src:o(570)}}),e._v("\nYour browser does not support playing HTML5 video. You can "),a("a",{attrs:{href:"./img-interop/rhino-revit-floors-and-truss.mp4",download:""}},[e._v("download a copy of the video file")]),e._v(" instead.\n")])]),e._v(" "),a("h2",{attrs:{id:"remarks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#remarks"}},[e._v("#")]),e._v(" Remarks")]),e._v(" "),a("p",[e._v("Detailed information on the Rhino schema commands used in this tutorial can be found under the "),a("code",[e._v("Advanced User")]),e._v(" section in the Rhino User Guide. This feature is an early prototype, so we currently do not offer control over specific family types during schema assignment: ⚠ all geometry with schemas are assigned a default type upon conversion into Revit.")]),e._v(" "),a("p",[e._v("To remove schemas applied during this tutorial and start over:")]),e._v(" "),a("ol",[a("li",[e._v("Type "),a("strong",[e._v("RemoveSpeckleSchema")]),e._v(" in the command line")]),e._v(" "),a("li",[e._v("Select objects to remove schemas from")]),e._v(" "),a("li",[e._v("Press "),a("strong",[e._v("Enter")]),e._v(" - Speckle AUT strings are now deleted from all selected objects!")])])])}),[],!1,null,null,null);t.default=s.exports}}]);