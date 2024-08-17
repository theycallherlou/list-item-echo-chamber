// FILEPATH: /Users/adamrobson/theycallherlou/works/docker-container/src/__tests__/App.test.tsx
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders react logo', () => {
    render(<App />);
    const reactLogo = screen.getByAltText(/react logo/i);
    expect(reactLogo).toBeDefined();
  });

  test('renders vite logo', () => {
    render(<App />);
    const viteLogo = screen.getByAltText(/vite logo/i);
    expect(viteLogo).toBeDefined();
  });

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Click on the Vite and React logos to learn more/i);
    expect(linkElement).toBeDefined();
  });
});
