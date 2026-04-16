class ChatroomsController < ApplicationController
  def index
    render inertia: "Chatrooms/index", props: {
      rails_version: Rails.version,
      ruby_version: RUBY_DESCRIPTION,
      rack_version: Rack.release,
      inertia_rails_version: InertiaRails::VERSION
    }
  end
end
