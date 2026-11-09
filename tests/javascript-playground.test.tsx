// @vitest-environment jsdom
import { afterEach, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Playground from '../src/components/learn/Playground';

afterEach(cleanup);

test('steps through synchronous code, promise reactions, then the timer and resets', () => {
  render(<Playground />);
  const next = screen.getByRole('button', { name: 'Next step' });
  for (let index = 0; index < 6; index++) fireEvent.click(next);
  expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['A', 'B', 'promise', 'timer']);
  expect(next.hasAttribute('disabled')).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
});

test('keeps closure counters independent', () => {
  render(<Playground kind="closures" />);
  fireEvent.click(screen.getByRole('button', { name: 'Call A' }));
  fireEvent.click(screen.getByRole('button', { name: 'Call A' }));
  fireEvent.click(screen.getByRole('button', { name: 'Call B' }));
  expect(screen.getByText('Counter A: 2')).toBeTruthy();
  expect(screen.getByText('Counter B: 1')).toBeTruthy();
});

test('shows shared mutation for aliases and independent scores for a spread copy', () => {
  render(<Playground kind="references" />);
  fireEvent.click(screen.getByRole('button', { name: 'Increment score' }));
  expect(screen.getByText('original.score = 11')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Use a spread copy' }));
  fireEvent.click(screen.getByRole('button', { name: 'Increment score' }));
  expect(screen.getByText('original.score = 10')).toBeTruthy();
  expect(screen.getByText('copy.score = 11')).toBeTruthy();
});

test('bubbles a button click to the panel', () => {
  render(<Playground kind="events" />);
  fireEvent.click(screen.getByRole('button', { name: 'Inner button' }));
  expect(screen.getByRole('status').textContent).toBe(
    'Button listener: 1 · Panel listener: 1',
  );
});

test('shadows and restores a prototype property', () => {
  render(<Playground kind="prototypes" />);
  expect(screen.getByText('Result: "shared"')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Add own property' }));
  expect(screen.getByText('Result: "own"')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Delete own property' }));
  expect(screen.getByText('Result: "shared"')).toBeTruthy();
});

test('reassigns a primitive without changing its previous value', () => {
  render(<Playground kind="values" />);
  fireEvent.change(screen.getByRole('slider'), { target: { value: '72' } });
  expect(screen.getByText('score = 72')).toBeTruthy();
  expect(screen.getByText('previous = 10')).toBeTruthy();
});
