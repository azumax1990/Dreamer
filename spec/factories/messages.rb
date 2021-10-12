FactoryBot.define do
  factory :message do
    content { Faker::Lorem.characters(number: 100) }
  end
end
