class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chatroom"
  end

  def receive(data)
    message = Message.create!(content: data["content"])

    ActionCable.server.broadcast("chatroom", {
      content: message.content
    })
  end
end
