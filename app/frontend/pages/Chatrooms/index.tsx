import React, { useState, useEffect, useRef } from 'react';
import { createConsumer, Subscription } from '@rails/actioncable';
import './Chatroom.css';

// Initialize the ActionCable consumer
const consumer = createConsumer();

const ChatroomIndex = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<{ id: number, content: string }[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const channelRef = useRef<Subscription | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleJoin = () => {
    if (channelRef.current) return;

    // Connect to Rails ChatroomChannel
    const channel = consumer.subscriptions.create("ChatroomChannel", {
      received(data: { content: string }) {
        setMessages((prev) => [...prev, { id: Date.now() + Math.random(), content: data.content }]);
      }
    });

    channelRef.current = channel;
    setIsJoined(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim() === "" || !channelRef.current) return;

    // Send the message backward to Rails ActionCable receive(data)
    channelRef.current.send({ content: currentMessage });
    setCurrentMessage("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, []);

  return (
    <div className="chat-app-container">
      <div className="chat-glass-panel">
        <div className="chat-header">
          <h1>ChatRoom</h1>
          <div className="status-badge">
            <span className={`status-dot ${isJoined ? 'active' : ''}`}></span>
            {isJoined ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {!isJoined ? (
          <div className="join-overlay">
            <div className="join-title">Welcome to the Chat</div>
            <div className="join-subtitle">
              Join our real-time messaging channel to instantly connect with others here.
            </div>
            <button className="btn-primary" onClick={handleJoin}>
              Join Channel
            </button>
          </div>
        ) : (
          <div className="chat-area">
            <div className="message-list">
              {messages.length === 0 ? (
                 <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 'auto', marginBottom: 'auto' }}>
                   No messages yet. Send one below!
                 </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="message-wrapper">
                    <div className="message-bubble">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
              <form className="chat-form" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  className="message-input"
                  placeholder="Type your message..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn-send" disabled={!currentMessage.trim()}>
                  <svg viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatroomIndex;