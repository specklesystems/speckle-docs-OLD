(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{664:function(e,t,r){"use strict";r.r(t);var s=r(44),a=Object(s.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"introduction"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),r("p",[e._v("Hey devs! Welcome to the "),r("strong",[e._v("Speckle Dev Docs")]),e._v(" - a single source of documentation on everything Speckle!\nIf you're looking for info on how to "),r("em",[e._v("use")]),e._v(" Speckle, check our "),r("RouterLink",{attrs:{to:"/"}},[e._v("user guide")]),e._v(".")],1),e._v(" "),r("blockquote",[r("p",[e._v("Speckle is the open source data platform for architecture, engineering, and construction. It liberates your data from proprietary file formats and closed source software and puts it back into your hands.")])]),e._v(" "),r("p",[e._v("This part of our docs is for any developer planning to extend, integrate or improve Speckle. We'll walk you through the main concepts behind our tech and guide you through fun tasks as "),r("a",{attrs:{href:"/dev/connectors-dev"}},[e._v("writing your own connector")]),e._v(" or "),r("a",{attrs:{href:"/dev/apps-dev"}},[e._v("writing custom Speckle apps")]),e._v(".")]),e._v(" "),r("p",[e._v("We hope to see the great things you'll do with our SDKs and APIs, let's go!")]),e._v(" "),r("h2",{attrs:{id:"speckle-the-platform"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#speckle-the-platform"}},[e._v("#")]),e._v(" Speckle, The Platform")]),e._v(" "),r("p",[e._v("We call Speckle a data platform; but Speckle is also a set of connectors for AEC applications. There are Speckle Kits, which are the base of our approach to interoperability. Then there's various Speckle apps - like the Speckle 3D viewer, the Speckle Web UI, the Speckle Server...")]),e._v(" "),r("p",[e._v("That's quite a lot to chew; but you're probably still asking yourself - "),r("strong",[e._v("what is Speckle")]),e._v("?")]),e._v(" "),r("blockquote",[r("h4",{attrs:{id:"ultimately-speckle-has-two-distinct-parts-the-developer-platform-and-the-applications-and-products-built-on-top-of-it"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#ultimately-speckle-has-two-distinct-parts-the-developer-platform-and-the-applications-and-products-built-on-top-of-it"}},[e._v("#")]),e._v(" Ultimately, Speckle has two distinct parts: the developer platform, and the applications and products built on top of it.")])]),e._v(" "),r("p",[e._v("So what's what? Simple: if an architect/engineer/aec professional interacts with it, it's a Speckle "),r("strong",[e._v("product")]),e._v(" built on top of Speckle's "),r("strong",[e._v("developer platform")]),e._v(".")]),e._v(" "),r("p",[e._v("The developer platform consists of code that makes it easier for us (and you!) to build user facing applications - either web based or desktop based.")]),e._v(" "),r("p",[e._v("This section is about the platform, and not about the products. If you want to see how to use Speckle as an architect or engineer, check our "),r("RouterLink",{attrs:{to:"/"}},[e._v("user guide")]),e._v(".")],1),e._v(" "),r("h2",{attrs:{id:"code-repositories"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#code-repositories"}},[e._v("#")]),e._v(" Code Repositories")]),e._v(" "),r("p",[e._v("Our platfrom is made of many moving parts, the code for anything Speckle 2.0 onwards is hosted in our "),r("a",{attrs:{href:"https://github.com/specklesystems",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub specklesystems organization"),r("OutboundLink")],1),e._v(".\nHere's a quick summary of the main repos you'll find there, please make sure to give them a star ⭐️ if you like what you see!")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://github.com/specklesystems/speckle-server",target:"_blank",rel:"noopener noreferrer"}},[e._v("Speckle Server"),r("OutboundLink")],1),e._v(" contains all the web-based applications including the server backend, the frontend webapp, and the 3D viewer.")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("└── speckle-server\n    ├── server\n    ├── frontend\n    └── viewer\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br"),r("span",{staticClass:"line-number"},[e._v("4")]),r("br")])]),e._v(" "),r("p",[r("a",{attrs:{href:"https://github.com/specklesystems/speckle-sharp",target:"_blank",rel:"noopener noreferrer"}},[e._v("Speckle Sharp"),r("OutboundLink")],1),e._v(" contains all the C# desktop components including the .NET SDK, the Connectors (Rhino, Revit, Grasshopper, & Dynamo...), and Objects (our default interoperability kit).")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("└── speckle-sharp\n    ├── core\n    ├── connector revit\n    ├── connector rhino\n    ├── connector dynamo\n    ├── connector grasshopper\n    ├── connector autocadcivil\n    ├── desktopui\n    └── objects\n        ├── objects\n        └── conerters\n            ├── revit\n            ├── rhinogh\n            ├── dynamo\n            └── autocadcivil\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br"),r("span",{staticClass:"line-number"},[e._v("4")]),r("br"),r("span",{staticClass:"line-number"},[e._v("5")]),r("br"),r("span",{staticClass:"line-number"},[e._v("6")]),r("br"),r("span",{staticClass:"line-number"},[e._v("7")]),r("br"),r("span",{staticClass:"line-number"},[e._v("8")]),r("br"),r("span",{staticClass:"line-number"},[e._v("9")]),r("br"),r("span",{staticClass:"line-number"},[e._v("10")]),r("br"),r("span",{staticClass:"line-number"},[e._v("11")]),r("br"),r("span",{staticClass:"line-number"},[e._v("12")]),r("br"),r("span",{staticClass:"line-number"},[e._v("13")]),r("br"),r("span",{staticClass:"line-number"},[e._v("14")]),r("br"),r("span",{staticClass:"line-number"},[e._v("15")]),r("br")])]),e._v(" "),r("p",[e._v("To put it simply, Speckle Sharp is what you use to free your data from different models and desktop applications and Speckle Server is where you send all this data and interact with it in the browser.")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://github.com/specklesystems/speckle-py",target:"_blank",rel:"noopener noreferrer"}},[e._v("Speckle Py"),r("OutboundLink")],1),e._v(" is our Python SDK. Are you more of a pythonista than a .NET ninja? Have a play with it!")]),e._v(" "),r("p",[r("a",{attrs:{href:"https://github.com/specklesystems/speckle-unity",target:"_blank",rel:"noopener noreferrer"}},[e._v("Speckle Unity"),r("OutboundLink")],1),e._v(" is our Unity Connector, it might make it inside Speckle Sharp in the future.")]),e._v(" "),r("h2",{attrs:{id:"additional-tools"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#additional-tools"}},[e._v("#")]),e._v(" Additional tools")]),e._v(" "),r("p",[e._v("Inside our GitHub organization you'll also find a few additional tools you might want to check out, for example the two below.")]),e._v(" "),r("p",[e._v("Ever struggle with janky behaviour in Grasshopper as things start getting complicated? You might really enjoy the "),r("a",{attrs:{href:"https://speckle.systems/blog/async-gh/",target:"_blank",rel:"noopener noreferrer"}},[e._v("GrasshopperAsyncComponent"),r("OutboundLink")],1),e._v(".\nDo any dev work in Revit and want a handy tool for viewing and running unit tests? "),r("a",{attrs:{href:"https://speckle.systems/blog/xunitrevit/",target:"_blank",rel:"noopener noreferrer"}},[e._v("xUnitRevit"),r("OutboundLink")],1),e._v(" might be exactly what you've been looking for.")]),e._v(" "),r("h2",{attrs:{id:"legal-stuff"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#legal-stuff"}},[e._v("#")]),e._v(" Legal stuff")]),e._v(" "),r("p",[e._v("Before using any of our software or websites, please make sure you read and understand our "),r("a",{attrs:{href:"https://speckle.systems/terms/",target:"_blank",rel:"noopener noreferrer"}},[e._v("terms of use"),r("OutboundLink")],1),e._v(", "),r("a",{attrs:{href:"https://speckle.systems/privacy/",target:"_blank",rel:"noopener noreferrer"}},[e._v("privacy policy"),r("OutboundLink")],1),e._v(" and "),r("a",{attrs:{href:"https://speckle.systems/trademark/",target:"_blank",rel:"noopener noreferrer"}},[e._v("trademark usage policy"),r("OutboundLink")],1),e._v(".")])])}),[],!1,null,null,null);t.default=a.exports}}]);