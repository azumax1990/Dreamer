FactoryBot.define do
  factory :audition do
    title { Faker::Lorem.characters(number: 30) }
    description { Faker::Lorem.characters(number: 700) }
  end
end