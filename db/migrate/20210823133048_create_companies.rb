class CreateCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :companies do |t|
      t.references :user, null: false
      t.string :name
      t.text :introduction
      t.timestamps
    end
  end
end
