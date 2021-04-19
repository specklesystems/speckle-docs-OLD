---
permalink: /
---

# Introduction

Welcome to the **Speckle User Guide** - a single source of documentation on everything Speckle!
If you're looking for info on how to _develop_ Speckle, check our [dev docs](/dev).

> Speckle is the open source data platform for architecture, engineering, and construction. It liberates your data from proprietary file formats and closed source software and puts it back into your hands.

Organizations all over the world rely on Speckle for interoperability, automation and collaboration to deliver better buildings, faster.

Speckle is a platform with endless possibilities, we'll walk you through some of its most common usage scenarios, but ultimately you'll have the flexibility to use Speckle (and your data) how best you want.

You can read more about what we do on [our website](https://speckle.systems/)

## This Guide

::: tip IMPORTANT 🙌
This guide assumes you have access to a **Speckle Server**.
If you don't have one provided by your company, you can use our [free Speckle server](https://speckle.systems/getstarted/).
:::

You will get an introduction to the key Speckle concepts and learn how to get set up and send your first objects to Speckle. We'll go over what you need to install, how to create an account, and how to get the Desktop Connectors you need to get going. At the end, there will also be a few [tutorials](/user/tutorials) which will walk you through all the steps to get your data from AEC Software A to AEC Software B.

If you are a developer wanting to learn how to build things with Speckle, head over to the [Dev Docs](/dev/). If you want mode in-depth reading on how Speckle works under the hood, make sure to check the [core concepts section](/dev/base).

## Basic Concepts

Speckle is made up of several moving parts, before describing each in detail, let's run through them quickly.

[Speckle Web](/user/web) is an online application that lets you manage and coordinate your data, it also includes a 3D viewer to let see your projects directly from your browser.

The [Desktop Connectors](/user/connectors) are plugins for some of the most popular AEC software including Rhino, Revit, Grasshopper, Dynamo, AutoCAD, Civil3D, Unity, Blender and more. They take care of exporting and importing (or better, sending and receiving) data to Speckle Web - without the need of using files!

The data handled by the Connectors can be of almost any type, but most commonly it will be CAD and BIM data: geometry and metadata attached to it. Each time the Connectors send data to Speckle Web, they also take care of transforming it from the native closed format of each AEC tool to a neutral open format, this makes accessing it for down the line consumption extremely easy and fast.
Data in Speckle Web is stored in [Streams, Branches and Commits](/user/concepts).

[Speckle Manager](/user/manager) is a desktop application that handles accounts and connectors on your machine. You need to add a Speckle account to your computer using Manager in order for the Connectors use them to send and receive data from a Speckle Server.

## Legal stuff

Before using any of our software or websites, please make sure you read and understand our [terms of use](https://speckle.systems/terms/), [privacy policy](https://speckle.systems/privacy/) and [trademark usage policy](https://speckle.systems/trademark/).
