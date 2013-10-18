class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :teamname
      t.text :player
      t.text :subbed

      t.timestamps
    end
  end
end
