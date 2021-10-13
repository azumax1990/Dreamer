require 'rails_helper'

RSpec.describe 'Auditions', type: :request do
  let!(:user) { create(:user) }
  let!(:auditions) { create_list(:audition, 10, user: user) }

  describe 'GET api/auditions' do
    it '200ステータスが返ってくる' do
      get api_auditions_path
      expect(response).to have_http_status(200)
    end
  end
end