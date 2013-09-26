class CreateFixtures < ActiveRecord::Migration
  def change
    create_table :fixtures do |t|
      t.string :hometeam
      t.string :awayteam
      t.datetime :kickoff
      t.string :competition

      t.timestamps
    end
  end
end
