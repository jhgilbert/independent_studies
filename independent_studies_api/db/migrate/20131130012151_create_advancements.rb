class CreateAdvancements < ActiveRecord::Migration
  def change
    create_table :advancements do |t|
      t.integer :amount
      t.integer :enrollment_id

      t.timestamps
    end
  end
end
