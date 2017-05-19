const optionalSpaceBefore = str => str ? ' ' + str : ''
const indent = str => str.split('\n').map(line => '  ' + line).join('\n')
const noNewlines = str => str.replace('\n', () => ' ')
const safeOptional = str => noNewlines(optionalSpaceBefore(str))

const version = versionNumber =>  `TAP version ${versionNumber}`
const plan = (start, end) => `${start}..${end}`
const test = (ok, number, descriptor) => `${ ok ? 'ok' : 'not ok'} ${number}${safeOptional(descriptor)}`
const todo = (ok, number, descriptor, directive) => `${test(ok, number, descriptor)} # TODO${safeOptional(directive)}`
const skip = (ok, number, descriptor, directive) => `${test(ok, number, descriptor)} # SKIP${safeOptional(directive)}`
const bail = descriptor => 'Bail out!' + safeOptional(descriptor)
const diagnostic = message => '#' + safeOptional(message)
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
