class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.references :user, null: false
      t.string  :job, default: "演者"
      t.string  :name
      t.integer :age
      t.string  :gender
      t.integer :tall
      t.string  :prefecture
      t.text    :introduction
      t.string  :company
      t.text  :description
      t.timestamps
    end
  end
end
