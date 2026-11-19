import assert from 'node:assert/strict';
import { test } from 'node:test';
import { averageTotal } from '../src/users.js';

test('averageTotal returns 0 for an empty list', () => {
  assert.equal(averageTotal([]), 0);
});

test('averageTotal returns the rounded average', () => {
  assert.equal(averageTotal([{ total: 100 }, { total: 201 }]), 151);
});
