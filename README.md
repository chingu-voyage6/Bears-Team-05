# Bears-Team-05 | Chingu Voyage-6
`npm run client`
`npm run server`

- MongoDB set up
  - run `brew install mongodb`
  - run `sudo mkdir -p /data/db`
  - run `sudo chown -R $USER /data/db`
  - start mongodb by running `mongod`
  
## TOC:

[Getting Started With ESLint](#getting-started-with-eslint)

------------------------------

## Getting Started With ESLint

ESLint is already listed as a dev-dependency. So install it with:

```bash
npm i  
```

Or

```bash
yarn
```

Then, to initialize it in your project we run the binary with the `--init` argument. Because ESLint was not installed globally, we have to spell out the full path to its binary (note the leading "dot slash": `./`):

```bash
./node_modules/.bin/eslint --init
```

This runs ESLint's configuration CLI tool, a series of questions that will generate our `.eslintrc` file.

Q: _"How would you like to configure ESLint?"_
>Option 2: _"Use a popular style guide"_

Q: _"Which style guide do you want to follow?"_
>Option 2: _"Airbnb"_

Q: _"Do you use React?"_
>Y

Q: _"What format do you want your config file to be in?"_
>JavaScript

At this point, ESLint will go out and fetch the required dependencies, adding them to `package.json`. For example:

```json
"devDependencies": {
  "eslint": "^4.19.1",
  "eslint-config-airbnb": "^16.1.0",
  "eslint-plugin-import": "^2.12.0",
  "eslint-plugin-jsx-a11y": "^6.0.3",
  "eslint-plugin-react": "^7.9.1"
}
```

Now you can run ESLint from the command line. For example, to lint everything in `/client/src`:

```bash
./node_modules/.bin/eslint client/src/
```

That's going to reveal that we have 190 errors and 5 warnings! O_O

But before we get to those errors, let's make ESLint more convenient by installing an extension for our IDE.

**For VS Code:**

https://github.com/Microsoft/vscode-eslint

**For Atom**

You need two extensions: `linter` (which you may already have) and an ESLint extension. Detailed instructions [here](https://hackernoon.com/what-is-eslint-how-do-i-set-it-up-on-atom-70f270f57296). That article refers to this ESLint extension:

https://atom.io/packages/linter-eslint

One you have the editor extensions installed, you will need to restart the editor.

Now, open a file and watch ESLint have a complete meltdown! `App.js` for example is like completely wrong, according to ESLint and the Airbnb style guide!

* Expected exception block, space or tab after '//' in comment (`spaced-comment`)
* Missing space before opening brace (`space-before-blocks`)
* Missing semicolon (`semi`)
* Infix operators must be spaced (`space-infix-ops`)
* Missing space before value for key 'fromServer' (`key-spacing`)
* Missing trailing comma (`comma-dangle`)
* Missing semicolon (`semi`)
* Missing space before opening brace (`space-before-blocks`)
* fetch' is not defined (`no-undef`)
* Expected indentation of 6 spaces but found 4 (`indent`)
* Missing space before => (`arrow-spacing`)
* Missing space after => (`arrow-spacing`)
* Unexpected block statement surrounding arrow body; move the returned value  immediately after the => (`arrow-body-style`)
* Expected indentation of 8 spaces but found 6 (`indent`)
* Missing semicolon (`semi`)
* Expected indentation of 6 spaces but found 4 (`indent`)
* Expected indentation of 6 spaces but found 4 (`indent`)
* Missing space before => (`arrow-spacing`)
* Missing space after => (`arrow-spacing`)
* Expected indentation of 8 spaces but found 6 (`indent`)
* Expected indentation of 10 spaces but found 8 (`indent`)
* Missing space before value for key 'fromServer' (`key-spacing`)
* Missing trailing comma (`comma-dangle`)
* Expected indentation of 8 spaces but found 6 (`indent`)
* Missing semicolon (`semi`)
* Expected indentation of 6 spaces but found 4 (`indent`)
* Missing semicolon (`semi`)
* JSX not allowed in files with extension '.js' (`react/jsx-filename-extension`)

Most of those are simple formatting errors (whitespace, semis, etc.). But a few are structural (no JSX in JS).

I modified `.eslintrc` to help with some of those errors/warnings, and to add a few rules that I personally like:

```js
'env': {             // Tell ESLint that we're using
  'browser': true,   // window & document globals like fetch
  'commonjs': true,  // Node module syntax
  'es6': true,       // es6 syntax
  'node': true,      // Node's global object
  'jest': true       // Jest globals
},
```

Added Rules:

1.  `'no-console': 0` -- this disables eslint errors for `console.log`
2.  `'indent': ['error', 2, { 'SwitchCase': 1 }]` -- this requires indentation of 2 spaces, and allows switch case blocks to be indented an additional 2 spaces.

App.jsx, edited to satisfy ESLint rules:

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  // Added constructor and componenDidMount to test server response
  constructor(props) {
    super(props);
    this.state = {
      fromServer: '',
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(response => response.json())
      .then((serverMessage) => {
        this.setState({
          fromServer: serverMessage,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.fromServer}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="/test">Go To Test Route</a>
      </div>
    );
  }

}

export default App;
```
