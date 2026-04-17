import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChannelForm } from './ChannelForm';

// Mock inertia router inside tests
vi.mock('@inertiajs/react', () => ({
  router: {
    delete: vi.fn(),
  }
}));

describe('ChannelForm Component', () => {
  it('renders input states properly', () => {
    render(
      <ChannelForm 
        roomName="" setRoomName={vi.fn()} 
        userName="" setUserName={vi.fn()} 
        handleJoin={vi.fn()} channels={[]} 
      />
    );
    expect(screen.getByPlaceholderText('Your Username...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Channel Name...')).toBeInTheDocument();
    // Verify join button is disabled with empty fields
    expect(screen.getByText('Join Channel')).toBeDisabled();
  });

  it('renders existing channel list intelligently', () => {
    const channels = [{ id: 1, name: 'General', slug: 'general' }];
    render(
      <ChannelForm 
        roomName="" setRoomName={vi.fn()} 
        userName="" setUserName={vi.fn()} 
        handleJoin={vi.fn()} channels={channels} 
      />
    );
    
    // Check that channel loops flawlessly
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('controls the visibility of the delete dialog modal', () => {
    const channels = [{ id: 2, name: 'SpamRoom', slug: 'spamroom' }];
    render(
      <ChannelForm 
        roomName="" setRoomName={vi.fn()} 
        userName="" setUserName={vi.fn()} 
        handleJoin={vi.fn()} channels={channels} 
      />
    );
    
    // Ensure the modal is hidden
    expect(screen.queryByText('Delete Channel')).not.toBeInTheDocument();
    
    // Click the delete button icon for room
    fireEvent.click(screen.getByLabelText('Delete channel'));
    
    // Ensure confirmation popup opens 
    expect(screen.getByText('Delete Channel')).toBeInTheDocument();
  });
});
