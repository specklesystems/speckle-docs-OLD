# Kits

## What Are Kits?

## Types

## Converters

## Kit Interface

```cs
public interface ISpeckleKit
{
  /// <summary>
  /// Returns all the object types (the object model) provided by this kit.
  /// </summary>
  IEnumerable<Type> Types { get; }
  
  IEnumerable<string> Converters { get; }

  string Description { get; }
  string Name { get; }
  string Author { get; }
  string WebsiteOrEmail { get; }

  /// <summary>
  /// Tries to load a converter for a specific app. 
  /// </summary>
  /// <param name="app">Must be one of the Kits.Applications variables.</param>
  /// <returns>The converter for the specific app, or null.</returns>
  public ISpeckleConverter LoadConverter(string app);

}
```

## Kit Manager


```cs
var kit = KitManager.GetDefaultKit();
var converter = kit.LoadConverter(ConnectorRevitUtils.RevitAppName);
converter.SetContextDocument(CurrentDoc.Document);
```