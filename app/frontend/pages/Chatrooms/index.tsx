import React, { useState, useEffect, useRef } from 'react';
import { createConsumer, Subscription } from '@rails/actioncable';
import './Chatroom.css';
import { message } from '@/types/message';

// Initialize the ActionCable consumer
const consumer = createConsumer();

const ChatroomIndex = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState<message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const clientId = useRef(Date.now().toString() + Math.random().toString()).current;
  const channelRef = useRef<Subscription | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleJoin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (channelRef.current || !roomName.trim()) return;

    // Connect to Rails ChatroomChannel using the dynamic 'room' param
    const channel = consumer.subscriptions.create(
      { channel: "ChatroomChannel", room: roomName.trim() },
      {
        received(data: { content: string, senderId?: string }) {
          setMessages((prev) => [...prev, { id: Date.now().toString() + Math.random(), content: data.content, senderId: data.senderId }]);
        }
      }
    );

    channelRef.current = channel;
    setIsJoined(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim() === "" || !channelRef.current) return;

    // Send the message backward to Rails ActionCable receive(data)
    channelRef.current.send({ content: currentMessage, senderId: clientId });
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
          <h1>ChatRoom {isJoined && <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>#{roomName}</span>}</h1>
          <div className="status-badge">
            <span className={`status-dot ${isJoined ? 'active' : ''}`}></span>
            {isJoined ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {!isJoined ? (
          <div className="join-overlay">
            <div className="join-title">Welcome to the Chat</div>
            <div className="join-subtitle">
              Enter a dynamic channel name below to join or create a specific room.
            </div>
            <form onSubmit={handleJoin} style={{ display: 'flex', gap: '8px', zIndex: 10 }}>
              <input 
                type="text" 
                className="message-input" 
                placeholder="Channel Name..." 
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                autoFocus
                style={{ minWidth: '250px' }}
              />
              <button type="submit" className="btn-primary" disabled={!roomName.trim()}>
                Join Channel
              </button>
            </form>
          </div>
        ) : (
          <div className="chat-area">
            <div className="message-list">
              {messages.length === 0 ? (
                 <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: 'auto', marginBottom: 'auto' }}>
                   No messages yet. Send one below!
                 </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.senderId === clientId;
                  return (
                    <div key={msg.id} className={`message-wrapper ${isMine ? 'message-mine' : 'message-other'}`}>
                      <div className="message-bubble">
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  );
                })
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