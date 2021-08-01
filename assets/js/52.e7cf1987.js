(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{684:function(e,t,o){"use strict";o.r(t);var s=o(44),a=Object(s.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"rest-api"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#rest-api"}},[e._v("#")]),e._v(" REST API")]),e._v(" "),o("p",[e._v("Our Speckle Server offers both a "),o("a",{attrs:{href:"/dev/server-graphql-api"}},[e._v("GraphQL API")]),e._v(" and a REST API, for most of your queries the GQL API is probably best suited because of its flexibility and ease of use.\nWhen working with uploading and downloading objects, the REST API is preferred.")]),e._v(" "),o("h2",{attrs:{id:"uploading-and-downloading-objects"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#uploading-and-downloading-objects"}},[e._v("#")]),e._v(" Uploading and Downloading Objects")]),e._v(" "),o("h3",{attrs:{id:"check-if-the-server-contains-a-list-of-objects"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#check-if-the-server-contains-a-list-of-objects"}},[e._v("#")]),e._v(" Check if the server contains a list of objects")]),e._v(" "),o("p",[e._v("This method is useful for optimizing uploads, so that objects that are already in the stream are not uploaded for every commit.")]),e._v(" "),o("p",[o("strong",[e._v("URL:")]),e._v(" "),o("code",[e._v("${CANONICAL_URL}/api/diff/:streamId")])]),e._v(" "),o("p",[o("strong",[e._v("Method:")]),e._v(" "),o("span",{staticClass:"api-chip post"},[e._v("POST")])]),e._v(" "),o("p",[o("strong",[e._v("Authentication:")]),e._v(" Token")]),e._v(" "),o("p",[o("strong",[e._v("Required permissions:")]),e._v(" Write permissions on the stream")]),e._v(" "),o("p",[o("strong",[e._v("Parameters:")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("objects")]),e._v(" (string): An array of object ids, serialized as a JSON string")])]),e._v(" "),o("p",[o("strong",[e._v("Limits:")])]),e._v(" "),o("ul",[o("li",[o("em",[e._v("Recommended")]),e._v(" max number of objects to check: "),o("code",[e._v("1000")])])]),e._v(" "),o("p",[o("strong",[e._v("Output:")]),e._v(" A JSON representation of a dictionary, where the keys are the input object ids, and the values are boolean values (whether the server already has that object or not)")]),e._v(" "),o("h3",{attrs:{id:"upload-a-batch-of-objects"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#upload-a-batch-of-objects"}},[e._v("#")]),e._v(" Upload a batch of objects")]),e._v(" "),o("p",[o("strong",[e._v("URL:")]),e._v(" "),o("code",[e._v("${CANONICAL_URL}/objects/:streamId")])]),e._v(" "),o("p",[o("strong",[e._v("Method:")]),e._v(" "),o("span",{staticClass:"api-chip post"},[e._v("POST")])]),e._v(" "),o("p",[o("strong",[e._v("Authentication:")]),e._v(" Token")]),e._v(" "),o("p",[o("strong",[e._v("Required permissions:")]),e._v(" Write permissions on the stream")]),e._v(" "),o("p",[o("strong",[e._v("Input:")]),e._v(" The batch to be inserted is sent as a multipart-encoded file content (filename is ignored) and is a JSON representation of an array of objects to be inserted")]),e._v(" "),o("ul",[o("li",[e._v("Example file content: "),o("code",[e._v('[{"id": "9b2cdb21da092dbd3558a4bc55b2cf7e", "speckle_type": "Base", "totalChildrenCount": 0, "numbers": [0.04667752874618203, 0.16370857295385177, 0.1008153029515465]}]')]),e._v(")")]),e._v(" "),o("li",[e._v("The server accepts multiple batches as multiple files in the same call.")]),e._v(" "),o("li",[e._v("It's recommended to compress the batch with gzip and set the uploaded file content_type to "),o("code",[e._v("application/gzip")]),e._v(". Otherwise, set it to "),o("code",[e._v("application/json")])])]),e._v(" "),o("p",[o("strong",[e._v("Limits:")])]),e._v(" "),o("ul",[o("li",[e._v("Maximum size of each individual object: "),o("code",[e._v("10 MB")]),e._v(" (large objects can be split into multiple objects using "),o("code",[e._v("chunkable")]),e._v(" properties and "),o("code",[e._v("detachable")]),e._v(" properties)")]),e._v(" "),o("li",[e._v("Maximum size of each request: "),o("code",[e._v("50 MB")]),e._v(" hard limit")])]),e._v(" "),o("h3",{attrs:{id:"downloading-a-single-object"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#downloading-a-single-object"}},[e._v("#")]),e._v(" Downloading a single object")]),e._v(" "),o("p",[o("strong",[e._v("URL:")]),e._v(" "),o("code",[e._v("${CANONICAL_URL}/objects/:streamId/:objectId/single")])]),e._v(" "),o("p",[o("strong",[e._v("Method:")]),e._v(" "),o("span",{staticClass:"api-chip get"},[e._v("GET")])]),e._v(" "),o("p",[o("strong",[e._v("Authentication:")]),e._v(" Token")]),e._v(" "),o("p",[o("strong",[e._v("Required permissions:")]),e._v(" Read permissions on the stream")]),e._v(" "),o("p",[o("strong",[e._v("Output:")]),e._v(" The JSON representation of the object")]),e._v(" "),o("h3",{attrs:{id:"downloading-a-list-of-objects"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#downloading-a-list-of-objects"}},[e._v("#")]),e._v(" Downloading a list of objects")]),e._v(" "),o("p",[e._v("This method is useful when optimizing downloads: Get the root object without children, check the children ids in the local cache and then request only the new objects with this method.")]),e._v(" "),o("p",[o("strong",[e._v("URL:")]),e._v(" "),o("code",[e._v("${CANONICAL_URL}/api/getobjects/:streamId")])]),e._v(" "),o("p",[o("strong",[e._v("Method:")]),e._v(" "),o("span",{staticClass:"api-chip post"},[e._v("POST")])]),e._v(" "),o("p",[o("strong",[e._v("Authentication:")]),e._v(" Token")]),e._v(" "),o("p",[o("strong",[e._v("Required permissions:")]),e._v(" Read permissions on the stream")]),e._v(" "),o("p",[o("strong",[e._v("Parameters:")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("objects")]),e._v(" (string): An array of object ids, serialized as a JSON string")])]),e._v(" "),o("p",[o("strong",[e._v("Headers:")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("Accept")]),e._v(": either "),o("code",[e._v("text/plain")]),e._v(" or "),o("code",[e._v("application/json")])])]),e._v(" "),o("p",[o("strong",[e._v("Limits:")])]),e._v(" "),o("ul",[o("li",[o("em",[e._v("Recommended")]),e._v(" max number of objects to download with 1 request: "),o("code",[e._v("1000")])])]),e._v(" "),o("p",[o("strong",[e._v("Output:")]),e._v(" The requested objects. The formatting is based on the "),o("code",[e._v("Accept")]),e._v(" HTTP Request header")]),e._v(" "),o("ul",[o("li",[e._v("If "),o("code",[e._v("Accept")]),e._v(" is "),o("code",[e._v("text/plain")]),e._v(", each line of the output contains 1 object in the format: "),o("code",[e._v("{object_id}\\t{object_content}")])]),e._v(" "),o("li",[e._v("If "),o("code",[e._v("Accept")]),e._v(" is "),o("code",[e._v("application/json")]),e._v(", the output is a JSON representation of an array of objects.")])]),e._v(" "),o("h3",{attrs:{id:"downloading-an-object-and-all-its-children"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#downloading-an-object-and-all-its-children"}},[e._v("#")]),e._v(" Downloading an object and all its children")]),e._v(" "),o("p",[o("strong",[e._v("URL:")]),e._v(" "),o("code",[e._v("${CANONICAL_URL}/objects/:streamId/:objectId")])]),e._v(" "),o("p",[o("strong",[e._v("Method:")]),e._v(" "),o("span",{staticClass:"api-chip get"},[e._v("GET")])]),e._v(" "),o("p",[o("strong",[e._v("Authentication:")]),e._v(" Token")]),e._v(" "),o("p",[o("strong",[e._v("Required permissions:")]),e._v(" Read permissions on the stream")]),e._v(" "),o("p",[o("strong",[e._v("Headers:")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("Accept")]),e._v(": either "),o("code",[e._v("text/plain")]),e._v(" or "),o("code",[e._v("application/json")])])]),e._v(" "),o("p",[o("strong",[e._v("Output:")]),e._v(" The requested object and its children. The formatting is based on the "),o("code",[e._v("Accept")]),e._v(" HTTP Request header")]),e._v(" "),o("ul",[o("li",[e._v("If "),o("code",[e._v("Accept")]),e._v(" is "),o("code",[e._v("text/plain")]),e._v(", each line of the output contains 1 object in the format: "),o("code",[e._v("{object_id}\\t{object_content}")])]),e._v(" "),o("li",[e._v("If "),o("code",[e._v("Accept")]),e._v(" is "),o("code",[e._v("application/json")]),e._v(", the output is a JSON representation of an array of objects.")])])])}),[],!1,null,null,null);t.default=a.exports}}]);