class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, :default => ""
      t.text :text
      t.integer :enrollment_id
      t.integer :user_id

      t.timestamps
    end
  end
end
