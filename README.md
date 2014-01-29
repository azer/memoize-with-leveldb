## memoize-with-leveldb

Memoize async functions with [memoize-async](http://github.com/azer/memoize-async) and [level-json-cache](http://github.com/azer/level-json-cache).

## Install

```bash
$ npm install memoize-with-leveldb
```

## Usage

```js
memoize = require('memoize-with-leveldb')('./path-to-db')
pullMediumArticles = require('medium-author')
articles = memoize(pullMediumArticles, '12 hours') // see github.com/azer/english-time for valid time inputs

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

Passing hash function:

```js
articles = memoize(pullMediumArticles, {
  time: '12 hours',
  hash: hash
})

function hash (title) {
  return 'post:' + title;
}
```
