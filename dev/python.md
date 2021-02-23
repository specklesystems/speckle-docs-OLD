# Introduction

The Python SDK is hosted in our [speckle-py repo](https://github.com/specklesystems/speckle-py), its readme contains instructions on how to build it.
It's compatible with Python 3.6+.

## Examples

The `SpeckleClient` is the entry point for interacting with the GraphQL API. You'll need to have a running server to use this.

```py
from speckle.api.client import SpeckleClient
from speckle.api.credentials import get_default_account, get_local_accounts

all_accounts = get_local_accounts() # get back a list
account = get_default_account()

client = SpeckleClient(host="localhost:3000", use_ssl=False)
# client = SpeckleClient(host="yourserver.com") or whatever your host is

client.authenticate(account.token)
```

Interacting with streams is meant to be intuitive and evocative of PySpeckle 1.0

```py
# get your streams
stream_list = client.stream.list()

# search your streams
results = client.user.search("mech")

# create a stream
new_stream_id = client.stream.create(name="a shiny new stream")

# get a stream
new_stream = client.stream.get(id=new_stream_id)
```

New in 2.0: commits! Here are some basic commit interactions.

```py
# get list of commits
commits = client.commit.list("stream id")

# get a specific commit
commit = client.commit.get("stream id", "commit id")

# create a commit
commit_id = client.commit.create("stream id", "object id", "this is a commit message to describe the commit")

# delete a commit
deleted = client.commit.delete("stream id", "commit id")
```

The `BaseObjectSerializer` is used for decomposing and serializing `Base` objects so they can be sent / received to the server. You can use it directly to get the id (hash) and a serializable object representation of the decomposed `Base`. You can learn more about the Speckle `Base` object [here](https://discourse.speckle.works/t/core-2-0-the-base-object/782) and the decomposition API [here](https://discourse.speckle.works/t/core-2-0-decomposition-api/911).

```py
detached_base = Base()
detached_base.name = "this will get detached"

base_obj = Base()
base_obj.name = "my base"
base_obj["@nested"] = detached_base

serializer = BaseObjectSerializer()
hash, obj_dict = serializer.traverse_base(base_obj)
```

If you use the `operations`, you will not need to interact with the serializer directly as this will be taken care of for you. You will just need to provide a transport to indicate where the objects should be sent / received from. At the moment, just the `MemoryTransport` and the `ServerTransport` are fully functional at the moment. If you'd like to learn more about Transports in Speckle 2.0, have a look [here](https://discourse.speckle.works/t/core-2-0-transports/919).

```py
transport = MemoryTransport()

# this serialises the object and sends it to the transport
hash = operations.send(base=base_obj, transports=[transport])

# if the object had detached objects, you can see these as well
saved_objects = transport.objects # a dict with the obj hash as the key

# this receives and object from the given transport, deserialises it, and recomposes it into a base object
received_base = operations.receive(obj_id=hash, remote_transport=transport)
```

You can also use the GraphQL API to send and receive objects.

```py
# create a test base object
test_base = Base()
test_base.testing = "a test base obj"

# run it through the serialiser
s = BaseObjectSerializer()
hash, obj = s.traverse_base(test_base)

# send it to the server
objCreate = client.object.create(stream_id="stream id", objects=[obj])

received_base = client.object.get(hash)
```

This doc is not complete - there's more to see so have a dive into the code and play around! Please feel free to provide feedback, submit issues, or discuss new features ✨
