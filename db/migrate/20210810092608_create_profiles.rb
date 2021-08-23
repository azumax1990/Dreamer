class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.references :user, null: false
      t.string :name
      t.integer :age
      t.string :gender
      t.integer :tall
      t.string :prefecture
      t.text :introduction
      t.timestamps
    end
  end
end
