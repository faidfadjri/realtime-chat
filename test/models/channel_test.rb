require "test_helper"

class ChannelTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    channel = Channel.new(name: "Test Room", slug: "test_room")
    assert channel.valid?
  end

  test "should destroy associated messages when deleted" do
    channel = Channel.create!(name: "General", slug: "general")
    Message.create!(channel: channel, content: "Hello", sender_name: "Alice")

    assert_difference("Message.count", -1) do
      channel.destroy
    end
  end
end
