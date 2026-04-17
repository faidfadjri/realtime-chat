import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatRoom } from './ChatRoom';

vi.mock('@inertiajs/react', () => ({
  router: {
    get: vi.fn(),
  }
}));

describe('ChatRoom Component', () => {
  it('renders zero-state properly empty', () => {
    render(
      <ChatRoom 
        messages={[]} clientId="user99" currentMessage=""
        setCurrentMessage={vi.fn()} handleSendMessage={vi.fn()} 
        messagesEndRef={{ current: null }}
      />
    );
    expect(screen.getByText('No messages yet. Send one below!')).toBeInTheDocument();
  });

  it('renders messages and visually marks current client', () => {
    const msgs = [
      { id: '1', content: 'Hi there', senderId: 'user1' },
      { id: '2', content: 'Hello user1', senderId: 'user99' }
    ];
    
    render(
      <ChatRoom 
        messages={msgs as any} clientId="user99" currentMessage=""
        setCurrentMessage={vi.fn()} handleSendMessage={vi.fn()} 
        messagesEndRef={{ current: null }}
      />
    );
    
    expect(screen.getByText('Hi there')).toBeInTheDocument();
    
    // Verifies the conditional bubble name transformation happened correctly
    expect(screen.getByText('You')).toBeInTheDocument(); 
    expect(screen.getByText('user1')).toBeInTheDocument();
  });
});
