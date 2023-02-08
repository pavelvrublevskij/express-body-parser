import assert from 'assert';
import each from 'jest-each';
import { parseJSON } from './JsonBodyParserV2';

describe('JsonBodyParserV2', () => {
	describe('should parse', () => {
		each([
			['is object only', '{"a": "b"}'],
			['is object only with comma', '{"a": "b", "c": "d"}'],
			['is array only', '[{"a": "b"}]'],
			['is object array only', '{"a":[{"a": "b"}]}'],
			['is object with number value only', '{"a": 1}']
		]).test('when json %s', (text, jsonAsText) => {
			const result = parseJSON(jsonAsText);
			assert.equal(result, 'OK');
		});
	});

	describe('should not parse', () => {
		each([
			['has comma missed', '{"a": "b" "c":"d"}'],
			['has wrong array object', '[{"a": "b"]'],
			['has wrong array', '{"a":{"a": "b"}]}'],
		]).test('when json %s', (text, jsonAsText) => {
			assert.throws(() => parseJSON(jsonAsText), Error);
		});
	});
});
