class CreateApiScores < ActiveRecord::Migration
  def change
    create_table :api_scores do |t|
      t.datetime :date
      t.string :home
      t.string :away
      t.string :status
      t.string :halftime
      t.string :fulltime
      t.text :incidents

      t.timestamps
    end
  end
end
