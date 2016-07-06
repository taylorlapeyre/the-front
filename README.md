<h1 align="center"><img width="320" alt="screen shot 2016-02-21 at 10 31 52 pm" src="https://cloud.githubusercontent.com/assets/1610503/13211255/a3da6692-d8eb-11e5-8fd3-adfc66047fc3.png"></h1>

[![Build Status](https://travis-ci.com/Everlane/the-front.svg?token=pzhNZvC6ij3hs7ozUy86&branch=master)](https://travis-ci.com/Everlane/the-front)

This project is an experimental codebase exploring what it means to have a large, modern, fully react/redux Everlane front end application.

### Benefits

- Hot module reloading of React components and SCSS during development
- Access to all of NPM
- Access to ES6 and JS future-features
- Static type checking via [flow](https://flowtype.org/) for every JavaScript file
- Source maps to all files including jsx and sass stylesheets
- Unidirectional data-flow and immutable app architecture as a rule from day one
- Virtual DOM manipulation through React at every level of the UI
- Fast, very complete tests that are painless on travis
- Linting as a day-one concern, enforcing not just style but concepts as well
- Ability to require any kind of file, thanks to webpack
- Revamped Sass styles and markup for all user interfaces with BEM standards and [autoprefixer](https://github.com/postcss/autoprefixer)
- Automatically syncs line items between browser sessions
- Tests for all reducers and complex components with shallow rendering
- All HTML elements are accessible to the highest [a11y](http://a11yproject.com/) standard
- Painless setup

Implemented so far:

- [x] Page chrome and layout
  - [x] Header
  - [x] Footer
  - [x] Loading Indicator
  - [x] Dropdown Menus
- [x] Home page
  - [x] Content pages
  - [x] Transparent header
- [x] Collection pages (more or less)
  - [x] Display Groups
  - [x] Products with changing images
  - [ ] Content page subhero
  - [ ] Quick Add to bag
- [x] Product pages (more or less)
  - [x] Image gallery
  - [x] Product details
  - [x] Switch colors
  - [x] Select variant
  - [x] Content page
  - [x] Purchase button
  - [ ] Image zoom
- [x] User and visitor auth (modals, forms, bootstrapping, etc)
  - [x] Bootstrap visitor/user persistence through cookies
  - [x] Login modal
  - [x] Sign in form
  - [x] Sign up form
  - [x] Sign out link
  - [x] New user creation
  - [x] Session creation
  - [x] Auth token management
  - [x] Account links at top of page
- [x] Cart management
  - [x] interactive HoverCart shows up in top right
  - [x] Possible to add, remove, and change line items
  - [x] Auto-sync line items between tabs
- [x] Checkout flow
  - [x] Intelligent routing for all checkout steps
  - [x] Determine if email is taken or not form
  - [x] account (sign in/up) step and forms
  - [x] Shipping address step with address management and creation
  - [x] Credit card creation step with braintree nonce encryption
  - [x] Review page
    - [x] Change shipping address modal
    - [x] Change credit card modal
    - [x] Shipping option selection with cart organization
    - [x] Everlane Now support with a modal for collecting phone/etc info
    - [x] Gift code redemption with API endpoint and form for submitting
    - [ ] Guest checkout with Visitor instead of User (waiting for AB test resolution)
    - [x] Email preference collection when checking out as visitor
    - [x] Order submission and creation
    - [x] Thanks page after order submission with form for claiming order as a user
- [ ] Actually correct meta / SEO / icons in HTML
- [ ] Fit information for product pages
- [ ] Factory page
- [ ] About page
- [ ] Account management pages
- [ ] AB testing library
- [ ] Metrics library
- [ ] Analytics middleware
- [ ] There's always more!


### Running a development server

```
$ npm install
$ npm start
```

This will start a live-reloading server at [http://localhost:8080/](http://localhost:8080).

### Running tests locally

```
$ npm install
$ npm test
```

This will start a server at http://localhost:9876 that will automatically run tests as you write them in your console using [jsdom](https://github.com/tmpvar/jsdom) as its browser. All tests typically complete in less than a second. Let's keep it that way! By default `npm test` will watch for changes and re-run tests that have changed since the last save. If you just want to run tests once, you can set `CI=true`.

If you want to test your code in an actual browser, open that URL and tests will be run asynchronously on both jsdom and the browser you opened it in.

### Developing this software

This code uses [flow](https://flowtype.org/) for type checking. Linting, typechecking, and unit tests must pass on all code before a commit can be made. You can manually analyze your code for type errors by running `npm run typecheck`, manually detect style errors with `npm run lint`, and run tests with `npm test`.

If you install the [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) then you can see Redux actions as they happen in your dev tools window.

You should also have the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) if you don't already, so that you can inspect the virtual dom.

Tests are expected for all state reducers and any components with complexity. You can and should use airbnb's [enzyme](https://github.com/airbnb/enzyme) library for testing your react components. [Jasmine](https://github.com/jasmine/jasmine) is our testing framework and [karma](https://github.com/karma-runner/karma) runs the tests.

You will have access to all [lodash](https://lodash.com/) utility functions while writing your code. Make sure to import lodash functions as single methods to keep our build small:

```js
import assign from 'lodash/assign'
```

### Linting

This software adheres to fairly strict coding style and concepts. In an effort to maintain those things, linting has been set up as a day-one concern. Our linter is [ESLint](http://eslint.org/).

Please install the eslint plugin for whatever editor you use. I **highly** recommend using a linter for this project, as it not only enforces style rules but also react concepts.

We adhere to the [airbnb style guide ](https://github.com/airbnb/javascript) (with some small exceptions) for this project.

In addition to eslint, I recommend setting up your editor to lint with `flow` as well. That way you can see type errors as you write your code. There are [plugins](https://atom.io/packages/linter-flow) for most editors that you can use for this.

### Technical details and stack overview

- You use [react-router](https://github.com/reactjs/react-router) to decide which top level component to show.

- You use [redux](https://github.com/reactjs/redux) as a state container to change things in the application and grab data to show.

- You use [react-router-redux](https://github.com/reactjs/react-router-redux) to ensure that the current url is properly synced in the redux state tree.

- You use [react-redux](https://github.com/reactjs/react-redux) to painlessly connect react components to the global state tree.

- You use [react](https://github.com/facebook/react) to write declarative UI components that are stateless and re-render quickly.

- You use [babel](https://babeljs.io/) in order to have access to the most current JavaScript syntax and features.

- You use [webpack](https://github.com/webpack/webpack) to bundle your javascript files into something that is easy to understand by the browser.

### Why are we using this?

A common concern when moving to a new Javascript framework is that the community moves too fast, resulting in many trendy frameworks that will be outdated in a year or so. This is totally fair; using the "hottest new thing" in Javascript is not really a safe bet.

However, I would argue that the _concepts_ that React/Redux introduces reflect a larger shift in the mindset of how front-end applications are architected. Almost every large Javacript UI framework has recently embraced the core ideas behind React/Redux: a unidirectional data flow (buzzword alert!), UI components as stateless functions, a single state tree for your app. It's a smart decision to go with the largest framework with the biggest community support and momentum.

When I say that the community for React/Redux is large, I mean that it is _very_ large! Some of the biggest companies in the world are using this stack and have been for a while now. If we have moved in the wrong direction by using these libraries, then so have:

- Facebook
- Airbnb
- Uber
- Atlassian
- Dropbox
- Flipboard
- Instagram
- Netflix
- Uniqlo
- [Many, many more](https://github.com/facebook/react/wiki/Sites-Using-React)
