import assert from 'assert';
import each from 'jest-each';
import { JsonBodyParser } from './JsonBodyParser';

describe('JsonBodyParser', () => {
	describe('should parse', () => {
		each([
			['is object only', '{"a": "b"}'],
			['is object only with comma', '{"a": "b", "c": "d"}'],
			['is array only', '[{"a": "b"}]'],
			['is object array only', '{"a":[{"a": "b"}]}'],
			['is object with number value only', '{"a": 1}']
		]).test('when json %s', (text: string, jsonAsText: string) => {
			const result = new JsonBodyParser(jsonAsText).parse();
			assert.equal(result, 'OK');
		});
	});

	describe('should not parse', () => {
		each([
			['has comma missed', '{"a": "b" "c":"d"}'],
			['has wrong array object', '[{"a": "b"]'],
			['has wrong array', '{"a":{"a": "b"}]}'],
		]).test('when json %s', (text: string, jsonAsText: string) => {
			assert.throws(() => new JsonBodyParser(jsonAsText).parse(), Error);
		});
	});
});
