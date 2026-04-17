import React, { useState, useEffect, useRef } from "react";
import { createConsumer, Subscription } from "@rails/actioncable";
import "./Chat.css";
import { message } from "@/types/message.type";
import { ChannelForm, ChatRoom } from "@/components";
import { Channel } from "@/components";

// Initialize the ActionCable consumer
const consumer = createConsumer();

const ChatIndex = ({ channels }: { channels: Channel[] }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState<message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userName, setUserName] = useState<string>(() => {
    return sessionStorage.getItem("chat_username") || "";
  });
  const channelRef = useRef<Subscription | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleJoin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (channelRef.current || !roomName.trim() || !userName.trim()) return;

    sessionStorage.setItem("chat_username", userName.trim());

    // Connect to Rails ChatroomChannel using the dynamic 'room' param
    const channel = consumer.subscriptions.create(
      { channel: "ChatroomChannel", room: roomName.trim() },
      {
        received(data: any) {
          if (data.type === "history") {
            setMessages(data.messages);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                id: data.id || Date.now().toString() + Math.random(),
                content: data.content,
                senderId: data.senderId,
              },
            ]);
          }
        },
      },
    );

    channelRef.current = channel;
    setIsJoined(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim() === "" || !channelRef.current) return;

    // Send the message backward to Rails ActionCable receive(data)
    channelRef.current.send({ content: currentMessage, senderId: userName.trim() });
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
          <h1>
            ChatRoom{" "}
            {isJoined && (
              <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
                #{roomName}
              </span>
            )}
          </h1>
          <div className="status-badge">
            <span className={`status-dot ${isJoined ? "active" : ""}`}></span>
            {isJoined ? "Connected" : "Disconnected"}
          </div>
        </div>

        {!isJoined ? (
          <ChannelForm
            roomName={roomName}
            setRoomName={setRoomName}
            userName={userName}
            setUserName={setUserName}
            handleJoin={handleJoin}
            channels={channels}
          />
        ) : (
          <ChatRoom
            messages={messages}
            clientId={userName.trim()}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            handleSendMessage={handleSendMessage}
            messagesEndRef={endRef}
          />
        )}
      </div>
    </div>
  );
};

export default ChatIndex;
