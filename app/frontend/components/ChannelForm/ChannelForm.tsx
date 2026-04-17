import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { ChannelFormProps } from "./ChannelForm.type";
import { ConfirmationDialog } from "../ConfirmationDialog";
import "./style.css";
export const ChannelForm = ({
  roomName,
  setRoomName,
  userName,
  setUserName,
  handleJoin,
  channels
}: ChannelFormProps) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState<number | null>(null);

  useEffect(() => {
    console.log(channels);
  }, [channels]);

  const confirmDelete = (channelId: number) => {
    setChannelToDelete(channelId);
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    if (channelToDelete !== null) {
      router.delete(`/chatrooms/${channelToDelete}`, {
        onSuccess: () => {
          setIsDialogOpen(false);
          setChannelToDelete(null);
        }
      });
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setChannelToDelete(null);
  };

  return (
    <div className="join-overlay">
      <div className="join-title">Welcome to the Chat</div>
      <div className="join-subtitle">
        Click existing channel or enter a new channel name below to join or create a specific room.
      </div>

      <div className="channel-list">
        {channels.map((channel) => (
          <div className="channel">
            <button
              key={channel.id}
              onClick={() => setRoomName(channel.name)}
              className="channel-button"
            >
              {channel.name}
            </button>
            <button
              onClick={() => confirmDelete(channel.id)}
              className="delete-button"
              aria-label="Delete channel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleJoin}
        style={{ display: "flex", flexDirection: "column", gap: "12px", zIndex: 10, marginTop: "16px" }}
      >
        <input
          type="text"
          className="message-input"
          placeholder="Your Username..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{ width: "100%" }}
        />
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            className="message-input"
            placeholder="Channel Name..."
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            style={{ flex: 1, minWidth: "250px" }}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={!roomName.trim() || !userName.trim()}
          >
            Join Channel
          </button>
        </div>
      </form>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Delete Channel"
        message="Are you sure you want to delete this channel? All messages will be permanently removed."
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </div>
  );
};
