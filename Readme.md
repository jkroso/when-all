
# when-all

  create a promise for the completion of an array of promises

## Getting Started

_With component_  

	$ component install jkroso/when-all

_With npm_  

	$ npm install --save https://github.com/jkroso/when-all/archive/master.tar.gz

then in your app:

```js
var all = require('when-all')
```

## API

  - [all()](#all)

### all()

  Create a promise for an array
  
```js
all([
  getPage('google.com'),
  getPage('google.co.nz')
]).then(compare)
```

## Running the tests

```bash
$ npm install
$ make
```
Then open your browser to the `./test` directory.

_Note: these commands don't work on windows._ 

## License 

[MIT](License)