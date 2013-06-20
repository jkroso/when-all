
# when-all

  normalize an object/array where some value may be wrapped in [Results](//github.com/jkroso/result)

## Installation

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin)_  

    $ {package mananger} install jkroso/when-all

_With [npm](//github.com/isaacs/npm)_  

    $ npm install --save when-all

then in your app:

```js
var all = require('when-all')
```

## API

  - [all()](#all)

### all(x)

  Create a Result for a new `x` with all values lifted out of their Results 
  
```js
all([
  getPage('google.com'),
  getPage('google.co.nz')
]).then(compare)
```

```js
all({
  usa: getPage('google.com'),
  nz: getPage('google.co.nz')
}).then(compare)
```

## Example

You could decorate a function so it can take [Results](//github.com/jkroso/result) as arguments.

```js
var all = require('when-all')

function decorate(fn) {
  return function(){
    var self = this
    return all(arguments).then(function(args){
      return fn.apply(self, args)
    })
  }
}

var asyncCompare = decorate(compare)
asyncCompare(
  getPage('google.com'),
  getPage('google.co.nz')
)
```

## Running the tests

```bash
$ make
```

Then open your browser [to](http://localhost:3000/test).
