class ChatController < ApplicationController
  def index
    # Ini cuma buat nampilin halaman
  end

  def create
    # Broadcast ke semua yang dengerin "chat_room"
    ActionCable.server.broadcast("chat_room", { content: params[:content] })
    head :ok
  end
end
