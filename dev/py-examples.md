# Examples

This doc will show you the basics of how to send and receive data and give you an overview of the functionality with in SpecklePy. However, it is not comprehensive. Feel free to explore the repo's [tests](https://github.com/specklesystems/speckle-py/tree/main/tests) for even more examples.

## Sending & Receiving

Let's look at how to send an object to a stream on your server, then receive that object back.

First, you'll need to create and authenticate a client. To use the client, you'll need access to a Speckle server. To authenticate the client, you'll either need local accounts (added using [Manager](/user/manager)) or you can go to `your-server.com/profile` and create a Personal Access Token.

```py
from speckle.api.client import SpeckleClient
from speckle.api.credentials import get_default_account

# initialise the client
client = SpeckleClient(host="your-server.com") # or whatever your host is
# client = SpeckleClient(host="localhost:3000", use_ssl=False) or use local server

# authenticate the client with a token
account = get_default_account()
client.authenticate(token=account.token)
```

Now that you have an authenticated client, you can start interacting with the API. Let's create a new stream and get that stream back.

```py
# create a new stream. this returns the stream id
new_stream_id = client.stream.create(name="a shiny new stream")

# use that stream id to get the stream from the server
new_stream = client.stream.get(id=new_stream_id)
```

Next, we'll need some data to send. To make it more interesting, let's extend `Base` to create a simple block. All your custom objects should inherit from `Base` to ensure serialisation will work as expected.

```py
from speckle.objects import Base

class Point(Base):
    x: float = 0.0
    y: float = 0.0
    z: float = 0.0

class Block(Base):
    length: float = 1.0
    width: float = 1.0
    height: float = 1.0
    origin: Point = Point()

    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        # mark the origin as a detachable attribute
        self._detachable.append("origin")
```

Now let's send a block to the server! To do this, you'll first need to send the object to the stream and get back the object id. You can then use this to create a commit on the stream.

```py
# here's the data you want to send
block = Block(length=2, height=4)

# next create a server transport - this is the vehicle through which you will send and receive
transport = ServerTransport(client=client, stream_id=new_stream_id)

# this serialises the block and sends it to the transport
hash = operations.send(base=block, transports=[transport])

# you can now create a commit on your stream with this object
commid_id = client.commit.create(
    stream_id=new_stream_id, 
    obj_id=hash, 
    message="this is a block I made in speckle-py")
```

Tada! You should now have a commit on your stream containing your block. You'll be able to see the commit on the stream page on the web. Receiving an object back is pretty similar to receiving it. You'll generally be using the client to get a commit, then getting the hash to receive from the `referencedObject` attribute on that commit.

```py
# this receives the object back from the transport. the received data will be deserialised into a `Block` 
received_base = operations.receive(obj_id=hash, remote_transport=transport)
```

## Overview of Functionality

### GraphQL Client

The `SpeckleClient` is the entry point for interacting with the GraphQL API. You'll need to have access to a speckle server to use this. To authenticate, you'll need a token. You can either get one from an account you've already added to your computer using the [Manager](/user/manager) or you can head to `your-server.com/profile` and create a Personal Access Token.

```py
from speckle.api.client import SpeckleClient
from speckle.api.credentials import get_default_account, get_local_accounts

all_accounts = get_local_accounts() # get back a list
account = get_default_account()

client = SpeckleClient(host="your-server.com") # or whatever your host is
# client = SpeckleClient(host="localhost:3000", use_ssl=False) or use local server

client.authenticate(token=account.token)
```

Interacting with streams is designed to be intuitive and evocative of SpecklePy 1.0

```py
# get a list of your most recent streams
stream_list = client.stream.list()

# search your streams
results = client.user.search("mech")

# create a stream
new_stream_id = client.stream.create(name="a shiny new stream")

# get a stream
new_stream = client.stream.get(id=new_stream_id)
```

New in 2.0: branches and commits! Here are some basic interactions.

```py
# get list of commits
commits = client.commit.list("stream_id")

# get a specific commit
commit = client.commit.get("stream_id", "commit_id")

# create a commit
commit_id = client.commit.create(
    stream_id="stream_id", obj_id="object_id", message="this is a commit message to describe the commit")

# delete a commit
deleted = client.commit.delete("stream_id", "commit_id")

# get a list of branches
branches = client.branch.list("stream_id")

# create a branch
branch_id = client.branch.create("stream_id", "branch name", "a description of the branch")

# get a specific branch
branch = client.branch.get("stream_id", "branch name")

```
### Operations and Transports

The `operations` includes four main methods:

1. `send`: send an object to a stream
2. `receive`: receive an object from a stream
3. `serialize`: serialise a given `Base` object
4. `deserialize`: deserializes json into an object into the type specified in `speckle_type` (defaults to a vanilla `Base` if the type can't be found)

Let's look at sending an receiving. You will need to provide a transport to indicate where the objects should be sent / received from. When sending, you can provide multiple transports to send the same object to multiple places simultaneously. At the moment, we have three transports: `SQLiteTransport`, `MemoryTransport`, and `ServerTransport`s. If you'd like to learn more about Transports in Speckle 2.0, have a look [here](/dev/transports).

```py
from speckle.transports.memory import MemoryTransport
from speckle.api import operations

transport = MemoryTransport()

# this serialises the object and sends it to the transport
hash = operations.send(base=base_obj, transports=[transport])

# if the object had detached objects, you can see these as well
saved_objects = transport.objects # a dict with the obj hash as the key

# this receives and object from the given transport, deserialises it,
# and recomposes it into a base object.
# you can optionally provide a local_transport which will default to
# the `SQLiteTransport` pointing at your local cache
received_base = operations.receive(obj_id=hash, remote_transport=transport)
```

You can also use the GraphQL API to send and receive objects. However, note that this method will not recompose a base and will only get the object you explicitly ask for using by its id.

```py
# create a test base object
test_base = Base()
test_base.testing = "a test base obj"

# run it through the serialiser
s = BaseObjectSerializer()
hash, obj = s.traverse_base(test_base)

# send it to the server
objCreate = client.object.create(stream_id="stream id", objects=[obj])

received_base = client.object.get("stream id", hash)
```

### Serialization

The `BaseObjectSerializer` is what's used behind the scenes in the `operations` for decomposing and serializing `Base` objects so they can be sent / received to the server. You probably won't ever need to use it directly. However, if you want you can use it to get the id (hash) and a serializable object representation of the decomposed `Base`. You can learn more about the Speckle `Base` object [here](/dev/base) and the decomposition API [here](/dev/decomposition).

```py
from speckle.objects.base import Base
from speckle.serialization.base_object_serializer import BaseObjectSerializer

detached_base = Base()
detached_base.name = "this will get detached"

base_obj = Base()
base_obj.name = "my base"
base_obj["@nested"] = detached_base

serializer = BaseObjectSerializer()
hash, obj_dict = serializer.traverse_base(base_obj)

hash, serialized = serializer.write_json(base_obj)
deserialized = serializer.read_json(serialized)
```

## Conclusion

This doc is not complete - there's more to see so have a dive into the code and play around! Please feel free to provide feedback, submit issues, or discuss new features ✨