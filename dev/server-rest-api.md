# REST API

Speckle Server offers both a GraphQL API ([documented here](/dev/server-api)) and a REST API.

Most of the functionality is presented with the GraphQL API, but there are some cases where a REST API was preferred.

## Uploading and Downloading Objects

### Check if the server contains a list of objects

This method is useful for optimizing uploads, so that objects that are already in the stream are not uploaded for every commit.
- URL: ```${CANONICAL_URL}/api/diff/:streamId```
- Method: `POST`
- Authentication: Token
- Required permissions: Write permissions on the stream
- POST parameters:
    - `objects` (string): An array of object ids, serialized as a JSON string
- Limits:
    - *Recommended* max number of objects to check: `1000`
- Output: A JSON representation of a dictionary, where the keys are the input object ids, and the values are boolean values (whether the server already has that object or not)

### Upload a batch of objects

- URL: ```${CANONICAL_URL}/objects/:streamId```
- Method: `POST`
- Authentication: Token
- Required permissions: Write permissions on the stream
- Input: The batch to be inserted is sent as a multipart-encoded file content (filename is ignored) and is a JSON representation of an array of objects to be inserted
  - Example file content: ```[{"id": "9b2cdb21da092dbd3558a4bc55b2cf7e", "speckle_type": "Base", "totalChildrenCount": 0, "numbers": [0.04667752874618203, 0.16370857295385177, 0.1008153029515465]}]```)
  - The server accepts multiple batches as multiple files in the same call.
  - It's recommended to compress the batch with gzip and set the uploaded file content_type to `application/gzip`. Otherwise, set it to `application/json` 
- Limits:
  - Maximum size of each individual object: `10 MB` (large objects can be split into multiple objects using `chunkable` properties and `detachable` properties)
  - Maximum size of each request: `100 MB` hard limit, recommended max `50 MB`

### Downloading a single object


- URL: ```${CANONICAL_URL}/objects/:streamId/:objectId/single```
- Method: `GET`
- Authentication: Token
- Required permissions: Read permissions on the stream
- Output: The JSON representation of the object

### Downloading a list of objects

This method is useful when optimizing downloads: Get the root object without children, check the children ids in the local cache and then request only the new objects with this method.

- URL: ```${CANONICAL_URL}/api/getobjects/:streamId```
- Method: `POST`
- Authentication: Token
- Required permissions: Read permissions on the stream
- POST parameters:
    - `objects` (string): An array of object ids, serialized as a JSON string
- Headers:
  - `Accept`: either `text/plain` or `application/json`
- Limits:
    - *Recommended* max number of objects to download with 1 request: `1000`
- Output: The requested objects. The formatting is based on the `Accept` HTTP Request header
  - If `Accept` is `text/plain`, each line of the output contains 1 object in the format: `{object_id}\t{object_content}`
  - If `Accept` is `application/json`, the output is a JSON representation of an array of objects.
  
### Downloading an object and all its children

- URL: ```${CANONICAL_URL}/objects/:streamId/:objectId```
- Method: `GET`
- Authentication: Token
- Required permissions: Read permissions on the stream
- Headers:
  - `Accept`: either `text/plain` or `application/json`
- Output: The requested object and its children. The formatting is based on the `Accept` HTTP Request header
  - If `Accept` is `text/plain`, each line of the output contains 1 object in the format: `{object_id}\t{object_content}`
  - If `Accept` is `application/json`, the output is a JSON representation of an array of objects.
