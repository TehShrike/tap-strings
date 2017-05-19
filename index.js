const optionalSpaceBefore = str => str ? ' ' + str : ''
const indent = str => str.split('\n').map(line => '  ' + line).join('\n')
const noNewlines = str => str.replace('\n', () => ' ')

const version = versionNumber =>  `TAP version ${versionNumber}`
const plan = (start, end) => `${start}..${end}`
const test = (ok, number, descriptor) => `${ ok ? 'ok' : 'not ok'} ${number}${noNewlines(optionalSpaceBefore(descriptor))}`
const todo = (ok, number, descriptor, directive) => `${test(ok, number, descriptor)} # TODO ${directive}`
const skip = (ok, number, descriptor, directive) => `${test(ok, number, descriptor)} # SKIP ${directive}`
const bail = descriptor => 'Bail out!' + noNewlines(optionalSpaceBefore(descriptor))
const diagnostic = message => '#' + noNewlines(optionalSpaceBefore(message))
const message = message => indent(`---
message: |-
${indent(message)}
...`)

module.exports = {
	version,
	plan,
	test,
	todo,
	skip,
	bail,
	diagnostic,
	message
}
