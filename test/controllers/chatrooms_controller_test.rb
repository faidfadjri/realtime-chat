require "test_helper"

class ChatroomsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @channel = Channel.create!(name: "Lobby", slug: "lobby")
  end

  test "should get index" do
    get chatrooms_url
    assert_response :success
  end

  test "should destroy channel" do
    assert_difference("Channel.count", -1) do
      delete chatroom_url(@channel)
    end

    assert_redirected_to chatrooms_path
  end
end
