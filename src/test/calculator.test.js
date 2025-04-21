import { describe, test, expect, beforeAll } from 'vitest';
import { createCalculator } from '../lib/calculator';

let calculator;

beforeAll (() => {
    calculator = createCalculator();
})