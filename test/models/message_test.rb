require "test_helper"

class MessageTest < ActiveSupport::TestCase
  test "should be valid with valid attributes" do
    channel = Channel.create!(name: "Test", slug: "test")
    message = Message.new(channel: channel, content: "Hi", sender_name: "Bob")
    assert message.valid?
  end

  test "should require a channel" do
    message = Message.new(content: "Hi", sender_name: "Bob")
    assert_not message.valid?
    assert_includes message.errors[:channel], "must exist"
  end
end
