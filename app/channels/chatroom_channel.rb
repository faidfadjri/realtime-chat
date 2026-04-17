class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    slug = params[:room].parameterize
    @channel = Channel.find_or_create_by(slug: slug) do |c|
      c.name = params[:room]
    end
    stream_from "chatroom_#{@channel.slug}"

    transmit({
      type: "history",
      messages: @channel.messages.order(created_at: :asc).map do |message|
        {
          id: message.id,
          content: message.content,
          senderId: message.sender_name,
          created_at: message.created_at
        }
      end
    })
  end

  def receive(data)
    message = @channel.messages.create!(
      content: data["content"],
      sender_name: data["senderId"]
    )

    ActionCable.server.broadcast(
      "chatroom_#{@channel.slug}",
      {
        type: "message",
        id: message.id,
        content: message.content,
        senderId: message.sender_name,
        created_at: message.created_at
      }
    )
  end
end
