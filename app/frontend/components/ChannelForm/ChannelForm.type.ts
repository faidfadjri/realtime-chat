export interface ChannelFormProps {
  roomName: string;
  setRoomName: (roomName: string) => void;
  userName: string;
  setUserName: (userName: string) => void;
  handleJoin: (e: React.FormEvent) => void;
  channels: Channel[];
}

export type Channel = {
  id: number;
  name: string;
  slug: string;
}
