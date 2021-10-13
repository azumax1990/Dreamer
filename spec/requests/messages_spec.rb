require 'rails_helper'

RSpec.describe 'Messages', type: :request do
  let!(:user) { create(:user) }
  let!(:group) { create(:group) }
  let!(:messages) { create_list(:message, 10, user: user, group: group) }
  
  describe 'GET /api/groups/:group_id/messages' do
    it '200ステータスが返ってくる' do
      get api_group_messages_path(group_id: group.id)
      expect(response).to have_http_status(200)
    end
  end
end
