require 'rails_helper'

RSpec.describe Message, type: :model do
  let!(:user) { create(:user) }
  let!(:group) { create(:group) }

  context '内容が入力されている場合' do
    let!(:message) { create(:message, user: user, group: group) }
    
    it 'メッセージを保存出来る' do
      expect(message).to be_valid
    end
  end

  context '内容が入力されていない場合' do
    let!(:message) { build(:message, content: '', user: user, group: group) }
    
    it 'メッセージを保存出来る' do
      message.save
      expect(message).not_to be_valid
    end
  end
end
