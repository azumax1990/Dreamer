class CreateGroupUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :group_users do |t|
      t.references :user, null: false
      t.references :group, null: false
      t.timestamps
    end
  end
end
