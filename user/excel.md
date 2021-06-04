---
typora-copy-images-to: ./img-excel
---

# Excel

Speckle currently supports the following versions of Excel:

- Excel on iPad
- Excel 2016 or later on Mac
- Excel 2013 or later on Windows
- Excel on the web

:::tip IMPORTANT 🙌

The Speckle connector for Excel Connector is currently in early alpha, help us get to a stable release by reporting all the 🐛 you may find!

:::

## Getting Started

### Installing

**Our Excel connector is not distributed via the Speckle Manager.**

Instead, you can get it from the Microsoft Office Store.

To install it:

- Open Excel (for Desktop or Web)
- Click on _Insert > Office Add-Ins_
- Search for `speckle` and click _Add_

![image](https://user-images.githubusercontent.com/2679513/120383814-3ffdd600-c31d-11eb-8a77-7b34f8a0785f.png)

Alternatively, just visit [https://appsource.microsoft.com/en-us/product/office/WA200002934](https://appsource.microsoft.com/en-us/product/office/WA200002934).

After installing the connector, it should appear in Excel under the Home ribbon like so:

![image](https://user-images.githubusercontent.com/2679513/119171684-cdf3da00-ba5c-11eb-87a5-bee798f96f90.png)

### Logging In

You'll need to log in to use this connector as it is unable to access your accounts from Speckle Manager. To do so, simply click on the log in button and insert your credentials.

:::tip IMPORTANT 🙌

Currently, **only accounts on our XYZ server are supported**, this is because of limitations on the Microsoft Office Store. We're currently working to add support for any Speckle server.

:::

### Adding Streams

Just click the top left menu > Add stream > click on a stream to add to the document. **The stream will be saved in the document and available whenever you return to it.**

![excel-add](https://user-images.githubusercontent.com/2679513/119180828-b4588f80-ba68-11eb-8ac3-0aa8f9d5158f.gif)

By default, streams are added as receivers but you can easily switch them to sender mode.

![image](https://user-images.githubusercontent.com/2679513/119181346-61330c80-ba69-11eb-9100-7f1b0f9ec82c.png)

## Receiving Data

Receiving data in excel is quite different than in other connectors, and this is because we need to "flatten" it so to represent it in a table format. In general, a stream will either contain:

- Simple values like numbers, text etc
- Complex data structures (objects) like a Revit Wall or a Grasshopper Line. Objects are identified by a `{}` symbol.

The Excel connector works best when receiving lists of either simple values or objects of the same type. Lists are identified by a `[]` symbol.

Since a commit can contain a variety of data types, after clicking the **receive button**, you'll have the possibility to expand and select which data inside it to actually pull and write to your Excel file. You don't have to receive an entire commit each time!

![image-20210521205817594](https://user-images.githubusercontent.com/2679513/119197116-2b991e00-ba7f-11eb-8e70-6d7e962361d5.png)

### Simple Values

When receiving lists (or lists of lists AKA tables) of numbers or text, the data is received without transformations and the values are outputted by default in rows. Therefore, a single list will write data to a single row, a list of lists to multiple rows. If the incoming data has any further levels of nesting, it will be "string-ified".

![image](https://user-images.githubusercontent.com/2679513/119188807-1b7b4180-ba73-11eb-955e-744cf2906e76.png)

### Objects

When receiving lists of objects they are flattened. This means that each object will become a new row and **all its property values (and sub-property values) will become columns**, their names will be the headers.
Individual objects can be received too, and only one row will be created.

:::tip TIP 🙌

We recommend receiving lists of objects that have the same underlying data structure, i.e. only receiving objects of the same type.

:::

![image](https://user-images.githubusercontent.com/2679513/119189886-88dba200-ba74-11eb-8066-cd98972a88dd.png)

Nested objects are flattened as well and their properties delimited by a period `.`. See the example below where 10 lines have been streamed from Dynamo to Excel:

![image](https://user-images.githubusercontent.com/2679513/119195280-4e760300-ba7c-11eb-8601-3ed72a6b0813.png)

#### Complex Objects

When receiving complex objects (with more than 25 properties or sub-objects), you'll be presented with an additional dialog. This will let you filter which columns are to be received.

![excel-receive](https://user-images.githubusercontent.com/2679513/120610238-e1cf1100-c44a-11eb-88cd-669d18faf0a6.gif)

## Sending Data

Similarly to receiving, data can be sent a list of **simple values** or of **objects**.

### Simple values

Just select the range of data you want to send and click "Set range"

![excel-send](https://user-images.githubusercontent.com/2679513/119195853-30f56900-ba7d-11eb-9ac5-fd057a44ac9f.gif)

This is how it'll look in Speckle.

![image](https://user-images.githubusercontent.com/2679513/119196013-72861400-ba7d-11eb-9258-b10f285a6eba.png)

### Objects

To send objects, just replicate the structure of objects that you have previously received, then select "Set range with headers".

For instance, you could create 10 new lines with the data below:

![image](https://user-images.githubusercontent.com/2679513/119196439-17085600-ba7e-11eb-8273-6fdf60e91894.png)

#### Advanced Objects

More advanced use of Objects is possible, and similarly to how our [Grasshopper Schema Builder](/user/grasshopper.html#schema-builder) works, you can **create BIM elements** directly from Excel and **update Revit elements** too.

We will add more documentation on this soon!

## Support

For any feedback and support requests please visit our [community forum](https://speckle.community/).
