class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_room"
  end

  def unsubscribed
    # cleanup kalau perlu
  end

  def speak(data)
    ActionCable.server.broadcast("chat_room", {
      message: data["message"],
      user: current_user&.email
    })
  end
end
