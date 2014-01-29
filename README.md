## memoize-with-leveldb

Memoize functions with [level-json-cache](http://github.com/azer/level-json-cache).
 See also [memoize-async](http://github.com/azer/memoize-async)

## Install

```bash
$ npm install memoize-with-leveldb
```

## Usage

```js
memoize = require('memoize-with-leveldb')
pullMediumArticles = require('medium-author')
articles = memoize(pullMediumArticles, '12 hours')

// Pulls at first call:
articles('azerishere', function (error, azer) {

  azer.name
  // => Azer Koçulu

  azer.articles
  // => [{ title: "Çatışma Diyalektiği", url: "http://medium.com/p/329f78bddf89", snippet: "Dünya bir çatışma alanıdır." }, ...]

  // Will return from LevelDB cache at second call:
  articles('azerishere', function (error, azer) { /* ... */ })

})
```
