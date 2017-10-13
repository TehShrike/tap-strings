# tap-strings

Generate valid TAP output as strings.


<!--js
const parse = require('./')
-->

# API

```
const parse = require('tap-strings')
```

## parse.version(number)

```js
parse.version(13) // => `TAP version 13`
```

## parse.plan(start, end)

```js
parse.plan(1, 5) // => `1..5`
```

## parse.test(ok, number, [description])

```js
parse.test(true, 1, `lookin' cool my man`) // => `ok 1 lookin' cool my man`
```

## parse.todo(ok, number, [descriptor, [directive]])

```js
const todoOutput = parse.todo(false, 2, `everything's groovy`, `Fix this later`)
todoOutput // => `not ok 2 everything's groovy # TODO Fix this later`
```

## parse.skip(ok, number, [descriptor, [directive]])

```js
parse.skip(true, 3, null, `Don't care`) // => `ok 3 # SKIP Don't care`
```

## parse.bail([message])

```js
parse.bail(`eek`) // => `Bail out! eek`
```

## parse.diagnostic([message])

```js
parse.diagnostic(`yo`) // => `# yo`
```

## parse.message(message)

```js
const messageOutput = parse.message(`This is totally
a multiline string`)

const expected = `  ---
  message: |-
    This is totally
    a multiline string
  ...`

messageOutput // => expected

```

# License

[WTFPL](http://wtfpl2.com)
