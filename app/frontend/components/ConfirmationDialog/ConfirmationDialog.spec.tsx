import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmationDialog } from './ConfirmationDialog';

describe('ConfirmationDialog Component', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <ConfirmationDialog 
        isOpen={false} title="Test Title" message="Test Message" 
        onConfirm={vi.fn()} onCancel={vi.fn()} 
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders content and calls actions accurately', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmationDialog 
        isOpen={true} title="Test Title" message="Test Message" 
        onConfirm={onConfirm} onCancel={onCancel} 
      />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
