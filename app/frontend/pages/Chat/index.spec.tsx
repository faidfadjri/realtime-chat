import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatIndex from './index';

vi.mock('@rails/actioncable', () => ({
  createConsumer: vi.fn(() => ({
    subscriptions: {
      create: vi.fn(),
    }
  }))
}));

describe('Chat Page Component', () => {
  it('renders the core wrapper and initial join form natively', () => {
    render(<ChatIndex channels={[]} />);
    
    expect(screen.getByText('Welcome to the Chat')).toBeInTheDocument();
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
  });
});
