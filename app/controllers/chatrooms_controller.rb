class ChatroomsController < ApplicationController
  def index
    channels = getChannels()

    render inertia: "Chat/index", props: {
      rails_version: Rails.version,
      ruby_version: RUBY_DESCRIPTION,
      rack_version: Rack.release,
      inertia_rails_version: InertiaRails::VERSION,
      channels: channels
    }
  end

  def destroy
    channel = Channel.find(params[:id])
    channel.destroy
    redirect_to chatrooms_path
  end

  private
    def getChannels
      Channel.all.map do |channel|
        {
          id: channel.id,
          name: channel.name,
          slug: channel.slug
        }
      end
    end
end
