require 'rails_helper'

RSpec.describe Audition, type: :model do
  let!(:user) { create(:user) }

  context 'タイトルと内容が入力されている場合' do
    let!(:audition) { create(:audition, user: user) }
    
    it 'オーディション情報を保存出来る' do
      expect(audition).to be_valid
    end
  end

  context 'タイトルが空の場合' do
    let!(:audition) { build(:audition, title: '', user: user) }

    it 'オーディション情報を保存出来ない' do
      audition.save
      expect(audition).not_to be_valid
    end
  end

  context '内容が空の場合' do
    let!(:audition) { build(:audition, description: '', user: user) }

    it 'オーディション情報を保存出来ない' do
      audition.save
      expect(audition).not_to be_valid
    end
  end
end