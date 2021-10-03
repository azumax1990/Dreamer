class CreateApplies < ActiveRecord::Migration[6.0]
  def change
    create_table :applies do |t|
      t.references :user, null: false
      t.references :audition, null: false
      t.timestamps
    end
  end
end
