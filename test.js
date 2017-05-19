const test = require('tape')
const parse = require('./parse-tap.js')
const tap = require('./')

function assertTapType(t, string, type) {
	return parse(string).then((parsed) => {
		t.equal(parsed.type, type, `${string} should be type ${type}`)
	})
}

function testP(description, fn) {
	test(description, t => {
		const promise = fn(t)
		promise.then(() => t.end())
		promise.catch(err => {
			console.error(err)
			t.error(err)
			t.fail()
			t.end()
		})
	})
}

testP('parse-tap', t => {
	return Promise.all([
		assertTapType(t, 'ok 3 butts', 'test'),
		assertTapType(t, 'TAP version 13', 'version'),
		assertTapType(t, 'wat', 'unknown'),
	])
})

async function assert(t, input, type, parsed) {
	const actual = await parse(input)
	t.equal(actual.type, type, `${input} should be type ${type}`)
	t.deepEqual(actual.parsed, parsed)
}

testP('version', async t => {
	await assert(t, tap.version(13), 'version', { version: '13' })
	await assert(t, tap.version(12), 'version', { version: '12' })
})

testP('plan', async t => {
	await assert(t, tap.plan(1, 1), 'plan', { start: 1, end: 1 })
	await assert(t, tap.plan(2, 3), 'plan', { start: 2, end: 3 })
})

testP('test', async t => {
	const a = (input, expected) => assert(t, input, 'test', expected)

	await a(tap.test(true, 1, 'hullo'), { ok: true, point: 1, description: 'hullo' })
	await a(tap.test(false, 3, 'wat'), { ok: false, point: 3, description: 'wat' })
	await a(tap.test(false, 3), { ok: false, point: 3 })

	t.equal(tap.todo(false, 13, 'hrrm', 'bend space and time'), 'not ok 13 hrrm # TODO bend space and time')
	t.equal(tap.skip(true, 23, '', 'Insufficient flogiston pressure.'), 'ok 23 # SKIP Insufficient flogiston pressure.')
	t.equal(tap.skip(true, 23, 'yarp', 'Insufficient flogiston pressure.'), 'ok 23 yarp # SKIP Insufficient flogiston pressure.')

	t.equal(tap.test(false, 33, 'several\nlines'), 'not ok 33 several lines')
})

testP('bail', async t => {
	t.equal(tap.bail(), 'Bail out!')
	t.equal(tap.bail('OH NO'), 'Bail out! OH NO')
})

testP('diagnostic', async t => {
	const a = (input, expected) => assert(t, input, 'diagnostic', expected)

	await a(tap.diagnostic('o rly'), { message: 'o rly' })
	t.equal(tap.diagnostic('o rly'), '# o rly')
	t.equal(tap.diagnostic('o\nrly'), '# o rly')
})

testP('message', async t => {
	const a = (input, message) => assert(t, tap.test(true, 2) + '\n' + input, 'test', {
		ok: true,
		point: 2,
		document: { message }
	})

	await a(tap.message('boy howdy\nneighbor'), 'boy howdy\nneighbor')
})
