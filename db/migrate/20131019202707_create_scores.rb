class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :teams
      t.string :score

      t.timestamps
    end
  end
end
