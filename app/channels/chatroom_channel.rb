class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chatroom_#{params[:room]}"
  end

  def receive(data)
    message = Message.create!(content: data["content"])

    ActionCable.server.broadcast("chatroom_#{params[:room]}", {
      content: message.content,
      senderId: data["senderId"]
    })
  end
end
