# Introduction

The Python SDK can be found in our [speckle-py repo](https://github.com/specklesystems/speckle-py), its readme contains instructions on how to build it.
It's compatible with Python 3.6+.

SpecklePy has three main parts:

1. a `SpeckleClient` which allows you to interact with the server API
2. `operations` and `transports` for sending and receiving large objects
3. a `Base` object and accompanying serializer for creating and customising your own Speckle objects