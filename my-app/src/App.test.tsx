import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello', () => {
  render(<App />);
  const helloElement = screen.getByText('Hello');
  expect(helloElement).toBeInTheDocument();
});
