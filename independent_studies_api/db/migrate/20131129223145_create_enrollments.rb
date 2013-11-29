class CreateEnrollments < ActiveRecord::Migration
  def change
    create_table :enrollments do |t|
      t.integer :percentage
      t.integer :user_id
      t.integer :course_id

      t.timestamps
    end
  end
end
