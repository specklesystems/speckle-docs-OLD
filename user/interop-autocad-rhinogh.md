# AutoCAD ➡ Rhino & Grasshopper

Quality control your AutoCAD drawing with the visual programming power of Grasshopper! In this tutorial, we'll send a floorplan from AutoCAD to Rhino with Speckle, run a simple Grasshopper script to find incorrectly drawn lines, and send the annotations back to AutoCAD. We'll also adjust some blocks in Rhino along the way.

![](./img-interop/autocad-rhinogh-intro.gif)

## Tutorial

Before getting started, make sure you have Speckle Manager installed and an active account set up on a server. This tutorial uses AutoCAD 2021 and Rhino 7 - check that you have the Speckle 2.0 connectors installed for these applications. Then, download the [AutoCAD](https://drive.google.com/file/d/1-2a16JwCKxR6nXDFJr2WHaX1jMJeNeTb/view?usp=sharing) and [Grasshopper](https://drive.google.com/file/d/1-4SgskLzdQMJ0ZmPUdZraTCALPcGqd75/view?usp=sharing) files for this tutorial.

1.  Open the AutoCAD file. The drawing is a simplified version of a sample dwg that comes installed with AutoCAD.
2.  Pull up the AutoCAD Desktop UI by typing `Speckle` in the command line, or by clicking on the Speckle 2 plugin in the Add-Ins tab.
3.  Open a new Rhino file, and start Grasshopper by typing `Grasshopper` in the command line. Open the gh file included with this tutorial.

### Send the AutoCAD drawing to Rhino

Let's send our first stream commit! Keep in mind that we'll use branches to organize our data in this tutorial.

1.  Create a new `Plan Coordination` stream and check that it is on **Sender** mode. If not, click the arrows on the top right corner to swap the card mode.
2.  Create a new `Annotations` branch by clicking on **main** in the bottom left of the card and selecting *Add a new branch* from the drop down. Switch back to **main** after creating the new branch.
3.  Select all geometry in the file.
4.  Click the blue **Objects** button and select *Set Selection* from the dropdown.
5.  Click **Send** on the `Plan Coordination` stream card. Type `Drawing for review` in the comment line, and click **Send** again to commit the selected geometry.
6.  To view the drawing in the web viewer, click the **Open in browser** icon in the top right corner of the card. Keep this tab open for later.
7.  In Rhino Desktop UI, click the blue **Add a stream** button on the bottom. Add the `Plan Coordination` stream card to UI by clicking the arrow next to the stream in the popup window.
8.  Click **Receive** on the stream card, and watch the drawing you just sent come into Rhino!

![](./img-interop/autocad-rhinogh-send.mp4)

### Run a Grasshopper script to identify bad lines

The sample plan drawing from AutoCAD has some messy lines with gaps or overlaps at the ends that need to be cleaned up - we'll run a quick analysis in Grasshopper and send the results back to AutoCAD.

1.  Select all drawing lines in Rhino and set them in the input `Crv node` in Grasshopper by right-clicking the node and selecting *Select Multiple Curves* from the dropdown.
2.  You should see small circles previewed on all curve ends that are not correctly adjoining other curves in the drawing! Adjust the `Radius` slider in the input to customize the size of these annotation circles.
3.  To send our annotations back to AutoCAD, get the `Annotations` branch url from the web browser tab we opened in the previous section. Navigate to the `Annotations` branch page in the browser and copy this url.
4.  In the Speckle section of the grasshopper script, paste your copied url into the text panel.
5.  Make sure you have a valid account selected for the stream server in the accounts node, and click **Send** in the sender node.
6.  Go back to AutoCAD and swap the `Plan Coordination` stream to receiver mode. Select the `Annotations` branch from the branch dropdown, and click **Receive**.
7.  The Grasshopper generated circles now appear in your file - change their layer color to red and use these as a guide to see which lines need to be fixed!

![](./img-interop/autocad-rhinogh-annotations.mp4)

### Modify drawing blocks in Rhino 

Finally, we'll make some changes to the door blocks and send them back to AutoCAD.

1.  Double-click a door block instance in the Rhino file to open block editing.
2.  Trim the end of the door swing curve to match the end of the door curve, and press enter to save block changes. Make the same change for any other door block definitions that need trimming.
3.  Open block manager by typing `BlockManager` in the command line. Locate the door block definitions (left and right swing) and rename them by removing the strema commit prefix. Now they are ready for sending!
4.  Create a new `Block edits` branch in the `Plan Coordination` stream in Rhino.
5.  Select all door block instances, set the selection, and send them to this branch.
6.  Receive the new blocks in AutoCAD - open Block Manager to delete the old door blocks from your file, and rename the received block definitions by removing the commit prefix!

![](./img-interop/autocad-rhinogh-blocks.mp4)

## Remarks

Block conversions in Rhino and AutoCAD are an early prototype, so we currently do not support nested block definitions or dynamic blocks. If you have feedback on this feature, hop over to our [community discourse](https://speckle.community/c/making-speckle/10) and give us a shout!
