import { describe, test, expect, beforeAll } from 'vitest';
import { createCalculator } from '../lib/calculator';

let calculator;

beforeAll (() => {
    calculator = createCalculator();
});

describe('Addition', () => {
    test('adding 2 + 4 will equal 6', () => {
        const result = calculator.add(2, 4);
        expect (result).toBe(6)
    });
});

describe('Subtraction', () => {
    test('10 - 4 will equal 6', () => {
        const result = calculator.subtract (10, 4);
        expect(result).toBe(6);
    });
});

describe('Multiplication', () => {
    test('5 * 2 should equal 10', () => {
        const result = calculator.multiply(5, 2);
        expect(result).toBe(10);
    });
});

describe('Division', () => {
    test('15 / 3 should equal 5', () => {
        const result = calculator.divide(15, 3);
        expect(result).toBe(5);
    });
});