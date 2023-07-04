# tap-strings

Generate valid TAP output as strings.


<!--js
const tap = require('./')
-->

# API

```
const tap = require('tap-strings')
```

## tap.version(number)

```js
tap.version(13) // => `TAP version 13`
```

## tap.plan(start, end)

```js
tap.plan(1, 5) // => `1..5`
```

## tap.test(ok, number, [description])

```js
tap.test(true, 1, `lookin' cool my man`) // => `ok 1 lookin' cool my man`
```

## tap.todo(ok, number, [descriptor, [directive]])

```js
const todoOutput = tap.todo(false, 2, `everything's groovy`, `Fix this later`)
todoOutput // => `not ok 2 everything's groovy # TODO Fix this later`
```

## tap.skip(ok, number, [descriptor, [directive]])

```js
tap.skip(true, 3, null, `Don't care`) // => `ok 3 # SKIP Don't care`
```

## tap.bail([message])

```js
tap.bail(`eek`) // => `Bail out! eek`
```

## tap.diagnostic([message])

```js
tap.diagnostic(`yo`) // => `# yo`
```

## tap.message(message)

```js
const messageOutput = tap.message(`This is totally
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
