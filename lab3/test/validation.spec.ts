/*import { Validation } from '../src/utils/validation';
import * as assert from 'assert';

describe('Validation', function () {
    describe('#isValidYear()', function () {
        it('should return true for a valid year', function () {
            const result = Validation.isValidYear('2022');
            assert.strictEqual(result, true);
        });

        it('should return false for a year before 1924', function () {
            const result = Validation.isValidYear('1923');
            assert.strictEqual(result, false);
        });

        it('should return false for an invalid year format', function () {
            const result = Validation.isValidYear('20a2');
            assert.strictEqual(result, false);
        });

        it('should return false for a year after the current year', function () {
            const result = Validation.isValidYear('2025');
            assert.strictEqual(result, false);
        });

        it('should return false for a non-numeric year', function () {
            const result = Validation.isValidYear('abc');
            assert.strictEqual(result, false);
        });
    });

    describe('#isValidEmail()', function () {
        it('should return true for a valid email', function () {
            const result = Validation.isValidEmail('user@example.com');
            assert.strictEqual(result, true);
        });

        it('should return false for an invalid email', function () {
            const result = Validation.isValidEmail('invalid-email');
            assert.strictEqual(result, false);
        });

        it('should return false for an empty email', function () {
            const result = Validation.isValidEmail('');
            assert.strictEqual(result, false);
        });

        it('should return false for an email without "@" symbol', function () {
            const result = Validation.isValidEmail('userexample.com');
            assert.strictEqual(result, false);
        });
    });
});
*/