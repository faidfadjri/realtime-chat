import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SenderForm } from './SenderForm';

describe('SenderForm Component', () => {
  it('renders inputs and button correctly', () => {
    render(
      <SenderForm 
        currentMessage="" 
        setCurrentMessage={vi.fn()} 
        handleSendMessage={vi.fn()} 
      />
    );
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    // The send button should be disabled when empty
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls handleSendMessage on submitting message', () => {
    const handleSendMessage = vi.fn((e) => e.preventDefault());
    render(
      <SenderForm 
        currentMessage="Hello World" 
        setCurrentMessage={vi.fn()} 
        handleSendMessage={handleSendMessage} 
      />
    );
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    fireEvent.submit(button);
    expect(handleSendMessage).toHaveBeenCalled();
  });
});
