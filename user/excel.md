---
typora-copy-images-to: ./img-excel
---

# Excel

Speckle currently supports the following versions of Excel:

- Excel on iPad
- Excel 2016 or later on Mac
- Excel 2013 or later on Windows
- Excel on the web

For any feedback and support requests please visit our [community forum](https://speckle.community/)!

:::tip IMPORTANT 🙌

Our Excel Connector is currently in early alpha, please use at your own risk!

:::

## Getting Started

### Installing

This connector is not distributed via Manager, **it** **will instead be available soon via the Microsoft Store.**

Until then, please see the connector readme on how to run it locally: [https://github.com/specklesystems/speckle-excel](https://github.com/specklesystems/speckle-excel)

After installing the connector, it should show up within Excel:

![image](https://user-images.githubusercontent.com/2679513/119171684-cdf3da00-ba5c-11eb-87a5-bee798f96f90.png)



### Logging in

You need to log in to use this connector as it is not able to fetch accounts that have been added to Manager. To do so, simply click on the log in button and insert your credentials.

:::tip IMPORTANT 🙌

Currently **only accounts on our XYZ server are supported.** To use a different server please run the connector locally or deploy it with your server details.

:::

### Adding streams

Just click the top left menu > Add stream > click on a stream to add to the document. **The stream will be saved in the document and available whenever you return to it.**

![excel-add](https://user-images.githubusercontent.com/2679513/119180828-b4588f80-ba68-11eb-8ac3-0aa8f9d5158f.gif)



By default streams are added as receivers, but you can easily toggle to sender mode.

![image](https://user-images.githubusercontent.com/2679513/119181346-61330c80-ba69-11eb-9100-7f1b0f9ec82c.png)

## Receiving data

Receiving data in excel is quite different than receiving it in other connectors, and this is because excel can only be represented in a table. Therefore, after clicking the **receive button**, you'll be presented with the data structure of the stream and prompted to select which data inside it to actually pull and write to your file.

Data can be received as **objects** or **lists**. Objects will have a `{}` icon next to them, and lists a `[]` icon.

Click on the download button to their right to pull and write them **in the selected cell**.

![image-20210521205817594](https://user-images.githubusercontent.com/2679513/119197116-2b991e00-ba7f-11eb-8e70-6d7e962361d5.png)



### Lists

Lists (or lists of lists aka tables) are received without transformations and are outputted by default in rows. So a single list will write data to a single row, a list of lists to multiple rows. If the incoming data has any further levels of nesting, it will be "string-ified".

![image](https://user-images.githubusercontent.com/2679513/119188807-1b7b4180-ba73-11eb-955e-744cf2906e76.png)

### Objects

Objects are flattened when received. This means that **all their property names will become headers**, and for each object its values will be listed in a row. Same will apply to their sub-objects.

:::tip IMPORTANT 🙌

We recommend receiving only objects that have a simple structure and few properties. We also discourage receiving data of different types as the list of headers would become very long. 

**Currently, some Revit objects are too complex to be received and displayed**, we're working to add support for them.

:::



![image](https://user-images.githubusercontent.com/2679513/119189886-88dba200-ba74-11eb-8066-cd98972a88dd.png)

Nested objects are flattened and their properties delimited by a period `.`. See the example below where 10 lines have been streamed from Dynamo to Excel:

![image](https://user-images.githubusercontent.com/2679513/119195280-4e760300-ba7c-11eb-8601-3ed72a6b0813.png)

## Sending Data

Similarly to receiving, data can be sent as **lists** (or lists of lists aka tables) or **objects**.

### Lists

Just select the range of data you want to send and click "Set range"

![excel-send](https://user-images.githubusercontent.com/2679513/119195853-30f56900-ba7d-11eb-9ac5-fd057a44ac9f.gif)

This is how it'll look in Speckle.

![image](https://user-images.githubusercontent.com/2679513/119196013-72861400-ba7d-11eb-9258-b10f285a6eba.png)

## Objects

To send objects, just replicate the structure of objects that you have previously received, then select "Set range with headers".

For instance, you could create 10 new lines with the data below:

![image](https://user-images.githubusercontent.com/2679513/119196439-17085600-ba7e-11eb-8273-6fdf60e91894.png)



## Conclusion

This is all for now, we'll keep extending these docs as new features are added. Stay tuned!
