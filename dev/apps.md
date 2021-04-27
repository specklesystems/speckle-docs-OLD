# Creating Your Own App

This tutorial is currently under construction 🚧, please check again later!

Welcome to **Part 1** this multi-part guide on how to `Create your own App` using Speckle.

In this first part, we'll be creating a very simple web app capable of:

- Authenticating a user through a Speckle server OAuth.
- Search for stream's available to the user.
- Display commit data associated with a given stream.
- Filter the data to be displayed.
- Cache results in `localStorage` to _remember_ the app state accross page reloads.

Let's get started! 🚀

## Requirements

This guide should work in any platform (Mac/Linux/Windows). We'll be using _VSCode_ as our IDE but you can use any other (even Notepad if your brave enough!).

You'll also need to have `node` installed, as well as `vue-cli` and have some basic understanding of how `Vue.js` works.

Knowing your way around `OAuth` protocols and authentication in general will definitely come in handy, but is **not required**, as we'll be providing most of the necessary logic (and code!) for that.

You can learn more about Vue.js [here](XXX).

## Setting up the Vue.js app

This is the simplest step. Open a new terminal, set the current directory to wherever you want the project to be located and run the following command:

```bash
vue create speckle-demo-app
```

This will ask you some questions, select the same answers as the screenshot bellow:

![Vue.js setup answers](XXX)

Once done, you'd have your Vue.js project ready. To open the project in **VSCode** we just need to run:

```bash
code speckle-demo-app
```

::: warning
This step assumes you already installed VSCode in your path. If you haven't, there's a command for it in VSCode.

![Install vscode in path](https://link)
:::

### Install other dependencies

We'll also be using `Vuetify` to make our life easier, as it has many useful componets out of the box. To add it, run:

```bash
vue add vuetify
```

When asked for a preset, choose **Default**.

We'll also need to add a couple of handy dependencies such as `vuex-persist` for state storage, `vue-timeago` to display user-friendly dates and `debounce`. For this, run the following command:

```bash
npm i vuex-persist vue-timeago debounce
```

### Run your app for the first time

If everything went well, running the following command should make the app available at [http://localhost:8080](http://localhost:8080).

```bash
npm run serve
```

In chrome, things should be looking like this:

![Vuetify default welcome page](XXX)

### Creating the `Speckle` files

For convenience, we're going to isolate all the `speckle` related code into 2 files:

- `src/speckleQueries.js` will hold some utility functions to build our `GraphQL` queries.
- `src/speckleUtils.js` will hold all call's to the Speckle server, as well as some constants. It will deal with login/logout functionality too.

## Authenticating with the Server

### Creating an Application

In order to be able to talk to our Speckle server, we first need to `Create an App` in that server with an existing account. To do that, visit the server's frontend [https://speckle.xyz](https://speckle.xyz), log in with your account and visit the profile page.

Scroll down until you see the `Applications` section, and press the `New App` button. A pop-up should appear, fill it in as follows:

- **Name:** SpeckleDemoApp
- **Scopes**: `stream:read`, `profile:read`, `profile:email`
- **Redirect url**: `http://localhost:8080`
- **Descritpion**: My first speckle app

Once accepted, you'll see the `App Id` and `App Secret`, as well as an indication to the url pattern we should use (`https://speckle.xyz/authn/verify/{appId}/{challenge}`).

::: warning
Note that the `redirect url` points to our local computer network. When deploying this app to a service like Netlify, we'll have to create a new one pointing to the correct Netlify url.
:::

#### Saving app credentials as ENV variables

The `App Id` and `App Secret` are used to identify your app, so you should never add them to your version control. Instead, we'll be using `ENV` variables to save that information, which also allows us to modify it in different scenarios (development/production).

`Vue.js` will automatically read any `.env` files in the root of your project and load the variables accordingly, but will also replace all references with the actual value of the variable on compilation (which we **do not want**). We can tell `vue.js` to not do this by creating a file named `.env.local` instead. The contents should look like this 👇🏼 (remember to replace your ID and Secret appropriately)

```
VUE_APP_SPECKLE_ID=YOUR_APP_ID
VUE_APP_SPECKLE_SECRET=YOUR_APP_SECRET
VUE_APP_SERVER_URL=https://speckle.xyz
VUE_APP_SPECKLE_NAME=SpeckleDemo
```

### Login in with Speckle

Ultra simplified, the way this works is the following:

1. User clicks the login button
2. User is redirected to the auth page in the Speckle server (using the provided url pattern when creating an application)
3. User will log in and allow the app to access his data (hopefully?).
4. User is redirected to our specified `Redirect URL`, with an attached `access_code`.
5. Using that access code, we can exchange it for a pair of `token/refresh token`, which is what allows the app to "talk" to the server as that user. We'll save those in `localStorage`.

This may sound rather complicated, but it boils down to 2 different interactions (redirect your user and exchange the access code).

#### Adding auth functions to `speckleUtils.js`

In our `src/speckleUtils.js` file, paste in the following code. You'll find some constants that refer to our previously set `ENV` variables, as well as several functions.

- `goToSpeckleAuthPage`: Will generate a random challenge, save it in localStorage and direct the url to the auth page in the specified speckle server.
- `exchangeAccessCode`: Will `fetch` from the server a new pair of `token/refresh token` and clear the `challenge`.
- `speckleLogOut`: Will erase all necessary data from `localStorage`.

::: tip
Note that `goToSpeckleAuthPage` saves the challenge, and `exchangeAccessCode` uses that same challenge to exchange the tokens. If the challenge used doesn't match, the request will fail.
:::

:::details speckleUtils.js

```js
export const APP_NAME = process.env.VUE_APP_SPECKLE_NAME
export const SERVER_URL = process.env.VUE_APP_SERVER_URL
export const TOKEN = `${APP_NAME}.AuthToken`
export const REFRESH_TOKEN = `${APP_NAME}.RefreshToken`
export const CHALLENGE = `${APP_NAME}.Challenge`

export function goToSpeckleAuthPage() {
  // Generate random challenge
  var challenge =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  // Save challenge in localStorage
  localStorage.setItem(CHALLENGE, challenge)
  // Send user to auth page
  window.location = `${SERVER_URL}/authn/verify/${process.env.VUE_APP_SPECKLE_ID}/${challenge}`
}

export function speckleLogOut() {
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}

export function exchangeAccessCode(accessCode) {
  return fetch(`${SERVER_URL}/auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      accessCode: accessCode,
      appId: "explorer",
      appSecret: "explorer",
      challenge: localStorage.getItem(CHALLENGE)
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.removeItem(CHALLENGE)
        localStorage.setItem(TOKEN, data.token)
        localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
      }
      return data
    })
}
```

:::

#### Linking to `vuex`

Since we're using `vuex` to manage the state of our application, we'll also add the redirect, exchange and logout logic as `actions`. We can then invoke them in any of our application components.

Replace the contents of the file `src/store/index.js` with the following:

::: details store/index.js

```js
import Vue from "vue"
import Vuex from "vuex"

import {
  exchangeAccessCode,
  getUserData,
  goToSpeckleAuthPage,
  speckleLogOut
} from "@/speckleUtils"


export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    logout(context) {
      // Wipe the state

      // Wipe the tokens
      speckleLogOut()
    },
    exchangeAccessCode(context, accessCode) {
      // Here, we could save the tokens to the store if necessary.
      return exchangeAccessCode(accessCode)
    }
    redirectToAuth() {
      // Use the speckleUtils redirect logic
      goToSpeckleAuthPage()
    }
  },
  modules: {}
})
```

:::

We can now use these actions in any component by calling `this.$store.dispatch(ACTION_NAME, ...params)`.

#### Add `Log In/Log Out` buttons.

In your `App.vue` file, replace it's contents with the following:

:::details App.vue

```vue
<template lang="html">
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Speckle Logo"
          class="shrink mr-2"
          contain
          :src="require(`@/assets/img.png`)"
          transition="scale-transition"
          width="40"
          height="24"
        />
        <h3>SPECKLE DEMO APP</h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        outlined
        v-if="!isAuthenticated"
        @click="$store.dispatch('redirectToAuth')"
      >
        <span>Login with Speckle</span>
      </v-btn>
      <v-btn outlined v-else @click="$store.dispatch('logout')">
        Log out
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- <router-view /> -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    isAuthenticated() {
      return false
    }
  }
}
</script>
```

:::

Notice there's an `isAuthenticated` computed property that defaults to `false` for now (we'll update it later). There's also a pair of `v-btn` buttons linked to this boolean value. When there is no user authenticated, we'll show the login button, and when there is a user authenticated, we'll show thoe Log Out button.

Each is binded to the actions in the store we created earlier.

```html
<v-btn
  outlined
  v-if="!isAuthenticated"
  @click="$store.dispatch('redirectToAuth')"
>
  <span>Login with Speckle</span>
</v-btn>
<v-btn outlined v-else @click="$store.dispatch('logout')">
  Log out
</v-btn>
```

At this point in time, your App should display only a menu bar with the title and the Log In button.

![App.vue with login butotn](XXX)

Now press the Log In button, follow the steps in the server and allow the app to access your data. This will take you back to `http://localhost:8080`. But notice the url will now contain a trailing `?access_code=YOUR_ACCESS_CODE`, we can now edit our `src/router/index.js` file to exchange the access code whenever it finds one.

#### Exchange the `access_code`

In order to exchange the access code automatically whenever it is provided in the url, we're going to use one of `vue-router`'s features. `vue-router` is the plugin that handles url routes in your app, it also parses query values and url parameters so you won't have to.

We can implement a `beforeEach` handler, that will allow us to run some code right before each page is loaded in our app. At this point, we'll check if it contains an access code and if so, exchange it.

Open your `src/router/index.js` file and add this code right above the `export default router` line.

```js
router.beforeEach(async (to, from, next) => {
  if (to.query.access_code) {
    // If the route contains an access code, exchange it and go home.
    store
      .dispatch("exchangeAccessCode", to.query.access_code)
      .then(() => next("/"))
      .catch(err => {
        console.warn("exchange failed", err)
        next("/")
      })
  }
})
```

Now, press the Log In button again, allow the app to access your account and wait for the redirect to the app. Once it's done, you should have 2 variables stored in `localStorage`: `SpeckleDemo.Token` and `SpeckleDemo.RefreshToken`

At this point, we've managed to save our authentication token but our app still cannot discern if your users are authenticated or not (remember the `isAuthenticated` computed property in `App.vue`). We'll add this on the next step.

## Fetching user data

In order for our app to know **who** we are, it needs to fetch our user's data. The best place to fetch, and store, this data, is in our `store`.

### User data query

Add the following function to our `speckleQueries.js` file. This is the graphQL query that will fetch the user and server info.

```js
export const userInfoQuery = () => `query {
      user {
        name
      },
      serverInfo {
        name
        company
      }
    }`
```

Add this to the `src/speckleUtils.js` file. Remember to import `userInfoQuery`.

```js
export function speckleFetch(query) {
  let token = localStorage.getItem(TOKEN)
  if (token)
    return fetch(`${SERVER_URL}/graphql`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: query
      })
    }).then(res => res.json())
  else return Promise.reject("You are not logged in (token does not exist)")
}

export const getUserData = () => speckleFetch(userInfoQuery())
```

### Modify app store

Replace the contents of your `src/store/index.js` with the following code:

:::details 
```js
import Vue from "vue"
import Vuex from "vuex"

import {
  exchangeAccessCode,
  getStreamCommits,
  getUserData,
  goToSpeckleAuthPage,
  speckleLogOut
} from "@/speckleUtils"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    serverInfo: null
  },
  getters: {
    isAuthenticated: state => state.user != null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setServerInfo(state, info) {
      state.serverInfo = info
    }
  },
  actions: {
    logout(context) {
      // Wipe the state
      context.commit("setUser", null)
      context.commit("setServerInfo", null)
      // Wipe the tokens
      speckleLogOut()
    },
    exchangeAccessCode(context, accessCode) {
      // Here, we could save the tokens to the store if necessary.
      return exchangeAccessCode(accessCode)
    },
    getUser(context) {
      return getUserData()
        .then(json => {
          var data = json.data
          context.commit("setUser", data.user)
          context.commit("setServerInfo", data.serverInfo)
        })
        .catch(err => {
          console.error(err)
        })
    },
    redirectToAuth() {
      goToSpeckleAuthPage()
    }
  },
  modules: {}
})
```

### Update `App.vue`

Now, in the `App.vue` file, modify the `isAuthenticated` computed property as shown:

```js
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
```

Also, in the `template` section, add the following on top of the Login/Logout buttons

```html
<div v-if="isAuthenticated">
  Welcome
  <b>{{ $store.state.user.name }}</b>
  ! You are connected to
  <b>
    {{ $store.state.serverInfo.company }}'s
    <em>{{ $store.state.serverInfo.name }}</em>
  </b>
</div>

<v-spacer></v-spacer>
```

### Update `router.beforeEach`

The only thing left to do is to also tell the `router` to check the `user` on every page change. For this, modify the `beforeEach` implementation by adding an `else` clause to our previous condition

```js
router.beforeEach(async (to, from, next) => {
  if (to.query.access_code) {
    // If the route contains an access code, exchange it and go home.
    store
      .dispatch("exchangeAccessCode", to.query.access_code)
      .then(() => next("/"))
      .catch(err => {
        console.warn("exchange failed", err)
        next("/")
      })
  } else {
    // Check on every route change if you still have access.
    store
      .dispatch("getUser")
      .then(to => next(to))
      .catch(err => next("/"))
  }
})
```

That should do it!! Now, if you refresh the page you should see a welcome message with your user name and the server name you connected to, as well as the `Log Out` button.

## Searching for streams

Now that we have access to our user and server data in our app, and also distinguish when a user is logged in or not, we can start fetching other info from our server. Let's start with a **stream search** field. The selected stream will also be stored in `vuex`, so we'll also add the appropriate state props, methods and actions to it.

### Search query

Start by adding the following function to our `speckeQueries.js`

```js
export const streamSearchQuery = search => `query {
      streams(query: "${search}") {
        totalCount
        cursor
        items {
          id
          name
          updatedAt
        }
      }
    }`
```

Then add the following function to `speckleUtils.js`. We'll use it to fetch the search results in our `SpeckleSearch` component (2 steps bellow)

```js
export const searchStreams = e => speckleFetch(streamSearchQuery(e))
```

### Modify app store

Modify `src/store/index.js` as shown in the following code block. We've just added a `currentStream` property to the state, a `setCurrentStream` mutation and two actions, `handleStreamSelection` and `clearStreamSelection`. This will allow us to save the user selection in our app state.

:::details store/index.js

```js
import Vue from "vue"
import Vuex from "vuex"

import {
  exchangeAccessCode,
  getUserData,
  goToSpeckleAuthPage,
  speckleLogOut
} from "@/speckleUtils"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    serverInfo: null,
    currentStream: null,
  },
  getters: {
    isAuthenticated: state => state.user != null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setServerInfo(state, info) {
      state.serverInfo = info
    },
    setCurrentStream(state, stream) {
      state.currentStream = stream
    }
  },
  actions: {
    logout(context) {
      // Wipe the state
      context.commit("setUser", null)
      context.commit("setServerInfo", null)
      context.commit("setCurrentStream", null)
      // Wipe the tokens
      speckleLogOut()
    },
    exchangeAccessCode(context, accessCode) {
      // Here, we could save the tokens to the store if necessary.
      return exchangeAccessCode(accessCode)
    },
    getUser(context) {
      return getUserData()
        .then(json => {
          var data = json.data
          context.commit("setUser", data.user)
          context.commit("setServerInfo", data.serverInfo)
        })
        .catch(err => {
          console.error(err)
        })
    },
    redirectToAuth() {
      goToSpeckleAuthPage()
    },
    handleStreamSelection(context, stream) {
      context.commit("setCurrentStream", stream)

    }
    clearStreamSelection(context) {
      context.commit("setCurrentStream", null)
    }
  },
  modules: {}
})

```

:::

### Create child components

Now we'll create a new component called `SpeckleSearch.vue` to handle all the search UI in one place.

:::details SpeckleSearch.vue

```vue
<template>
  <v-autocomplete
    v-model="selectedSearchResult"
    :items="streams.items"
    :search-input.sync="search"
    no-filter
    counter="2"
    rounded
    filled
    dense
    flat
    hide-no-data
    hide-details
    placeholder="Streams Search"
    item-text="name"
    item-value="id"
    return-object
    clearable
    append-icon=""
    @update:search-input="debounceInput"
  >
    <template #item="{ item }" color="background">
      <v-list-item-content>
        <v-list-item-title>
          <v-row class="pa-0 ma-0">
            {{ item.name }}
            <v-spacer></v-spacer>
            <span class="streamid">{{ item.id }}</span>
          </v-row>
        </v-list-item-title>
        <v-list-item-subtitle class="caption">
          Updated
          <timeago :datetime="item.updatedAt"></timeago>
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { debounce } from "debounce"
import { searchStreams } from "@/speckleUtils"

export default {
  name: "StreamSearch",
  data: () => ({
    search: "",
    streams: { items: [] },
    selectedSearchResult: null
  }),
  watch: {
    selectedSearchResult(val) {
      this.search = ""
      this.streams.items = []
      if (val) this.$emit("selected", val)
    }
  },
  methods: {
    fetchSearchResults(e) {
      if (!e || e?.length < 3) return
      return searchStreams(e).then(json => {
        this.streams = json.data.streams
      })
    },
    debounceInput: debounce(function(e) {
      this.fetchSearchResults(e)
    }, 300)
  }
}
</script>

<style scoped></style>
```

:::

Create also a simple `WelcomeView.vue` to show to our non-authenticated users.

:::details WelcomeView.vue

```vue
<template lang="html">
  <v-container
    fill-height
    fluid
    class="home flex-column justify-center align-center primary--text"
  >
    <h1>Welcome to the Speckle Demo App!</h1>
    <h3>This app part of our developer guides</h3>
    <p>Please log in to access you Speckle data.</p>
  </v-container>
</template>
<script>
export default {
  name: "WelcomeView"
}
</script>
```

:::

### Update `Home.vue`

Modify the `Home.vue` view.

:::details Home.vue

```vue
<template lang="html">
  <WelcomeView v-if="!$store.getters.isAuthenticated" />
  <v-container v-else class="home pa-6">
    <stream-search
      @selected="$store.dispatch('handleStreamSelection', $event)"
    />
    <h2 class="pt-6 primary--text">
      <span v-if="selectedStream">
        {{ selectedStream.name }} — {{ selectedStream.id }}
        <v-btn
          outlined
          text
          small
          class="ml-3"
          :href="serverUrl + '/streams/' + selectedStream.id"
        >
          View in server
        </v-btn>
        <v-btn
          outlined
          text
          small
          class="ml-3"
          color="error"
          @click="$store.dispatch('clearStreamSelection')"
        >
          Clear selection
        </v-btn>
      </span>
      <span v-else>
        <em>No stream selected. Find one using the search bar 👆🏼</em>
      </span>
    </h2>
  </v-container>
</template>

<script>
import StreamSearch from "@/components/StreamSearch"

export default {
  name: "Home",
  components: { WelcomeView, StreamSearch },
  data: () => {
      serverUrl: process.env.VUE_APP_SERVER_URL
    }
  }
  methods: {},
  computed: {
    selectedStream: function() {
      return this.$store.state.currentStream
    }
  }
}
</script>
```

:::

### Update `App.vue`

In `App.vue` there is a commented line referencing the `<router-view/>. Uncomment it.

### Preview results

After making these changes, your app should display a welcome message when not logged in:

![Welcome message](XXX)

and the search bar and selection text when logged in:

![Search bar and selection](XXX)

Introducing some text into the search bar should display a list of results in a dropdown. Selecting one of the result items will change the selection text from `No stream selected` to display the selected Stream name and id, as well as 2 buttons. The first one will take you to the stream page in the server, while the second one will clear the selection in the app state.

![Search and selection functionality](XXX)

## Displaying stream commits

So far, we've managed to authenticate with our Speckle server, fetch user and server information and search for available streams, as well as storing the results in our app state.

Now, let's use our `selectedStream` to display a table with all it's commits, as well as some data associated with each commit. Since the commit list can be rather large, we'll be adding basic pagination functionality to the table.

For that, we'll need to fetch the commit data associated with the stream, modify our `store/index.js` to hold that new data, and add a table view with a column filter on `Home.vue`

### Create fetch query

Let's start by adding a new query function to our `speckleQueries.js`

```js
export const streamCommitsQuery = (streamId, itemsPerPage, cursor) => `query {
    stream(id: "${streamId}"){
      commits(limit: ${itemsPerPage}, cursor: ${
  cursor ? '"' + cursor + '"' : null
}) {
        totalCount
        cursor
        items{
          id
          message
          branchName
          sourceApplication
          referencedObject
          authorName
          createdAt
        }
      }
    }
  }`
```

And add the following to `speckleUtils.js` (remember to import the `streamCommitsQuery`)

```js
export const getStreamCommits = (streamId, itemsPerPage, cursor) =>
  speckleFetch(streamCommitsQuery(streamId, itemsPerPage, cursor))
```

Notice that the query has a `cursor`. This is used to get successive _pages_ of the commits list. There is a current limitation with the cursor, as it only allows to go _forward_ in pages, not backward. To fix this, we'll keep track of these values in our store so we can have pagination going forward (we'll also keep the `itemsPerPage` value fixed to keep things simple).

## Update `router/index.js`

Now, there's quite a bit of modifications in the `router/index.js` file. I've highlighted the changes in the code block, but feel free to replace the whole content for the one bellow.

We basically need modify the state to be able to:

- Store the `latestCommits` data, a list of `previousCursors` and a list of `tableOptions` for the table visualization.
- Add mutations to modify individually each of these state properties (note that `previousCursors` is a list, so we added two mutations: one to push a new value and another to replace the entire list)
- Add `getCommits` action, and update `logout`, `handleStreamSelection` and `clearStreamSelection` to also deal with these new props.

:::details router/index.js

```js
import Vue from "vue"
import Vuex from "vuex"

import {
  exchangeAccessCode,
  getStreamCommits,
  getUserData,
  goToSpeckleAuthPage,
  speckleLogOut
} from "@/speckleUtils"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    serverInfo: null,
    currentStream: null,
    latestCommits: null,
    previousCursors: [null],
    tableOptions: null
  },
  getters: {
    isAuthenticated: state => state.user != null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setServerInfo(state, info) {
      state.serverInfo = info
    },
    setCurrentStream(state, stream) {
      state.currentStream = stream
    },
    setCommits(state, commits) {
      state.latestCommits = commits
    },
    setTableOptions(state, options) {
      state.tableOptions = options
    },
    resetPrevCursors(state) {
      state.previousCursors = [null]
    },
    addCursorToPreviousList(state, cursor) {
      state.previousCursors.push(cursor)
    }
  },
  actions: {
    logout(context) {
      // Wipe the state
      context.commit("setUser", null)
      context.commit("setServerInfo", null)
      context.commit("setCurrentStream", null)
      context.commit("setCommits", null)
      context.commit("setTableOptions", null)
      context.commit("resetPrevCursors")
      // Wipe the tokens
      speckleLogOut()
    },
    exchangeAccessCode(context, accessCode) {
      // Here, we could save the tokens to the store if necessary.
      return exchangeAccessCode(accessCode)
    },
    getUser(context) {
      return getUserData()
        .then(json => {
          var data = json.data
          context.commit("setUser", data.user)
          context.commit("setServerInfo", data.serverInfo)
        })
        .catch(err => {
          console.error(err)
        })
    },
    redirectToAuth() {
      goToSpeckleAuthPage()
    },
    handleStreamSelection(context, stream) {
      context.commit("setCurrentStream", stream)
      context.commit("setTableOptions", { itemsPerPage: 5 })
      context.commit("resetPrevCursors")
      return getStreamCommits(stream.id, 5, null).then(json => {
        context.commit("setCommits", json.data.stream.commits)
      })
    },
    getCommits(context, cursor) {
      return getStreamCommits(context.state.currentStream.id, 5, cursor).then(
        json => {
          context.commit("setCommits", json.data.stream.commits)
        }
      )
    },
    clearStreamSelection(context) {
      context.commit("setCurrentStream", null)
      context.commit("setCommits", null)
      context.commit("setTableOptions", null)
      context.commit("resetPrevCursors", [null])
    }
  },
  modules: {}
})
```

:::

## Update `Home.vue`

The `Home.vue` also requires some major additions, so I've highlighted the changes in the code block, but just as the step bellow, feel free to replace the entire content if you're playing it fast and loose!

We need to do the following modifications:

- Add a new `div` for the table view containing a `v-select` and a `v-data-table`.
  - The `v-select` allows to select the available keys to display as table columns
  - The `v-data-table` does all the table UI magic so we don't have to.
- Add several computed properties:
  - `commits` and `previousCursors` to fetch the data from our store
  - `availableKeys` and `filteredHeaders` are helper functions to extract all available keys from the received commit data and format the headers the way `v-data-table` likes them.
- Add new data properties to the component:
  - `options` will serve to keep the table options in sync
  - `selectedKeys` is where we'll save the user selected information to display as columns in the table. It is initialized with some values already.
- Add a **watch** function for `options`:
  - I will get called every time the table options change. This is where we check if a page change has been requested, and tell the store to fetch new data if necessary.
- We also added some css magic to hide the `itemsPerPage` selection button, as this demo will have a fixed page size.

::: details Home.vue

```vue
<template lang="html">
  <WelcomeView v-if="!$store.getters.isAuthenticated" />
  <v-container v-else class="home pa-6">
    <stream-search
      @selected="$store.dispatch('handleStreamSelection', $event)"
    />
    <h2 class="pt-6 primary--text">
      <span v-if="selectedStream">
        {{ selectedStream.name }} — {{ selectedStream.id }}
        <v-btn
          outlined
          text
          small
          class="ml-3"
          :href="serverUrl + '/streams/' + selectedStream.id"
        >
          View in server
        </v-btn>
        <v-btn
          outlined
          text
          small
          class="ml-3"
          color="error"
          @click="$store.dispatch('clearStreamSelection')"
        >
          Clear selection
        </v-btn>
      </span>
      <span v-else>
        <em>No stream selected. Find one using the search bar 👆🏼</em>
      </span>
    </h2>

    <div class="pt-6">
      <v-select
        v-model="selectedKeys"
        :items="availableKeys"
        chips
        label="Select data to display"
        multiple
      ></v-select>
      <h3 class="pa-2 primary--text">Stream commits:</h3>
      <v-data-table
        :loading="loading"
        :headers="filteredHeaders"
        :items="commits ? commits.items : []"
        :options.sync="options"
        :server-items-length="commits ? commits.totalCount : null"
        disable-sort
        disable-filtering
        :disable-pagination="loading"
        class="elevation-1"
      ></v-data-table>
    </div>
  </v-container>
</template>

<script>
import StreamSearch from "@/components/StreamSearch"
import WelcomeView from "@/components/WelcomeView"

export default {
  name: "Home",
  components: { WelcomeView, StreamSearch },
  data: () => {
    return {
      loading: false,
      options: {
        itemsPerPage: 5
      },
      serverUrl: process.env.VUE_APP_SERVER_URL,
      selectedKeys: ["id", "message", "branchName", "authorName"]
    }
  },
  methods: {},
  computed: {
    selectedStream: function() {
      return this.$store.state.currentStream
    },
    previousCursors: function() {
      return this.$store.state.previousCursors || [null]
    },
    commits: function() {
      return this.$store.state.latestCommits
    },
    availableKeys: function() {
      var keys = {}
      this.commits?.items.forEach(obj => {
        Object.keys(obj).forEach(key => {
          if (!keys[key]) {
            keys[key] = true
          }
        })
      })
      return Object.keys(keys)
    },
    filteredHeaders: function() {
      return this.selectedKeys.map(key => {
        return { text: key, value: key }
      })
    }
  },
  watch: {
    options: {
      handler(val, oldval) {
        this.$store.commit("setTableOptions", val)
        if (oldval.page && val.page != oldval.page) {
          if (val.page > oldval.page) {
            // Page up
            this.loading = true
            var cursor = this.$store.state.latestCommits.cursor
            this.$store.dispatch("getCommits", cursor).then(() => {
              this.$store.commit("addCursorToPreviousList", cursor)
              this.loading = false
            })
          } else {
            // Page down
            this.loading = true
            this.$store
              .dispatch("getCommits", this.previousCursors[val.page - 1])
              .then(() => {
                this.loading = false
              })
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.v-data-footer__select {
  display: none !important;
}
</style>
```

:::

## Preview result

That should cover all the changes needed! Go ahead to [http://localhost:8080](https://localhost:8080). If logged in, your app should be looking like this 👇🏼

![Final view with no stream selected](XXX)

And once you select a stream, you should be able to

## Publish to Netlify

Now that we have our app up and running locally, there's just one last thing to do: deploy it!

We'll be using Netlify for this guide, but you could also as easily use Heroku, or any other platforms that supports webapps like Vue.js out of the box.

First, you'll need a GitHub account to push your app's repo to, and a Netlify account. If you haven't got a netlify account yet, you can log in with your GitHub account, which will make your life easier.

### Create your site

1. Go to your Netlify's dashboard and find the `New site from Git` button
   ![New site from git button](XXX)
2. Follow the steps as shown:
   1. !![Step 1](XXX)
   2. !![Step 2](XXX)
   3. !![Step 3](XXX)
   4. Once this is done, you'll have a netlify url where you're app will live.
3. Create a new Application on the Speckle server and set it's callback url to the application url you just got from Netlify. This will give you a new `appId` and `appSecret`.
4. Last step is to set the `env` variables, similar to how we did it for our development server.
   1. Go to `Site Settings`->`Build and Deploy`-`Environment`
   2. Add the same environment variables as in your `.env.local` file but using the `appId` and `appSecret` values from setp 3.
      ![Env variables](XXX)
5. Go to the `Deploys` section of your app, find the `Trigger Deploy` button and select the `Deploy Site` option. This will force your app to restart and detect the new env variables.

That's it! If you visit your netlify url, you should see your app running smoothly!

## Wrapping it up

We've covered quite a lot on this guide, but this was only **Part 1**! Stay tuned for our following releases, where we'll also use our web viewer, fetch the data inside commits, receive notifications from the server, and more!

You can find the entire code for this guide [HERE](XXX)

If you find any issues with this guide, or the apps code, feel free to report them on our [Community Forum](https://speckle.community) or directly on the app's GitHub repo. Wherever it feels more appropriate.
