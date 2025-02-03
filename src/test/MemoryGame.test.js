import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MemoryGame from '../layouts/MemoryGame';
import '@testing-library/jest-dom/extend-expect';

// Mock de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      entries: [
        { fields: { image: { url: 'http://example.com/image1.jpg' } } },
        { fields: { image: { url: 'http://example.com/image2.jpg' } } }
      ]
    }),
  })
);

describe('MemoryGame', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders the game board and scoreboard', async () => {
    render(<MemoryGame />);
    expect(screen.getByText(/errors/i)).toBeInTheDocument();
    expect(screen.getByText(/matches/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByRole('img').length).toBeGreaterThan(0));
  });

  test('flips cards on click and checks for matches', async () => {
    render(<MemoryGame />);
    await waitFor(() => screen.getAllByRole('img'));

    const cards = screen.getAllByRole('img');
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    expect(cards[0]).toHaveClass('flipped');
    expect(cards[1]).toHaveClass('flipped');
  });

  test('shows and hides the name modal', async () => {
    render(<MemoryGame />);
    expect(screen.getByText(/enter your name/i)).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test User' } });
    fireEvent.click(screen.getByText(/start game/i));

    await waitFor(() => expect(screen.queryByText(/enter your name/i)).not.toBeInTheDocument());
  });

  test('resets the game', async () => {
    render(<MemoryGame />);
    await waitFor(() => screen.getAllByRole('img'));

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByText(/enter your name/i)).toBeInTheDocument();
  });

  test('shows congratulations message when all cards are matched', async () => {
    render(<MemoryGame />);
    await waitFor(() => screen.getAllByRole('img'));

    // Simulate matching all cards
    const cards = screen.getAllByRole('img');
    cards.forEach(card => fireEvent.click(card));

    await waitFor(() => expect(screen.getByText(/congratulations/i)).toBeInTheDocument());
  });
});