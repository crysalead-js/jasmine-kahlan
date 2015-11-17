# jasmine-kahlan

[![Build Status](https://travis-ci.org/crysalead-js/jasmine-kahlan.png?branch=master)](https://travis-ci.org/crysalead-js/jasmine-kahlan)

jasmine-kahlan is an extension which provides [kahlan's](https://github.com/crysalead/kahlan) matchers for [jasmine](http://http://jasmine.github.io/) library.

Note: `toReceive()` && `toReceiveNext()` are not supported. However jasmine's native `spyOn()`/`toHaveBeenCalled()` combo is supported instead.

## Installation

```bash
npm install jasmine-kahlan --save-dev;
```

## Usage

node:
```js
require('jasmine-kahlan');
```

browser:
```js
<script src="vendor/jasmine/lib/jasmine-core/jasmine.js" type="text/javascript"></script>
<script src="vendor/jasmine/lib/jasmine-core/jasmine-html.js" type="text/javascript"></script>
<script src="vendor/jasmine/lib/jasmine-core/boot.js" type="text/javascript"></script>
<script src="vendor/jasmine-kahlan/jasmine-kahlan.js" type="text/javascript"></script>
```
