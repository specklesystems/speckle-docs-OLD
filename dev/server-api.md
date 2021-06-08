# Introduction

Speckle server, frontend and viewer are hosted in our [speckle-server](https://github.com/specklesystems/speckle-server) repo.

To set up a local Speckle server for development, check out the Readme files in the git repo for a quick start, or the [Local Setup](/dev/server-setup) page for detailed instructions.  

## Server API

The primary API of the Speckle Server is a GraphQL one. 

The best way to explore and understand the Server API is to use our interactive explorer that come bundled with the server. 

:::warning 

Any queries and mutations that you execute through the exploer will use the actual data from the server - take care!

:::

### GraphIQL

Simply head to `YOUR-SERVER-ADDRESS/explorer`, and on the right panel you'll be able to see the API docs and schemas. After logging in you'll also be able to execute queries and mutations as the logged in user.

![graphql-explorer](../dev/img/graphql-explorer.png)


### GraphQL Explorer

Alternatively, the classic GraphQL explorer is also available at `YOUR-SERVER-ADDRESS/graphql`.

![graphql-explorer](../dev/img/graphql-explorer-2.png)

To authenticate, you will need to pass in a personal access token in the authorization header: 

![graphql-explorer](../dev/img/authorization-header-gql.png)

:::tip

How do you create a token, we hear you ask? Read the section on [personal access tokens](/dev/tokens.html)!

:::

### Examples

#### Example 1

When trying to query Revit parameters (family, category, etc.) for a specific object (0d0a4...), in a specific stream (c6b0c...) :

``` graphql
Query($myQuery:[JSONObject!]){
    Stream(id:"c6b0c4077a"){
        object(id:"0d0a4abc6a5fcc763e6c850dd3d5ecab"){
            totalChildrenCount
            children(query: $myQuery select:["parameters", "speckle_type", "type", "family", "category"]){
                totalCount
                cursor
                objects{
                    id
                    data
                }
            }
        }
    }
}
```

Where the "myQuery" variable is:

``` graphql
{
    "myQuery": [
        {
            "field":"applicationId",
            "value":"6cbabf1d-e8d0-47f0-ac4d-9a7923128d37-0006fb07",
            "operator":"="
        }
    ]
}
```

#### Example 2
Return objects while querying by a specific parameter value. Here, only objects with a parameter value greater than 5 are returned.

``` graphql
Query($myQuery:[JSONObject!]){
    Stream(id:"c6b0c4077a"){
        object(id:"0d0a4abc6a5fcc763e6c850dd3d5ecab"){
            totalChildrenCount
            children(query: $myQuery select:["parameters[0]".value, "parameters[0].name"]){
                totalCount
                cursor
                objects{
                    id
                    data
                }
            }
        }
    }
}
```

Where the "myQuery" variable is:

``` graphql
{
    "myQuery": [
        {
            "field":"parameters[0].value",
            "value":5,
            "operator":"<"
        }
    ]
}
```