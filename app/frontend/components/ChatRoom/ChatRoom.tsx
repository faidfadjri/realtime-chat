import { SenderForm } from '../SenderForm';
import type { ChatRoomProps } from './ChatRoom.type';
import { router } from '@inertiajs/react';

export const ChatRoom = ({
  messages,
  clientId,
  currentMessage,
  setCurrentMessage,
  handleSendMessage,
  messagesEndRef
}: ChatRoomProps) => {

  return (
    <div className="chat-area">
      <button 
        className="btn-secondary" 
        onClick={() => router.get("/")}
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", alignSelf: "flex-start", marginBottom: "16px", margin: "10px" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </button>
      <div className="message-list">
        {messages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            No messages yet. Send one below!
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg.senderId === clientId;
            return (
              <div
                key={msg.id}
                className={`message-wrapper ${isMine ? "message-mine" : "message-other"}`}
              >
                <div className="message-bubble">
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{isMine ? "You" : msg.senderId}</p>
                  <p>{msg.content}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <SenderForm
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};
