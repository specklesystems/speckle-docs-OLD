# Writing your own transport

WIP 🚧

```cs
public interface ITransport
{
  public string TransportName { get; set; }

  /// <summary>
  /// Saves an object.
  /// </summary>
  /// <param name="id">The hash of the object.</param>
  /// <param name="serializedObject">The full string representation of the object.</param>
  public void SaveObject(string id, string serializedObject);

  /// <summary>
  /// Saves an object, retrieving its serialised version from the provided transport.
  /// </summary>
  /// <param name="id">The hash of the object.</param>
  /// <param name="sourceTransport">The transport from where to retrieve it.</param>
  public void SaveObject(string id, ITransport sourceTransport);

  /// <summary>
  /// Gets an object.
  /// </summary>
  /// <param name="id">The object's hash.</param>
  public string GetObject(string id);

  /// <summary>
  /// Copies the parent object and all its children to the provided transport.
  /// </summary>
  /// <param name="id">The id of the object you want to copy.</param>
  /// <param name="targetTransport">The transport you want to copy the object to.</param>
  public Task<string> CopyObjectAndChildren(string id, ITransport targetTransport);
}
```
